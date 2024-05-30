<script lang="ts">
  export let section;
</script>

<div class="section-outer">
  <h2 class="title">{section.title}</h2>
  <p class="subtitle">{section.playlists.length} Playlists</p>
  <div class="section">
    {#each section.playlists as playlist}
      <div class="library-card">
        <a href="/library/playlists/{playlist.slug}">
          <img src={playlist.imagePath} alt="Playlist Preview" />
        </a>
        <h2 class="title">{playlist.name}</h2>
        <a href="/library/playlists/{playlist.slug}" class="btn btn-blurple">More Info</a>
      </div>
    {/each}
  </div>
</div>

<style>
  .title {
    font-family: 'Contrail One';
  }
  .subtitle {
    margin: 0;
  }
  .section {
    display: flex;
    overflow-x: scroll;
    overflow-y: hidden;
    width: 100%;
    scrollbar-color: #808080 rgba(255, 255, 255, 0.1);
  }
  .section-outer {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: black 2px solid;
    border-radius: 10px;
    padding: 2rem;
    margin: 1.5rem;
    width: 100%;
  }
  .library-card {
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    flex-basis: 14rem;
    height: 18rem;
    background: rgba(255, 255, 255, 0.5);
    border: 1px solid black;
    border-radius: 10px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    text-align: center;
    margin: 1rem;
  }

  .library-card img {
    width: 16rem;
    min-height: 12rem;
    object-fit: cover;
    border-radius: 10px;
  }

  @media (max-width: 480px) {
  }
</style>
