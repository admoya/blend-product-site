<!-- Takes an array of Decks, Playlists, OrganizationDecks, or OrganizationPlaylists and renders them in a table -->
<script lang="ts">
  import type { ChangeEventHandler } from 'svelte/elements';
  interface FlattenedItem {
    author?: string;
    created_ts: string;
    refId: number;
    name: string;
    modified_ts: string;
    alreadyIncluded: boolean;
  }
  export let items: Database.Deck[] | Database.Playlist[] | Database.OrganizationDeck[] | Database.OrganizationPlaylist[] = [];
  export let existingItems: Database.OrganizationDeck[] | Database.OrganizationPlaylist[] = [];
  export let memberDetails: Database.Organization.MemberDetails[] = [];
  export let selectable = false;
  export let selectedItems: string[] = [];
  export let itemActions: { name: string; class?: string; handler: (item: FlattenedItem) => any }[] = [];
  $: flattenedItems = items
    .map<FlattenedItem>((item) => {
      return {
        //@ts-expect-error
        ...item.deck,
        //@ts-expect-error
        ...item.playlist,
        ...item,
      };
    })
    .map((item) => ({
      ...item,
      author: item.author ? memberDetails.find(({ uid }) => uid === item.author)?.displayName : undefined,
      alreadyIncluded: !!existingItems.find((existingItem) => {
        if ('deck' in existingItem) return String(item.refId) === existingItem.originalRefId && existingItem.deck.modified_ts === item.modified_ts;
        else return String(item.refId) === existingItem.originalRefId && existingItem.playlist.modified_ts === item.modified_ts;
      }),
    }));

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
</script>

<table>
  <thead>
    <tr>
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
        <!-- Make this only fill the first column and not all 4 -->
        <td><input type="checkbox" value="all" on:change={handleItemCheck} checked={selectedItems.length === flattenedItems.length} /></td>
        <td><em>{`${selectedItems.length !== flattenedItems.length ? 'Select All' : 'Unselect All'}`}</em></td>
      </tr>
    {/if}
    {#each flattenedItems as item (item.refId)}
      <tr>
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

  .name {
    width: 30%;
  }
</style>
