<script lang="ts">
  import AuthCheck from '$lib/components/AuthCheck.svelte';
  import { page } from '$app/stores';
  import { createWritableStore, user } from '$lib/firebase';
  import type { PageData } from './$types';
  import { invalidateAll } from '$app/navigation';
  import OrganizationHeader from './components/OrganizationHeader.svelte';
  import OrganizationMetadata from './components/OrganizationMetadata.svelte';
  import OrganizationDecks from './components/OrganizationDecks.svelte';
  import OrganizationPlaylists from './components/OrganizationPlaylists.svelte';
  export let data: PageData;
  const { organizationId } = $page.params;

  const organization = createWritableStore<Database.Organization>(`/organizations/${organizationId}`);
  $: $organization && invalidateAll(); // Reload data when organization changes
</script>

<svelte:head>
  <title>Manage Organization</title>
</svelte:head>

<AuthCheck />
<div class="content" style="overflow-x: auto;">
  <OrganizationHeader {organization} />
  <OrganizationMetadata {organization} {data} />
  <OrganizationDecks {organization} {data} />
  <OrganizationPlaylists {organization} {data} />
</div>

<style>
  /* Global classes below are used in multiple child components */

  :global(.add-button) {
    padding-top: 5px;
    padding-bottom: 5px;
    height: fit-content;
    margin: 1rem auto 2rem;
  }

  :global(.card) {
    box-sizing: content-box; /* Tailwind changes this default, which is fine but for the sake of keeping things the same for now I'm changing it back */
    background-color: rgba(245, 245, 245, 0.473);
    border-radius: 1rem;
    padding: 1rem;
    max-width: 60rem;
    margin: 1rem 0;
  }
</style>
