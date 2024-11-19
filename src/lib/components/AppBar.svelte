<script lang="ts">
  import { browser } from '$app/environment';
  import { user } from '$lib/firebase';
  import { appUrl, upgradeUrl } from '$lib/utils';
  import { onMount } from 'svelte';
  import { fly, slide } from 'svelte/transition';
  import { linear } from 'svelte/easing';
  import { partnerData } from '$lib/utils';

  var isMenuopen = false;
  $: isLoggedIn = browser && $user;
  const toggleMenu = () => {
    isMenuopen = false;
  };

  let bannerAlertsDismissed: Set<string>;
  let showBanner = false;
  const bannerText = `The price of Blend Pro is increasing on October 7. <a href="/account?action=upgrade"><u>Upgrade now</u></a> to lock in at $3 per month! <a href="https://communications.blendreading.com/campaign/43b19897-1d72-48d1-bdbf-9e180683068a/b5a40116-958e-4534-851c-e2974a48c70d" target="_blank" rel="noopener noreferrer"><u>Learn more here.</u></a>`;
  const currentBannerFlag = 'bannerAlertsDismissed';
  onMount(() => {
    bannerAlertsDismissed = new Set(JSON.parse(localStorage.getItem(currentBannerFlag) || '[]'));
    // Uncomment if you want to show a banner
    // showBanner = !bannerAlertsDismissed.has(bannerText);
  });

  const onBannerAlertClose = () => {
    bannerAlertsDismissed.add(bannerText);
    localStorage.setItem(currentBannerFlag, JSON.stringify(Array.from(bannerAlertsDismissed)));
    showBanner = false;
  };

  let disableCheckoutBtn = false;
</script>

<div>
  <nav class="app-bar">
    <a class="branding" href="/">
      <h1>BLEND</h1>
    </a>
    {#if $partnerData}
      <div class="grow-[10] max-md:mx-2">
        <div
          transition:fly={{ y: -100 }}
          class="mx-auto flex w-fit flex-row items-center gap-2 rounded rounded-t-none bg-green-400 p-2 font-['Contrail_One',sans-serif] text-base lg:text-lg">
          <p>{$partnerData.displayName} coupon applied!</p>
          <a
            href={$upgradeUrl}
            on:click={() => {
              disableCheckoutBtn = true;
            }}
            class={`btn-sm btn-blurple rounded p-1 text-white ${disableCheckoutBtn ? 'pointer-events-none ' : ''}`}>Checkout</a>
        </div>
      </div>
    {/if}
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <ul class={`nav-links ${isMenuopen ? '' : 'hide-menu'}`} on:click={toggleMenu} on:keypress={toggleMenu}>
      <li>
        <a id="app" href={$appUrl} target="_blank" rel="noopener noreferrer" on:click={() => window.gtag('event', 'open_app')}>app</a>
      </li>
      <!-- <li>
        <a id="home" href="/">home</a>
      </li> -->
      <li>
        <a id="pricing" href="/pricing">pricing</a>
      </li>
      <li>
        <a id="organization" href="/organization">organizations</a>
      </li>
      <li>
        <a id="help" href="/help">help</a>
      </li>
      <li>
        <a id="library" href="/library">library</a>
      </li>
      <li>
        <a id="blog" href="/blog">blog</a>
      </li>
      {#if !isLoggedIn}
        <li>
          <a id="login" href="/login">login</a>
        </li>
      {:else}
        <li>
          <a id="account" href="/account">account</a>
        </li>
      {/if}
    </ul>
    <button
      on:click={() => {
        isMenuopen = !isMenuopen;
      }}
      class="hamburger-button">
      {#if isMenuopen}
        <span> &#x2715; </span>
      {:else}
        <span> &#x2630; </span>
      {/if}
    </button>
  </nav>
  {#if showBanner}
    <div in:slide={{ delay: 250, duration: 400, easing: linear }} out:slide={{ delay: 0, duration: 400, easing: linear }} id="banner-alert">
      <p id="banner-alert-text">
        The price of Blend Pro is increasing on October 7. <a href="/account?action=upgrade" on:click={() => window.gtag('event', 'click_upgrade')}
          ><u>Upgrade now</u></a>
        to lock in at $3 per month!
        <a
          href="https://communications.blendreading.com/campaign/43b19897-1d72-48d1-bdbf-9e180683068a/b5a40116-958e-4534-851c-e2974a48c70d"
          target="_blank"
          rel="noopener noreferrer"><u>Learn more here.</u></a>
      </p>
      <button on:click={onBannerAlertClose} id="banner-close-button">
        <span class="material-symbols-rounded">close</span>
      </button>
    </div>
  {/if}
</div>

<style>
  #banner-alert {
    width: 100%;
    /* background-color: #006d74; */
    background: linear-gradient(52.71deg, #fffaa0 -7.68%, #f4ba9e 41.11%, #eea7fa 91.67%);
    text-align: center;
    position: relative;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }
  #banner-alert-text {
    font-family: 'Heebo';
    padding: 0.5rem 2rem 0.5rem 0.5rem;
    margin: 0;
    font-size: 1.2rem;
    font-weight: 500;
    /* color: white; */
  }
  #banner-close-button {
    position: absolute;
    top: 0;
    right: 0;
    background: none;
    border: none;
    margin: 0.7rem 0.5rem;
    height: 1.2rem;
    padding: 0;
    /* color: white; */
  }

  .app-bar {
    height: 66px;
    width: 100%;
    background-color: white;
    display: flex;
    flex-direction: row;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }

  .branding {
    color: black;
    text-decoration: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 2%;
    text-align: center;
    max-width: 75vw;
  }

  .nav-links {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: end;
    margin-right: 2%;
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 1.5rem;
    letter-spacing: 0em;
    list-style-type: none;
    gap: 1rem;
  }

  a#app {
    padding: 0.2rem 1.2rem;
    border: solid 2px #7f71d2;
    border-radius: 5px;
  }

  a#app:hover {
    background-color: #7f71d2;
    color: white;
  }

  a#help:hover {
    color: #f1b4fb;
  }

  a#pricing:hover {
    color: #84e3de;
  }

  a#organization:hover {
    color: #588dff;
  }

  a#blog:hover {
    color: #fa9a9a;
  }

  a#library:hover {
    color: #8ec9ff;
  }

  .hamburger-button {
    display: none;
    border: none;
    color: black;
    font-size: 1.6rem;
    line-height: 2rem;
  }

  @media (max-width: 640px) {
    a#app {
      border: none !important;
      padding: 0 !important;
    }
    #banner-alert-text {
      padding: 0.5rem 1.5rem 0.5rem 0.5rem;
      margin: 0;
      font-size: 1rem;
    }
    #banner-close-button {
      margin: 0.5rem 0.2rem;
    }
    .hide-menu {
      opacity: 0;
      visibility: hidden;
    }

    .hamburger-button {
      display: block;
      width: auto;
      background: none;
      margin-left: auto;
      margin-right: 1rem;
    }
    .nav-links {
      flex-direction: column;
      z-index: 100;
      background-color: white;
      margin-top: 66px;
      width: 100%;
      position: absolute;
      padding-left: 0;
      text-align: right;
      padding-top: 1rem;
      padding-bottom: 1rem;
      transition:
        opacity 600ms,
        visibility 600ms;
    }
  }
</style>
