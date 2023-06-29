<script lang="ts">
  import { user, willAttemptLogin } from "$lib/firebase";
  import type { PageData } from "./$types";
  import { enhance } from '$app/forms'
    import { goto } from "$app/navigation";
  export let data: PageData;

  if (!$user && !willAttemptLogin()) 
      goto(`/login?successRedirect=${encodeURIComponent(location.pathname)}`)
</script>

<div class="content">
  <h1>Deck Share</h1>
  <form method="post" use:enhance>
    <p>{`${data.authorName ?? 'A Blend user'} shared the deck:`}</p>
    <p style="font-weight: bold;">{data.deckName}</p>
    <p>With you. Would you like to add it to your deck library?</p>
    <fieldset style="border: none; padding: 0; display: flex">
      <input type="hidden" name="uid" value={$user?.uid}/>
      <button formaction="?/decline" class="btn">No</button>
      <button formaction="?/accept" type="submit" class="btn btn-green">Yes</button>
    </fieldset>
  </form>
</div>

<svelte:head>
  <title>Deck Share</title>
</svelte:head>