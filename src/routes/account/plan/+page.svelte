<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { customLoginToken } from '$lib/firebase';

  const redirectParam = $page.url.searchParams.get('successRedirect');
  const selectBasic = async () => {
    if (redirectParam && redirectParam === ('app' || 'previewApp')) {
      const appUrl = redirectParam === 'app' ? 'https://app.blendreading.com' : 'https://preview-app.blendreading.com';
      const url = `${appUrl}?jumpScene=${encodeURIComponent($page.url.searchParams.get('jumpScene') || 'none')}${
        $customLoginToken ? `&loginToken=${encodeURIComponent($customLoginToken)}` : ''
      }`;
      window.location.replace(url);
    } else {
      goto('/account');
    }
  };

  const selectPro = () => {
    gtag('event', 'choose_pro');
    goto(`/account${$page.url.search || '?'}&action=upgrade`);
  };
</script>

<svelte:head>Choose Your Plan</svelte:head>

<div class="content">
  <h1>Choose your plan</h1>
  <div class="side-by-side">
    <div class="plan">
      <div class="header basic">
        <h2>Basic</h2>
        <p>Free</p>
      </div>
      <div class="features">
        <p>Every user gets these features out of the box:</p>
        <ul>
          <li>Virtual Blending Board</li>
          <li>Two Preloaded Decks</li>
          <li>One Custom Deck</li>
          <li>Word History</li>
        </ul>
        <p><br /></p>
        <button class="btn basic" on:click={selectBasic}><h3>Choose Basic</h3></button>
      </div>
    </div>
    <div class="plan">
      <div class="header pro">
        <h2>Blend Pro</h2>
        <p>$3 / month</p>
      </div>
      <div class="features">
        <p>With Pro, you get all of the basic features, plus:</p>
        <ul>
          <li>Unlimited Custom Decks</li>
          <li>Playlist Creation</li>
          <li>Access to the Deck Library</li>
          <li>Deck Sharing</li>
        </ul>
        <p>Get 7 days free when you try Pro!</p>
        <button class="btn pro" on:click={selectPro}><h3>Choose Pro</h3></button>
      </div>
    </div>
  </div>
</div>

<style>
  .features {
    padding: 1rem;
    border-radius: 0 0 10px 10px;
    display: flex;
    flex-direction: column;
  }
  .side-by-side {
    width: 70%;
  }
  .plan {
    margin: 1rem;
    width: 22rem;
    border-radius: 10px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    background: rgba(255, 255, 255, 0.35);
  }
  .header {
    border-radius: 10px 10px 0 0;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .basic {
    color: white;
    background-color: #3b2e86 !important;
    border: none;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }

  .pro:hover {
    color: black;
  }

  .pro {
    color: black;
    background: linear-gradient(52.71deg, #fffaa0 -7.68%, #f4ba9e 41.11%, #eea7fa 91.67%) !important;
    border: none;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  li {
    background: white;
    border: 2px solid black;
    border-radius: 5px;
    margin: 0.7rem;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    padding: 0.8rem;
  }
</style>
