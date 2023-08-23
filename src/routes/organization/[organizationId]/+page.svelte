<script lang="ts">
  import AuthCheck from '$lib/components/AuthCheck.svelte';
  import { page } from '$app/stores';
  import { createWritableStore, user } from '$lib/firebase';
  import type { PageData } from './$types';
  import OrganizationMemberAdd from './OrganizationMemberAdd.svelte';
  interface Members {
    displayName: string;
    email: string;
    uid: string;
  }

  export let data: PageData;
  const members: Members[] = JSON.parse(data.members);
  const { organizationId } = $page.params;
  const organization = createWritableStore<Database.Organization>(`/organizations/${organizationId}`);

  let showMemberAddModal = false;
</script>

<AuthCheck />
<div class="content" style="overflow-x: auto;">
  {#if $organization}
    <h1>{$organization.public.name}</h1>
    <h2>Members</h2>
    <table class="member-table">
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
      {#each members as { displayName, email, uid }}
        <tr class="bottom-border">
          <td>{displayName}</td>
          <td>{email}</td>
          <td>{$organization.private?.members[uid].role}</td>
          <td style="padding-right: 0">
            <span>
              <button disabled={uid === $user?.uid} class="btn btn-small btn-red" style="margin: 0">Remove</button>
              <button class="btn btn-small" style="margin: 0">{$organization.private?.members[uid].role === 'admin' ? 'Demote' : 'Promote'}</button>
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
  {/if}
  <OrganizationMemberAdd bind:showModal={showMemberAddModal} organization={$organization} orgId={$page.params.organizationId} />
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
</style>
