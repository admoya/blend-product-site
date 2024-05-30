<script lang="ts">
  import marketplaceDecks from '$lib/data/library/marketplaceDecks';
  import ProBadge from '$lib/components/ProBadge.svelte';
  import LibrarySection from '$lib/components/LibrarySection.svelte';
  import consonantsAndShortVowels from '$lib/data/library/playlists/consonantsAndShortVowels';
  import consonantDigraphs from '$lib/data/library/playlists/consonantDigraphs';
  import bannerImg from '$lib/assets/library-banner.png';
</script>

<svelte:head>
  <title>Blend Library</title>
  <meta name="description" content="Browse expertly crafted Blend decks, and import them into your Blend Pro account." />
</svelte:head>

<main>
  <section class="banner">
    <img src={bannerImg} alt="Blend Library Graphic" />
    <div class="blurb">
      <div>
        <div class="side-by-side heading">
          <h1>The Blend Library</h1>
          <div class="badge"><ProBadge /></div>
        </div>
        <p>
          Our reading specialist, <a href="/about">Summer</a>, has worked tirelessly to create this collection of grab-and-go resources that you can
          use in your blending drills.
        </p>
        <p>
          We have both decks and playlists available, perfect for both new phonics teachers and seasoned veterans who might need fresh ideas for new
          lessons. Whichever you are, we hope you enjoy them!
        </p>
      </div>
      <div class="side-by-side">
        <a href="#deck-library" class="btn btn-purple">Deck Library</a>
        <a href="#playlist-library" class="btn btn-blurple">Playlist Library</a>
      </div>
    </div>
  </section>

  <section class="decks" id="deck-library">
    <h1>Deck Library</h1>
    <p class="library-description">
      Pro Users have access to a library of premade decks crafted by a professional reading specialist experienced with blending drills. These boards
      are thoughtfully designed to target certain phonics skills and bring more focus to your lessons. Try them out by importing them into your own
      collection!
    </p>
    <div class="cards">
      {#each marketplaceDecks as deck}
        <div class="library-card">
          <a href="/library/decks/{deck.id}">
            <img src={deck.image} alt="Deck Preview" />
          </a>
          <div class="title">{deck.name}</div>
          <a href="/library/decks/{deck.id}" class="btn btn-purple">More Info</a>
        </div>
      {/each}
    </div>
  </section>

  <section class="playlist-library" id="playlist-library">
    <h1>Playlist Library</h1>
    <p class="library-description">
      The playlists in the Blend Library are grouped logically by phonics concept, and each group builds upon the previously learned concepts. Our
      reading specialist created these playlists so you can jump right into your lessons with a scope and sequence that makes sense. These playlists
      are available in the app for all pro users! Try them out today!
    </p>
    <LibrarySection section={consonantsAndShortVowels} />
    <LibrarySection section={consonantDigraphs} />
  </section>
</main>

<style>
  .banner {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 80%;
    margin: 2rem;
    flex-wrap: wrap;
  }
  .banner img {
    width: 40%;
    flex-basis: 36rem;
    border-radius: 10px;
    object-fit: contain;
  }
  .blurb {
    flex-basis: 32rem;
    padding: 1rem;
    text-align: justify;
  }
  .playlist-library {
    margin: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    text-align: center;
  }
  .decks {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2rem;
  }
  .heading {
    align-items: center;
  }
  main {
    padding: 2rem;
    background: #8ec9ff;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .library-description {
    text-align: center;
    width: 70%;
    padding: 0 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h1 {
    margin: 0 0.5rem;
  }

  .title {
    font-family: 'Contrail One';
    font-size: 1.5rem;
  }

  .side-by-side {
    justify-content: center;
  }

  .library-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    flex-basis: 14rem;
    height: 20rem;
    background: rgba(255, 255, 255, 0.5);
    border: 1px solid #012a51;
    border-radius: 10px;
    color: #012a51;
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

  .cards {
    width: 75%;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
  }
  .library-card .btn {
    margin: 0 1rem;
  }

  @media (max-width: 480px) {
    .banner {
      width: 90%;
    }
    .blurb {
      width: 100%;
      padding: 0;
    }
    .library-description {
      width: 100%;
      text-align: justify;
    }
    .library-card {
      width: 100%;
      margin: 1rem 0;
    }
    .decks {
      width: 100%;
    }
  }
</style>
