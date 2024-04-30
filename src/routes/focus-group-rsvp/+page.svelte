<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  let email: String | null = '';
  let name: String | null = '';

  onMount(() => {
    name = $page.url.searchParams.get('name');
    email = $page.url.searchParams.get('email');
  });
</script>

<div class="content">
  <h1>Focus Group RSVP</h1>
  <div class="paper" style="margin-top: 0">
    <p>
      Thank you for the interest in our focus group! Please fill in your contact information below and select a time to join us. We will reach out via
      email with the meeting details.
    </p>
    <form data-netlify="true" name="focus-group-rsvp" method="POST" action="/focus-group-rsvp/thank-you">
      <input type="hidden" name="form-name" value="focus-group-rsvp" />
      <label>
        Name
        <input bind:value={name} type="text" name="name" required />
      </label>
      <label>
        Email
        <input bind:value={email} type="email" name="email" required />
      </label>
      <fieldset>
        <legend> Availibility </legend>
        <label style="display: block;">
          <input style="display: inline;" type="checkbox" name="time1" value="Friday, May 3rd, 6:30PM EST" />
          Friday, May 3rd, 6:30PM EST
        </label>
        <label style="display: block;">
          <input style="display: inline;" type="checkbox" name="time2" value="Wednesday, May 8th, 7:00PM EST" />
          Wednesday, May 8th, 7:00PM EST
        </label>
        <label style="display: block;">
          <input style="display: inline;" type="checkbox" name="time3" value="Saturday, May 11th, 11:00AM EST" />
          Saturday, May 11th, 11:00AM EST
        </label>
      </fieldset>
      <button class="btn btn-purple" style="margin: 0" type="submit">RSVP</button>
    </form>
  </div>
</div>

<style>
  form {
    display: flex;
    flex-direction: column;
    max-width: 30rem;
    margin: 1rem auto;
    gap: 1rem;
  }

  input[type='text'],
  input[type='email'] {
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
</style>
