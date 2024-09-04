<script lang="ts">
  import '../app.css';
  import AppBar from '$lib/components/AppBar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { browser } from '$app/environment';
  import { PUBLIC_DEPLOY_CONTEXT } from '$env/static/public';
  import { navigating } from '$app/stores';

  // Google Analytics
  if (browser) {
    window['ga-disable-G-LLGRDWVVEV'] = PUBLIC_DEPLOY_CONTEXT !== 'production';
    // @ts-ignore
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.dataLayer = window.dataLayer || [];
    gtag('js', new Date());
    gtag('config', 'G-LLGRDWVVEV');
  }
</script>

<svelte:head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-LLGRDWVVEV"></script>
</svelte:head>

<AppBar />
<main>
  {#if $navigating}
    <div class="loading-indicator [&>*]:box-content" role="status" aria-label="loading">
      <div class="card" aria-hidden><p>L</p></div>
      <div class="card yellow-bg delay-1" aria-hidden><p>OA</p></div>
      <div class="card delay-2" aria-hidden><p>D</p></div>
      <div class="card delay-3 yellow-bg" aria-hidden><p>ING</p></div>
    </div>
  {:else}
    <slot />
  {/if}
</main>
<Footer />

<style>
  .loading-indicator {
    font-family: 'Contrail One', sans-serif;
    font-size: 3rem;
    margin: 10rem auto;
    text-align: center;
    display: flex;
    flex-direction: row;
    gap: 0.2rem;
    width: fit-content;
  }
  .card {
    width: 4rem;
    height: 5rem;
    background-color: white;
    color: black;
    padding: 0.5rem;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 2px solid black;
    animation: bounce 2s infinite;
  }

  .yellow-bg {
    background-color: #fdf1cd;
  }

  .delay-1 {
    animation-delay: 0.1s;
  }
  .delay-2 {
    animation-delay: 0.2s;
  }
  .delay-3 {
    animation-delay: 0.3s;
  }

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-30px);
    }
    60% {
      transform: translateY(-15px);
    }
  }
  .card > p {
    padding-top: 5px;
  }
</style>
