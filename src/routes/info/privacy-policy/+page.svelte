<script>
  import policy from './policy';
</script>

<svelte:head>
  <title>Privacy Policy</title>
</svelte:head>

<section>
  <h1>Blend Privacy Policy</h1>
  <div class="policy">
    {@html policy}
  </div>
</section>

<style>
  .policy {
    background-color: white;
    border-radius: 10px;
    max-width: 70rem;
    padding: 2rem;
    margin: 2rem auto;
    text-align: justify;
  }
  :global(.policy .heading) {
    text-align: center;
  }
  :global(.policy .timestamp) {
    font-size: 0.8rem;
    text-align: right;
    margin-top: 0;
    margin-bottom: 0;
  }

  h1 {
    text-align: center;
  }
</style>
