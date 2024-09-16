<script lang="ts">
  import Modal from '$lib/components/Modal.svelte';

  export let show = false;
  export let organization: Database.Organization;
  export let onSave: (organization: Database.Organization) => void;

  const saveOrganization = () => {
    onSave(organization);
    show = false;
  };
</script>

<Modal bind:showModal={show}>
  <h2 slot="header">{`Edit ${organization.public.name}`}</h2>
  <form on:submit|preventDefault={saveOrganization} class="max-w-xl">
    <div class="flex flex-row flex-wrap gap-4 py-4">
      <label>
        <p>Active</p>
        <input class="w-full" type="checkbox" bind:checked={organization.locked.active} />
      </label>
      <label>
        <p>Licensed</p>
        <input class="w-full" type="checkbox" bind:checked={organization.locked.isLicensed} />
      </label>
      <label>
        <p>Name</p>
        <input class="border-gray rounded-md border-2 px-2" required type="text" bind:value={organization.public.name} />
      </label>
      <label>
        <p>Number of Seats</p>
        <input class="border-gray mx-auto w-24 rounded-md border-2 px-2" required type="number" bind:value={organization.locked.seats} />
      </label>
      <label>
        <p>Term Start</p>
        <input class="border-gray mx-auto w-40 rounded-md border-2 px-2" type="date" bind:value={organization.locked.termStart} />
      </label>
      <label>
        <p>Term End</p>
        <input class="border-gray mx-auto w-40 rounded-md border-2 px-2" type="date" bind:value={organization.locked.termEnd} />
      </label>
    </div>
    <button type="submit" class="btn btn-green !mx-auto !my-4" style="auto 0 auto">Save</button>
  </form>
</Modal>
