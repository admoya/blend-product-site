<script lang="ts">
  import Collapsible from '$lib/components/Collapsible.svelte';
  import faqs from '$lib/data/help/faqs';
</script>

<svelte:head>
  <title>Help - Blend</title>
</svelte:head>

<main>
  <section class="content">
    <h1 class="my-6">Blend Help Center</h1>
    <div class="side-by-side">
      <div class="intro-item">
        <h2>Watch our tutorials!</h2>
        <p>We've created a playlist of tutorials on our YouTube channel to help you get started with Blend!</p>
        <a
          href="https://youtube.com/playlist?list=PL2TEs6eelwhfLxHTn2hyXDiYdKuh1Upv-&si=PZJBMi8mM-C1RTP3"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-blurple">Blend Tutorials</a>
      </div>
      <div class="intro-item">
        <h2>Need help?</h2>
        <p>If you can't find an answer here, you can submit an issue report, and our team will get back to you ASAP!</p>
        <a href="/help/report-an-issue" class="btn btn-red">Report an issue</a>
      </div>
      <div class="intro-item">
        <h2>Leave us a message!</h2>
        <p>We love hearing from you! Feel free to leave us any comments, feedback, or new ideas.</p>
        <a href="/help/feedback" class="btn btn-purple">Submit feedback</a>
      </div>
    </div>
    <div class="questions">
      <h1 class="my-4">Frequently Asked Questions</h1>
      {#each faqs as faq}
        <Collapsible {faq} />
      {/each}
    </div>
  </section>
</main>

<style>
  main {
    background-color: #f7e9f9;
  }
  .questions {
    width: 70%;
  }
  .intro-item {
    box-sizing: content-box; /* Tailwind changes this default, which is fine but for the sake of keeping things the same for now I'm changing it back */
    flex-basis: 20rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    padding: 1rem;
    margin: 1rem;
    border-radius: 10px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }
  .intro-item .btn {
    width: 20%;
  }
  @media (max-width: 480px) {
    main {
      margin: 0;
      padding: 0;
      width: 100%;
    }
    .questions {
      width: 100%;
    }
  }
</style>
