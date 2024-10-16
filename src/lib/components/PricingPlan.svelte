<script lang="ts">
  export let planName: string;
  export let subtitle: string = '';
  export let price: string;
  export let features: string[];
  export let note: string = '';
  export let onClick: () => void;
  export let buttonText: string = '';
</script>

<div class="mt-3 w-[22rem] rounded-lg bg-white/[0.35] shadow-lg">
  <div class="plan-style flex items-center justify-between rounded-t-lg px-4 py-2 shadow-lg">
    <h2>{planName}</h2>
    <p>{subtitle}</p>
  </div>
  <div class="flex flex-col rounded-b-lg p-4 text-center">
    {#if note}
      <p class="text-lg">{note}</p>
    {:else}
      <br />
    {/if}
    <h2>{price}</h2>
    <button class="btn plan-style !border-0 shadow-lg" on:click={onClick}
      ><h3 class="text-[1.4rem]">{buttonText ? buttonText : `Select ${planName}`}</h3></button>
    <ul class="m-0 list-none p-0">
      {#each features as feature}
        <li class="m-3 rounded-md border-2 border-black bg-white p-3 shadow-lg">{feature}</li>
      {/each}
    </ul>
  </div>
</div>

<style>
  .plan-style {
    background-color: var(--background-color);
    color: var(--text-color);
  }

  button.plan-style {
    min-height: 3rem;
    background-color: var(--background-color);
    color: var(--text-color);
  }
</style>
