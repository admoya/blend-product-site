// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics, isSupported } from "firebase/analytics";
import { connectAuthEmulator, getAuth, type User } from 'firebase/auth';
import { getDatabase, ref, get, set as fbSet, child, connectDatabaseEmulator, onValue } from 'firebase/database';
import { signOut as firebaseSignOut } from 'firebase/auth';
import { readable, writable } from 'svelte/store';
import { browser, dev } from '$app/environment';
import { PUBLIC_DEPLOY_CONTEXT } from '$env/static/public';

const testConfig = {
  apiKey: 'AIzaSyChSr3zgWHFi5tV9Fu2tOJrY-7QuHmcnGg',
  authDomain: 'blend-test-96c76.firebaseapp.com',
  projectId: 'blend-test-96c76',
  storageBucket: 'blend-test-96c76.appspot.com',
  messagingSenderId: '170450637812',
  appId: '1:170450637812:web:28ee171ed2c615af225fa1',
};

const productionConfig = {
  apiKey: 'AIzaSyC0SkY_uSkrB-oIaFxeC0wOVc_jgF3NMVo',
  authDomain: 'csma-blend.firebaseapp.com',
  projectId: 'csma-blend',
  storageBucket: 'csma-blend.appspot.com',
  messagingSenderId: '958586010509',
  appId: '1:958586010509:web:44c736a1b5f873147b1bc4',
  measurementId: 'G-HBJML0L0RM',
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

export const getUserData = async (path?: string) =>
  auth.currentUser && (await get(child(ref(database), `users/${auth.currentUser.uid}/${path}`))).val();
export const setUserData = async (path: string, value: any) =>
  auth.currentUser && (await fbSet(child(ref(database), `users/${auth.currentUser.uid}/${path}`), value));

export const setWillAttempLogin = browser ? (willAttempt: boolean) => localStorage.setItem('willAttemptLogin', willAttempt ? 'yes' : 'no') : () => {};
export const willAttemptLogin = browser ? () => localStorage.getItem('willAttemptLogin') === 'yes' : () => false;

export const createReadOnlyStore = <T>(path: string) =>
  readable<null | T>(null, (set) => {
    const unsubscribe = onValue(ref(database, path), (snapshot) => {
      set(snapshot.val());
    });
    return unsubscribe;
  });

export const createWritableStore = <T>(path: string) => {
  const { subscribe, update } = writable<null | T>(null, (set) => {
    const unsubscribe = onValue(ref(database, path), (snapshot) => {
      set(snapshot.val());
    });
    return unsubscribe;
  });
  return {
    subscribe,
    update,
    set: (newValue: T) => {
      fbSet(ref(database, path), newValue);
    },
  };
};

export const user = readable(auth.currentUser, (set) => {
  set(auth.currentUser);
  auth.onAuthStateChanged((user) => {
    setWillAttempLogin(!!user);
    set(user);
  });
});

const getCustomToken = async (user: User) => {
  const idToken = await user.getIdToken();
  const customToken = (
    await (
      await fetch('/login/customToken', {
        method: 'POST',
        body: JSON.stringify({ idToken }),
      })
    ).json()
  ).customToken;
  // set(customToken);
  return customToken;
};

export const customLoginToken = writable<string | null>(null, (set) => {
  let lastTokenPassed: Promise<string> | null = null;
  const setToken = (token: Promise<string> | null) => {
    lastTokenPassed = token;
    if (token === null) {
      set(null);
      return;
    }
    token.then((customToken) => {
      // This is to resolve sync issues, where we the user logs in and then out in quick succession, and the promise for the token is not yet resolved by the time it is set to null
      if (lastTokenPassed === token) {
        set(customToken);
      }
    });
  };
  auth.onAuthStateChanged((user) => {
    if (user) {
      setToken(getCustomToken(user));
    } else {
      setToken(null);
    }
  });
});

export const signOut = async () => {
  await fetch('/login/sessionCookie', {
    method: 'DELETE',
  });
  setWillAttempLogin(false);
  await firebaseSignOut(auth);
};

auth.onIdTokenChanged(async (user) => {
  if (user) {
    const decodedToken = await user.getIdTokenResult();
    if (decodedToken.authTime !== decodedToken.issuedAtTime) {
      fetch('/login/sessionCookie', {
        method: 'POST',
        body: JSON.stringify({
          idToken: await user.getIdToken(),
        }),
      });
    }
  }
});

// The below is taken from this gist: https://gist.github.com/mikelehen/3596a30bd69384624c11
/**
 * Fancy ID generator that creates 20-character string identifiers with the following properties:
 *
 * 1. They're based on timestamp so that they sort *after* any existing ids.
 * 2. They contain 72-bits of random data after the timestamp so that IDs won't collide with other clients' IDs.
 * 3. They sort *lexicographically* (so the timestamp is converted to characters that will sort properly).
 * 4. They're monotonically increasing.  Even if you generate more than one in the same timestamp, the
 *    latter ones will sort after the former ones.  We do this by using the previous random bits
 *    but "incrementing" them by 1 (only in the case of a timestamp collision).
 */
export const generatePushID = (() => {
  // Modeled after base64 web-safe chars, but ordered by ASCII.
  var PUSH_CHARS = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';

  // Timestamp of last push, used to prevent local collisions if you push twice in one ms.
  var lastPushTime = 0;

  // We generate 72-bits of randomness which get turned into 12 characters and appended to the
  // timestamp to prevent collisions with other clients.  We store the last characters we
  // generated because in the event of a collision, we'll use those same characters except
  // "incremented" by one.
  var lastRandChars: number[] = [];

  return function () {
    var now = new Date().getTime();
    var duplicateTime = now === lastPushTime;
    lastPushTime = now;

    var timeStampChars = new Array(8);
    for (var i = 7; i >= 0; i--) {
      timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
      // NOTE: Can't use << here because javascript will convert to int and lose the upper bits.
      now = Math.floor(now / 64);
    }
    if (now !== 0) throw new Error('We should have converted the entire timestamp.');

    var id = timeStampChars.join('');

    if (!duplicateTime) {
      for (i = 0; i < 12; i++) {
        lastRandChars[i] = Math.floor(Math.random() * 64);
      }
    } else {
      // If the timestamp hasn't changed since last push, use the same random number, except incremented by 1.
      for (i = 11; i >= 0 && lastRandChars[i] === 63; i--) {
        lastRandChars[i] = 0;
      }
      lastRandChars[i]++;
    }
    for (i = 0; i < 12; i++) {
      id += PUSH_CHARS.charAt(lastRandChars[i]);
    }
    if (id.length != 20) throw new Error('Length should be 20.');

    return id;
  };
})();
