import { readPath, weaklyAuthenticate } from '$lib/server/firebaseUtils';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async (request) => {
  const playlists = (await readPath<Database.Playlists.Preloaded>('/playlists/preloaded')) || {};
  const playlistArray = Object.entries(playlists).map(([key, val]) => val);
  return json(playlistArray, {
    headers: [['Access-Control-Allow-Origin', '*']],
  });
}) satisfies RequestHandler;

export const OPTIONS = (() => {
  return new Response(null, {
    headers: [
      ['Access-Control-Allow-Origin', '*'],
      ['Access-Control-Allow-Headers', '*'],
      ['Access-Control-Allow-Methods', 'GET'],
    ],
  });
}) satisfies RequestHandler;
