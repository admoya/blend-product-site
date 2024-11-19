<script lang="ts">
  import { page } from '$app/stores';
  import AuthCheck from '$lib/components/AuthCheck.svelte';
  const navLinks = [
    { href: '/admin', text: 'Home' },
    { href: '/admin/organizations', text: 'Organizations' },
    { href: '/admin/partners', text: 'Partners' },
  ];
</script>

<AuthCheck />
<div class="content">
  <div class="mx-auto w-fit">
    <h1 class="mt-4">Admin View</h1>
    <nav class="mb-4 flex justify-between gap-2 rounded bg-slate-200 px-2 py-1">
      {#each navLinks as link}
        {@const active = link.href === $page.url.pathname}
        <a href={link.href} class={`text-black hover:text-purple-500 ${active ? 'underline underline-offset-4' : ''}`}>{link.text}</a>
      {/each}
    </nav>
  </div>
  <slot />
</div>
