<script lang="ts">
  import AuthCheck from '$lib/components/AuthCheck.svelte';
  import { createWritableStore } from '$lib/firebase';
  const organizations = createWritableStore<{ [id: string]: Database.Organization }>('/organizations');
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
    </table>
  {/if}
</div>

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
