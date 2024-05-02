<script lang="ts">
  import { auth, customLoginToken, setWillAttempLogin } from '$lib/firebase';
  import { page } from '$app/stores';
  import { EmailAuthProvider, GoogleAuthProvider, type User } from 'firebase/auth';
  import * as firebaseui from 'firebaseui';
  import 'firebaseui/dist/firebaseui.css';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { isEmbeddedBrowser } from '$lib/utils';
  import Alert from '$lib/components/Alert.svelte';

  const ui = firebaseui.auth.AuthUI.getInstance() ?? new firebaseui.auth.AuthUI(auth);

  const APP_URL = 'https://app.blendreading.com';
  const PREVIEW_APP_URL = 'https://preview-app.blendreading.com';

  const searchParams = new URLSearchParams(decodeURIComponent($page.url.search));
  const redirectParam = searchParams.get('successRedirect') || '/';
  const actionParam = searchParams.get('action') || '';
  const allOtherParams = Array.from(searchParams.entries())
    .filter(([key]) => key !== 'successRedirect' && key !== 'action')
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  type RedirectBuilderFunc = (user: User, token?: string) => string;
  let redirectBuilder: RedirectBuilderFunc;
  let isAppRedirect = false;
  switch (redirectParam) {
    case 'account':
    case '/':
      redirectBuilder = () =>
        actionParam
          ? `/account?action=${actionParam}${allOtherParams ? `&${allOtherParams}` : ''}`
          : `/account${allOtherParams ? `?${allOtherParams}` : ''}`;
      break;
    case 'app':
      if (actionParam) {
        redirectBuilder = () => `/account?action=${actionParam}&successRedirect=app&jumpScene=${$page.url.searchParams.get('jumpScene') || 'none'}`;
      } else {
        isAppRedirect = true;
        redirectBuilder = (user, token) =>
          `${APP_URL}?jumpScene=${encodeURIComponent($page.url.searchParams.get('jumpScene') || 'none')}${
            token ? `&loginToken=${encodeURIComponent(token)}` : ''
          }`;
      }
      break;
    case 'previewApp':
      if (actionParam) {
        redirectBuilder = () =>
          `/account?action=${actionParam}&successRedirect=previewApp&jumpScene=${$page.url.searchParams.get('jumpScene') || 'none'}`;
      } else {
        isAppRedirect = true;
        redirectBuilder = (user, token) =>
          `${PREVIEW_APP_URL}?jumpScene=${encodeURIComponent($page.url.searchParams.get('jumpScene') || 'none')}${
            token ? `&loginToken=${encodeURIComponent(token)}` : ''
          }`;
      }
      break;
    default:
      redirectBuilder = () => decodeURIComponent(redirectParam);
  }
  onMount(() => {
    ui.start('#firebaseui-auth-container', {
      callbacks: {
        signInSuccessWithAuthResult(authResult, redirectUrl) {
          awaitingRedirect = true;
          setWillAttempLogin(true);
          if (authResult.additionalUserInfo.isNewUser) gtag('event', 'new_account');
          (async () => {
            // Sets a session cookie on the browser
            const sessionCookiePromise = fetch('/login/sessionCookie', {
              method: 'POST',
              body: JSON.stringify({ idToken: authResult.user.accessToken }),
            });
            // Now that we have logged in, the customToken store in firebase.ts will be updated, so we wait for that before redirecting
            const unsubscribe = customLoginToken.subscribe(async (customToken) => {
              if (customToken) {
                setTimeout(() => unsubscribe()); // Make sure this doesn't fire again after the first time the token is updated. SetTimeout is to ensure unsubscribe is defined, because this callback may get called immediately
                await sessionCookiePromise; // Make sure this finished to set the login cookie before redirecting
                if (!actionParam && authResult.additionalUserInfo.isNewUser) {
                  goto(`/account${$page.url.search || '?'}&action=choosePlan`);
                } else if (isAppRedirect) {
                  window.location.replace(redirectBuilder(authResult.user, customToken));
                } else {
                  goto(redirectBuilder(authResult.user), { replaceState: true });
                }
              }
            });
          })();
          return false;
        },
      },
      signInSuccessUrl: `'/login'`,
      signInOptions: [
        EmailAuthProvider.PROVIDER_ID,
        // GoogleAuthProvider.PROVIDER_ID,
        {
          provider: GoogleAuthProvider.PROVIDER_ID,
          customParameters: {
            prompt: 'select_account',
          },
        },

        // FacebookAuthProvider.PROVIDER_ID
      ],
      signInFlow: 'popup',
    });
  });

  if (isEmbeddedBrowser()) {
    // Hacky, but adding this class for the google button is the easiest way to disable it.
    const disabledButtonClass = `
      .firebaseui-idp-google {
        pointer-events: none;
        opacity: .8;
        background-color: darkgray !important;
      }
      `;
    const styleEl = document.createElement('style');
    styleEl.textContent = disabledButtonClass;
    document.head.appendChild(styleEl);
  }

  let awaitingRedirect = false;
</script>

<svelte:head>
  <title>Login - Blend</title>
</svelte:head>

<div class="content">
  {#if !awaitingRedirect}
    <h1>Log in or Create Account</h1>
    <h2>Please choose one of the following options:</h2>
  {:else}
    <h1>Please wait</h1>
    <h2>Logging you in...</h2>
  {/if}
  <div id="firebaseui-auth-container" />
  {#if isEmbeddedBrowser()}
    <Alert
      message="You're using an in-app browser, which may cause sign-in issues. For better results, switch to a regular browser like Safari or Chrome." />
  {/if}
</div>

<style>
  .content {
    padding: 10%;
  }
</style>
