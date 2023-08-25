<script lang="ts">
  import AuthCheck from '$lib/components/AuthCheck.svelte';
  import { page } from '$app/stores';
  import { createWritableStore, user } from '$lib/firebase';
  import type { PageData } from './$types';
  import InviteModal from './InviteModal.svelte';
  import { invalidateAll } from '$app/navigation';
  export let data: PageData;
  let members: Database.Organization.MemberDetails[];
  let invites: Database.Invite.InviteDetails[];
  $: members = JSON.parse(data.memberDetails);
  $: invites = JSON.parse(data.inviteDetails);
  const { organizationId } = $page.params;
  const organization = createWritableStore<Database.Organization>(`/organizations/${organizationId}`);

  let showMemberAddModal = false;

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
              <button disabled={uid === $user?.uid} class="btn btn-small btn-red" style="margin: 0" on:click={() => removeMember(uid)}>Remove</button>
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
</style>
