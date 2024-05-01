<script lang="ts">
  import Collapsible from '$lib/components/Collapsible.svelte';
  import faqs from '$lib/data/help/faqs';
</script>

<svelte:head>
  <title>Help</title>
</svelte:head>

<main>
  <section class="content">
    <h1>Blend Help Center</h1>
    <div class="side-by-side">
      <div class="intro-item">
        <h2>Need help?</h2>
        <p>If you can't find an answer here, you can submit an issue report, and our team will get back to you ASAP!</p>
        <a href="/help/report-an-issue" class="btn btn-red">Report an issue</a>
      </div>
      <div class="intro-item">
        <h2>Leave a comment!</h2>
        <p>We love hearing from you! Feel free to leave any comments, feedback, or new ideas.</p>
        <a href="/help/feedback" class="btn btn-purple">Submit feedback</a>
      </div>
    </div>
    <div class="questions">
      <h1>Frequently Asked Questions</h1>
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
    flex-basis: 32rem;
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
