<script lang="ts">
  import summer from '$lib/assets/people/summer-headshot.jpg';
  import steph from '$lib/assets/people/stephanie-headshot.jpg';
  import adrian from '$lib/assets/people/adrian-headshot.jpg';
  import blendTeam from '$lib/assets/people/full-blend-team.jpg';
</script>

<svelte:head>About</svelte:head>

<div class="content">
  <section class="paper">
    <h1>Meet the Team</h1>
    <div class="people">
      <div class="person">
        <img src={summer} alt="Summer Kiesel headshot" style="border-color: #007b83;" />
        <h2>Summer Kiesel, C-SLDI</h2>
        <p>Co-Founder</p>
        <p>Reading Specialist</p>
        <a href="mailto:summer@blendreading.com"><p class="subtitle">Contact Summer</p></a>
      </div>
      <div class="person">
        <img src={steph} alt="Stephanie Cruz headshot" style="border-color: #3b2e86;" />
        <h2>Stephanie Cruz</h2>
        <p>Co-Founder</p>
        <p>Developer</p>
        <a href="mailto:stephanie@blendreading.com"><p class="subtitle">Contact Stephanie</p></a>
      </div>
      <div class="person">
        <img src={adrian} alt="Adrian Moya headshot" style="border-color: #cf524e;" />
        <h2>Adrian Moya</h2>
        <p>Co-Founder</p>
        <p>Developer</p>
        <a href="mailto:adrian@blendreading.com"><p class="subtitle">Contact Adrian</p></a>
      </div>
    </div>
    <div class="text">
      <p>
        It all started with two old friends catching up over lunch. Summer and Stephanie, who have been friends since 2004, 
        were talking about friends, family, and work. Summer, working as a reading specialist at her own tutoring business, 
        mentioned that she was frustrated with one of the tools she used in her phonics instruction. She explained the tool: a blending board. 
        Physical boards didn't work very well for her online sessions, and the virtual options out there were clunky and missing basic features.
      </p>
      <p>
        As luck would have it, Stephanie had just started a software company with Adrian, and felt inspired and excited to build a solution
        that could help Summer teach kids to read. Stephanie and Adrian had always been interested in the intersection of education and technology,
        so it was a perfect partnership. 
      </p>
      <h1>Our Mission</h1>
      <p>
        At Blend Reading, we believe in literacy for all children. We want to empower educators by providing innovative tools that make phonics instruction more engaging, 
        effective, and accessible for both teachers and students.
        That's why we built Blend, our virtual blending board app inspired by traditional tools and elevated to transform phonics instruction.
      </p>
    </div>
    <div class="epilogue">
      <img src={blendTeam} alt="Stephanie, Adrian, and Summer - Founders of Blend Reading" />
      <p>
        We hope you love it!
        <br />
        <i>- The Blend Team</i>
      </p>
    </div>
  </section>
</div>

<style>
  .subtitle {
    font-size: 1.1rem;
    text-decoration: underline;
    margin-bottom: 0;
  }
  @media (max-width: 480px) {
    .paper {
      margin: 2rem 0;
      padding: 0 !important;
      width: 100% !important;
    }
    .epilogue img{
      width: 100% !important;
    }
  }
  .epilogue {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .epilogue img {
    width: 60%;
    border-radius: 20px;
  }
  .paper {
    width: 70%;
  }
  h1 {
    text-align: center;
  }
  .people {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }
  .person {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .person>a>h3, .person>p{
    margin: 0;
    padding: 0;
  }
  .person img {
    width: 150px;
    border: 4px solid black;
    border-radius: 100%;
  }
  .text {
    padding: 0rem 1rem;
  }
</style>