<script lang="ts">
  import { page } from '$app/stores';
  import { user } from '$lib/firebase';
  import type { PageData } from '../$types';
  import type { Writable } from 'svelte/store';
  import InviteModal from './InviteModal.svelte';
  export let data: PageData;

  export let organization: Writable<Database.Organization | null>;
  const { organizationId } = $page.params;
  $: members = data.memberDetails;
  $: invites = data.inviteDetails;
  $: inviteRequests = data.inviteRequestDetails;

  let organizationOrTeamLabel = $organization?.locked.isLicensed ? 'organization' : 'team';

  const inviteLink = `${$page.url.protocol}//${$page.url.host}/organization/join/${organizationId}`;
  let inviteRequestsProcessing: string[] = [];
  let showMemberAddModal = false;

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
    // Don't show the prompt for teams, since they have a high seat limit (256)
    if ($organization?.locked.isLicensed && !confirm('Are you sure you want to approve this invite request? This will take up an available seat.'))
      return;
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

<div class="grid grid-flow-row grid-cols-6 gap-4">
  {#if $organization?.locked.isLicensed}
    <div class="card col-span-2">
      <h2>License End</h2>
      {$organization.locked.termEnd ? new Date($organization.locked.termEnd).toLocaleDateString() : 'N/A'}
      <p style="font-size: medium;">
        To renew or modify your license duration, please email <a href="mailto:support@blendreading.com">support@blendreading.com</a>
      </p>
    </div>
    <div class="card col-span-2">
      <h2>Seats Used</h2>
      {Object.keys($organization.private?.members ?? {}).length}/{$organization.locked.seats}
      <p style="font-size: medium;">
        To modify your seat limit, please email <a href="mailto:support@blendreading.com">support@blendreading.com</a>
      </p>
    </div>
  {/if}
  <div class={`card col-span-2 ${!$organization?.locked.isLicensed ? 'col-start-3' : ''} flex-col`}>
    <h2>Invite Link</h2>
    <div class="my-2 flex">
      <input class="flex-grow rounded-lg border-2 border-white px-2" value={inviteLink} readonly />
      <button
        class="btn btn-small btn-blurple"
        on:click={() => {
          navigator.clipboard.writeText(`https://blendreading.com/organization/join/${organizationId}`);
        }}>Copy</button>
    </div>
    <p style="font-size: medium;">Send this link to users who want to join your {organizationOrTeamLabel}.</p>
  </div>
  <div class="col-span-6 flex gap-4">
    <div class="card flex-1 p-4">
      <h2>Members</h2>
      {#if !$organization?.locked.isLicensed}
        <p style="font-size: medium;">Please note that each member must be a Blend Pro subscriber to have access to the team resources.</p>
      {/if}
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
    </div>
    <div class="card flex-1 p-4">
      <h2>Invite Requests</h2>
      <p style="font-size: medium;">Requests that Blend users have made to join your {organizationOrTeamLabel} will appear here.</p>
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
    </div>
  </div>
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
</style>
