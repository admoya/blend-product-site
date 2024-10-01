<script lang="ts">
  export let name: string;
  export let logo: string;
  export let url: string;
</script>

<div class="logo-container">
  <a href={url} target="_blank" title={name}>
    <img src={logo} alt={`${name} logo`} />
  </a>
</div>

<style>
  .logo-container {
    border-radius: 100%;
    background-color: rgb(253, 249, 241);
    padding: 0.3rem;
    width: 10rem;
    height: 10rem;
    box-shadow: 3px 4px 4px 0px black;
    transition: transform 0.3s ease-in-out;
  }

  @media (max-width: 480px) {
    .logo-container {
      max-width: 7rem;
      max-height: 7rem;
    }
  }

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  img {
    max-width: 100%;
    max-height: 100%;
  }

  .logo-container:hover {
    transform: scale(1.1);
  }
</style>
