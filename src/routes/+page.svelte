<script lang="ts">
  import sageLogo from '$lib/assets/home/partner-logos/sage-logo.png';
  import slantLogo from '$lib/assets/home/partner-logos/slant-logo.png';
  import reedLogo from '$lib/assets/home/partner-logos/reed-logo.png';
  import forestCityLogo from '$lib/assets/home/partner-logos/forest-city-logo.webp';

  import { appUrl } from '$lib/utils';
  import PartnerCard from '$lib/components/PartnerCard.svelte';
</script>

<svelte:head>
  <title>Blend Reading</title>
</svelte:head>

<div class="flex min-h-[calc(100vh-66px)] flex-col justify-around">
  <section class="mx-auto mt-8 flex w-[90%] flex-wrap items-center justify-center py-4 text-center">
    <div class="my-4 h-auto w-[28rem] max-w-full">
      <enhanced:img src="$lib/assets/cards.png" alt="cards spelling BLEND" />
    </div>
    <div class="flex w-[100%] flex-col justify-center sm:w-[80%] lg:w-[60%]">
      <h1>Meet your new favorite phonics tool.</h1>
      <h2 class="!my-0">Personalize, plan, and transform your structured literacy lessons.</h2>
      <div class="flex flex-wrap justify-center">
        <a class="btn start-blending !mb-0" href={$appUrl} target="_blank" rel="noopener noreferrer"><h2>try the app</h2></a>
        <a class="btn !mb-0" href="/login"><h2>sign up</h2></a>
      </div>
    </div>
  </section>
  <section class="features mx-2 mb-8 mt-2 flex flex-col rounded-lg border border-white bg-white/20 p-8 text-center sm:mx-4 lg:mx-[4rem]">
    <h2 style="font-family: 'Contrail One';" class="text-center text-4xl">Explore the Blend toolkit</h2>
    <div class="flex flex-wrap justify-center">
      <div class="w-full px-4 sm:w-1/2 lg:w-1/3">
        <div class="flex flex-col items-center">
          <enhanced:img class="m-2 rounded-xl shadow-md" src="$lib/assets/home/deck-1.png" alt="Blend app showing a deck" />
          <p style="font-family: 'Contrail One';" class="text-2xl">Decks</p>
          <p>Blending board with adjustable graphemes</p>
          <a href="#decks" class="btn !mt-1 w-2">learn more</a>
        </div>
      </div>
      <div class="w-full px-4 sm:w-1/2 lg:w-1/3">
        <div class="flex flex-col items-center">
          <enhanced:img class="m-2 rounded-xl shadow-md" src="$lib/assets/home/playlist.png" alt="Blend app showing a playlist" />
          <p style="font-family: 'Contrail One';" class="text-2xl">Playlists</p>
          <p>Custom, reusable word chains</p>
          <a href="#playlists" class="btn !mt-1 w-2">learn more</a>
        </div>
      </div>
      <div class="w-full px-4 sm:w-1/2 lg:w-1/3">
        <div class="flex flex-col items-center">
          <enhanced:img class="m-2 rounded-xl shadow-md" src="$lib/assets/home/word-mat.png" alt="Blend app showing a word mat" />
          <p style="font-family: 'Contrail One';" class="text-2xl">Word Mats</p>
          <p>Spelling mat with tap-to-create Elkonin boxes</p>
          <a href="#word-mats" class="btn !mt-1 w-2">learn more</a>
        </div>
      </div>
    </div>
  </section>
</div>
<section id="decks" class="feature" style="background: #012a51;">
  <div class="feature-title"><h1>Building fluency has never been easier</h1></div>
  <div class="inner-content">
    <div class="side-by-side">
      <div class="my-auto w-1/2 min-w-[min(40rem,100%)]">
        <enhanced:img src="$lib/assets/home/deck.png" alt="blend play screen" />
      </div>
      <div class="description">
        <p>
          With Blend, you have total control of the graphemes in your deck. You now have the freedom to save a customized deck that aligns and adjusts
          perfectly with your class's scope and sequence, or to create multiple individualized decks for small groups or one-on-one intervention
          students.
        </p>

        <h2>Key Features</h2>
        <ul class="list-disc pl-10">
          <li><b>Versatile display</b> suitable for whole group classroom instruction, online learning, or one-on-one tutoring</li>
          <li>Automatic recognition and <b>color-coding of vowel sounds</b></li>
          <li>Support for <b>up to six columns</b>, which are adjustable during the drill</li>
          <li>Create your own <b>custom grapheme cards</b> with up to 5 letters so you can build your perfect blending board</li>
          <li><b>Get started right away</b> with two premade boards available in your library to use and build on</li>
          <li><b>Easily differentiate</b> by targeting the specific skills and needs of every group of students with custom decks</li>
        </ul>
      </div>
    </div>
  </div>
