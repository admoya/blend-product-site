<script lang="ts">
  import { createWritableStore, generatePushID } from '$lib/firebase';
  import AddRedemptionModal from './AddRedemptionModal.svelte';

  /** Pass the ID instead of the partner object to allow for subscribing to a new writable store */
  export let partnerId: string;
  const partner = createWritableStore<Database.Partner>(`/partners/${partnerId}`);
  export let onEditPressed: (() => void) | undefined = undefined;

  $: redemptions = $partner?.locked?.redemptions ?? {};
  $: partnerOwedAmount = Object.values(redemptions ?? {})
    .filter(({ paymentDistributedToPartner }) => !paymentDistributedToPartner)
    .reduce((acc, { partnerOwedAmount }) => acc + (partnerOwedAmount ?? 0), 0);

  const setRedemptionPaymentStatus = (uid: string, status: boolean) => {
    if (!$partner || !$partner.locked) return;
    $partner.locked.redemptions![uid].paymentDistributedToPartner = status;
  };

  let showAddRedemptionModal = false;

  const saveRedemption = ({ uid, ...redemption }: Database.Partner.Redemption & { uid: string }) => {
    if (!$partner) return;
    if (!$partner.locked) $partner.locked = { redemptions: { [uid]: redemption } };
    $partner.locked.redemptions = { ...$partner.locked.redemptions, [uid]: redemption };
    showAddRedemptionModal = false;
  };
</script>

<div class="relative w-full rounded !bg-white p-4 transition-all">
  {#if onEditPressed}
    <button class="btn-small btn-gray absolute right-0 top-0 rounded" on:click={onEditPressed}>Edit</button>
  {/if}
  <h3 class="text-xl font-bold">{$partner?.public.displayName} <span class="text-xs">({partnerId})</span></h3>
  <dl class="grid grid-cols-2 gap-x-2 text-left text-sm [&>dt]:text-nowrap [&>dt]:font-bold">
    <dt>Converted Redemptions:</dt>
    <dd>{Object.values(redemptions).filter(({ convertedAfterTrial }) => convertedAfterTrial).length}/{Object.keys(redemptions).length}</dd>
    <dt>Stripe Coupon ID:</dt>
    <dd>{$partner?.public.stripePromoCodeId}</dd>
    <dt>Amount Owed:</dt>
    <dd>{partnerOwedAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</dd>
    {#if $partner?.public.logoUrl}
      <dt>Partner Logo:</dt>
      <dd class="overflow-hidden">
        <img src={$partner?.public.logoUrl} alt="Partner logo" class="max-h-32 text-sm font-light" />
      </dd>
    {/if}
    <dt>Social URL:</dt>
    <dd><a href={$partner?.public.socialUrl} target="_blank" rel="noopener noreferrer">{$partner?.public.socialUrl}</a></dd>
    <dt>Blend Message:</dt>
    <dd class="col-span-2 max-h-10 overflow-y-auto">{$partner?.public.blendMessage}</dd>
    {#if $partner?.public.partnerMessage}
      <dt>Partner Message:</dt>
      <dd class="col-span-2 max-h-10 overflow-y-auto">{$partner?.public.partnerMessage}</dd>
    {/if}
    <h4 class="col-span-2 font-bold">Promo Code Redemptions:</h4>
    <div class="col-span-2 grid max-h-96 overflow-y-auto md:grid-cols-3">
      {#each Object.entries(redemptions).sort(([uida, a], [uidb, b]) => b.checkoutTimestamp - a.checkoutTimestamp) as [uid, promoCodeRedemption]}
        <div class="m-1 rounded p-2 outline outline-1 outline-black">
          <dl class="grid grid-cols-2 gap-x-2 break-all text-left text-sm [&>dd]:text-right [&>dt]:text-nowrap [&>dt]:font-bold">
            <dt>UID:</dt>
            <dd class="col-span-2">{uid}</dd>
            <dt>Checkout Time:</dt>
            <dd class="col-span-2">{new Date(promoCodeRedemption.checkoutTimestamp * 1000).toLocaleString()}</dd>
            <dt>Stripe Subscription</dt>
            <dd class="col-span-2">
              {promoCodeRedemption.subscriptionId}
            </dd>
            <dt>Converted:</dt>
            <dd>{promoCodeRedemption.convertedAfterTrial ? 'Yes' : 'No'}</dd>
            {#if promoCodeRedemption.partnerOwedAmount}
              <dt>Amount Owed:</dt>
              <dd class={`${promoCodeRedemption.paymentDistributedToPartner ? 'line-through' : ''}`}>
                {promoCodeRedemption.partnerOwedAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) ?? 'N/A'}
              </dd>
              <dt>Paid:</dt>
              <span class="flex justify-end gap-1">
                <dd>{promoCodeRedemption.paymentDistributedToPartner ? 'Yes' : 'No'}</dd>
                <input
                  type="checkbox"
                  on:input={(e) => setRedemptionPaymentStatus(uid, e.currentTarget.checked)}
                  checked={promoCodeRedemption.paymentDistributedToPartner} />
              </span>
            {/if}
          </dl>
        </div>
      {/each}
    </div>
  </dl>
  <button
    on:click={() => {
      showAddRedemptionModal = true;
    }}
    class="btn btn-green !mx-auto !h-fit !min-w-0 !px-2 !py-1">
    Add Redemption
  </button>
</div>

<AddRedemptionModal bind:showModal={showAddRedemptionModal} onSave={saveRedemption} />
