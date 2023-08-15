// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics, isSupported } from "firebase/analytics";
import { connectAuthEmulator, getAuth, type User } from 'firebase/auth';
import { getDatabase, ref, get, set, child, connectDatabaseEmulator } from 'firebase/database';
import { signOut as firebaseSignOut } from "firebase/auth";
import { readable } from "svelte/store";
import { browser, dev } from "$app/environment";
import { PUBLIC_DEPLOY_CONTEXT } from '$env/static/public';

const testConfig = {
  apiKey: "AIzaSyChSr3zgWHFi5tV9Fu2tOJrY-7QuHmcnGg",
  authDomain: "blend-test-96c76.firebaseapp.com",
  projectId: "blend-test-96c76",
  storageBucket: "blend-test-96c76.appspot.com",
  messagingSenderId: "170450637812",
  appId: "1:170450637812:web:28ee171ed2c615af225fa1"
};

const productionConfig = {
  apiKey: "AIzaSyC0SkY_uSkrB-oIaFxeC0wOVc_jgF3NMVo",
  authDomain: "csma-blend.firebaseapp.com",
  projectId: "csma-blend",
  storageBucket: "csma-blend.appspot.com",
  messagingSenderId: "958586010509",
  appId: "1:958586010509:web:44c736a1b5f873147b1bc4",
  measurementId: "G-HBJML0L0RM"
};

const app = initializeApp(PUBLIC_DEPLOY_CONTEXT === 'production' ? productionConfig : testConfig);
// export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const database = getDatabase(app, dev ? 'http://127.0.0.1:9000/?ns=csma-blend-default-rtdb' : undefined);
if (dev) {
  console.log('Loading Firebase in Emulator mode');
  connectAuthEmulator(auth, 'http://127.0.0.1:9099');
  connectDatabaseEmulator(database, '127.0.0.1', 9000);
}

export const getUserData = async (path?: string) => auth.currentUser && (await get(child(ref(database), `users/${auth.currentUser.uid}/${path}`))).val();
export const setUserData = async (path: string, value: any) => auth.currentUser && (await set(child(ref(database), `users/${auth.currentUser.uid}/${path}`), value))

export const setWillAttempLogin = browser ? (willAttempt: boolean) => localStorage.setItem('willAttemptLogin', willAttempt ? 'yes' : 'no') : () => { };
export const willAttemptLogin = browser ? () => localStorage.getItem('willAttemptLogin') === 'yes' : () => false;

export const user = readable(auth.currentUser, (set) => {
  set(auth.currentUser);
  auth.onAuthStateChanged(user => {
    setWillAttempLogin(!!user);
    set(user);
  });
});

export const signOut = async () => {
  setWillAttempLogin(false);
  await firebaseSignOut(auth);
};