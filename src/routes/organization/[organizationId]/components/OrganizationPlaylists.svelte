<script lang="ts">
  import Modal from '$lib/components/Modal.svelte';
  import OrganizationItemTable from './OrganizationItemTable.svelte';

  import { page } from '$app/stores';
  import { user } from '$lib/firebase';
  import { createWritableStore } from '$lib/firebase';
  import type { PageData } from '../$types';
  import type { Writable } from 'svelte/store';
  export let organization: Writable<Database.Organization | null>;
  export let data: PageData;
  const { organizationId } = $page.params;
  $: members = data.memberDetails;
  $: organizationPlaylists = createWritableStore<Database.Playlists.Organization>(`/playlists/organization/${organizationId}`);
  $: userPlaylists = createWritableStore<Database.Playlists.User>(`/playlists/user/${$user?.uid}`);

  let playlistsToAdd: string[] = [];
  let showPlaylistAddModal = false;

  const removePlaylist = (playlistId: string | number) => {
    $organizationPlaylists = Object.keys($organizationPlaylists!)
      .filter((id) => id !== String(playlistId))
      .reduce((acc, id) => ({ ...acc, [id]: $organizationPlaylists![id] }), {});
  };

  const reorderOrganizationPlaylists = (itemIdsInOrder: string[]) => {
    itemIdsInOrder.forEach((id, index) => {
      $organizationPlaylists![id].playlist.position = index;
    });
  };

  const handlePlaylistAdd = () => {
    let maxPosition = Math.max(...Object.values($organizationPlaylists ?? {}).map(({ playlist: { position } }) => position), -1);
    const newPlaylists = playlistsToAdd.reduce((acc, playlistId) => {
      const newRefId = Math.floor(Math.random() * 4294967295);
      return {
        ...acc,
        [newRefId]: {
          author: $user?.uid,
          originalRefId: playlistId,
          playlist: {
            ...$userPlaylists![playlistId],
            refId: newRefId,
            is_editable: false,
            position: ++maxPosition,
          },
        },
      };
    }, {});
    $organizationPlaylists = { ...$organizationPlaylists, ...newPlaylists };
    playlistsToAdd = [];
    showPlaylistAddModal = false;
  };
</script>

<section class="card">
  <h2>Organization Playlists</h2>
  <OrganizationItemTable
    items={$organizationPlaylists ?? {}}
    memberDetails={members}
    itemActions={[{ name: 'Remove', class: 'btn btn-red btn-small', handler: ({ refId }) => removePlaylist(refId) }]}
    draggableItems
    onItemReorder={reorderOrganizationPlaylists} />
  <button
    class="btn btn-green add-button"
    on:click={() => {
      showPlaylistAddModal = true;
    }}>Add</button>
  <Modal bind:showModal={showPlaylistAddModal}>
    <h2 slot="header">Add a Playlist to {$organization?.public.name}</h2>
    <p style="margin-bottom: 0;">Choose from your personal playlists below.</p>
    <p style="margin-top: 0;">A copy of the playlist you select will be added to the organization.</p>
    <OrganizationItemTable items={$userPlaylists ?? {}} existingItems={$organizationPlaylists ?? {}} bind:selectedItems={playlistsToAdd} selectable />
    <div slot="footer" class="row" style="justify-content: center">
      <button
        class="btn btn-gray"
        on:click={() => {
          showPlaylistAddModal = false;
        }}>Cancel</button>
      <button class="btn btn-green" on:click={handlePlaylistAdd} disabled={playlistsToAdd.length == 0}>Add to Organization</button>
    </div>
  </Modal>
</section>
