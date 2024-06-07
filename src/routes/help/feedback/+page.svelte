<script lang="ts">
  import { browser } from '$app/environment';
  import { enhance } from '$app/forms';
  import AuthCheck from '$lib/components/AuthCheck.svelte';
  import { user } from '$lib/firebase';
</script>

<svelte:head>
  <title>Feedback - Blend</title>
</svelte:head>

{#if browser}
  <AuthCheck />
{/if}

<div class="content">
  <h1>We want your feedback!</h1>
  <div class="form-details">
    <p>We'd love to hear what you think about our app.</p>
    <p>Complete the form below to tell us about your experience with Blend and submit any ideas for new features!</p>
    <form name="feedback" method="post" action="/help/feedback/success" data-netlify="true">
      <input type="hidden" name="form-name" value="feedback" />
      <input type="hidden" name="subject" value="Feedback Submission from blendreading.com" />
      <input type="hidden" name="uid" value={$user?.uid} />
      <input type="hidden" name="name" value={$user?.displayName} />
      <input type="hidden" name="email" value={$user?.email} />
      <p><label class="form-label">What do you like about using Blend?<textarea name="positiveFeedback" required></textarea></label></p>
      <p><label class="form-label">What could make your experience better?<textarea name="improvementFeedback" required></textarea></label></p>
      <p><label class="form-label">What new features would you like to see?<textarea name="featureRequests" required></textarea></label></p>
      <fieldset class="radio">
        <legend class="form-label"><p>Can we publish your responses on our website?</p></legend>
        <label>
          <input type="radio" name="publishable" value="yes" checked />
          Yes
        </label>
        <label>
          <input type="radio" id="publishChoice2" name="publishable" value="anonymous" />
          Yes, but please keep me anonymous
        </label>
        <div>
          <label>
            <input type="radio" name="publishable" value="no" />
            No
          </label>
        </div>
      </fieldset>
      <p><button class="btn" type="submit">Submit</button></p>
    </form>
  </div>
</div>

<style>
  @media (max-width: 480px) {
    form {
      width: 100% !important;
    }
  }

  p {
    margin: 0;
  }
  .form-details {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2.5rem;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 10px;
  }
  .btn {
    margin: 1rem 0;
    font-size: 1.5rem;
  }
  form {
    margin: 1rem;
    width: 50%;
  }
  textarea {
    display: block;
    margin-bottom: 1rem;
    background-color: white;
    padding: 10px 8px;
    border-radius: 8px;
    border: solid 1px black;
    font-family: 'Heebo';
    font-size: 1.2rem;
    width: 100%;
    resize: vertical;
  }
  .form-label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
    text-align: left;
  }

  .radio {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    border: none;
    padding: 0;
  }
</style>
