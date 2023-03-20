<script lang="ts">
    import { auth, setWillAttempLogin } from "$lib/firebase";
    import { page } from "$app/stores";
    import { EmailAuthProvider, FacebookAuthProvider, GoogleAuthProvider, type User } from "firebase/auth";
    import * as firebaseui from 'firebaseui'
    import 'firebaseui/dist/firebaseui.css'
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    const ui = firebaseui.auth.AuthUI.getInstance() ?? new firebaseui.auth.AuthUI(auth);
    
    const APP_URL = 'https://app.blendreading.com';
    const PREVIEW_APP_URL = 'https://preview-app.blendreading.com';

    const redirectParam = $page.url.searchParams.get('successRedirect') || '/';
    
    type RedirectBuilderFunc = (user: User, token?: string) => string;
    let redirectBuilder: RedirectBuilderFunc;
    let isAppRedirect = false;
    switch (redirectParam) {
        case 'account':
            redirectBuilder = (user: User) => `/account/${user.uid}`;
            break;
        case 'app':
            isAppRedirect = true;
            redirectBuilder = (user, token) => `${APP_URL}?jumpScene=${encodeURIComponent($page.url.searchParams.get('jumpScene') || 'none')}${token ? `&context=${encodeURIComponent(JSON.stringify({token}))}` : ''}`;
            break;
        case 'previewApp':
            isAppRedirect = true;
            redirectBuilder = (user, token) => `${PREVIEW_APP_URL}?jumpScene=${encodeURIComponent($page.url.searchParams.get('jumpScene') || 'none')}${token ? `&context=${encodeURIComponent(JSON.stringify({token}))}` : ''}`;
            break;
        default:
            redirectBuilder = () => redirectParam;
    }
    onMount(() => {
        ui.start('#firebaseui-auth-container', {
            callbacks: {
                signInSuccessWithAuthResult(authResult, redirectUrl) {
                    setWillAttempLogin(true);
                    if (isAppRedirect) {
                        fetch('/login/customToken', { method: 'POST', body: JSON.stringify({ idToken: authResult.user.accessToken })})
                            .then(async (response) => {
                                const token = (await response.json()).customToken;
                                window.location.replace(redirectBuilder(authResult.user, token));
                            });
                    } else {
                        goto(redirectBuilder(authResult.user), { replaceState: true })
                    }
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
        })
    });
</script>

<h1>Log in or Create Account</h1>

<h2>Please choose one of the following options:</h2>
<div id="firebaseui-auth-container"/>

<style>
    button {
        max-width: 100px;
    }
</style>