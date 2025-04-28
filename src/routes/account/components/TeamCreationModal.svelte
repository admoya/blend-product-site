<script lang="ts">
  import Modal from '$lib/components/Modal.svelte';
  import { user } from '$lib/firebase';

  export let show = false;
  let name = '';
</script>

<Modal bind:showModal={show}>
  <h2 slot="header">Create new Team</h2>
  <form action="?/createTeam" method="post" class="max-w-xl">
    <div class="flex flex-row flex-wrap gap-4 py-4">
      <label class="w-full">
        <p class="text-center font-bold">Name your new team:</p>
        <input
          class="border-gray w-full rounded-md border-2 p-2 px-2 text-center"
          autocomplete="off"
          name="name"
          required
          type="text"
          placeholder={`${$user?.displayName}'s Awesome Team'`}
          bind:value={name} />
      </label>
    </div>
    <div class="inline-flex">
      <button
        type="button"
        class="btn btn-gray !mx-auto !my-4"
        style="auto 0 auto"
        on:click={() => {
          show = false;
        }}>Cancel</button>
      <button type="submit" class="btn btn-green !mx-auto !my-4" style="auto 0 auto">Create Team</button>
    </div>
  </form>
</Modal>
