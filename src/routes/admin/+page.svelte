<script lang="ts">
  import AuthCheck from '$lib/components/AuthCheck.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import { createWritableStore, generatePushID } from '$lib/firebase';
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
