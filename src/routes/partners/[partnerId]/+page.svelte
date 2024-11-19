<script lang="ts">
  import { page } from '$app/stores';
  import type { PageData } from './$types.js';
  import { partnerData } from '$lib/utils.js';
  let { displayName, logoUrl, blendMessage, partnerMessage, socialUrl } = $page.data as PageData;

  const addPartnerCode = () => {
    $partnerData = { id: $page.params.partnerId, displayName };
  };
</script>

<div class="flex w-full md:min-h-[calc(100vh-66px)] md:flex-row">
  <!-- Left Panel (hidden on mobile) -->
  <div class="hidden w-1/2 flex-col flex-wrap items-center justify-center bg-[#a9b9ff] md:flex">
    <a href={socialUrl} target="_blank" rel="noopener noreferrer"
      ><img src={logoUrl} alt={`${displayName} logo`} class="mx-auto w-1/2 rounded-2xl border-[2rem] border-white object-contain" /></a>
    {#if partnerMessage}
      <p class="mt-4 w-1/2 text-xl">{partnerMessage}</p>
    {/if}
  </div>
  <!-- Right Panel -->
  <div class="flex w-full flex-col items-center bg-[#f5f5ef] px-4 py-8 text-center md:w-1/2 md:justify-center md:p-[4rem]">
    <!-- Image and message for mobile -->
    <div class="block w-full rounded-xl bg-[#a9b9ff] p-4 md:hidden">
      <img src={logoUrl} alt={`${displayName} logo`} class="mx-auto h-24 w-24 rounded-full" />
      <h1 class="mt-2 text-center text-2xl">
        <a href={socialUrl} target="_blank" rel="noopener noreferrer">{displayName}</a> + BLEND
      </h1>
      {#if partnerMessage}
        <p class="mx-auto mt-4 text-lg">{partnerMessage}</p>
      {/if}
    </div>
    <!-- Main Content -->
    <!-- Title hidden on mobile -->
    <h1 class="mb-5 hidden text-2xl md:block md:text-5xl">
      <a href={socialUrl} target="_blank" rel="noopener noreferrer">{displayName}</a> + BLEND
    </h1>
    <p class="mt-2 text-lg md:text-2xl">{blendMessage}</p>
    <div class="mt-5 flex flex-col justify-center">
      <p class="text-sm md:text-lg">Click below to activate your special offer!</p>
      <button class="btn btn-green transition-all" disabled={!!$partnerData} on:click={addPartnerCode}
        >{$partnerData ? 'Activated ✅' : 'Activate'}</button>
    </div>
    <div class="flex items-center justify-around gap-5">
      <a href="/"
        ><div class="flex items-center justify-center gap-1">Learn More <span class="material-symbols-rounded"> arrow_right_alt </span></div></a>
      <a
        href={`/account?action=upgrade&partnerId=${$page.params.partnerId}`}
        class="rounded-lg border-2 border-[#96aaff] px-3 py-1 hover:bg-[#96aaff] hover:text-white">Checkout</a>
    </div>
  </div>
</div>

<style>
  .btn-green:disabled {
    color: white;
    border-color: white;
  }
</style>
