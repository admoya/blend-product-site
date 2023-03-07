<script lang="ts">
    import { user, signOut } from '$lib/firebase';
    import cards from '$lib/assets/cards.png'
    console.log($user);
</script>

<!-- <h1>Blend: The Orton-Gillingham method made easy</h1>
{#if $user}
    <p>Welcome back, {$user.displayName}</p>
    <button style="max-width: 100px;" on:click={signOut}>Sign out</button>
{:else}
    <p>Welcome, new user! Make an account or log in <a href="/login">here</a></p>
{/if} -->

<section class="coming-soon">
    <h1>COMING SOON</h1>
    <div class="cards">
        <img src={cards} alt="cards spelling BLEND"/>
    </div>
    <a href="https://www.listmonk.app"><button class="btn"><h2>sign up for updates</h2></button></a>
</section>

<style>
    :global(body) {
        align-items: center;
        justify-content: center;
        margin: 0;
    }
    .cards img {
        max-width: 100%;
    }
    .coming-soon {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 1rem;
    }
    .coming-soon h1 {
        margin: 0px;
        letter-spacing: 2px;
    }
    .btn {
        background: rgba(255, 255, 255, 0.15);
        color: white;
        border: 1px solid #FFFFFF;
        border-radius: 8px;
        height: 2.7rem;
        width: 13rem;
    }
    .btn h2 {
        margin: 0px;
    }
    a:hover .btn {
        background: rgba(255, 255, 255, 0.30);
    }
</style>