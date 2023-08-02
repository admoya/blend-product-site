<script lang="ts">
  import { user, willAttemptLogin } from "$lib/firebase";
  import { enhance } from "$app/forms";
  import type { PageData } from "./$types";
  import { onMount } from "svelte";
  import ProBadgeWrapper from "$lib/components/ProBadgeWrapper.svelte";
  import { goto } from "$app/navigation";
  export let data: PageData;

  $: {
    if (!$user && !willAttemptLogin())
      goto(`/login?successRedirect=${encodeURIComponent(location.pathname)}`);
  }

  let isPro = false;
  let isLoading = true;

  onMount(async () => {
    const idToken = await $user?.getIdToken();
    const userData = await fetch("/api/user", {
      headers: { Authorization: `Bearer ${idToken}` },
    });
    isPro = (await userData.json()).isSubscribedToBlendPro;
    isLoading = false;
  });
</script>

<svelte:head>
  <title>Import Deck</title>
</svelte:head>

<main>
  <div class="content">
    {#if isLoading}
      <h2 class="loading-label">Loading...</h2>
    {:else}
      <div class="deck">
        <div class="info">
          <div class="title">{data.deckMetadata.name}</div>
          <!-- <p style="margin-top: 0;">Created by: {data.deckMetadata.author}</p> -->
          <p>{data.deckMetadata.description}</p>
        </div>
        <img src={data.deckMetadata.image} alt="deck letters" />
        {#if isPro}
        <form method="POST" use:enhance>
          <fieldset>
            <input type="hidden" name="uid" value={$user?.uid} />
            <button formaction="?/accept" type="submit" class="btn btn-green"
              >Import</button
            >
          </fieldset>
        </form>
      {:else}
        <ProBadgeWrapper>
          <a href="/" class="btn disabled">Import</a>
        </ProBadgeWrapper>
        <p class="subtitle">
          Importing from our Deck Library is available to Blend Pro users. You
          can upgrade to Blend Pro or sign up for a free trial on the <a href="/account"
            >Account Management</a
          > page.
        </p>
      {/if}
      </div>
      <a href="/library">Back to Library</a>
    {/if}
  </div>
</main>

<style>
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
    background: rgba(255, 255, 255, 0.15);
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
  .subtitle {
    margin: 0;
    width: 80%;
    color: white;
  }
  @media (max-width: 480px) {
    .content {
      width: 90%;
      font-size: 90%;
    }
  }
</style>
