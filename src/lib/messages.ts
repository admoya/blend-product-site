// This is a list of messages to be displayed throughout the app in various toasts, alerts, etc.
// Putting them here for now to import them and keep things like query params simple (just the ID). Also should make internationalization easier.

export default {
  loginRedirect: 'You must be logged in to view this page.',
  feedbackRedirect: 'You must be logged in to submit feedback.',
  signedOut: 'You have been signed out.',
} as Record<string, string>;
