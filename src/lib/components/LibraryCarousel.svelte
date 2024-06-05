<script lang="ts">
  import { images } from '$lib/utils';

  export let section: BlendLibrary.Section;
  export let scrollBy = 1;
  export let customOffset = 0;

  const paginationFactor = 320;
  const totalPaginationPixels = scrollBy * paginationFactor;
  const initiallyVisibleItems = 4;

  $: offset = customOffset;
  $: atStart = offset === 0;
  $: atEnd = offset <= paginationFactor * (section.items.length - scrollBy) * -1;

  const move = (direction: number) => {
    if (direction > 0 && !atEnd) {
      offset -= totalPaginationPixels;
    } else if (direction < 0 && !atStart) {
      offset += totalPaginationPixels;
    }
  };

  const scrollToEnd = (direction: number) => {
    if (direction > 0 && !atEnd) {
      offset = paginationFactor * (section.items.length - scrollBy) * -1;
    } else if (direction < 0 && !atStart) {
      offset = 0;
    }
  };
</script>

<div class="section-outer">
  <h2 class="title">{section.title}</h2>
  <p class="subtitle">{section.items.length} Items</p>
  <div class="section">
    <div class="items" style="transform: translateX({offset}px);">
      {#each section.items as item, i}
        <div class="item">
          <a href="/library/{item.type}s/{item.id}?offset={offset}">
            <enhanced:img
              fetchpriority={i <= initiallyVisibleItems ? 'high' : 'low'}
              class="item-img"
              src={images[item.imagePath]}
              alt="Item Preview" />
          </a>
          <h2 class="title title-small">{item.name}</h2>
          <a href="/library/{item.type}s/{item.id}?offset={offset}" class="btn btn-outlined">More Info</a>
        </div>
      {/each}
    </div>
  </div>
  <div class="controls">
    <button class="btn btn-small" disabled={atStart} on:click={() => scrollToEnd(-1)}
      ><span class="material-symbols-rounded"> keyboard_double_arrow_left </span></button>
    <button class="btn btn-small" disabled={atStart} on:click={() => move(-1)}
      ><span class="material-symbols-rounded"> keyboard_arrow_left </span></button>
    <button class="btn btn-small" disabled={atEnd} on:click={() => move(1)}
      ><span class="material-symbols-rounded"> keyboard_arrow_right </span></button>
    <button class="btn btn-small" disabled={atEnd} on:click={() => scrollToEnd(1)}
      ><span class="material-symbols-rounded"> keyboard_double_arrow_right </span></button>
  </div>
  <div class="swipe">
    <p>Swipe to browse!</p>
  </div>
</div>

<style>
  .section {
    width: 100%;
    overflow: hidden;
  }

  .section-outer {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: black 1.5px solid;
    border-radius: 10px;
    padding: 2rem;
    margin: 1rem;
    width: 90%;
  }

  .items {
    display: flex;
    transition: transform 0.4s ease-in-out;
    transform: translateX(0px);
  }

  .item {
    text-align: center;
    display: flex;
    flex-direction: column;
    min-width: 16rem;
    height: 18rem;
    margin: 1rem;
    border-radius: 0.7rem;
    color: black;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    user-select: none;
    overflow: hidden;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.5);
    border: 1px solid black;
    border-radius: 10px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }

  .item-img {
    width: 16rem;
    height: 12rem;
    object-fit: cover;
    border-radius: 10px;
  }

  .title {
    font-family: 'Contrail One';
  }
  .title-small {
    font-size: 1.2rem;
  }
  .subtitle {
    margin: 0;
  }

  .controls {
    display: flex;
    justify-content: center;
    margin: 1rem;
  }

  .swipe {
    display: none;
  }

  @media (max-width: 480px) {
    .item {
      margin: 0.5rem;
      padding: 0.5rem;
    }
    .section {
      overflow: scroll;
      scrollbar-width: none;
    }
    .controls {
      display: none;
    }
    .swipe {
      display: block;
    }
  }
</style>
