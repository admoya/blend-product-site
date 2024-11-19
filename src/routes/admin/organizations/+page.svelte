<script lang="ts">
  import { createWritableStore, generatePushID } from '$lib/firebase';
  import OrganizationEditModal from '../OrganizationEditModal.svelte';

  const emptyOrganization = {
    public: {
      name: '',
    },
    locked: {
      active: true,
      isLicensed: false,
      seats: 0,
    },
  };
  const organizations = createWritableStore<{ [id: string]: Database.Organization }>('/organizations');
  let showAddOrganizationModal = false;
  let currentOrganizationId = '';
</script>

{#if $organizations}
  <div class="paper">
    <h2>Organizations:</h2>
    <table class="table-fixed">
      <tr>
        <th class="w-52">Name</th>
        <th class="w-28">Active</th>
        <th class="w-28">Seats</th>
        <th class="w-28" title="Whether or not this is a licensed organization that provides Blend Pro to its members">Licensed</th>
        <th class="w-36">Term Start</th>
        <th class="w-36">Term End</th>
        <th class="w-20 text-right">Actions</th>
      </tr>
      {#each Object.entries($organizations) as [orgId, org]}
        <tr>
          <td>
            <a href={`/organization/${orgId}`}>{org.public.name}</a>
          </td>
          <td>
            {org.locked.active ? 'Yes' : 'No'}
          </td>
          <td>
            {Object.keys(org.private?.members ?? {}).length}/{org.locked.seats}
          </td>
          <td>
            {org.locked.isLicensed ? 'Yes' : 'No'}
          </td>
          <td>
            {org.locked.termStart ? new Date(org.locked.termStart).toLocaleDateString('en-US', { timeZone: 'UTC' }) : 'N/A'}
          </td>
          <td>
            {org.locked.termEnd ? new Date(org.locked.termEnd).toLocaleDateString('en-US', { timeZone: 'UTC' }) : 'N/A'}
          </td>
          <td class="flex flex-col items-end">
            <button
              class="btn btn-red btn-small !mr-0"
              on:click={() => {
                currentOrganizationId = orgId;
                showAddOrganizationModal = true;
              }}>Edit</button>
          </td>
        </tr>
      {/each}
      <tr>
        <td colspan="7">
          <button style="width: 100%; margin: 1rem 0 0 0" class="btn btn-green" on:click={() => (showAddOrganizationModal = true)}>Create</button>
        </td>
      </tr>
    </table>
  </div>
{/if}

<OrganizationEditModal
  bind:show={showAddOrganizationModal}
  organization={JSON.parse(JSON.stringify($organizations?.[currentOrganizationId] ?? emptyOrganization))}
  onSave={(organization) => {
    if ($organizations) {
      const id = currentOrganizationId || generatePushID();
      $organizations[id] = organization;
    }
  }} />
