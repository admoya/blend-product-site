<script lang="ts">
  import { goto } from "$app/navigation";
  import { user, signOut } from "$lib/firebase";
  import type { PageData } from "./$types";

  export let data: PageData;
  const {
    isSubscribedToBlendPro,
    subscriptionPendingCancellation,
    subscriptionPeriodEnd,
  } = data;
  // Remove query params because they are handled on the server and any relevant state should be passed as a prop
  window.history.replaceState(
    {},
    document.title,
    window.location.toString().replace(window.location.search, "")
  );

  //@ts-ignore
  window.debugBlendUser = async () => {
    const idToken = await $user?.getIdToken();
    const { customToken } = await (
      await fetch("/login/customToken", {
        method: "POST",
        body: JSON.stringify({ idToken }),
      })
    ).json();
    console.log(
      `
        uid: ${$user?.uid},
        id_token: ${idToken},
        custom_token: ${customToken}
      `
    );
  };

  let disableSignOut = false;
  const onSignOutCLicked = async () => {
    disableSignOut = true;
    await signOut();
    goto('/login');
  }
</script>

<svelte:head>
  <title>My Account</title>
</svelte:head>

<div class="content">
  <h1>Manage Account</h1>
  <section class="info">
    <h2>Profile Info</h2>
    <div class="detail">
      <h3>Name</h3>
      <p>{$user?.displayName}</p>
    </div>
    <div class="detail">
      <h3>Email</h3>
      <p>{$user?.email}</p>
    </div>
    <div class="detail">
      <button disabled={disableSignOut} on:click={onSignOutCLicked} class="btn">Sign Out</button>
    </div>
  </section>
  <section class="info">
    <h2>Subscription Information</h2>
    <div class="detail">
      <h3>Your Blend Plan</h3>
      {#if isSubscribedToBlendPro}
        <p>Blend PRO</p>
        <div class="detail">
          <h3>Billing</h3>
          {#if subscriptionPendingCancellation}
          <p>
            Your subscription has been cancelled and will expire {new Date(
              subscriptionPeriodEnd * 1000
            ).toLocaleDateString()}. You will not be charged again.
          </p>
          <p>
            If you wish to reactivate your subscription, click the button below.
          </p>
          <form action="?/redirectToCustomerPortal" method="POST">
            <button id="checkout-and-portal-button" type="submit" class="btn"
              >Manage Subscription</button
            >
          </form>
        {:else}
          <p>
            Your next billing period starts on {new Date(
              subscriptionPeriodEnd * 1000
            ).toLocaleDateString()}
          </p>
          <form action="?/redirectToCustomerPortal" method="POST">
            <button id="checkout-and-portal-button" type="submit" class="btn"
              >Manage Subscription</button
            >
          </form>
          <p>
            If you wish to update your payment information, please contact us at
          </p>
          <p><a href="mailto:blend-support@csma.technology">blend-support@csma.technology</a>.</p>
        {/if}
        </div>
      {:else}
        <p>Blend Basic</p>
        <form action="?/createSubscriptionOrder" method="POST">
          <input type="hidden" name="email" value={$user?.email} />
          <input type="hidden" name="name" value={$user?.displayName} />
          <button id="checkout-and-portal-button" type="submit" class="btn">Upgrade to Blend Pro</button>
        </form>
      {/if}
    </div>
  </section>
</div>

<style>
  @media (max-width: 480px) {
    .info {
      width: 80% !important;
    }
  }

  .btn {
        font-family: "Heebo"; 
        font-weight: bold;
        font-size: 1.2rem;
    }
  p, h3 {
    margin: 0;
  }
  .info {
    width: 50%;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .detail {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem;
  }
  .content {
    row-gap: 2rem;
  }
</style>