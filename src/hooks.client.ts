import { handleErrorWithSentry, replayIntegration } from '@sentry/sveltekit';
import * as Sentry from '@sentry/sveltekit';

import { dev } from '$app/environment';
import { PUBLIC_DEPLOY_CONTEXT } from '$env/static/public';

if (!dev) {
  Sentry.init({
    dsn: 'https://ed73e6c79394e6668bc3f466e0fe3575@o4507471825469440.ingest.us.sentry.io/4507471832612864',
    tracesSampleRate: 1.0,

    // This sets the sample rate to be 10%. You may want this to be 100% while
    // in development and sample at a lower rate in production
    replaysSessionSampleRate: 0.01,

    // If the entire session is not sampled, use the below sample rate to sample
    // sessions when an error occurs.
    replaysOnErrorSampleRate: 1.0,

    // If you don't want to use Session Replay, just remove the line below:
    integrations: [replayIntegration({ maskAllText: false, networkDetailAllowUrls: [window.location.origin] })],
    environment: PUBLIC_DEPLOY_CONTEXT,
  });
}

// If you have a custom error handler, pass it to `handleErrorWithSentry`
export const handleError = handleErrorWithSentry();
