<script lang="ts">
    import { user, signOut } from '$lib/firebase';
    console.log($user);
</script>

<h1>Blend: The Orton-Gillingham method made easy</h1>
{#if $user}
    <p>Welcome back, {$user.displayName}</p>
    <button style="max-width: 100px;" on:click={signOut}>Sign out</button>
{:else}
    <p>Welcome, new user! Make an account or log in <a href="/login">here</a></p>
{/if}
