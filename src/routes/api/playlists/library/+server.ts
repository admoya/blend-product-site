import { readPathWithCache } from '$lib/server/firebaseUtils';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { filterAttributes, transformPlaylistForClient } from '$lib/utils';

export const GET = (async (request) => {
  const attributes = request.url.searchParams.get('attributes')?.split(',') ?? [];
  const playlists = (await readPathWithCache<Database.Playlists.Library>('/playlists/library')) || {};
  const playlistArray = Object.values(playlists).map((playlist) => ({
    ...playlist,
    words: transformPlaylistForClient(playlist) ?? [],
  }));
  const filteredPlaylists = filterAttributes(attributes, playlistArray);
  return json(filteredPlaylists.some((playlist: Database.Playlist) => Object.keys(playlist).length > 0) ? filteredPlaylists : playlistArray);
}) satisfies RequestHandler;

export const OPTIONS = (() => {
  return new Response(null, {
    headers: [['Access-Control-Allow-Methods', 'GET']],
  });
}) satisfies RequestHandler;