</section>
<section class="feature" style="background: #3b2e86;" id="playlists">
  <div class="feature-title"><h1>Revolutionize your lesson planning</h1></div>
  <div class="inner-content">
    <div class="side-by-side !flex-wrap-reverse">
      <div class="description">
        <p>
          Save time with our <b>Playlists</b> feature by creating word chains ahead of your lessons and present them in our sleek interface designed to
          minimize distractions. Craft playlists from scratch, integrate word lists from your school's structured literacy curriculum, or even export the
          history of a completed blending drill and seamlessly turn it into a playlist.
        </p>
        <h2>Key Features</h2>
        <ul class="list-disc pl-10">
          <li><b>Create and save word chains ahead of time</b>, ensuring your structured literacy lessons run smoothly</li>
          <li><b>Keep your lessons flowing just by clicking</b> forward - no more fumbling for the next grapheme card</li>
          <li><b>Integrate word lists from your school's structured literacy curriculum</b> and save them to use year after year</li>
          <li>
            Experience a simplified interface that minimizes distractions, so you can <b>focus on being present with your students</b>
          </li>
        </ul>
      </div>
      <div class="my-auto w-1/2 min-w-[min(40rem,100%)]">
        <enhanced:img class="w-full" src="$lib/assets/home/playlist-1.png" alt="Blend Playlists screen showing the word 'quick' on the big cards" />
      </div>
    </div>
  </div>
</section>
<section id="word-mats" class="feature" style="background: #006d74;">
  <div class="feature-title"><h1>Boost confidence and engage your students</h1></div>
  <div class="inner-content">
    <div class="side-by-side">
      <div class="my-auto w-1/2 min-w-[min(40rem,100%)]">
        <enhanced:img class="w-full" src="$lib/assets/home/word-mat-1.png" alt="blend play screen" />
      </div>
      <div class="description">
        <p>
          Watch your students grow in confidence as they practice spelling with our unique <b>Word Mats</b>. Our mats feature a dynamic interface that
          allows students to manipulate sounds, graphemes, and even syllables in each word, creating a tactile experience that reinforces phonemic
          awareness.
        </p>

        <h2>Key Features</h2>
        <ul class="list-disc pl-10">
          <li><b>Built-in support for Elkonin boxes</b> with a tap-to-create gesture for a tactile experience that builds phonemic awareness</li>
          <li>The only tool with built-in <b>syllable division</b> & separate syllable boxes</li>
          <li>
            <b>Two preloaded mats</b> that provide flexible options for your lessons, whether you need A-Z alphabet tiles or more advanced sounds
          </li>
          <li><b>Interactive layout</b> compatible with desktops, iPads and even smart boards, allowing students to engage on multiple platforms</li>
          <li><b>Heart tile</b> that can be used to work on spelling irregular words</li>
        </ul>
      </div>
    </div>
  </div>
</section>
<section id="partners" class="feature" style="background: #012a51;">
  <div class="feature-title"><h1>Trusted by the best</h1></div>
  <div class="inner-content">
    <div class="short-description">
      <p>
        We are proud to partner with leading literacy programs, schools, and districts around the country to provide the absolute best phonics
        experience for students and educators!
      </p>
    </div>
    <div class="partner-logos">
      <PartnerCard name="Sage Literacy" logo={sageLogo} url="https://www.sageliteracy.org/" />
      <PartnerCard name="Slant System" logo={slantLogo} url="https://www.slantsystem.com/" />
      <PartnerCard name="Reed Charitable Foundation" logo={reedLogo} url="https://reedcharitablefoundation.org/" />
      <PartnerCard name="Forest City Elementary" logo={forestCityLogo} url="https://www.forestcity.k12.ia.us/home" />
    </div>
    <div class="short-description">
      <h2 style="text-align: center;">Want to join the team?</h2>
      <p>
        If your organization is looking to enhance your phonics instruction, we'd love to work with you to empower your teachers and fast-track your
        students!
      </p>
      <div class="row flex-center flex-wrap">
        <a class="btn" href="/organization"><h2>learn more</h2></a>
        <a class="btn" href="/organization#form" rel="external"><h2>get an estimate</h2></a>
      </div>
    </div>
  </div>
</section>
<section class="epilogue">
  <h1>Ready to get started?</h1>
  <p>See our pricing plans and try Blend now!</p>
  <div class="side-by-side">
    <a class="btn" href="/pricing#plans" rel="external"><h2>pricing plans</h2></a>
    <a class="btn" href={$appUrl} target="_blank" rel="noopener noreferrer" on:click={() => window.gtag('event', 'open_app')}><h2>try the app</h2></a>
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
    margin-top: 2rem;
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
    max-width: 70rem;
    margin: 0px;
    text-align: justify;
    flex-basis: 40rem;
  }

  .description,
  .epilogue > p,
  h2 {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .short-description {
    max-width: 60rem;
    margin: 0px;
    text-align: justify;
    text-align-last: center;
  }

  .side-by-side > .description {
    width: 30%;
  }

  .partner-logos {
    display: flex;
    flex-direction: row;
    gap: 3rem;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100%;
    margin: 2rem 0;
  }

  .feature {
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
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
