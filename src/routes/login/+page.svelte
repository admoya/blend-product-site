<script lang="ts">
    import { signInWithGoogle, signInWithFacebook, user } from "$lib/firebase";
    import { page } from "$app/stores";
    import type { User } from "firebase/auth";
    import { goto } from "$app/navigation";
    const redirectParam = $page.url.searchParams.get('successRedirect') || '/';
    const redirect = redirectParam === 'account' ? (user: User) => `/account/${user.uid}` : () => redirectParam;
    $: $user && goto(redirect($user))
</script>

<h1>Log in or Create Account</h1>

<h2>Please choose one of the following providers:</h2>
<button on:click={() => signInWithGoogle(redirect)}>Google</button>
<button on:click={() => signInWithFacebook(redirect)}>Facebook</button>

<style>
    button {
        max-width: 100px;
    }
</style>