<script lang="ts">
  import wordMats from '$lib/assets/features/word-mats.png';
  import edit from '$lib/assets/features/edit.png';
  import preloaded from '$lib/assets/features/preloaded.png';
  import play from '$lib/assets/features/play.png';
  import save from '$lib/assets/features/save.png';
  import unlimited from '$lib/assets/features/unlimited.png';
  import library from '$lib/assets/features/library.png';
  import theme from '$lib/assets/features/theme.png';

  import FeatureCard from '$lib/components/FeatureCard.svelte';
  import PlanSelection from '$lib/components/PlanSelection.svelte';

  const upgrade = () => {
    gtag('event', 'click_upgrade');
  };
</script>

<svelte:head>
  <title>Pricing - Blend</title>
  <meta name="description" content="Learn about the features and pricing options for the Blend app" />
</svelte:head>

<section class="features">
  <div class="content !pb-0">
    <div class="tier basic">
      <div class="section-title">
        <h2>Basic</h2>
        <p class="text-2xl">Free</p>
        <div class="side-by-side">
          <a class="btn" href="https://app.blendreading.com" target="_blank">Try the app</a>
          <a class="btn" href="/login">Sign up</a>
        </div>
      </div>
      <p class="caption">
        Get started right away with our free plan that combines the familiar features of a traditional phonics tools with a modern approach.
      </p>
      <section class="highlights gap-3">
        <FeatureCard
          imagePath={play}
          featureTitle="No Login Required"
          description="Jump into the Blend app without creating an account to see how it can transform your phonics instruction with our preloaded resources"
          className="highlight" />
        <FeatureCard
          imagePath={preloaded}
          featureTitle="Preloaded Resources"
          description="Blend comes with a 2 starter decks and 3 playlists to get you started right out of the box - no setup required"
          className="highlight" />
        <FeatureCard
          imagePath={edit}
          featureTitle="Custom Deck & Playlist"
          description="With a Blend Basic account, you can save one custom deck and playlist so that you can differentiate your instruction"
          className="highlight" />
        <FeatureCard
          imagePath={save}
          featureTitle="Synced Resources"
          description="Access your decks and playlists across any of your devices to take lesson planning on the go"
          className="highlight" />
      </section>
    </div>
    <div class="tier pro">
      <div class="section-title">
        <h2>Pro</h2>
        <p class="text-2xl">$10/month</p>
        <p>$8/month if billed yearly</p>
        <a class="btn" style="color: black; border-color: black;" href="/account?action=choosePlan" on:click={upgrade}>Upgrade</a>
      </div>
      <p class="caption">Elevate your phonics instruction with additional customization and tools to make lesson planning a breeze.</p>
      <section class="highlights gap-4">
        <FeatureCard
          imagePath={wordMats}
          featureTitle="Word Mats"
          description="Blend Pro grants you access to our innovative digital word work mat with built-in support for Elkonin boxes and multisyllable words"
          className="highlight pro" />
        <FeatureCard
          imagePath={unlimited}
          featureTitle="Unlimited Resources"
          description="Create as many custom decks and playlists as you want, so you can tailor your instruction to your students"
          className="highlight pro" />
        <FeatureCard
          imagePath={theme}
          featureTitle="Fun Themes"
          description="Make phonics fun with our collection of themes with colorful backgrounds and cute characters to keep your students engaged"
          className="highlight pro" />
        <FeatureCard
          imagePath={library}
          featureTitle="Blend Library & Sharing"
          description="Access a collection of premade content designed by a reading specialist or share your custom resources with others"
          className="highlight pro" />
      </section>
    </div>
  </div>
</section>
<section id="plans">
  <PlanSelection />
</section>

<style>
  .tier {
    border: 1px solid white;
    border-radius: 8px;
    width: 95%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem 1rem;
    margin: 0.8rem 0;
  }
  .section-title h2 {
    margin: 0;
  }
  .section-title p {
    margin: -0.5rem;
  }
  h2 {
    font-family: 'Contrail One';
    font-size: 2.5rem;
    margin-top: 1rem;
  }
  .basic {
    background: radial-gradient(185.24% 213.48% at 50% 50%, #7e89ec 0%, #16d4e6 55.21%, #006d74 100%);
  }
  .pro {
    background: linear-gradient(52.71deg, #fffaa0 -7.68%, #f4ba9e 41.11%, #eea7fa 91.67%);
    color: black;
  }
  .highlights {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin-bottom: 2rem;
  }

  @media (max-width: 480px) {
    .content {
      width: 90%;
      font-size: 90%;
    }

    .tier {
      width: 100%;
    }
  }
  .features {
    color: white;
    background-color: #3b2e86;
  }
</style>
