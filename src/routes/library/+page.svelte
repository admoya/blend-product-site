<script lang="ts">
  import marketplaceDecks from '$lib/data/marketplaceDecks';
  import ProBadge from '$lib/components/ProBadge.svelte';
</script>

<svelte:head>
  <title>Pro Decks</title>
  <meta name="description" content="Browse expertly crafted Blend decks, and import them into your Blend Pro account." />
</svelte:head>

<main>
  <section class="library-description">
    <div class="side-by-side heading">
      <h1>Deck Library</h1>
      <div class="badge"><ProBadge /></div>
    </div>
    <p>
      Pro Users have access to a library of premade decks crafted by a professional reading specialist experienced with blending drills. These boards
      are thoughtfully designed to target certain phonics skills and bring more focus to your lessons.
    </p>
    <p>Check out the boards in our library, and try them out by importing them into your own collection!</p>
  </section>

  <section class="decks">
    {#each marketplaceDecks as deck}
      <div class="deck">
        <div class="side-by-side">
          <img src={deck.image} alt="sample" />
          <section class="description">
            <div class="title">{deck.name}</div>
            <p>{deck.description}</p>
            <!-- <p><i>Created by: {deck.author}</i></p> -->
            <a href="/library/{deck.id}" class="btn">Import</a>
          </section>
        </div>
      </div>
    {/each}
  </section>
</main>

<style>
  .deck {
    width: 60%;
    border-radius: 10px;
    border: 2px solid #012a51;
    margin: 1rem 0;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
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
    width: 60%;
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
    font-size: 1.8rem;
  }

  .side-by-side {
    justify-content: center;
  }

  .side-by-side img {
    flex-grow: 1;
    width: 60%;
    flex-basis: 30rem;
    max-height: 30rem;
    object-fit: contain;
    border-radius: 10px;
  }

  .description {
    flex-grow: 1;
    width: 30%;
    justify-content: left;
    padding: 2rem;
    flex-basis: 10rem;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    color: #012a51;
  }

  .decks {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .btn {
    border-color: #012a51;
    border-width: 0.15rem;
    color: #012a51;
    margin: 0;
    font-weight: 900;
  }

  .btn:hover {
    background-color: #012a51;
    color: white;
  }
  @media (max-width: 480px) {
    .deck {
      width: 100%;
      font-size: 90%;
    }
    .library-description {
      width: 90%;
    }
  }
</style>
