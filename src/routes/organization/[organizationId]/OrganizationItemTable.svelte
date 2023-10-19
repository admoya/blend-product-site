<!-- Takes an array of Decks, Playlists, OrganizationDecks, or OrganizationPlaylists and renders them in a table -->
<script lang="ts">
  import type { ChangeEventHandler } from 'svelte/elements';
  import { scale } from 'svelte/transition';
  interface FlattenedItem {
    author?: string;
    created_ts: string;
    refId: number;
    name: string;
    modified_ts: string;
    alreadyIncluded: boolean;
    position: number;
  }
  type Items = Database.Decks.Organization | Database.Playlists.Organization | Database.Decks.User | Database.Playlists.User;
  export let items: Items = {};
  export let existingItems: Database.Decks.Organization | Database.Playlists.Organization = {};
  export let memberDetails: Database.Organization.MemberDetails[] = [];
  export let selectable = false;
  export let selectedItems: string[] = [];
  export let itemActions: { name: string; class?: string; handler: (item: FlattenedItem) => any }[] = [];
  export let draggableItems = false;
  export let onItemReorder: (itemIdsInOrder: string[]) => any = () => {};

  const compareItems = (item1: { created_ts: string; position: number }, item2: { created_ts: string; position: number }) => {
    if (item1.position !== item2.position) {
      return item1.position - item2.position;
    }
    return item1.created_ts.localeCompare(item2.created_ts);
  };

  $: flattenedItems = Object.values(items)
    .map<FlattenedItem>((item) => {
      return {
        ...item.deck,
        ...item.playlist,
        ...item,
      };
    })
    .map((item) => ({
      ...item,
      author: item.author ? memberDetails.find(({ uid }) => uid === item.author)?.displayName : undefined,
      alreadyIncluded: !!Object.values(existingItems).find((existingItem) => {
        if ('deck' in existingItem) return String(item.refId) === existingItem.originalRefId && existingItem.deck.modified_ts === item.modified_ts;
        else return String(item.refId) === existingItem.originalRefId && existingItem.playlist.modified_ts === item.modified_ts;
      }),
    }))
    .sort(compareItems);

  const handleItemCheck: ChangeEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement;
    if (target.value === 'all') {
      if (target.checked) {
        selectedItems = flattenedItems.filter(({ alreadyIncluded }) => !alreadyIncluded).map((item) => String(item.refId));
      } else {
        selectedItems = [];
      }
      return;
    }
    if (target.checked) {
      selectedItems = [...selectedItems, target.value];
    } else {
      selectedItems = selectedItems.filter((id) => id !== target.value);
    }
  };

  let placeholderPosition: number | null = null;
  let isDragging = false;

  const handleDragStart = (event: DragEvent, index: number) => {
    event.dataTransfer?.setData('text/plain', String(index));
    event.dataTransfer?.setDragImage((event.currentTarget as Element)?.closest('tr')!, 0, 0);
    isDragging = true;
  };

  const handleDragEnd = () => {
    isDragging = false;
  };

  const handleDragOver = (event: DragEvent, index: number) => {
    if (!isDragging) return;
    event.preventDefault();
    event.dataTransfer!.dropEffect = 'move';
    placeholderPosition = index;
  };

  const handleDragLeave = () => {
    placeholderPosition = null;
  };

  const handleDrop = (event: DragEvent, dropIndex: number) => {
    event.preventDefault();
    placeholderPosition = null;
    const draggedItemIndex = Number(event.dataTransfer?.getData('text/plain'));
    if (draggedItemIndex !== dropIndex) {
      const destinationIndex = dropIndex > draggedItemIndex ? dropIndex - 1 : dropIndex;
      const newItems = flattenedItems
        .slice(0, draggedItemIndex)
        .concat(flattenedItems.slice(draggedItemIndex + 1))
        .toSpliced(destinationIndex, 0, flattenedItems[draggedItemIndex]);
      console.log('New items:', newItems);
      onItemReorder(newItems.map((item) => String(item.refId)));
    }
    isDragging = false;
  };
</script>

<table>
  <thead>
    <tr>
      {#if draggableItems}
        <th style="width: 0;"></th>
      {/if}
      {#if selectable}
        <th></th>
      {/if}
      <th class="name">Name</th>
      <th>Created At</th>
      <th>Updated At</th>
      {#if flattenedItems.some((item) => item.author)}
        <th>Author</th>
      {/if}
      {#if itemActions.length > 0}
        <th>Actions</th>
      {/if}
    </tr>
  </thead>
  <tbody>
    {#if selectable}
      <tr>
        <td><input type="checkbox" value="all" on:change={handleItemCheck} checked={selectedItems.length === flattenedItems.length} /></td>
        <td><em>{`${selectedItems.length !== flattenedItems.length ? 'Select All' : 'Unselect All'}`}</em></td>
      </tr>
    {/if}
    {#each flattenedItems as item, index (item.refId)}
      {#if placeholderPosition === index}
        <tr class="placeholder" in:scale>
          <td colspan={6}></td>
        </tr>
      {:else}
        <tr class="spacer">
          <td colspan={6}></td>
        </tr>
      {/if}
      <tr on:dragover={(event) => handleDragOver(event, index)} on:drop={(event) => handleDrop(event, index)} on:dragleave={handleDragLeave}>
        {#if draggableItems}
          <td>
            <span
              draggable="true"
              role="button"
              tabindex={0}
              on:dragstart={(event) => handleDragStart(event, index)}
              on:dragend={handleDragEnd}
              class="drag-handle"
              >&#9776;
            </span>
          </td>
        {/if}
        {#if selectable}
          <td
            ><input
              type="checkbox"
              value={item.refId}
              on:change={handleItemCheck}
              checked={item.alreadyIncluded || selectedItems.includes(String(item.refId))}
              disabled={item.alreadyIncluded} />
          </td>
        {/if}
        <td class="name">{item.name}</td>
        <td>{new Date(item.created_ts).toLocaleDateString()}</td>
        <td>{new Date(item.modified_ts).toLocaleDateString()}</td>
        {#if flattenedItems.some((item) => item.author)}
          <td>{item.author ?? ''}</td>
        {/if}
        {#if itemActions.length > 0}
          <td>
            {#each itemActions as action}
              <button class={action.class} on:click={() => action.handler(item)}>{action.name}</button>
            {/each}
          </td>
        {/if}
      </tr>
    {/each}
  </tbody>
</table>

<style>
  table {
    width: 100%;
    max-width: 50rem;
    table-layout: fixed;
    margin: 0 auto;
  }

  td {
    word-wrap: break-word;
    width: fit-content;
    line-height: 1.2rem;
    padding: 0.3rem;
  }

  .drag-handle {
    cursor: grab;
  }

  .placeholder {
    height: 2px !important; /* Adjust height to your preference */
    background-color: #666; /* Adjust color to your preference */
  }

  .spacer {
    height: 2px !important; /* Adjust height to your preference */
    background-color: #ffffff00; /* Adjust color to your preference */
  }

  .spacer > td {
    height: 0 !important;
    padding: 0 !important;
  }

  .placeholder > td {
    height: 0 !important;
    padding: 0 !important;
  }

  .name {
    width: 30%;
  }
</style>
