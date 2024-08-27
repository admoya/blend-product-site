<!--
  @component

  This is a *client-side* auth check to ensure the user is logged in.
  
  It is useful where server-side session auth is unavailable, or if you want the page to redirect to the log in when the user is logged out.

  It is not appropriate on its own to protect sensitive data on a server-rendered page, as the HTML may be sent to the client regardless of the user's auth status.
-->
<script lang="ts">
  import { goto } from '$app/navigation';
  import { user, willAttemptLogin } from '$lib/firebase';
  import { page } from '$app/stores';
  import type { User } from 'firebase/auth';
  /**
   * If the user is logged out, this is the page they will be redirected to *after* successfully logging in.
   * Defaults to the current page, *without* query parameters (the pathname).
   */
  export let loginRedirect: string = $page.url.pathname;
  /**
   * Provide this value if the page should redirect if the user is already logged in.
   * Can be a string or a function that will be passed the Firebase User object and must return a string.
   * If not provided, and the user is logged in, there will be no redirect.
   */
  export let defaultRedirect: string | null | ((user: User) => string) = null;

  $: {
    if (!$user && !willAttemptLogin()) goto(`/login?successRedirect=${encodeURIComponent(loginRedirect)}`);
    else if ($user && defaultRedirect) goto(typeof defaultRedirect === 'function' ? defaultRedirect($user) : defaultRedirect);
  }
</script>
