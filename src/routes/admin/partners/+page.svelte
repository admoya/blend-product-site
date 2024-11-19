<script lang="ts">
  import { createWritableStore, generatePushID } from '$lib/firebase';
  import PartnerCard from './partnerCard.svelte';
  import PartnerEditModal from './PartnerEditModal.svelte';

  const partners = createWritableStore<Database.Partners>('/partners');
  const newEmptyPartner = (): Database.Partner => ({
    public: { displayName: '', socialUrl: '', partnerMessage: '', stripePromoCodeId: '', logoUrl: '', blendMessage: '' },
    locked: { redemptions: {} },
  });

  let showEditModal = false;
  let selectedPartnerId: string | null = null;
  $: selectedPartner = getPartner(selectedPartnerId);

  const getPartner = (id: string | null) => {
    if (!id || !$partners) return newEmptyPartner();
    return JSON.parse(JSON.stringify($partners[id]));
  };

  const savePartner = (partner: Database.Partner) => {
    if (!$partners) {
      $partners = {};
    }
    if (selectedPartnerId) {
      $partners[selectedPartnerId] = partner;
    } else {
      $partners[generatePushID()] = partner;
    }
    showEditModal = false;
  };
</script>

<h2>Partners</h2>

{#if $partners}
  <div class="flex w-full flex-wrap gap-2 md:w-[40rem]">
    {#each Object.keys($partners) as id (id)}
      <PartnerCard
        partnerId={id}
        onEditPressed={() => {
          selectedPartnerId = id;
          showEditModal = true;
        }} />
    {/each}
  </div>
{/if}

<button
  class="btn btn-green"
  on:click={() => {
    showEditModal = true;
    selectedPartnerId = null;
  }}>Add Partner</button>

<PartnerEditModal bind:showModal={showEditModal} partnerId={selectedPartnerId} partner={selectedPartner} onSave={savePartner} />
