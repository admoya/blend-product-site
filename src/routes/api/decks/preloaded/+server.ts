import { readPath } from '$lib/server/firebaseUtils';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async (request) => {
    const decks = (await readPath('/decks/preloaded') as Object|null) || {};
    const deckArray = Object.entries(decks).map(([key, val]) => val);
    return json(deckArray, { headers: [ ['Access-Control-Allow-Origin', "*"] ]});
}) satisfies RequestHandler;