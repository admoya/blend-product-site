<script lang="ts">
    import { user, signOut } from '$lib/firebase';
    import cards from '$lib/assets/cards.png'
</script>

<!-- <h1>Blend: The Orton-Gillingham method made easy</h1>
{#if $user}
    <p>Welcome back, {$user.displayName}</p>
    <button on:click={signOut}>Sign out</button>
    <h3>Available Pages:</h3>
    <a href={`/account/${$user.uid}`}>Account Management</a>
{:else}
    <p>Welcome, new user! Make an account or log in <a href="/login">here</a></p>
{/if} -->

<section class="coming-soon">
    <h1>COMING SOON</h1>
    <div class="cards">
        <img src={cards} alt="cards spelling BLEND"/>
    </div>
    <a href="/subscribe"><button class="btn"><h2>get updates</h2></button></a>
</section>

<style>
    .cards img {
        max-width: 100%;
    }
    .coming-soon {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0 1rem;
    }
    .coming-soon h1 {
        margin: 0px;
        letter-spacing: 2px;
    }
    .btn h2 {
        margin: 0px;
    }
    .btn:hover {
        background: rgba(255, 255, 255, 0.30);
    }
</style>
