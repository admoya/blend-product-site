import { browser } from '$app/environment';

export function isEmbeddedBrowser() {
  if (!browser) return false;
  // @ts-expect-error
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const isFacebookEmbedded = /FBAN|FBAV|FB_IAB|FBIOS|FBSS/i.test(userAgent);

  return isFacebookEmbedded;
}
