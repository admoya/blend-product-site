<script lang="ts">
  import { appUrl } from '$lib/utils';
  import { onMount } from 'svelte';

  onMount(() => {
    gtag('event', 'upgrade_pro_success');
  });
</script>

<svelte:head>
  <title>Thank You</title>
</svelte:head>

<section class="content">
  <h1>Thank you!</h1>
  <h2>You're subscribed to Blend Pro.</h2>
  <p>For resources on how to use our Pro features, check out the <a href="/blog">blog</a>.</p>
  <div class="side-by-side">
    <a href="/account" class="btn">Back to My Account</a>
    <a href={$appUrl} target="_blank" rel="noopener noreferrer" class="btn" on:click={() => window.gtag('event', 'open_app')}>Open the App</a>
  </div>
</section>

<style>
  a:hover {
    color: white;
  }
</style>
