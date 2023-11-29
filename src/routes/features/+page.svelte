<script lang="ts">
  import playlist from '$lib/assets/features/playlist.png';
  import edit from '$lib/assets/features/edit.png';
  import preloaded from '$lib/assets/features/preloaded.png';
  import history from '$lib/assets/features/history.png';
  import save from '$lib/assets/features/save.png';
  import unlimited from '$lib/assets/features/unlimited.png';
  import library from '$lib/assets/features/library.png';
  import share from '$lib/assets/features/share.png';

  import PricingTable from '$lib/components/PricingTable.svelte';
  import FeatureCard from '$lib/components/FeatureCard.svelte';

  const upgrade = () => {
    gtag('event', 'click_upgrade');
  };
</script>

<svelte:head>
  <title>Blend Features</title>
  <meta name="description" content="Learn about the features and pricing options for the Blend app" />
</svelte:head>

<section class="features">
  <div class="content">
    <div class="blurb">
      <h1>Features</h1>
      <p>Blend is the all-in-one solution for your blending drill.</p>
    </div>
    <div class="tier basic">
      <div class="section-title">
        <h2>Basic</h2>
        <p>Free</p>
        <a class="btn" href="/login">Sign Up</a>
      </div>
      <p class="caption">
        Get started right away with our free offering that combines the familiar features of a traditional blending board with modern tools.
      </p>
      <section class="highlights">
        <FeatureCard
          imagePath={preloaded}
          featureTitle="Preloaded Decks"
          description="Blend comes with two starter decks with the most common graphemes to get you started out of the box"
          className="highlight" />
        <FeatureCard
          imagePath={edit}
          featureTitle="One Custom Deck"
          description="Create and save your own deck that aligns with your students' needs and can be updated every lesson"
          className="highlight" />
        <FeatureCard
          imagePath={save}
          featureTitle="Deck Sync"
          description="Access your boards across devices to take lesson planning on the go"
          className="highlight" />
        <FeatureCard
          imagePath={history}
          featureTitle="Word History"
          description="Keep track of your progress in a lesson and revisit words to reinforce challenging concepts"
          className="highlight" />
      </section>
    </div>
    <div class="tier pro">
      <div class="section-title">
        <h2>Pro</h2>
        <p>$3/month</p>
        <a class="btn" style="color: black; border-color: black;" href="/account?action=upgrade" on:click={upgrade}>Upgrade</a>
      </div>
      <p class="caption">Elevate your phonics instruction with additional customization and tools to make lesson planning a breeze.</p>
      <section class="highlights">
        <FeatureCard
          imagePath={unlimited}
          featureTitle="Unlimited Decks"
          description="Create decks that are aligned to each group or student, or even to practice a specific phonics skill"
          className="highlight pro" />
        <FeatureCard
          imagePath={playlist}
          featureTitle="Playlists"
          description="Build premade word chains to breeze through your blending drill and use them again and again"
          className="highlight pro" />
        <FeatureCard
          imagePath={library}
          featureTitle="Deck Library"
          description="Access a collection of decks designed by a reading specialist that are targeted to specific skills"
          className="highlight pro" />
        <FeatureCard
          imagePath={share}
          featureTitle="Deck Sharing"
          description="Remotely share your custom decks with fellow Blend Pro users to collaborate on lesson planning"
          className="highlight pro" />
      </section>
    </div>
  </div>
</section>
<section class="pricing">
  <PricingTable />
</section>

<style>
  .tier {
    border: 1px solid white;
    border-radius: 8px;
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.8rem 1rem;
    margin: 2rem 0;
  }
  .section-title h2 {
    margin: 0;
  }
  .section-title p {
    margin: -0.5rem;
  }
  .caption {
    margin: 1.5rem;
  }
  .blurb {
    margin-top: 0;
    padding: 0;
    margin-bottom: 2rem;
  }
  .blurb p {
    font-size: 2rem;
    margin: 0;
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
  }
  .pricing {
    background-color: #006d74;
  }
  .features {
    color: white;
    background-color: #3b2e86;
  }
  .blurb {
    margin-top: 2rem;
  }
  h1 {
    margin-bottom: 0;
  }
</style>
