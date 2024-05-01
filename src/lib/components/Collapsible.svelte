<script lang="ts">
  export let faq: Help.Faq;

  let expanded = false;
</script>

<div class="collapsible">
  <button class="question" on:click={() => (expanded = !expanded)}>
    <h3>{faq.question}</h3>
    {#if expanded}
      <span class="material-symbols-rounded item-icon">unfold_less</span>
    {:else}
      <span class="material-symbols-rounded item-icon">unfold_more</span>
    {/if}
  </button>
  <div>
    {#if expanded}
      <div class="answer">{@html faq.answer}</div>
    {/if}
  </div>
</div>

<style>
  button {
    background: none;
    border: none;
    cursor: pointer;
  }
  .collapsible {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    border: solid 1px #808080;
    margin: 1rem;
  }
  .question {
    color: #3770eb;
    padding: 0 1rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .answer {
    text-align: left;
    padding: 0 1rem;
  }
</style>
