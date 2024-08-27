<script lang="ts">
  import AuthCheck from '$lib/components/AuthCheck.svelte';
  import { page } from '$app/stores';
  import { createWritableStore, user } from '$lib/firebase';
  import type { PageData } from './$types';
  import InviteModal from './InviteModal.svelte';
  import { invalidateAll } from '$app/navigation';
  import Modal from '$lib/components/Modal.svelte';
  import OrganizationItemTable from './OrganizationItemTable.svelte';
  export let data: PageData;
  const { organizationId } = $page.params;
  let members: Database.Organization.MemberDetails[];
  let invites: Database.Invite.InviteDetails[];
  $: members = data.memberDetails;
  $: invites = data.inviteDetails;
  $: inviteRequests = data.inviteRequestDetails;
  $: organizationDecks = createWritableStore<Database.Decks.Organization>(`/decks/organization/${organizationId}`);
  $: organizationPlaylists = createWritableStore<Database.Playlists.Organization>(`/playlists/organization/${organizationId}`);
  $: userDecks = createWritableStore<Database.Decks.User>(`/decks/user/${$user?.uid}`);
  $: userPlaylists = createWritableStore<Database.Playlists.User>(`/playlists/user/${$user?.uid}`);

  let inviteRequestsProcessing: string[] = [];

  const organization = createWritableStore<Database.Organization>(`/organizations/${organizationId}`);
  let decksToAdd: string[] = [];
  let playlistsToAdd: string[] = [];
  let showMemberAddModal = false;
  let showDeckAddModal = false;
  let showPlaylistAddModal = false;

  $: $organization && invalidateAll(); // Reload data when organization changes

  const removeDeck = (deckId: string | number) => {
    $organizationDecks = Object.keys($organizationDecks!)
      .filter((id) => id !== String(deckId))
      .reduce((acc, id) => ({ ...acc, [id]: $organizationDecks![id] }), {});
  };
  const removePlaylist = (playlistId: string | number) => {
    $organizationPlaylists = Object.keys($organizationPlaylists!)
      .filter((id) => id !== String(playlistId))
      .reduce((acc, id) => ({ ...acc, [id]: $organizationPlaylists![id] }), {});
  };

  const reorderOrganizationPlaylists = (itemIdsInOrder: string[]) => {
    itemIdsInOrder.forEach((id, index) => {
      $organizationPlaylists![id].playlist.position = index;
    });
  };

  const reorderOrganizationDecks = (itemIdsInOrder: string[]) => {
    itemIdsInOrder.forEach((id, index) => {
      $organizationDecks![id].deck.position = index;
    });
  };

  const handleDeckAdd = () => {
    let maxPosition = Math.max(...Object.values($organizationDecks ?? {}).map(({ deck: { position } }) => position), -1);
    const newDecks = decksToAdd.reduce((acc, deckId) => {
      const newRefId = Math.floor(Math.random() * 4294967295);
      return {
        ...acc,
        [newRefId]: {
          author: $user?.uid,
          originalRefId: deckId,
          deck: {
            ...$userDecks![deckId],
            refId: newRefId,
            is_editable: false,
            position: ++maxPosition,
          },
        },
      };
    }, {});
    $organizationDecks = { ...$organizationDecks, ...newDecks };
    decksToAdd = [];
    showDeckAddModal = false;
  };
  const handlePlaylistAdd = () => {
    let maxPosition = Math.max(...Object.values($organizationPlaylists ?? {}).map(({ playlist: { position } }) => position), -1);
    const newPlaylists = playlistsToAdd.reduce((acc, playlistId) => {
      const newRefId = Math.floor(Math.random() * 4294967295);
      return {
        ...acc,
        [newRefId]: {
          author: $user?.uid,
          originalRefId: playlistId,
          playlist: {
            ...$userPlaylists![playlistId],
            refId: newRefId,
            is_editable: false,
            position: ++maxPosition,
          },
        },
      };
    }, {});
    $organizationPlaylists = { ...$organizationPlaylists, ...newPlaylists };
    playlistsToAdd = [];
    showPlaylistAddModal = false;
  };

  const cancelInvite = (inviteId: string) =>
    confirm('Are you sure you want to cancel this invite?') &&
    fetch(`${$page.url.href}/invites`, {
      method: 'DELETE',
      body: JSON.stringify([inviteId]),
    });

  const removeMember = (uid: string) =>
    confirm('Are you sure you want to remove this member?') &&
    fetch(`${$page.url.href}/members`, {
      method: 'DELETE',
      body: JSON.stringify([uid]),
    });

  const promoteMember = (uid: string) => {
    if (!confirm('Are you sure you want to promote this member to an admin?')) return;
    $organization!.private!.members![uid].role = 'admin';
  };

  const demoteMember = (uid: string) => {
    if (!confirm('Are you sure you want to demote this admin to a member?')) return;
    $organization!.private!.members![uid].role = 'member';
  };

  const approveInviteRequest = async (uid: string) => {
    if (!confirm('Are you sure you want to approve this invite request? This will take up an available seat.')) return;
    inviteRequestsProcessing = [...inviteRequestsProcessing, uid];
    // We have to do this addition server-side since we need to modify that user's organization list
    await fetch(`${$page.url.href}/members`, {
      method: 'POST',
      body: JSON.stringify({ uids: [uid] }),
    });
    inviteRequestsProcessing = inviteRequestsProcessing.filter((id) => id !== uid);
  };

  const denyInviteRequest = (uid: string) => {
    if (!confirm('Are you sure you want to deny this invite request?')) return;
    $organization!.private!.inviteRequests![uid] = null;
  };
