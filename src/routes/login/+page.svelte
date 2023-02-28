<script>
    import { auth, signInWithGoogle, signInWithFacebook } from "$lib/firebase";
</script>

<h1>Log in or Create Account</h1>

<h2>Please choose one of the following providers:</h2>
<button on:click={signInWithGoogle}>Google</button>
<button on:click={signInWithFacebook}>Facebook</button>

<style>
    button {
        max-width: 100px;
    }
</style>