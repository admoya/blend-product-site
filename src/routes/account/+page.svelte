<script lang="ts">
  import { goto } from "$app/navigation";
  import { user, willAttemptLogin } from "$lib/firebase";
  $: {
      if (!$user && !willAttemptLogin()) 
          goto('/login?successRedirect=account');
      else if ($user)
          goto(`/account/${$user.uid}`);
  }
</script>

<svelte:head>
  <title>My Account</title>
</svelte:head>