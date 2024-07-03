import { sequence } from '@sveltejs/kit/hooks';
import * as Sentry from '@sentry/sveltekit';
import type { Handle } from '@sveltejs/kit';
import { PUBLIC_DEPLOY_CONTEXT } from '$env/static/public';
import { dev } from '$app/environment';

if (!dev) {
  Sentry.init({
    dsn: 'https://ed73e6c79394e6668bc3f466e0fe3575@o4507471825469440.ingest.us.sentry.io/4507471832612864',
    tracesSampleRate: 1,
    environment: PUBLIC_DEPLOY_CONTEXT,
  });
}

export const handle: Handle = sequence(Sentry.sentryHandle(), async ({ event, resolve }) => {
  const response = await resolve(event);
  response.headers.set('Access-Control-Allow-Origin', '*');
  if (event.request.method === 'OPTIONS') {
    response.headers.set('Access-Control-Allow-Headers', '*');
  }
  return response;
});
export const handleError = Sentry.handleErrorWithSentry();
