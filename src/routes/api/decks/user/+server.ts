import { authenticate, getUserData, readPath } from '$lib/server/firebaseUtils';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async (event) => {
  const { uid } = await authenticate(event);
  const decks = (await readPath(`/decks/user/${uid}`)) || {};
  const deckArray = Object.entries(decks).map(([key, val]) => val);
  return json(deckArray, {
    headers: [['Access-Control-Allow-Origin', '*']],
  });
}) satisfies RequestHandler;

export const OPTIONS = (() => {
  return new Response(null, {
    headers: [
      ['Access-Control-Allow-Origin', '*'],
      ['Access-Control-Allow-Headers', '*'],
    ],
  });
}) satisfies RequestHandler;
