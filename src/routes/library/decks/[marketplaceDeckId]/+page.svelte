<script lang="ts">
  import { user } from '$lib/firebase';
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';
  import { onMount } from 'svelte';
  export let data: PageData;
  import blendLogo from '$lib/assets/blend_logo.png';

  let isPro = false;
  let isLoading = false;

  onMount(async () => {
    const idToken = await $user?.getIdToken();
    const userData = await fetch('/api/user', {
      headers: { Authorization: `Bearer ${idToken}` },
    });
    isPro = (await userData.json()).isSubscribedToBlendPro;
    isLoading = false;
  });
</script>

<svelte:head>
  <title>Import Deck - Blend</title>
</svelte:head>

<main>
  <div class="content">
    {#if isLoading}
      <h2 class="loading-label">Loading...</h2>
    {:else}
      <div class="deck">
        <div class="back"><a href="/library">Back to Library</a></div>
        <div class="info">
          <div class="title">{data.deckMetadata.name}</div>
          <p>{data.deckMetadata.description}</p>
        </div>
        <img src={data.deckMetadata.image?.img.src ?? blendLogo} alt="deck letters" />
        <form method="POST" use:enhance>
          <fieldset>
            <input type="hidden" name="uid" value={$user?.uid} />
            <button formaction="?/accept" type="submit" class="btn btn-green">Import</button>
          </fieldset>
        </form>
      </div>
    {/if}
  </div>
</main>

<style>
  .back {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    margin-bottom: 1rem;
  }
  .back a:hover {
    color: #588dff;
  }
  .loading-label {
    font-family: 'Contrail One';
    margin-top: 2rem;
  }
  p {
    margin-top: 0;
  }
  .title {
    font-family: 'Contrail One';
    font-size: 1.8rem;
  }
  .deck {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    width: 100%;
    margin: 2rem;
    padding: 1rem;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.7);
  }
  a:hover {
    color: white;
  }

  img {
    width: 100%;
    max-height: 35rem;
    border-radius: 10px;
    object-fit: contain;
  }
  .content {
    width: 60%;
  }
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
  @media (max-width: 480px) {
    .content {
      width: 90%;
      font-size: 90%;
    }
  }
</style>
