<script lang="ts">
  import marketplaceDecks from '$lib/data/library/marketplaceDecks';
  import ProBadge from '$lib/components/ProBadge.svelte';
  import consonantsAndShortVowels from '$lib/data/library/playlists/consonantsAndShortVowels';
  import consonantDigraphs from '$lib/data/library/playlists/consonantDigraphs';
  import silentE from '$lib/data/library/playlists/silentE';
  import suffixes from '$lib/data/library/playlists/suffixes';
  import bannerImg from '$lib/assets/library-banner.png';
  import LibraryCarousel from '$lib/components/LibraryCarousel.svelte';
  import rControlledVowels from '$lib/data/library/playlists/rControlledVowels';
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
        <p class="my-4">
          Our reading specialist, <a href="/about">Summer</a>, has worked tirelessly to create this collection of grab-and-go resources that you can
          use in your blending drills.
        </p>
        <p class="my-4">
          We have both decks and playlists available, perfect for both new phonics teachers and seasoned veterans who might need fresh ideas for new
          lessons. Whichever you are, we hope you enjoy them!
        </p>
      </div>
      <div class="side-by-side">
        <a href="#deck-library" class="btn btn-blurple">Deck Library</a>
        <a href="#playlist-library" class="btn btn-purple">Playlist Library</a>
      </div>
    </div>
  </section>

  <section class="library-content" style="background-color: #8ec9ff;" id="deck-library">
    <h1>Deck Library</h1>
    <p class="library-description my-4">
      These boards are thoughtfully designed by our reading specialist to target certain phonics skills and bring more focus to your lessons. Try them
      out by importing them into your own collection!
    </p>
    <LibraryCarousel section={marketplaceDecks} />
  </section>

  <section class="library-content" style="background-color: #b4b3ff;" id="playlist-library">
    <h1>Playlist Library</h1>
    <p class="library-description my-4">
      The playlists in the Blend Library are grouped logically by phonics concept, and each group building on what was previously learned. Jump right
      into your lessons with a scope and sequence that makes sense.
    </p>
    <LibraryCarousel section={consonantsAndShortVowels} scrollBy={3} />
    <LibraryCarousel section={consonantDigraphs} scrollBy={2} />
    <LibraryCarousel section={silentE} />
    <LibraryCarousel section={suffixes} />
    <LibraryCarousel section={rControlledVowels} />
  </section>
</main>

<style>
  .banner {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 80%;
    margin: 2rem;
    padding: 0 1.5rem;
    flex-wrap: wrap;
    background-color: #f5f5ef;
    border-radius: 10px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
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
  .library-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1.2rem;
    padding: 2rem;
    width: 95%;
    background-color: white;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
  }
  .heading {
    align-items: center;
  }
  main {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .library-description {
    text-align: center;
    width: 80%;
    padding: 0 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h1 {
    margin: 0 0.5rem;
  }

  .side-by-side {
    justify-content: center;
  }

  @media (max-width: 480px) {
    .banner {
      width: 95%;
    }
    .blurb {
      width: 100%;
      padding: 0;
    }
    .library-description {
      width: 100%;
      padding: 0;
      text-align: justify;
    }

    main {
      padding: 0;
    }
  }
</style>
