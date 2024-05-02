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
