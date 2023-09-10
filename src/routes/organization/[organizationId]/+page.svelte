<script lang="ts">
  import AuthCheck from '$lib/components/AuthCheck.svelte';
  import { page } from '$app/stores';
  import { createWritableStore, user } from '$lib/firebase';
  import type { PageData } from './$types';
  import InviteModal from './InviteModal.svelte';
  import { invalidateAll } from '$app/navigation';
  import Modal from '$lib/components/Modal.svelte';
  import type { ChangeEventHandler } from 'svelte/elements';
  export let data: PageData;
  let members: Database.Organization.MemberDetails[];
  let invites: Database.Invite.InviteDetails[];
  $: members = JSON.parse(data.memberDetails);
  $: invites = JSON.parse(data.inviteDetails);
  const { organizationId } = $page.params;
  const organization = createWritableStore<Database.Organization>(`/organizations/${organizationId}`);
  $: organizationDecks = createWritableStore<Database.Decks.Organization>(`/decks/organization/${organizationId}`);
  $: organizationPlaylists = createWritableStore<Database.Playlists.Organization>(`/playlists/organization/${organizationId}`);
  $: userDecks = createWritableStore<Database.Decks.User>(`/decks/user/${$user?.uid}`);
  $: userPlaylists = createWritableStore<Database.Playlists.User>(`/playlists/user/${$user?.uid}`);
  let decksToAdd: string[] = [];
  let playlistsToAdd: string[] = [];
  const handleDeckCheck: ChangeEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement;
    if (target.checked) {
      decksToAdd = [...decksToAdd, target.value];
    } else {
      decksToAdd = decksToAdd.filter((id) => id !== target.value);
    }
  };
  const removeDeck = (deckId: string | number) => {
    $organizationDecks = Object.keys($organizationDecks!)
      .filter((id) => id !== String(deckId))
      .reduce(
        (acc, id) => ({
          ...acc,
          [id]: $organizationDecks![id],
        }),
        {},
      );
  };

  const handleDeckAdd = () => {
    const newDecks = decksToAdd.reduce((acc, deckId) => {
      const newRefId = Math.floor(Math.random() * 4294967295);
      return {
        ...acc,
        [newRefId]: {
          author: $user?.uid,
          deck: {
            ...$userDecks![deckId],
            refId: newRefId,
            is_editable: false,
            position: -1,
          },
        },
      };
    }, {});
    $organizationDecks = { ...$organizationDecks, ...newDecks };
    decksToAdd = [];
    showDeckAddModal = false;
  };

  const handlePlaylistCheck: ChangeEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement;
    if (target.checked) {
      playlistsToAdd = [...playlistsToAdd, target.value];
    } else {
      playlistsToAdd = playlistsToAdd.filter((id) => id !== target.value);
    }
  };
  const handlePlaylistAdd = () => {
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
            position: -1,
          },
        },
      };
    }, {});
    $organizationPlaylists = { ...$organizationPlaylists, ...newPlaylists };
    playlistsToAdd = [];
    showPlaylistAddModal = false;
  };
  const removePlaylist = (playlistId: string | number) => {
    $organizationPlaylists = Object.keys($organizationPlaylists!)
      .filter((id) => id !== String(playlistId))
      .reduce(
        (acc, id) => ({
          ...acc,
          [id]: $organizationPlaylists![id],
        }),
        {},
      );
  };

  let showMemberAddModal = false;
  let showDeckAddModal = false;
  let showPlaylistAddModal = false;

  const cancelInvite = async (inviteId: string) => {
    await fetch(`${$page.url.href}/invites`, {
      method: 'DELETE',
      body: JSON.stringify([inviteId]),
    });
    invalidateAll();
  };

  const removeMember = async (uid: string) => {
    await fetch(`${$page.url.href}/members`, {
      method: 'DELETE',
      body: JSON.stringify([uid]),
    });
    invalidateAll();
  };

  const promoteMember = (uid: string) => {
    $organization!.private.members[uid].role = 'admin';
    invalidateAll();
  };

  const demoteMember = (uid: string) => {
    $organization!.private.members[uid].role = '';
    invalidateAll();
  };

  const compareCreatedTs = (item1: { created_ts: string }, item2: { created_ts: string }) => {
    if (item1.created_ts === item2.created_ts) return 0;
    if (item1.created_ts < item2.created_ts) return -1;
    return 1;
  };

  $: sortedUserPlaylists = Object.values($userPlaylists ?? {}).sort(compareCreatedTs);
  $: sortedUserDecks = Object.values($userDecks ?? {}).sort(compareCreatedTs);
  $: sortedOrganizationPlaylists = Object.values($organizationPlaylists ?? {}).sort((p1, p2) => compareCreatedTs(p1.playlist, p2.playlist));
  $: sortedOrganizationDecks = Object.values($organizationDecks ?? {}).sort((d1, d2) => compareCreatedTs(d1.deck, d2.deck));
