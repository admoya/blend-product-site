<script lang="ts">
  import { user } from '$lib/firebase';
  import type { PageData } from './$types';

  export let data: PageData;
  const { isSubscribedToBlendPro, subscriptionPendingCancellation, subscriptionPeriodEnd } = data;

  // Remove query params because they are handled on the server and any relevant state should be passed as a prop
  window.history.replaceState({}, document.title, window.location.toString().replace(window.location.search, ''));
</script>

<h1>Manage Account</h1>
<h2>Profile Info</h2>
<div>
  <h3>Name</h3>
  <p>{$user?.displayName}</p>
</div>
<div>
  <h3>UID</h3>
  <p>{$user?.uid}</p>
</div>
<div>
  <h3>Subscription Status</h3>
  {#if isSubscribedToBlendPro} 
    <p>You are subscribed to Blend Pro.</p>
    {#if subscriptionPendingCancellation}
      <p>Your subscription has been cancelled and will expire at {new Date(subscriptionPeriodEnd * 1000).toDateString()}. You will not be charged again.</p>
      <p>If you wish to reactivate your subscription, click the button below</p>
      <form action="?/reactivateSubscription" method="POST">
        <button id="checkout-and-portal-button" type="submit">Reactivate</button>
      </form>
    {:else}
        <p>Your next billing period will start on {new Date(subscriptionPeriodEnd * 1000).toDateString()}</p>
        <form action="?/cancelSubscription" method="POST">
          <button id="checkout-and-portal-button" type="submit">Unsubscribe</button>
        </form>
    {/if}
  {:else}
    <p>Not Subscribed</p>
    <form action="?/createSubscriptionOrder" method="POST">
      <input type="hidden" name="email" value={$user?.email}>
      <input type="hidden" name="name" value={$user?.displayName}>
      <button id="checkout-and-portal-button" type="submit">Subscribe</button>
    </form>
  {/if}
</div>