<svelte:head>
  <title>Tutorials</title>
</svelte:head>

<div class="content">
  <h1>Need help getting started?</h1>
  <p>
    We've created an Intro to Blend tutorial video to help get you familiar with
    the basics of the app.
  </p>
  <div>
    <iframe class="youtube-video"
      width="560"
      height="315"
      src="https://www.youtube.com/embed/cEoXlABrulE"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    />
  </div>
  <p>Make sure to subscribe to our YouTube channel for more tutorials coming soon!</p>
</div>

<style>
  @media (max-width: 480px) {
    .youtube-video {
      width: 100%;
      height: auto;
    }
  }
</style>