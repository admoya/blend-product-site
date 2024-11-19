<script lang="ts">
  type RedemptionWithUID = Database.Partner.Redemption & { uid: string };
  import Modal from '$lib/components/Modal.svelte';
  export let showModal = false;

  export let onSave: (redemption: RedemptionWithUID) => void;
  const redemption: RedemptionWithUID = {
    uid: '',
    subscriptionId: '',
    checkoutTimestamp: 0,
    partnerOwedAmount: 0,
    convertedAfterTrial: false,
  };

  let validationError = '';

  let isValidating = false;

  const validateSubscription = async () => {
    isValidating = true;
    const subscriptionDataResponse = await fetch(`/api/admin/partners/subscriptionData/${redemption.subscriptionId}`);
    if (subscriptionDataResponse.ok) {
      const { checkoutTimestamp, partnerOwedAmount, convertedAfterTrial, uid } = await subscriptionDataResponse.json();
      redemption.uid = uid;
      redemption.checkoutTimestamp = checkoutTimestamp;
      redemption.partnerOwedAmount = partnerOwedAmount;
      redemption.convertedAfterTrial = convertedAfterTrial;
      validationError = '';
    } else {
      validationError = `Failed to validate subscription, ${subscriptionDataResponse.statusText}`;
    }
    isValidating = false;
  };
</script>

<Modal bind:showModal>
  <h2 slot="header">Add Redemption</h2>
  <form class="max-w-xl" on:submit|preventDefault={() => onSave(redemption)}>
    <div class="flex flex-row flex-wrap justify-between gap-4 py-4">
      <div class="flex items-end gap-0">
        {#if validationError}
          <p class="text-red-500">{validationError}</p>
        {/if}
        <label>
          <p>Stripe Subscription ID</p>
          <input disabled={isValidating} class="border-gray rounded-md border-2 px-2" required type="text" bind:value={redemption.subscriptionId} />
        </label>
        <button disabled={isValidating} class="btn-small" type="button" on:click={validateSubscription}>Validate</button>
      </div>
      <label>
        <p>UID</p>
        <input disabled class="border-gray rounded-md border-2 px-2" required type="text" bind:value={redemption.uid} readonly />
      </label>
      <label>
        <p>Checkout Time</p>
        <input
          disabled={isValidating}
          class="border-gray rounded-md border-2 px-2"
          required
          step="1"
          type="number"
          bind:value={redemption.checkoutTimestamp}
          readonly />
      </label>
      <label>
        <p>Amount Owed</p>
        <input
          disabled={isValidating}
          class="border-gray rounded-md border-2 px-2"
          required
          type="number"
          bind:value={redemption.partnerOwedAmount} />
      </label>
      <label>
        <p>Converted After Trial</p>
        <input disabled={isValidating} type="checkbox" bind:checked={redemption.convertedAfterTrial} />
      </label>
    </div>
    <button disabled={isValidating} type="submit" class="btn btn-green !mx-auto w-fit">Save</button>
  </form>
</Modal>
