<!-- ToolTip.svelte -->
<script>
  export let message = '';
  export let isError = false;
</script>

<style>
  .tooltip {
    display: inline-flex;
    align-items: center;
    background-color: white;
    color: #333;
    text-align: left;
    border-radius: 4px;
    padding: 10px;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
  }

  .icon {
    font-size: 24px;
    margin-right: 5px;
    font-style: normal;
  }

  .icon-error {
    color: red;
  }

  .icon-warning {
    color: #FFD700;
  }

  .message-text {
    font-size: 1rem;
  }
</style>

<div class="tooltip">
  {#if isError}
    <span class="icon icon-error">!</span>
  {:else}
    <span class="icon icon-warning">⚠️</span>
  {/if}
  <span class="message-text">{message}</span>
</div>
