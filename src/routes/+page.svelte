<script lang="ts">
    import cards from '$lib/assets/cards.png';
    import play from '$lib/assets/home/play.png';
    import edit from '$lib/assets/home/edit.png';
</script>

<svelte:head>
  <title>Blend Reading</title>
</svelte:head>

<section class="banner">
    <h1>Personalize, plan, and transform your phonics instruction.</h1>
    <div class="cards">
        <img src={cards} alt="cards spelling BLEND"/>
    </div>
    <a class="btn" href="https://app.blendreading.com" target="_blank" rel="noopener noreferrer"><h2>start blending</h2></a>
</section>

<section class="feature" style="background: #3b2e86;">
    <div class="inner-content">
        <h1>Building fluency has never been easier.</h1>
        <div class="side-by-side">
            <img src={play} alt="blend play screen" />
            <div class="description">
                <p>
                    Welcome to <b>Blend</b> — a game-changing tool for teachers practicing phonics with their students.
                </p>
                <p>
                    Our play screen is aligned with traditional blending boards, making it easy to change, add, or remove sounds in a word to build students'
                    phonemic awareness and fluency.
                </p>

                <h2>Key Features</h2>
                <ul>
                    <li><b>Elegant interface</b> inspired by physical blending boards</li>
                    <li>Automatic recognition and <b>color-coding of vowel sounds</b></li>
                    <li><b>Simple grapheme selection</b> with keyboard-like interface</li>
                    <li>Easily adjustable columns to <b>add or remove cards on the fly</b></li>
                    <li><b>Simplified cards-only view option</b> for faster drills</li>
                    <li><b>Versatile display</b> suitable for both whole group classroom instruction and online learning</li>
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
                    <li>Something about deck sync saying that it allows teachers to lesson plan at home and execute in the classroom from different devices</li>
                </ul>
            </div>
            <img src={edit} alt="blend edit screen" />
        </div>
    </div>
</section>
<section class="epilogue">
    <h1>Ready to get started?</h1>
    <p>See our pricing plans and try Blend now!</p>
    <div class="side-by-side">
        <a class="btn" href="/pricing"><h2>pricing plans</h2></a>
        <a class="btn" href="https://app.blendreading.com" target="_blank" rel="noopener noreferrer"><h2>try the app</h2></a>
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