</script>

<svelte:head>
  <title>Manage Organization</title>
</svelte:head>

<AuthCheck />
<div class="content" style="overflow-x: auto;">
  {#if $organization}
    <h1>{$organization.public.name}</h1>
    <div>
      <h2>Members</h2>
      <table class="member-table">
        <tr>
          <th>Name</th>
          <th>Email</th>
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
                <button class="btn btn-small" style="margin: 0" on:click={() => (role === 'admin' ? demoteMember(uid) : promoteMember(uid))}>
                  {role === 'admin' ? 'Demote' : 'Promote'}
                </button>
              </span>
            </td>
          </tr>
        {/each}
        <tr>
          <td colspan="4" style="text-align: center">
            <button
              class="btn"
              style="width: 95%; margin: 10px auto;"
              on:click={() => {
                showMemberAddModal = true;
              }}>Add</button>
          </td>
        </tr>
      </table>
    </div>
    <div class="org-decks">
      <h2>Organization Decks</h2>
      <ul class="deck-list">
        {#each sortedOrganizationDecks as orgDeck (orgDeck.deck.refId)}
          <li class="row flex-between">
            {orgDeck.deck.name}
            <button class="btn btn-red btn-small" on:click={() => removeDeck(orgDeck.deck.refId)}>Remove</button>
          </li>
        {/each}
        <li>
          <button
            class="btn btn-green"
            id="add-decks-button"
            on:click={() => {
              showDeckAddModal = true;
            }}>Add</button>
        </li>
      </ul>
      <Modal bind:showModal={showDeckAddModal}>
        <h2 slot="header">Add a Deck to {$organization.public.name}</h2>
        <p style="margin-bottom: 0;">Choose from your personal decks below.</p>
        <p style="margin-top: 0;">A copy of the deck you select will be added to the organization.</p>
        <ul class="deck-list">
          {#each sortedUserDecks as userDeck}
            <li>
              <label>
                <input type="checkbox" value={userDeck.refId} on:change={handleDeckCheck} />
                {userDeck.name}
              </label>
            </li>
          {/each}
        </ul>
        <div slot="footer" class="row">
          <button
            class="btn btn-gray"
            on:click={() => {
              showDeckAddModal = false;
            }}>Cancel</button>
          <button class="btn btn-green" on:click={handleDeckAdd} disabled={decksToAdd.length == 0}>Add to Organization</button>
        </div>
      </Modal>
    </div>
    <div class="org-playlists">
      <h2>Organization Playlists</h2>
      <ul class="deck-list">
        {#each sortedOrganizationPlaylists as orgPlaylist (orgPlaylist.playlist.refId)}
          <li class="row flex-between">
            {orgPlaylist.playlist.name}
            <button class="btn btn-red btn-small" on:click={() => removePlaylist(orgPlaylist.playlist.refId)}>Remove</button>
          </li>
        {/each}
        <li>
          <button
            class="btn btn-green"
            id="add-decks-button"
            on:click={() => {
              showPlaylistAddModal = true;
            }}>Add</button>
        </li>
      </ul>
      <Modal bind:showModal={showPlaylistAddModal}>
        <h2 slot="header">Add a Playlist to {$organization.public.name}</h2>
        <p style="margin-bottom: 0;">Choose from your personal playlists below.</p>
        <p style="margin-top: 0;">A copy of the playlist you select will be added to the organization.</p>
        <ul class="deck-list">
          {#each sortedUserPlaylists as userPlaylist (userPlaylist.refId)}
            <li>
              <label>
                <input type="checkbox" value={userPlaylist.refId} on:change={handlePlaylistCheck} />
                {userPlaylist.name}
              </label>
            </li>
          {/each}
        </ul>
        <div slot="footer" class="row">
          <button
            class="btn btn-gray"
            on:click={() => {
              showPlaylistAddModal = false;
            }}>Cancel</button>
          <button class="btn btn-green" on:click={handlePlaylistAdd} disabled={playlistsToAdd.length == 0}>Add to Organization</button>
        </div>
      </Modal>
    </div>
  {/if}
  <InviteModal bind:showModal={showMemberAddModal} organization={$organization} orgId={$page.params.organizationId} />
</div>

<style>
  .member-table {
    text-align: left;
    border-collapse: collapse;
  }
  .member-table td {
    padding: 10px 30px 10px 0px;
  }
  .bottom-border {
    border-bottom: 1px solid #000;
  }
  .deck-list {
    list-style: none;
    padding-left: 0;
    text-align: left;
    max-width: fit-content;
    margin-left: auto;
    margin-right: auto;
  }

  .deck-list li {
    margin-bottom: 5px;
  }

  #add-decks-button {
    padding-top: 5px;
    padding-bottom: 5px;
    height: fit-content;
  }
</style>
