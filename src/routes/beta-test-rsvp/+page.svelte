<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  let email: String | null = '';
  let name: String | undefined = '';

  onMount(() => {
    name = $page.url.searchParams.get('name')?.replaceAll(/'|"|blend user/gi, '');
    email = $page.url.searchParams.get('email');
  });
</script>

<div class="content">
  <h1>Beta Test Form</h1>
  <div class="paper" style="margin-top: 0">
    <p>Thank you for your interest in our Blend Beta Test! We truly appreciate your time and feedback.</p>
    <p>Please fill in your contact information below, and we will send detailed instructions when the test begins.</p>
    <form data-netlify="true" name="beta-test-rsvp" method="POST" action="/beta-test-rsvp/thank-you">
      <input type="hidden" name="form-name" value="beta-test-rsvp" />
      <label>
        Name
        <input bind:value={name} type="text" name="name" required />
      </label>
      <label>
        Email
        <input bind:value={email} type="email" name="email" required />
      </label>
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
