<script lang="ts">
  import AuthCheck from "$lib/components/AuthCheck.svelte";
</script>

<svelte:head>
  <title>My Account</title>
</svelte:head>

<AuthCheck loginRedirect='account' defaultRedirect={(user) => `/account/${user.uid}`} />