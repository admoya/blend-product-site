<script lang="ts">
  import type { Writable } from 'svelte/store';
  import { user } from '$lib/firebase';
  import OrganizationItemTable from './OrganizationItemTable.svelte';
  import { createWritableStore } from '$lib/firebase';
  import { page } from '$app/stores';
  import Modal from '$lib/components/Modal.svelte';
  import type { PageData } from '../$types';

  export let organization: Writable<Database.Organization | null>;
  export let data: PageData;

  const { organizationId } = $page.params;

  $: organizationDecks = createWritableStore<Database.Decks.Organization>(`/decks/organization/${organizationId}`);
  $: userDecks = createWritableStore<Database.Decks.User>(`/decks/user/${$user?.uid}`);
  $: members = data.memberDetails;

  let decksToAdd: string[] = [];
  let showDeckAddModal = false;

  const reorderOrganizationDecks = (itemIdsInOrder: string[]) => {
    itemIdsInOrder.forEach((id, index) => {
      $organizationDecks![id].deck.position = index;
    });
  };

  const handleDeckAdd = () => {
    let maxPosition = Math.max(...Object.values($organizationDecks ?? {}).map(({ deck: { position } }) => position), -1);
    const newDecks = decksToAdd.reduce((acc, deckId) => {
      const newRefId = Math.floor(Math.random() * 4294967295);
      return {
        ...acc,
        [newRefId]: {
          author: $user?.uid,
          originalRefId: deckId,
          deck: {
            ...$userDecks![deckId],
            refId: newRefId,
            is_editable: false,
            position: ++maxPosition,
          },
        },
      };
    }, {});
    $organizationDecks = { ...$organizationDecks, ...newDecks };
    decksToAdd = [];
    showDeckAddModal = false;
  };
  const removeDeck = (deckId: string | number) => {
    $organizationDecks = Object.keys($organizationDecks!)
      .filter((id) => id !== String(deckId))
      .reduce((acc, id) => ({ ...acc, [id]: $organizationDecks![id] }), {});
  };
</script>

<section class="card">
  <h2>Organization Decks</h2>
  <OrganizationItemTable
    items={$organizationDecks ?? {}}
    memberDetails={members}
    itemActions={[{ name: 'Remove', class: 'btn btn-red btn-small', handler: ({ refId }) => removeDeck(refId) }]}
    draggableItems
    onItemReorder={reorderOrganizationDecks} />
  <button
    class="btn btn-green add-button"
    id="add-decks-button"
    on:click={() => {
      showDeckAddModal = true;
    }}>Add</button>
  <Modal bind:showModal={showDeckAddModal}>
    <h2 slot="header">Add a Deck to {$organization?.public.name}</h2>
    <p style="margin-bottom: 0;">Choose from your personal decks below.</p>
    <p style="margin-top: 0;">A copy of the deck you select will be added to the organization.</p>
    <OrganizationItemTable
      items={$userDecks ?? {}}
      memberDetails={members}
      existingItems={$organizationDecks ?? {}}
      selectable
      bind:selectedItems={decksToAdd} />
    <div slot="footer" class="row" style="justify-content: center">
      <button
        class="btn btn-gray"
        on:click={() => {
          showDeckAddModal = false;
        }}>Cancel</button>
      <button class="btn btn-green" on:click={handleDeckAdd} disabled={decksToAdd.length == 0}>Add to Organization</button>
    </div>
  </Modal>
</section>
