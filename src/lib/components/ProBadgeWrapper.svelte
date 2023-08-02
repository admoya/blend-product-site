<script lang="ts">
  import ProBadge from "./ProBadge.svelte";
</script>

<div class="btn-pro">
  <!-- TODO: this should point to the new Blend Pro feature page -->
  <a href="/features#pricing">
    <div class="badge"><ProBadge/></div>
  </a>
  <slot />
</div>

<style>
  a:hover {
    color: black;
  }
  .btn-pro {
    position: relative;
    display: inline-block;  
    margin-top: 1rem;
  }
  .badge {
    position: absolute;
    right: 0px;
    margin-top: -10px;
  }
</style>