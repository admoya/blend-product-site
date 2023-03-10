// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, get, set, child } from 'firebase/database';
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signOut as firebaseSignOut, linkWithPopup, fetchSignInMethodsForEmail } from "firebase/auth";
import type { AuthProvider, AuthError } from "firebase/auth";
import { readable } from "svelte/store";

const firebaseConfig = {
  apiKey: "AIzaSyC0SkY_uSkrB-oIaFxeC0wOVc_jgF3NMVo",
  authDomain: "csma-blend.firebaseapp.com",
  projectId: "csma-blend",
  storageBucket: "csma-blend.appspot.com",
  messagingSenderId: "958586010509",
  appId: "1:958586010509:web:44c736a1b5f873147b1bc4",
  measurementId: "G-HBJML0L0RM"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const database = getDatabase(app);

export const getUserData = async (path?: string) => auth.currentUser && (await get(child(ref(database), `users/${auth.currentUser.uid}/${path}`))).val();
export const setUserData = async (path: string, value: any) => auth.currentUser && (await set(child(ref(database), `users/${auth.currentUser.uid}/${path}`), value))

export const user = readable(auth.currentUser, (set) => {
    set(auth.currentUser);
    auth.onAuthStateChanged(user => set(user));
});

const signInFactory = (provider: AuthProvider) => async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        window.location.href = "/";
    } 
    catch (error) {
        console.error(error);
        console.log(JSON.stringify(error, null, 2));
        const authError = error as AuthError;
        if (authError.code === 'auth/account-exists-with-different-credential') {
            const providers = await fetchSignInMethodsForEmail(auth, authError.customData.email!);
            alert(`You previously signed in with ${providers[0]}, please use that option.`);
        }
    }
}

export const signInWithGoogle = signInFactory(new GoogleAuthProvider());
export const signInWithFacebook = signInFactory(new FacebookAuthProvider());
export const signOut = () => firebaseSignOut(auth);