<script lang="ts">
  import { enhance } from '$app/forms';
  import ProBadgeWrapper from '$lib/components/ProBadgeWrapper.svelte';
  import { user } from '$lib/firebase';
  import { upgradeUrl } from '$lib/utils';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<svelte:head>
  <title>Organization Invite</title>
</svelte:head>

<div class="content">
  <h1>Join {data.organizationName}</h1>
  <form method="post" use:enhance>
    <p>You have been invited to join</p>
    <p style="font-weight: bold;">{data.organizationName}</p>
    <p>Would you like to join?</p>
    <div class="side-by-side">
      <fieldset>
        <input type="hidden" name="uid" value={$user?.uid} />
        <button formaction="?/decline" class="btn btn-red">Decline</button>
        {#if data.isPro || data.isOrganizationLicensed}
          <button formaction="?/accept" type="submit" class="btn btn-green">Accept</button>
        {:else}
          <ProBadgeWrapper>
            <button formaction="?/accept" type="submit" class="btn" disabled>Accept</button>
          </ProBadgeWrapper>
        {/if}
      </fieldset>
    </div>
    {#if !data.isPro && !data.isOrganizationLicensed}
      <p style="font-weight: bold;">You must be a Blend Pro subscriber to join this Team.</p>
      <a href={$upgradeUrl} class="btn btn-purple">Upgrade Now</a>
    {/if}
  </form>
</div>

<style>
  button {
    font-size: large;
    font-weight: bold;
    margin-top: 0;
  }
  fieldset {
    margin-top: 1.5rem;
    border: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap-reverse;
    justify-content: center;
  }
</style>
