<script lang="ts">
  import cards from '$lib/assets/cards.png';
  import play from '$lib/assets/home/play.png';
  import edit from '$lib/assets/home/edit.png';
  import playlists from '$lib/assets/home/playlists-side-by-side.png';
</script>

<svelte:head>
  <title>Blend Reading</title>
</svelte:head>

<section class="banner">
  <h1>Personalize, plan, and transform your phonics instruction</h1>
  <div class="cards">
    <img src={cards} alt="cards spelling BLEND" />
  </div>
  <div class="side-by-side">
    <a class="btn start-blending" href="https://app.blendreading.com" target="_blank" rel="noopener noreferrer"><h2>start blending</h2></a>
    <a class="btn" href="/login"><h2>sign up</h2></a>
  </div>
</section>

<section id="play" class="feature" style="background: #3b2e86;">
  <div class="feature-title"><h1>Building fluency has never been easier</h1></div>
  <div class="inner-content">
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
  <div class="feature-title"><h1>Decks for any skill and style</h1></div>
  <div class="inner-content">
    <div class="side-by-side">
      <div class="description">
        <p>
          With <b>Blend</b>, you have total control of the graphemes in your deck. You now have the freedom to save a customized deck that aligns and
          adjusts perfectly with your class's scope and sequence, or to create multiple individualized decks for small groups or one-on-one
          intervention students.
        </p>
        <h2>Key Features</h2>
        <ul>
          <li><b>Get started right away</b> with two premade boards available in your library to use and build on</li>
          <li><b>Create unlimited custom decks</b> to align with any level or lesson that you're teaching*</li>
          <li><b>Easily differentiate</b> by targeting the specific skills and needs of every group of students with each deck</li>
          <li>Quickly edit as you go with our <b>flexible drag-and-drop interface</b></li>
          <li><b>Organize your decks your way</b> with your custom card groupings, color-coding, and up to five card columns</li>
          <li>Copy and refine existing decks to <b>effortlessly create new boards</b> with similar grapheme sets</li>
          <li>Conveniently access decks from any device with <b>account syncing</b></li>
        </ul>
        <p class="footnote">
          *Basic users can create up to one custom deck. Pro users can create unlimited custom decks. For Blend Pro pricing and features, see below.
        </p>
      </div>
      <img src={edit} alt="blend edit screen" />
    </div>
  </div>
</section>
<section id="playlists" class="feature" style="background: #012a51;">
  <div class="feature-title"><h1>Revolutionize your lesson planning</h1></div>
  <img src={playlists} alt="Blend Playlists screen showing the word 'quick' on the big cards" />
  <div class="inner-content">
    <div class="side-by-side">
      <div class="description">
        <p>
          Save time with our <b>Playlists</b> feature by creating word chains ahead of your lessons and present them in our sleek interface designed to
          minimize distractions.
        </p>
        <p>
          Craft playlists from scratch, integrate word lists from your school's structured literacy curriculum, or even export the history of a
          completed blending drill and seamlessly turn it into a playlist. Then, when you're ready for your drill, flip through the words with the
          click of a button!
        </p>
        <p>
          With Playlists, you can reduce the prep work and devote more time to your kids, ensuring that they're equipped with vital literacy skills.
        </p>
      </div>
      <div class="description">
        <h2>Key Features</h2>
        <ul>
          <li><b>Create and save word chains ahead of time</b>, ensuring your structured literacy lessons run smoothly</li>
          <li><b>Keep your lessons flowing just by clicking</b> forward - no more fumbling for the next grapheme card</li>
          <li><b>Integrate word lists from your school's structured literacy curriculum</b> and save them to use year after year</li>
          <li>
            Experience a visually uncluttered interface that minimizes distractions, so you can <b
              >focus on what matters most: empowering your students</b>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>
<section class="epilogue">
  <h1>Ready to get started?</h1>
  <p>See our pricing plans and try Blend now!</p>
  <div class="side-by-side">
    <a class="btn" href="/features#pricing"><h2>pricing plans</h2></a>
    <a class="btn" href="https://app.blendreading.com" target="_blank" rel="noopener noreferrer" on:click={() => window.gtag('event', 'open_app')}
      ><h2>try the app</h2></a>
  </div>
  <div class="footnote">
    <h6>System Requirements</h6>
    <p>Blend is is optimized for web browsers on desktops or laptops. All browsers are supported.</p>
    <p>Recommended screen size is 1024x768 or larger.</p>
    <p>Blend is currently not recommended for mobile devices.</p>
  </div>
  <div class="subscribe">
    <h1>Stay connected!</h1>
    <p>Subscribe to our newsletter for updates on new Blend Pro features.</p>
    <a class="btn" href="/newsletter"><h2>subscribe</h2></a>
  </div>
</section>

<style>
  .btn {
    border-width: 2px;
  }
  .start-blending {
    background: rgba(127, 113, 210, 0.5);
    border-color: #7f71d2;
    border-width: 2px;
  }

  .start-blending:hover {
    color: white;
    background-color: #7f71d2 !important;
  }

  .feature-title h1 {
    text-align: center;
    margin-bottom: 0;
  }
  .footnote {
    margin: 1.5rem;
    color: white;
    font-size: 1rem;
  }

  .footnote p,
  h6 {
    margin: 0;
  }

  .cards img {
    max-width: 100%;
  }

  #playlists img {
    padding-top: 2rem;
    width: 65%;
    min-width: 20rem;
  }

  .banner {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5%;
  }

  .btn:hover {
    background: rgba(255, 255, 255, 0.3);
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
    object-fit: contain;
  }

  .epilogue {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    text-align: center;
  }

  .epilogue h1 {
    margin-bottom: 0px;
  }
  .subscribe {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .subscribe a {
    width: 50%;
  }
</style>
