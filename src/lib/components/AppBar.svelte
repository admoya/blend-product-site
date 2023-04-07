<script lang="ts">
  var isMenuopen = false;
  const toggleMenu = () => {
    isMenuopen = false;
  };
</script>

<div>
  <nav class="app-bar">
    <a class="branding" href="/">
      <h1>BLEND</h1>
    </a>
    <ul
      class={`nav-links ${isMenuopen ? "" : "hide-menu"}`}
      on:click={toggleMenu}
      on:keypress={toggleMenu}
    >
      <li>
        <a id="app" href="https://app.blendreading.com" target="_blank" rel="noopener noreferrer">app</a>
      </li>
      <li>
        <a id="home" href="/">home</a>
      </li>
      <li>
        <a id="pricing" href="/pricing">pricing</a>
      </li>
      <li>
        <a id="login" href="/login">login</a>
      </li>
    </ul>
    <button
      on:click={() => {
        isMenuopen = !isMenuopen;
      }}
      class="hamburger-button">
      {#if isMenuopen}
        <span> &#x2715; </span>
      {:else}
        <span> &#x2630; </span>
      {/if}
    </button>
  </nav>
</div>

<style>
  @media (max-width: 480px) {
    a#app {
      border: none !important;
      padding: 0 !important;
    }
  }

  .app-bar {
    height: 66px;
    width: 100%;
    background-color: white;
    display: flex;
    flex-direction: row;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }

  .branding {
    color: black;
    text-decoration: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 2%;
    text-align: center;
    max-width: 75vw;
  }

  .nav-links {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: end;
    margin-right: 2%;
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 1.5rem;
    letter-spacing: 0em;
    list-style-type: none;
    gap: 1rem;
  }

  a#app {
    padding: 0.2rem 1.2rem;
    border: solid 2px #7f71d2;
    border-radius: 5px;
  }

  a#home:hover {
    color: #f1b4fb;
  }

  a#pricing:hover {
    color: #84e3de;
  }

  a#login:hover {
    color: #ffc076;
  }

  .hamburger-button {
    display: none;
    border: none;
    color: black;
    font-size: 1.6rem;
    line-height: 2rem;
  }

  @media (max-width: 640px) {
    .hide-menu {
      opacity: 0;
      visibility: hidden;
    }

    .hamburger-button {
      display: block;
      width: auto;
      background: none;
      margin-left: auto;
      margin-right: 1rem;
    }
    .nav-links {
      flex-direction: column;
      z-index: 100;
      background-color: #f9f7f3;
      margin-top: 66px;
      width: 100%;
      position: absolute;
      padding-left: 0;
      text-align: right;
      padding-top: 1rem;
      padding-bottom: 1rem;
      transition: opacity 600ms, visibility 600ms;
    }
  }

</style>