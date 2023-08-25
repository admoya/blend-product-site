<script lang="ts">
  import { enhance } from "$app/forms";
  import { user } from "$lib/firebase";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<svelte:head>
  <title>Organization Invite</title>
</svelte:head>

<div class="content">
  <h1>Join {`${data.organizationName}` ?? 'unknown organization'}</h1>
  <form method="post" use:enhance>
    <p>You have been invited to join the organization for</p> 
    <p style="font-weight: bold;">{`${data.organizationName}` ?? 'unknown organization'}</p>
    <p>Would you like to join?</p>
    <div class="side-by-side">
      <fieldset>
        <input type="hidden" name="uid" value={$user?.uid} />
        <button formaction="?/decline" class="btn btn-red">Decline</button>
        <button formaction="?/accept" type="submit" class="btn btn-green">Accept</button>
      </fieldset>
    </div>
  </form>
</div>

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
    flex-wrap:wrap-reverse;
    justify-content:center;
  }
</style>