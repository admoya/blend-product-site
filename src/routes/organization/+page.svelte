<script lang="ts">
  import banner from '$lib/assets/organization/organization-header-graphic.png';
  import library from '$lib/assets/organization/shared-library-graphic.png';
  import network from '$lib/assets/organization/members-graphic.png';
  import form from '$lib/assets/organization/form-graphic.png';
</script>

<svelte:head>
  <title>Organization Pricing</title>
</svelte:head>

<main>
  <div class="content">
    <div class="header">
      <div class="side-by-side">
        <div class="description">
          <p class="subtitle">Blend Organization Licensing</p>
          <h1>Blend is better together.</h1>
          <p>
            Whether you're part of a large school district or a small tutoring group, organization licensing could the perfect plan for your team.
          </p>
          <p>
            Blend is even more powerful with shared resources and seamless collaboration, empowering your team to save time in lesson planning and
            focus on cultivating fluent readers! Request a quote or read on to learn more.
          </p>
          <div class="side-by-side">
            <a class="btn btn-purple" href="/organization#form">Request a quote</a>
            <a class="btn btn-outlined" href="/organization#features">Learn More</a>
          </div>
        </div>
        <img src={banner} alt="playlists side by side" />
      </div>
    </div>
    <div class="features" id="features">
      <div class="side-by-side">
        <div class="feature" id="sharing">
          <h2>Share resources, save time</h2>
          <img src={library} alt="playlists side by side" />
          <p>
            With an organization, you can share your decks and playlists with the entire team at the touch of a button. Stay consistent with your
            curriculum by building all of your lessons ahead of time for any teacher to use throughout the year.
          </p>
          <ul>
            <li>Reduce duplicate work by sharing lessons with everyone</li>
            <li>Access organization decks and playlists seamlessly</li>
            <li>Differentiate with your separate custom resources</li>
          </ul>
        </div>
        <div class="feature" id="members">
          <h2>The more the merrier</h2>
          <img src={network} alt="playlists side by side" />
          <p>
            We make it easy to get your team onboard and stay organized. With separate admin and member roles, you can make sure everyone has the
            right access without having too many cooks in the kitchen.
          </p>
          <ul>
            <li>Easily add and remove organization members</li>
            <li>Promote multiple members to admin for increased collaboration</li>
            <li>Manage organization decks and playlists from the same dashboard</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="other-features">
      <div class="title">
        <h1>Other features</h1>
      </div>
      <div class="other-features-list">
        <div class="item">
          <div class="side-by-side">
            <span class="material-symbols-rounded item-icon">new_releases</span>
            <div class="item-text">
              <h2>Blend Pro for everyone</h2>
              <p>
                Organization members benefit from access to all Blend Pro features like unlimited custom decks, playlist creation, and the deck
                library.
              </p>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="side-by-side">
            <span class="material-symbols-rounded item-icon">live_help</span>
            <div class="item-text">
              <h2>Dedicated support</h2>
              <p>
                We're with you every step of the way! We provide onboarding support, demos and trainings, and ongoing support for any issues you come
                across.
              </p>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="side-by-side">
            <span class="material-symbols-rounded item-icon">lock_open</span>
            <div class="item-text">
              <h2>Early access to new features</h2>
              <p>Be our beta testers and drive the future of Blend Reading's tools for phonics instruction.</p>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="side-by-side">
            <span class="material-symbols-rounded item-icon">widgets</span>
            <div class="item-text">
              <h2>Custom pricing and billing</h2>
              <p>
                We'll work with you to find a plan that suits your team! Choose monthly or yearly billing, and adjust the number of seats in your
                license at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="request-a-quote" id="form">
      <div class="side-by-side">
        <div class="quote-details">
          <h1>Interested?</h1>
          <p>Submit this form to request a quote for your organization.</p>
          <img src={form} alt="playlists side by side" />
        </div>
        <form
          name="organization-form"
          class="quote-form"
          action="/organization/request-a-quote"
          method="POST"
          netlify-honeypot="bot-field"
          data-netlify="true">
          <input type="hidden" name="form-name" value="organization-form" />
          <input type="hidden" name="subject" value="Org License Quote Request from blendreading.com" />
          <label>Name<input name="name" placeholder="Enter name" required /></label>
          <label>Email<input type="email" name="email" placeholder="Enter email" required /></label>
          <label>Organization Name<input name="orgName" placeholder="Enter organization name" required /></label>
          <label>How many teachers are in your organization?<input type="number" placeholder="Enter number of seats" name="seats" required /></label>
          <label for="billing">How would you prefer to be billed?</label>
          <select name="billing" id="billing">
            <option value="yearly">Yearly</option>
            <option value="monthly">Monthly</option>
            <option value="monthly">Other (Please specify)</option>
          </select>
          <label
            >Additional Info (Optional)<textarea name="message" placeholder="Feel free to provide more details about your needs."></textarea></label>
          <button class="btn btn-blurple" type="submit"><h3>Submit</h3></button>
        </form>
      </div>
    </div>
  </div>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #e0e6ff;
    padding: 2rem;
  }
  .content {
    width: 80%;
    text-align: left;
  }
  .header {
    padding: 2rem;
  }
  .subtitle {
    font-size: 1rem;
    font-weight: bolder;
    color: #588dff;
  }
  .header img {
    object-fit: contain;
    flex-basis: 30rem;
    width: 45%;
  }
  .description {
    width: 45%;
    flex-basis: 35rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .features {
    padding: 2rem;
  }
  .features h2 {
    font-family: 'Contrail One';
    font-size: 2.2rem;
    margin: 1rem;
  }
  .feature img {
    object-fit: contain;
    width: 100%;
  }
  .feature {
    flex-basis: 27rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem 2rem;
    border-radius: 10px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    margin: 1rem;
  }
  ul {
    margin: 0;
    padding: 0 2rem;
    list-style-type: circle;
  }
  #sharing {
    background: linear-gradient(50deg, #b0b8fe 25%, #99c2f4 75%);
  }
  #members {
    background: linear-gradient(60deg, #99c2f4 20%, #91dbf9 80%);
  }
  .other-features {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
  }
  .other-features-list {
    margin: 1rem;
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .item {
    display: flex;
    flex-direction: column;
    flex-basis: 25rem;
  }
  .item-icon {
    font-size: 2.4rem;
    color: #588dff;
  }
  .item-text {
    width: 80%;
  }
  .item-text p {
    margin-top: 0;
  }
  .request-a-quote {
    display: flex;
    justify-content: space-between;
    background: #f5f5ef;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    margin: 1rem;
  }
  .quote-details {
    display: flex;
    flex-direction: column;
    flex-basis: 20rem;
    justify-content: center;
    align-items: center;
  }
  .quote-details img {
    max-width: 80%;
  }
  .quote-form {
    display: flex;
    flex-direction: column;
    flex-basis: 35rem;
  }
  input,
  textarea,
  select {
    display: block;
    background: white;
    padding: 0.8rem;
    margin: 0.5rem 0;
    border-radius: 8px;
    border: solid 1px #808080;
    font-family: 'Heebo';
    font-size: 1.2rem;
    resize: vertical;
    width: 100%;
    box-sizing: border-box;
  }
  h1 {
    margin: 0;
  }
  @media (max-width: 480px) {
    main {
      margin: 0;
      padding: 0;
      width: 100%;
    }
    .content {
      margin: 0;
      padding: 0;
      width: 100%;
    }
    .features {
      margin: 0;
      padding: 0;
    }
    .feature {
      width: 100%;
    }
    .other-features-list {
      width: 100%;
    }
    .quote-details {
      text-align: center;
    }
    .features h2 {
      text-align: center;
    }
  }
</style>
