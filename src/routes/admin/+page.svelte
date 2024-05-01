<script lang="ts">
  import AuthCheck from '$lib/components/AuthCheck.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import { createWritableStore, generatePushID } from '$lib/firebase';
  import { PUBLIC_APP_URL } from '$env/static/public';

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
    windowHandle.onunload = () => {
      windowHandle = null;
    };
  };

  const stopEmulation = () => {
    windowHandle?.close();
    windowHandle = null;
  };
</script>

<AuthCheck />
<div class="content">
  <h1>Admin View</h1>
  {#if $organizations}
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
  {/if}
  <h2 style="margin-top: 2rem;">Emulation Mode</h2>
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
</style>
