<script lang="ts">
  export let imagePath: string;
  export let featureTitle: string;
  export let description: string;
  export let className: string;
</script>

<div class="feature-card">
  <div class={`${className} h-full`}>
    <img src={imagePath} alt="playlist icon" />
    <h3>{featureTitle}</h3>
    <p class="my-4 min-w-60">{description}</p>
  </div>
</div>

<style>
  h3 {
    font-family: 'Contrail One';
    font-size: 1.6rem;
  }
  .feature-card {
    color: white;
    width: 18rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem 0;
  }
  .highlight h3 {
    margin: 2rem 0 0 0;
  }
  .highlight {
    min-height: 20rem;
    min-width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 8px;
    border: 1px solid white;
    padding: 1.2rem;
    font-weight: 200;
  }
  .highlight img {
    width: 6rem;
    height: 6rem;
  }
  .pro {
    background-color: white;
    border: 2px solid black;
    color: black;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }
</style>
