<script lang="ts">
  import AuthCheck from "$lib/components/AuthCheck.svelte";
  import { page } from "$app/stores";
  import { createWritableStore, user } from "$lib/firebase";
  import type { PageData } from "./$types";
  interface Members {
    displayName: string,
    email: string,
    uid: string
  }

  export let data: PageData;
  const members: Members[] = JSON.parse(data.members);

  const { organizationId } = $page.params;
  const organization = createWritableStore<Database.Organization>(`/organizations/${organizationId}`);

</script>

<AuthCheck />
<div class="content">
  {#if $organization}
    <h1>{$organization.public.name}</h1>
    <h2>Members</h2>
    <table class="member-table">
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Actions</th>
      </tr>
      {#each members as {displayName, email, uid}}
        <tr>
          <td>{displayName}</td>
          <td>{email}</td>
          <td>{$organization.private?.members[uid].role}</td>
          <td>
            <span>
              <button disabled={uid === $user?.uid} class="btn btn-small btn-red" style="margin: 0">Remove</button>
              <button class="btn btn-small" style="margin: 0">{$organization.private?.members[uid].role === 'admin' ? 'Demote' : 'Promote'}</button>
            </span>
          </td>
        </tr>
      {/each}
      <tr >
        <td colspan=4 style="text-align: center"><button class="btn" style="width: 95%; margin: 10px auto;">Add</button></td>
      </tr>
    </table>
  {/if}
</div>

<style>
  .member-table {
    text-align: left;
    border-spacing: 30px 0;
  }

</style>