</script>

<svelte:head>
  <title>Manage Organization</title>
</svelte:head>

<AuthCheck />
<div class="content" style="overflow-x: auto;">
  {#if $organization}
    <div class="row flex-center" style="gap: 1rem; align-items: center;">
      <!-- Spacer -->
      <div style="flex-grow: 1; width: 100px" />
      <h1 style="margin-bottom: 0">{$organization.public.name}</h1>
      <div style="flex-grow: 1; position: relative; width: 100px">
        <div class="card" style="height: fit-content; width: fit-content; margin: 15px 0 0 0;">
          Seats Used: {Object.keys($organization.private?.members ?? {}).length}/{$organization.locked.seats}
        </div>
      </div>
    </div>
    <div class="row flex-wrap">
      <section class="card" style="width: 45%">
        <h2>Members</h2>
        <table class="member-table" style="font-size: medium;">
          <tr>
            <th>Name</th>
            <th style="width: 50%">Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
          {#each invites as { id, inviteeEmail, displayName } (id)}
            <tr class="bottom-border">
              <td>{displayName ?? 'New Blend User'}</td>
              <td>{inviteeEmail}</td>
              <td>Invite Sent</td>
              <td style="padding-right: 0">
                <span>
                  <button class="btn btn-small btn-red" style="margin: 0" on:click={() => cancelInvite(id)}>Cancel</button>
                </span>
              </td>
            </tr>
          {/each}
          {#each members as { displayName, email, uid, role } (uid)}
            <tr class="bottom-border">
              <td>{displayName}</td>
              <td>{email}</td>
              <td>{role}</td>
              <td style="padding-right: 0">
                <span>
                  <button disabled={uid === $user?.uid} class="btn btn-small btn-red" style="margin: 0" on:click={() => removeMember(uid)}
                    >Remove</button>
                  <button
                    class="btn btn-small btn-gray"
                    style="margin: 0; "
                    on:click={() => (role === 'admin' ? demoteMember(uid) : promoteMember(uid))}>
                    {role === 'admin' ? 'Demote' : 'Promote'}
                  </button>
                </span>
              </td>
            </tr>
          {/each}
          <tr>
            <td colspan="4" style="text-align: center; padding: 0">
              <button
                class="btn add-button btn-green"
                on:click={() => {
                  showMemberAddModal = true;
                }}>Add</button>
            </td>
          </tr>
        </table>
        <InviteModal bind:showModal={showMemberAddModal} organization={$organization} orgId={$page.params.organizationId} />
      </section>
      <section class="card" style="width: 45%">
        <h2>Invite Requests</h2>
        <p style="font-size: medium;">Requests that Blend users have made to join your oganization will appear here.</p>
        <table style="list-style: none; width: 100%; font-size: medium;">
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Message</th>
            <th>Actions</th>
          </tr>
          {#each inviteRequests as { uid, timestamp, message, displayName } (uid)}
            <tr>
              <td style="vertical-align: top;">{displayName}</td>
              <td style="vertical-align: top;">{new Date(timestamp).toLocaleDateString()}</td>
              <td style="vertical-align: top; max-width: 10rem;">
                <p style="margin: 0; overflow-y: auto; max-height: 4rem; scrollbar-width: thin; scrollbar-color: black transparent;">{message}</p>
              </td>
              <td style="vertical-align: top;">
                <div class="row flex-center" style="gap: 3px;">
                  <button
                    class="btn btn-small btn-green"
                    style="margin: 0;"
                    disabled={inviteRequestsProcessing.includes(uid)}
                    on:click={(e) => {
                      approveInviteRequest(uid);
                    }}>Approve</button>
                  <button
                    class="btn btn-small btn-red"
                    style="margin: 0;"
                    disabled={inviteRequestsProcessing.includes(uid)}
                    on:click={() => {
                      denyInviteRequest(uid);
                    }}>Deny</button>
                </div>
              </td>
            </tr>
          {/each}
        </table>
      </section>
    </div>

    <section class="card">
      <h2>Organization Decks</h2>
      <OrganizationItemTable
        items={$organizationDecks ?? {}}
        memberDetails={members}
        itemActions={[{ name: 'Remove', class: 'btn btn-red btn-small', handler: ({ refId }) => removeDeck(refId) }]}
        draggableItems
        onItemReorder={reorderOrganizationDecks} />
      <button
        class="btn btn-green add-button"
        id="add-decks-button"
        on:click={() => {
          showDeckAddModal = true;
        }}>Add</button>
      <Modal bind:showModal={showDeckAddModal}>
        <h2 slot="header">Add a Deck to {$organization.public.name}</h2>
        <p style="margin-bottom: 0;">Choose from your personal decks below.</p>
        <p style="margin-top: 0;">A copy of the deck you select will be added to the organization.</p>
        <OrganizationItemTable
          items={$userDecks ?? {}}
          memberDetails={members}
          existingItems={$organizationDecks ?? {}}
          selectable
          bind:selectedItems={decksToAdd} />
        <div slot="footer" class="row" style="justify-content: center">
          <button
            class="btn btn-gray"
            on:click={() => {
              showDeckAddModal = false;
            }}>Cancel</button>
          <button class="btn btn-green" on:click={handleDeckAdd} disabled={decksToAdd.length == 0}>Add to Organization</button>
        </div>
      </Modal>
    </section>

    <section class="card">
      <h2>Organization Playlists</h2>
      <OrganizationItemTable
        items={$organizationPlaylists ?? {}}
        memberDetails={members}
        itemActions={[{ name: 'Remove', class: 'btn btn-red btn-small', handler: ({ refId }) => removePlaylist(refId) }]}
        draggableItems
        onItemReorder={reorderOrganizationPlaylists} />
      <button
        class="btn btn-green add-button"
        on:click={() => {
          showPlaylistAddModal = true;
        }}>Add</button>
      <Modal bind:showModal={showPlaylistAddModal}>
        <h2 slot="header">Add a Playlist to {$organization.public.name}</h2>
        <p style="margin-bottom: 0;">Choose from your personal playlists below.</p>
        <p style="margin-top: 0;">A copy of the playlist you select will be added to the organization.</p>
        <OrganizationItemTable
          items={$userPlaylists ?? {}}
          existingItems={$organizationPlaylists ?? {}}
          bind:selectedItems={playlistsToAdd}
          selectable />
        <div slot="footer" class="row" style="justify-content: center">
          <button
            class="btn btn-gray"
            on:click={() => {
              showPlaylistAddModal = false;
            }}>Cancel</button>
          <button class="btn btn-green" on:click={handlePlaylistAdd} disabled={playlistsToAdd.length == 0}>Add to Organization</button>
        </div>
      </Modal>
    </section>
  {/if}
</div>

<style>
  .member-table {
    text-align: left;
    border-collapse: collapse;
    width: 100%;
    max-width: 50rem;
    margin: 0 auto;
  }
  .member-table td {
    padding: 10px 30px 10px 0px;
  }
  .bottom-border {
    border-bottom: 1px solid #000;
  }

  .add-button {
    padding-top: 5px;
    padding-bottom: 5px;
    height: fit-content;
    margin: 1rem auto 2rem;
  }

  .card {
    background-color: rgba(245, 245, 245, 0.473);
    border-radius: 1rem;
    padding: 1rem;
    max-width: 60rem;
    margin: 1rem auto;
  }
</style>
