<script>
import policy from './policy';
</script>
<section>
  <h1>Blend Privacy Policy</h1>
  <div class="paper">
    <div class="policy">
      {@html policy}
    </div>
  </div>
</section>

<style>
  .policy {
    max-width: 70rem;
    margin: auto;
    text-align: justify;
  }
  :global(.policy h1, h2, h3, h4) {
    text-align: center;
  }
  :global(.policy .timestamp) {
    font-size: 0.8rem;
    text-align: right;
    margin-top: 0;
    margin-bottom: 0;
  }

  h1 {
    margin: 1.2rem auto 0 auto;
    text-align: center;
  }

</style>