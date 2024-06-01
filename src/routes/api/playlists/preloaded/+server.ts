import { readPathWithCache } from '$lib/server/firebaseUtils';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { transformPlaylistWordsForClient } from '$lib/utils';

export const GET = (async (request) => {
  const playlists = (await readPathWithCache<Database.Playlists.Preloaded>('/playlists/preloaded')) || {};
  const playlistArray = Object.values(playlists).map((playlist) => ({
    ...playlist,
    words: transformPlaylistWordsForClient(playlist.words ?? []),
  }));
  return json(playlistArray, { headers: [['Cache-Control', 'must-revalidate, max-age=3600, stale-while-revalidate=604800']] });
}) satisfies RequestHandler;

export const OPTIONS = (() => {
  return new Response(null, {
    headers: [['Access-Control-Allow-Methods', 'GET']],
  });
}) satisfies RequestHandler;
