import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const response = await resolve(event);
  response.headers.set('Access-Control-Allow-Origin', '*');
  if (event.request.method === 'OPTIONS') {
    response.headers.set('Access-Control-Allow-Headers', '*');
  }
  return response;
};
