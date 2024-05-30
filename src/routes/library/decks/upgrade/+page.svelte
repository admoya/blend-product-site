<script lang="ts">
  import ProBadge from '$lib/components/ProBadge.svelte';
</script>

<svelte:head>
  <title>Import Deck - Blend</title>
</svelte:head>

<div class="content">
  <div class="side-by-side heading">
    <h1>Upgrade to Blend</h1>
    <div class="badge"><ProBadge /></div>
  </div>
  <p class="subtitle">Importing from our Deck Library is available to Blend Pro users. Upgrade to Blend Pro to get access to this deck!</p>
  <div class="side-by-side">
    <a href="/account?action=upgrade" class="btn btn-purple">Upgrade</a>
    <a href="/library" class="btn">Back to Library</a>
  </div>
</div>

<style>
  .heading {
    align-items: center;
  }
</style>
