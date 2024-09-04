<script lang="ts">
  import AuthCheck from '$lib/components/AuthCheck.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import { createWritableStore, generatePushID, user } from '$lib/firebase';
  import { PUBLIC_APP_URL } from '$env/static/public';
  import type { AllUserData, UserSearchResult } from '../api/admin/userData/+server';

  const organizations = createWritableStore<{ [id: string]: Database.Organization }>('/organizations');
  let showAddOrganizationModal = false;
  let newOrgName = '';
  let newOrgSeats = 0;
  const createOrganization = () => {
    if ($organizations) {
      const id = generatePushID();
      $organizations[id] = {
        public: {
          name: newOrgName,
        },
        locked: {
          active: true,
          seats: newOrgSeats,
        },
      };
    }
    newOrgName = '';
    newOrgSeats = 0;
    showAddOrganizationModal = false;
  };

  let emulationUid = '';
  let windowHandle: Window | null = null;
  const startEmulation = async (uid: string) => {
    const { emulationToken } = await fetch('/api/admin/emulationToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid }),
    }).then((res) => res.json());
    windowHandle = window.open('', 'BlendEmulator', 'width=1920,height=1080,popup')!;
    windowHandle.document.write(
      `<iframe credentialless width="1920" height="1080" src="${`${PUBLIC_APP_URL}?jumpScene=${encodeURIComponent('res://Scenes/Account/Account.tscn')}&loginToken=${encodeURIComponent(emulationToken)}`}" frameBorder="0" allowfullscreen></iframe>`,
    );
    windowHandle.document.head.innerHTML += `<style>body { margin: 0; overflow: hidden }</style>`;
    windowHandle.onbeforeunload = () => {
      windowHandle = null;
    };
  };

  const stopEmulation = () => {
    windowHandle?.close();
    windowHandle = null;
  };

  let userSearchResults: UserSearchResult[] = [];
  let userSearchUid = '';
  let userSearchEmail = '';
  const handleUserSearch = async () => {
    const response = await fetch(`/api/admin/userData?uid=${userSearchUid}&email=${encodeURIComponent(userSearchEmail)}`);
    userSearchResults = await response.json();
    userSearchEmail = '';
    userSearchUid = '';
  };

  const deleteUser = async (uid: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    await fetch(`/api/admin/userData?uid=${uid}`, { method: 'DELETE' });
    userSearchResults = userSearchResults.filter((user) => user.uid !== uid);
  };

  const downloadAllUserDetails = async () => {
    if (!confirm('This will download all user data into a CSV. Are you sure you want to continue?')) return;
    const response = await fetch('/api/admin/userData');
    const users = (await response.json()) as AllUserData;
    const csv = [
      'UID,Email,DisplayName,IsSubscribedToBlendPro,AccountCreated,LastLogin,LastRefresh,Organizations,Number of Decks,Number of Playlists',
    ];
    for (const user of users) {
      csv.push(
        [
          user.uid,
          `"${user.email}"`,
          `"${user.displayName}"`,
          user.isSubscribedToBlendPro,
          `"${user.accountCreated}"`,
          `"${user.lastLogin}"`,
          `"${user.lastRefresh}"`,
          `"${user.organizations.join(',')}"`,
          user.deckCount,
          user.playlistCount,
        ].join(','),
      );
    }
    const blob = new Blob([csv.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'user_data.csv';
    a.click();
    URL.revokeObjectURL(url);
  };
</script>

<AuthCheck />
<div class="content">
  <h1 class="mt-4">Admin View</h1>
  {#if $organizations}
    <div class="paper">
      <h2>Organizations:</h2>
      <table class="org-table">
        <tr>
          <th>Name</th>
          <th>Actions</th>
        </tr>
        {#each Object.entries($organizations) as [orgId, org]}
          <tr>
            <td>
              <a href={`/organization/${orgId}`}>{org.public.name}</a>
            </td>
            <td>
              <button class="btn btn-red btn-small">Delete</button>
            </td>
          </tr>
        {/each}
        <tr>
          <td colspan="2">
            <button style="width: 100%; margin: 1rem 0 0 0" class="btn btn-green" on:click={() => (showAddOrganizationModal = true)}>Create</button>
          </td>
        </tr>
      </table>
    </div>
  {/if}
  <div class="paper">
    <h2>Emulation Mode</h2>
    <label>
      UID
      <input type="text" disabled={!!windowHandle} bind:value={emulationUid} />
    </label>
    {#if windowHandle}
      <button on:click={stopEmulation} class="btn btn-red">Stop</button>
    {:else}
      <button disabled={!emulationUid} on:click={() => startEmulation(emulationUid)} class="btn btn-green">Start</button>
    {/if}
  </div>
  <div class="paper">
    <div style="display: flex; flex-direction: row;">
      <div style="flex-grow: 1;"></div>
      <h2 style="flex-grow: 1;">User Search</h2>
      <form style="flex-grow: 0;" on:submit|preventDefault={downloadAllUserDetails}>
        <button class="btn btn-small btn-green" style="margin-bottom: 1rem;">Download All</button>
      </form>
    </div>
    <form on:submit|preventDefault={handleUserSearch}>
      <div
        style="display: flex; flex-direction: row; flex-wrap: wrap; gap: 0.5rem; vertical-align: bottom; align-items: center; justify-content: center;">
        <label style="display: flex; flex-direction: column;">
          UID
          <input bind:value={userSearchUid} type="text" />
        </label>
        <span style="padding-top: 1rem;">OR</span>
        <label style="display: flex; flex-direction: column;">
          Email
          <input bind:value={userSearchEmail} type="text" />
        </label>
      </div>
      <button style="margin: 1rem auto; width: 90%" class="btn btn-green">Search</button>
    </form>
    {#if userSearchResults.length > 0}
      <h3 style="margin-bottom: 0;">Results</h3>
      {#each userSearchResults as userSearchResult}
        <div style="border-width: 2px; border-radius: 5px; border-style: solid; padding: 1rem;">
          <h4 style="text-align: center; margin: 0;">{userSearchResult.displayName}</h4>
          <div style="width: 100%; display: flex; flex-direction: row; justify-content: flex-end;">
            <button
              on:click={() => {
                deleteUser(userSearchResult.uid);
              }}
              class="btn btn-small btn-red">Delete</button>
          </div>
          <dl style="display: grid; grid-template-columns: auto auto; column-gap: 1rem;">
            <dt>UID:</dt>
            <dd style="margin-left: 0;">{userSearchResult.uid}</dd>
            <dt>Email:</dt>
            <dd style="margin-left: 0;">{userSearchResult.email}</dd>
            <dt>Blend Pro Subscriber:</dt>
            <dd style="margin-left: 0;">{userSearchResult.isSubscribedToBlendPro}</dd>
            <dt>Account Created:</dt>
            <dd style="margin-left: 0;">{userSearchResult.accountCreated}</dd>
            <dt>Last Login:</dt>
            <dd style="margin-left: 0;">{userSearchResult.lastLogin}</dd>
            <dt>Last Refresh:</dt>
            <dd style="margin-left: 0;">{userSearchResult.lastRefresh}</dd>
            <dt>Organizations:</dt>
            <dd style="margin-left: 0;">{userSearchResult.organizations.map((org) => org.name).join(', ')}</dd>
            <dt>Decks ({Object.keys(userSearchResult.decks).length}):</dt>
            <dd style="margin-left: 0;">
              {#each Object.entries(userSearchResult.decks) as [key, deck]}
                <dl
                  style="display: grid; grid-template-columns: auto auto; column-gap: .5rem; border-width: 1px; border-style: dashed; padding: 0.5rem; margin: 0.3rem auto;">
                  <dt>Name:</dt>
                  <dd style="margin-left: 0;">{deck.name}</dd>
                  <dt>RefId:</dt>
                  <dd style="margin-left: 0;">{deck.refId}</dd>
                  <dt>Created:</dt>
                  <dd style="margin-left: 0;">{deck.created_ts}</dd>
                  <dt>Updated:</dt>
                  <dd style="margin-left: 0;">{deck.modified_ts}</dd>
                </dl>
              {/each}
            </dd>
            <dt>Playlists ({Object.keys(userSearchResult.playlists).length})</dt>
            <dd style="margin-left: 0;">
              {#each Object.entries(userSearchResult.playlists) as [key, playlist]}
                <dl
                  style="display: grid; grid-template-columns: auto auto; column-gap: .5rem; border-width: 1px; border-style: dashed; padding: 0.5rem; margin: 0.3rem auto;">
                  <dt>Name:</dt>
                  <dd style="margin-left: 0;">{playlist.name}</dd>
                  <dt>RefId:</dt>
                  <dd style="margin-left: 0;">{playlist.refId}</dd>
                  <dt>Created:</dt>
                  <dd style="margin-left: 0;">{playlist.created_ts}</dd>
                  <dt>Updated:</dt>
                  <dd style="margin-left: 0;">{playlist.modified_ts}</dd>
                  <dt>Linked Deck ID:</dt>
                  <dd style="margin-left: 0;">{playlist.linked_deck_id}</dd>
                </dl>
              {/each}
            </dd>
          </dl>
        </div>
      {/each}
    {/if}
  </div>
</div>

<Modal bind:showModal={showAddOrganizationModal}>
  <h2 slot="header">Create a new Organization</h2>
  <form on:submit|preventDefault={createOrganization}>
    <label>
      Name
      <input required type="text" bind:value={newOrgName} />
    </label>
    <label>
      Number of Seats
      <input required type="number" bind:value={newOrgSeats} />
    </label>
    <button type="submit" class="btn btn-green" style="margin: 2rem auto 0 auto" on:click={createOrganization}>Create</button>
  </form>
</Modal>

<style>
  .org-table {
    text-align: left;
    border-spacing: 30px 0;
    /* min-width: 50vw; */
  }
  .org-table th {
    font-size: 1.2rem;
  }
  .paper {
    min-width: 20rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: content-box; /* Tailwind changes this default, which is fine but for the sake of keeping things the same for now I'm changing it back */
  }

  .paper h2 {
    text-align: center;
    margin-bottom: 1rem;
  }
</style>
