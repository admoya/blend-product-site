<script lang="ts">
  import ProBadge from './ProBadge.svelte';
</script>

<div class="btn-pro">
  <a href="/account?action=upgrade">
    <div class="badge"><ProBadge /></div>
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
    right: -0.5rem;
    margin-top: -0.5rem;
    z-index: 1;
  }
</style>
