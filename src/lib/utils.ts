import { browser } from '$app/environment';
import { PUBLIC_APP_URL } from '$env/static/public';
import { readable } from 'svelte/store';
import { customLoginToken } from './firebase';

export function isEmbeddedBrowser() {
  if (!browser) return false;
  // @ts-expect-error
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const isFacebookEmbedded = /FBAN|FBAV|FB_IAB|FBIOS|FBSS/i.test(userAgent);

  return isFacebookEmbedded;
}

export const appUrl = readable<string>(PUBLIC_APP_URL, (set) => {
  customLoginToken.subscribe((token) => {
    if (token) {
      set(`${PUBLIC_APP_URL}?loginToken=${token}`);
    } else {
      set(PUBLIC_APP_URL);
    }
  });
});

export const filterAttributes = (attributes: string[], input: object | object[]) => {
  const filter = (obj: object) => Object.fromEntries(Object.entries(obj).filter(([key]) => attributes.includes(key)));
  return Array.isArray(input) ? input.map(filter) : filter(input);
};

export const transformPlaylistWordsForClient = (words: (string | false)[][]): (string | null)[][] =>
  words.map((word) => word.map((letter) => (letter === false ? null : letter)));

export const transformPlaylistWordsForDatabase = (words: (string | null)[][]): (string | false)[][] =>
  words.map((word) => word.map((letter) => (letter === null ? false : letter)));
