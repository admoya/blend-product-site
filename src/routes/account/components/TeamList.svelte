<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import ProBadge from '$lib/components/ProBadge.svelte';
  import { user } from '$lib/firebase';
  import type { PageData } from '../$types';
  import TeamCreationModal from './TeamCreationModal.svelte';
  export let data: PageData;

  const leaveTeam = async (teamId: string) => {
    if (!confirm('Are you sure you want to leave this team?')) return;
    const body = new FormData();
    body.append('orgId', teamId);
    body.append('uid', `${$user?.uid}`);
    await fetch('?/leaveOrganization', {
      method: 'POST',
      body,
    });
    invalidateAll();
  };

  let showTeamCreationModal = false;
</script>

<div class="detail">
  <span class="mb-2 inline-flex items-end gap-1">
    <h3 class="text-2xl font-bold">Teams</h3>
    <div class="ml-auto max-w-0">
      <ProBadge />
    </div>
  </span>
  {#each data.unlicensedOrganizations as { id, name, role } ({ id })}
    <li class="team-item">
      {name}
      <span>
        <button class="btn btn-small btn-red" style="margin-right: 0;" on:click={() => leaveTeam(id)}>Leave</button>
        {#if role === 'admin'}
          <a href={`/organization/${id}`} class="btn btn-small" style="margin-left: 0; margin-right: 0;">Manage</a>
        {/if}
      </span>
    </li>
  {/each}
  {#if data.unlicensedOrganizations.length === 0}
    <p class="">You are not a member of any teams.</p>
    <p class="text-[1rem]">Teams allow you to share resources with other Blend users.</p>
  {/if}
  {#if data.isSubscribedToBlendPro}
    <button
      class="btn btn-small !mt-2 !bg-green-600 !p-2"
      on:click={() => {
        showTeamCreationModal = true;
      }}>Create a New Team</button>
  {:else}
    <p class="">To create a team, upgrade to Blend Pro!</p>
  {/if}
</div>
<TeamCreationModal bind:show={showTeamCreationModal} />

<style>
  .team-item {
    padding: 10px;
    border-bottom: solid 0.5px rgba(255, 255, 255, 0.5);
    border-top: solid 0.5px rgba(255, 255, 255, 0.5);
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>
