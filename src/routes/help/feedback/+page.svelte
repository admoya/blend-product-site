<script lang="ts">
  import { browser } from '$app/environment';
  import AuthCheck from '$lib/components/AuthCheck.svelte';
  import { user } from '$lib/firebase';
  import { page } from '$app/stores';
  import { beforeUpdate } from 'svelte';

  let originalSearchParams = new URLSearchParams();
  let didCleanParams = false;
  beforeUpdate(() => {
    if (didCleanParams) return;
    originalSearchParams = new URLSearchParams($page.url.search);
    window.history.replaceState({}, '', '/help/feedback');
    didCleanParams = true;
  });
</script>

<svelte:head>
  <title>Feedback - Blend</title>
</svelte:head>

{#if browser}
  <AuthCheck
    messageId="feedbackRedirect"
    loginRedirect={originalSearchParams.size ? `${$page.url.pathname}?${encodeURIComponent(originalSearchParams.toString())}` : $page.url.pathname} />
{/if}

<div class="content">
  <h1 class="my-4">We want your feedback!</h1>
  <div class="flex flex-col items-center rounded-xl bg-[rgba(255,255,255,0.15)] p-4 sm:p-10">
    <p>We'd love to hear what you think about our app.</p>
    <p>Complete the form below to tell us about your experience with Blend and submit any ideas for new features!</p>
    <form name="feedback" method="post" action="/help/feedback/success" data-netlify="true">
      <input type="hidden" name="form-name" value="feedback" />
      <input type="hidden" name="subject" data-remove-prefix value="Feedback Submission from blendreading.com" />
      <input type="hidden" name="uid" value={$user?.uid} />
      <input type="hidden" name="name" value={$user?.displayName} />
      <input type="hidden" name="email" value={$user?.email} />
      <fieldset class="radio mb-1">
        <legend class="form-label !mb-0">Would you recommend Blend to a fellow teacher?</legend>
        <div class="mx-auto my-2 flex gap-6">
          <label>
            <input type="radio" name="recommendation" value="yes" checked={originalSearchParams.get('recommendation') === 'yes'} />
            Yes
          </label>
          <label>
            <input type="radio" name="recommendation" value="no" checked={originalSearchParams.get('recommendation') === 'no'} />
            No
          </label>
        </div>
      </fieldset>
      <p>
        <label class="form-label"
          >What do you like about using Blend?<textarea name="positiveFeedback">{originalSearchParams.get('positiveFeedback') ?? ''}</textarea
          ></label>
      </p>
      <p>
        <label class="form-label"
          >What could make your experience better?<textarea name="improvementFeedback"
            >{originalSearchParams.get('improvementFeedback') ?? ''}</textarea
          ></label>
      </p>
      <p>
        <label class="form-label"
          >What new features would you like to see?<textarea name="featureRequests">{originalSearchParams.get('featureRequests') ?? ''}</textarea
          ></label>
      </p>
      <fieldset class="radio">
        <legend class="form-label !mb-0"><p>Can we publish your responses on our website?</p></legend>
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
      <button class="btn !mx-auto" type="submit">Submit</button>
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
