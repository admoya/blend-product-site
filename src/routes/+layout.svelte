<script lang="ts">
  import "../app.css";
  import AppBar from "$lib/components/AppBar.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import { browser } from "$app/environment";

  // Google Analytics
  if (browser) {
    // @ts-ignore
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.dataLayer = window.dataLayer || [];
    gtag('js', new Date());
    gtag('config', 'G-LLGRDWVVEV');
  }
</script>

<svelte:head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-LLGRDWVVEV"></script>
</svelte:head>

<AppBar />
<main>
  <slot />
</main>
<Footer />
