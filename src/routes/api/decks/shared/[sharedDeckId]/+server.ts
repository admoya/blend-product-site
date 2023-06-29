import { authenticate, deletePath, readPath } from '$lib/server/firebaseUtils';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async (event) => {
  await authenticate(event);
  const { sharedDeckId } = event.params;
  const deck = await readPath(`/decks/shared/${sharedDeckId}/deck`);
  if (!deck) 
    throw error(404);
  return json(deck);
}) satisfies RequestHandler;

export const DELETE = (async (event) => {
  await authenticate(event);
  const { sharedDeckId } = event.params;
  const deck = await readPath(`/decks/shared/${sharedDeckId}/deck`);
  if (!deck) 
    throw error(404);
  await deletePath(`/decks/shared/${sharedDeckId}`);
  return new Response(null, { status: 200 });
}) satisfies RequestHandler;

export const OPTIONS = (() => {
  return new Response(null, { headers: [[ 'Access-Control-Allow-Origin', "*" ], [ 'Access-Control-Allow-Headers', '*' ], ['Access-Control-Allow-Methods', 'GET, DELETE']]});
}) satisfies RequestHandler;