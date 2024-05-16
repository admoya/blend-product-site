import { authenticate, deletePath, readPath } from '$lib/server/firebaseUtils';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async (event) => {
  await authenticate(event);
  const { sharedPlaylistId } = event.params;
  const playlist = await readPath(`/playlists/shared/${sharedPlaylistId}/playlist`);
  if (!playlist) throw error(404);
  return json(playlist);
}) satisfies RequestHandler;

export const DELETE = (async (event) => {
  await authenticate(event);
  const { sharedPlaylistId } = event.params;
  const playlist = await readPath(`/playlists/shared/${sharedPlaylistId}/playlist`);
  if (!playlist) throw error(404);
  await deletePath(`/playlists/shared/${sharedPlaylistId}`);
  return new Response(null, {
    status: 200,
  });
}) satisfies RequestHandler;

export const OPTIONS = (() => {
  return new Response(null, {
    headers: [['Access-Control-Allow-Methods', 'GET, DELETE']],
  });
}) satisfies RequestHandler;
