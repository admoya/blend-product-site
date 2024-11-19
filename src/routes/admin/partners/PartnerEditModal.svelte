<script lang="ts">
  import { enhance } from '$app/forms';
  import Modal from '$lib/components/Modal.svelte';
  /**
   * To prevent changes to the original object while editing, pass in a deep copy and use the onSave function to commit changes
   */
  export let partner: Database.Partner;
  /** Required to save the logo to the correct path */
  export let partnerId: string | null = '';
  export let onSave: (partner: Database.Partner) => void;
  export let showModal = false;

  let logoFileList: FileList | undefined;

  const uploadLogoToFirebase = async () => {
    if (!logoFileList) return;
    const body = new FormData();
    const logoFile = logoFileList[0];
    body.append('logo', logoFile);
    const uploadResult = await fetch(`/api/admin/partners/${partnerId}/logo`, {
      method: 'POST',
      body,
    });
    if (uploadResult.ok) {
      partner.public.logoUrl = (await uploadResult.json()).publicUrl;
    } else {
      console.error('Failed to upload logo', uploadResult.statusText);
    }
  };

  const savePartner = async () => {
    await uploadLogoToFirebase();
    onSave(partner);
  };
</script>

<Modal bind:showModal>
  <h2 slot="header">{`Edit ${partner.public.displayName}`}</h2>
  <form on:submit|preventDefault={savePartner} class="max-w-xl">
    <div class="flex flex-row flex-wrap justify-center gap-4 py-4">
      <label>
        <p>Display Name</p>
        <input class="border-gray rounded-md border-2 px-2" required type="text" bind:value={partner.public.displayName} />
      </label>
      <label>
        <p>Social Link</p>
        <input class="border-gray rounded-md border-2 px-2" required type="text" bind:value={partner.public.socialUrl} />
      </label>
      <label>
        <p>Stripe Promo Code ID <span class="text-xs">(Starts with <b>promo_</b>)</span></p>
        <input class="border-gray rounded-md border-2 px-2" type="text" bind:value={partner.public.stripePromoCodeId} />
      </label>
      {#if partnerId}
        <label>
          <p>Partner Logo</p>
          <input class="border-gray rounded-md border-2 px-2" name="logo" type="file" bind:files={logoFileList} />
        </label>
      {:else}
        <p class="text-sm italic">Create the partner and then edit to add a logo.</p>
      {/if}
      <label class="w-full">
        <p>Blend Message</p>
        <textarea rows="4" class="border-gray w-full rounded-md border-2 px-2" bind:value={partner.public.blendMessage} />
      </label>
      <label class="w-full">
        <p>Partner Message</p>
        <textarea rows="4" class="border-gray w-full rounded-md border-2 px-2" bind:value={partner.public.partnerMessage} />
      </label>
    </div>
    <button type="submit" class="btn btn-green !mx-auto !my-4" style="auto 0 auto">Save</button>
  </form>
</Modal>
