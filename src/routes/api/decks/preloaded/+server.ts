import { readPathWithCache } from '$lib/server/firebaseUtils';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async (request) => {
  const decks = (await readPathWithCache<Database.Decks.Preloaded>('/decks/preloaded')) || {};
  const deckArray = Object.entries(decks).map(([key, val]) => val);
  return json(deckArray, { headers: [['Cache-Control', 'must-revalidate, max-age=3600, stale-while-revalidate=604800']] });
}) satisfies RequestHandler;

export const OPTIONS = (() => {
  return new Response(null, {
    headers: [['Access-Control-Allow-Methods', 'GET']],
  });
}) satisfies RequestHandler;
