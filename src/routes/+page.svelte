<script lang="ts">
    import cards from '$lib/assets/cards.png';
    import play from '$lib/assets/home/play.png';
    import edit from '$lib/assets/home/edit.png';
    import blendProHome from '$lib/assets/home/blend_pro_home.png';
</script>

<svelte:head>
  <title>Blend Reading</title>
</svelte:head>

<section class="banner">
    <h1>Personalize, plan, and transform your phonics instruction.</h1>
    <div class="cards">
        <img src={cards} alt="cards spelling BLEND"/>
    </div>
    <a class="btn" href="https://app.blendreading.com"><h2>start blending</h2></a>
</section>

<section class="feature" style="background: #3b2e86;">
    <div class="inner-content">
        <h1>Practicing phonics has never been easier.</h1>
        <div class="side-by-side">
            <img src={play} alt="blend play screen" />
            <div class="description">
                <p>
                    Welcome to <b>Blend</b> -- a game-changing tool for teachers practicing phonics with their students.
                </p>
                <p>
                    Our play screen is aligned with traditional physical blending boards, making it easy to change, add, or remove sounds in a word to build students'
                    phonemic awareness and fluency.
                </p>

                <h2>Key Features</h2>
                <ul>
                    <li>Elegant interface inspired by traditional blending boards</li>
                    <li>Automatic highlighting for vowel-sounds</li>
                    <li>Easy grapheme selection with keyboard-like interface</li>
                    <li>Easily removable columns to adjust word length on the fly</li>
                    <li>Minimizable sound tray for quick blending drills</li>
                </ul>
            </div>
        </div>
    </div>
</section>
<section class="feature" style="background: #006d74;">
    <div class="inner-content">
        <h1>Decks for any skill and style.</h1>
        <div class="side-by-side">
            <div class="description">
                <p>
                    With Blend, you have total control of the graphemes in your deck. 
                    You now have the freedom to save a customized deck that aligns and adjusts perfectly with your class's scope and sequence, 
                    or to create multiple individualized decks for small groups or one-on-one intervention students.
                </p>
                <h2>Key Features</h2>
                <ul>
                    <li>Completely customizable deck creation</li>
                    <li>Movable cards and columns for graphemes</li>
                    <li>Interface built for organization and planning</li>
                    <li>Ability to copy decks reducing lesson planning time</li>
                    <li>Color-coding for visual cues</li>
                </ul>
            </div>
            <img src={edit} alt="blend edit screen" />
        </div>
    </div>
</section>
<section class="epilogue">
    <h1>Ready to get started?</h1>
    <p>See our pricing plans and sign up below!</p>
    <div class="side-by-side">
        <a class="btn" href="/pricing"><h2>pricing plans</h2></a>
        <a class="btn" href="/login"><h2>sign up</h2></a>
    </div>
</section>

<style>
    .cards img {
        max-width: 100%;
    }
    
    .banner {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 5%;
    }

    .btn:hover {
        background: rgba(255, 255, 255, 0.30);
    }

    a:hover.btn {
        color: white;
    }

    .inner-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem;
    }

    .description {
        width: 30%;
        margin: 0px;
        text-align: justify;
        flex-basis: 40rem;
    }   

    .feature {
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .inner-content img {
        width: 50%;
        flex-basis: 40rem;
        object-fit: cover;
        border-radius: 10px;
    }

    .side-by-side {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }

    .epilogue {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 5%;
    }

    .epilogue h1 {
        margin-bottom: 0px;
    }
</style>
