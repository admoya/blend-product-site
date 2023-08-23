<script lang="ts">
  import { auth, setWillAttempLogin } from '$lib/firebase';
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

  const redirectParam = $page.url.searchParams.get('successRedirect') || '/';

  type RedirectBuilderFunc = (user: User, token?: string) => string;
  let redirectBuilder: RedirectBuilderFunc;
  let isAppRedirect = false;
  switch (redirectParam) {
    case 'account':
    case '/':
      redirectBuilder = (user: User) => `/account/${user.uid}`;
      break;
    case 'app':
      isAppRedirect = true;
      redirectBuilder = (user, token) =>
        `${APP_URL}?jumpScene=${encodeURIComponent($page.url.searchParams.get('jumpScene') || 'none')}${
          token ? `&context=${encodeURIComponent(JSON.stringify({ token }))}` : ''
        }`;
      break;
    case 'previewApp':
      isAppRedirect = true;
      redirectBuilder = (user, token) =>
        `${PREVIEW_APP_URL}?jumpScene=${encodeURIComponent($page.url.searchParams.get('jumpScene') || 'none')}${
          token ? `&context=${encodeURIComponent(JSON.stringify({ token }))}` : ''
        }`;
      break;
    default:
      redirectBuilder = () => decodeURIComponent(redirectParam);
  }
  onMount(() => {
    ui.start('#firebaseui-auth-container', {
      callbacks: {
        signInSuccessWithAuthResult(authResult, redirectUrl) {
          if (authResult.additionalUserInfo.isNewUser) gtag('event', 'new_account');
          setWillAttempLogin(true);
          fetch('/login/sessionCookie', { method: 'POST', body: JSON.stringify({ idToken: authResult.user.accessToken }) }).then(() => {
            if (isAppRedirect) {
              fetch('/login/customToken', { method: 'POST', body: JSON.stringify({ idToken: authResult.user.accessToken }) }).then(
                async (response) => {
                  const token = (await response.json()).customToken;
                  window.location.replace(redirectBuilder(authResult.user, token));
                },
              );
            } else {
              goto(redirectBuilder(authResult.user), { replaceState: true });
            }
          });
          return false;
        },
      },
      signInSuccessUrl: `'/login'`,
      signInOptions: [
        EmailAuthProvider.PROVIDER_ID,
        GoogleAuthProvider.PROVIDER_ID,
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
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<div class="content">
  <h1>Log in or Create Account</h1>
  <h2>Please choose one of the following options:</h2>
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
