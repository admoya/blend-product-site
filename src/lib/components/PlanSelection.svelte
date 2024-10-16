<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { customLoginToken } from '$lib/firebase';
  import PricingPlan from './PricingPlan.svelte';

  const redirectParam = $page.url.searchParams.get('successRedirect');
  const selectBasic = async () => {
    if (redirectParam && (redirectParam === 'app' || redirectParam === 'previewApp')) {
      const appUrl = redirectParam === 'app' ? 'https://app.blendreading.com' : 'https://preview-app.blendreading.com';
      const url = `${appUrl}?jumpScene=${encodeURIComponent($page.url.searchParams.get('jumpScene') || 'none')}${
        $customLoginToken ? `&loginToken=${encodeURIComponent($customLoginToken)}` : ''
      }`;
      window.location.replace(url);
    } else {
      goto('/account');
    }
  };

  let billingCycle = 'yearly';

  const selectPro = () => {
    gtag('event', 'choose_pro');
    goto(`/account${$page.url.search || '?'}&action=upgrade${billingCycle === 'yearly' ? '&subscriptionType=yearly' : ''}`);
  };

  const selectOrg = () => {
    gtag('event', 'request_quote');
    goto('/organization#form');
  };
</script>

<div class="content">
  <h1 class="mt-4">Choose your plan</h1>
  <div class="my-2 flex flex-col">
    <div class="flex justify-center">
      <div class="switch mb-1 w-[26rem]">
        <button class={billingCycle === 'monthly' ? 'active' : ''} on:click={() => (billingCycle = 'monthly')}><p class="text-lg">Monthly</p></button>
        <button class={billingCycle === 'yearly' ? 'active' : ''} on:click={() => (billingCycle = 'yearly')}
          ><div class="flex items-center justify-center gap-x-3">
            <p class="text-lg">Yearly</p>
            <div class="rounded-lg bg-[#ff5c5c] px-2 py-1 text-sm text-white shadow">Save 20%</div>
          </div></button>
      </div>
    </div>
    {#if billingCycle === 'monthly'}
      <h1 class="text-2xl">Save 20% by paying yearly!</h1>
    {/if}
  </div>
  <div class="flex flex-wrap justify-center gap-x-5">
    <PricingPlan
      --background-color="#3b2e86"
      --text-color="white"
      planName="Basic"
      price="Free forever"
      features={['Virtual Blending Board', 'Preloaded Decks', 'One Custom Deck', 'Preloaded Playlists', 'One Custom Playlist']}
      onClick={selectBasic} />

    <PricingPlan
      --background-color="#006d74"
      --text-color="white"
      planName="Pro"
      subtitle="For individuals"
      price={billingCycle === 'monthly' ? '$10/month' : '$8/month ($96/year)'}
      features={[
        'All Basic Features',
        'Unlimited Decks & Playlists',
        'Word Mats for Spelling',
        'Themes',
        'Access to the Blend Library',
        'Resource Sharing',
      ]}
      note="Get 7 days free when you try Pro!"
      onClick={selectPro} />
    <PricingPlan
      --background-color="#00407c"
      --text-color="white"
      planName="Organization"
      subtitle="For groups"
      price="Contact for Pricing"
      features={[
        'Pro Access for All Members',
        'Shared Resource Library',
        'Admin Dashboard',
        'Dedicated Support & Training',
        'Early Access to New Features',
        'Discounted Group Pricing',
      ]}
      buttonText="Request a Quote"
      onClick={selectOrg} />
  </div>
  <div class="mt-3 flex flex-col">
    <p>Don't see a plan that works for you? We can help.</p>
    <p>
      Contact us at <a class="hover:text-white" href="mailto:support@blendreading.com" target="_blank">support@blendreading.com</a> for help with pricing
      plans.
    </p>
  </div>
</div>

<style>
  .switch {
    display: flex;
    border-radius: 10px;
    border: 2px solid #006d74;
    overflow: hidden;
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
  }

  .switch button {
    flex: 1;
    padding: 0.8rem 1.5rem;
    cursor: pointer;
    border: none;
    background: rgba(255, 255, 255, 0.35);
    color: #006d74;
    font-size: 16px;
    font-weight: bold;
    transition:
      background-color 0.3s,
      color 0.3s;
  }

  .switch button:hover {
    background: rgba(255, 255, 255, 0.3);
    filter: brightness(1.1);
  }

  .switch button.active {
    background-color: #006d74;
    color: white;
  }
  @media (max-width: 480px) {
    .switch {
      width: 90%;
      margin: 0;
    }
  }
</style>
