<script lang="ts">
  import type { PageData } from './$types';
  import blendLogo from '$lib/assets/blend_logo.png';
  import { PUBLIC_APP_URL } from '$env/static/public';
  import { appUrl } from '$lib/utils';

  export let data: PageData;
</script>

<svelte:head>
  <title>Playlist Info - Blend</title>
</svelte:head>

<main>
  <div class="content">
    <div class="deck">
      <div class="back"><a href="/library">Back to Library</a></div>
      <div class="info">
        <h1>{data.playlist.name}</h1>
      </div>
      <img src={data.playlist.image?.img.src ?? blendLogo} alt="Playlist Preview" />
      <a
        href={`${$appUrl.includes('?') ? `${$appUrl}&` : `${$appUrl}?`}jumpScene=res%3a%2f%2fScenes%2fHome%2fPlaylist%2fPlaylistHome.tscn`}
        class="btn btn-purple">Open in Blend</a>
      <p>All playlists in the Blend Library are available right in the app!</p>
    </div>
  </div>
</main>

<style>
  .back {
    display: flex;
    justify-content: flex-start;
    width: 100%;
  }
  .back a:hover {
    color: #588dff;
  }
  p {
    margin-top: 0;
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
  @media (max-width: 480px) {
    .content {
      width: 90%;
      font-size: 90%;
    }
  }
</style>
