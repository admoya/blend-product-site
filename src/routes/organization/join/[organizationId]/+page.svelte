<script lang="ts">
  import { enhance } from '$app/forms';
  import AuthCheck from '$lib/components/AuthCheck.svelte';
  import { user } from '$lib/firebase';
  import { appUrl } from '$lib/utils';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<svelte:head>
  <title>Blend - Join {data.organizationName} Organization</title>
</svelte:head>

<AuthCheck />
<div class="content">
  <h1>Join {`${data.organizationName}`}</h1>
  {#if data.alreadyRequested}
    <p>You have requested access to this organization. Please wait for the organization's managers to approve your request.</p>
  {:else if data.alreadyMember}
    <p>You are already a member of the {data.organizationName} organization.</p>
    <p>You can view the organization's shared resources, like decks and playlists, in <a href={$appUrl}>the app!</a></p>
  {:else}
    <form method="post" use:enhance>
      <p>By joining this organization, you will recieve access to all its shared resources and receive a complimentary Blend Pro subscription.</p>
      <p>When you request access, the organization's managers will be notified. They will decide whether or not to approve your request.</p>
      <label>
        Add a message to your request (optional):
        <textarea name="message" rows="2">{data.message}</textarea>
      </label>
      <input type="hidden" name="uid" value={$user?.uid} />
      <button type="submit" class="btn btn-green">Request Access</button>
    </form>
  {/if}
</div>

<style>
  button {
    font-size: large;
    font-weight: bold;
    margin: 1rem auto;
  }
  form {
    max-width: 60rem;
  }

  label {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    text-wrap: wrap;
    align-items: center;
    font-weight: 600;
  }

  textarea {
    /* display: block; */
    background: white;
    padding: 0.8rem;
    margin: 0.5rem 0;
    border-radius: 8px;
    border: solid 1px #808080;
    font-family: 'Heebo';
    font-size: 1.2rem;
    resize: vertical;
    width: 30rem;
    box-sizing: border-box;
  }
</style>
