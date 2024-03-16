<script lang="ts">
  import { user } from '$lib/firebase';
  import type { PageData } from './$types';
  import { enhance } from '$app/forms';
  import AuthCheck from '$lib/components/AuthCheck.svelte';
  export let data: PageData;
</script>

<AuthCheck />
<div class="content">
  <h1>Deck Share</h1>
  <form method="post" use:enhance>
    <p>{`${data.authorName ?? 'A Blend user'} shared a playlist with you:`}</p>
    <p style="font-weight: bold;">{data.playlistName}</p>
    <p>Would you like to add it to your playlist library?</p>
    <fieldset>
      <input type="hidden" name="uid" value={$user?.uid} />
      <button formaction="?/decline" class="btn">No</button>
      <button formaction="?/accept" type="submit" class="btn btn-green">Yes</button>
    </fieldset>
  </form>
</div>

<svelte:head>
  <title>Playlist Share</title>
</svelte:head>

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
