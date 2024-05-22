import { authenticate, deletePath, readPath, writePath } from '$lib/server/firebaseUtils';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { transformPlaylistForClient, transformPlaylistForDatabase } from '$lib/utils';

export const GET = (async (event) => {
  const { playlistId } = event.params;
  const { uid } = await authenticate(event);
  const playlist = await readPath<Database.Playlist>(`/playlists/user/${uid}/${playlistId}`);
  if (!playlist) {
    throw error(404, `No playlist exists with refId ${playlistId}`);
  }
  const modifiedPlaylist = {
    ...playlist,
    words: transformPlaylistForClient(playlist) ?? [],
  };
  return json(modifiedPlaylist);
}) satisfies RequestHandler;

export const POST = (async (event) => {
  const { playlistId } = event.params;
  const { uid } = await authenticate(event);
  const playlistData = await event.request.json();
  const modifiedData = {
    ...playlistData,
    words: transformPlaylistForDatabase(playlistData),
  };
  await writePath(`/playlists/user/${uid}/${playlistId}`, modifiedData);
  return json(playlistData, {
    status: 201,
  });
}) satisfies RequestHandler;

export const PUT = (async (event) => {
  const { playlistId } = event.params;
  const { uid } = await authenticate(event);
  const playlistData = await event.request.json();
  const path = `/playlists/user/${uid}/${playlistId}`;
  const existingPlaylist = await readPath<Database.Playlist>(path);
  if (!existingPlaylist) {
    throw error(404, `No playlist exists with refId ${playlistId}`);
  }
  const modifiedExistingPlaylist = {
    ...existingPlaylist,
    words: transformPlaylistForDatabase(existingPlaylist),
  };
  const modifiedPlaylistData = {
    ...playlistData,
    words: playlistData.words.map((word: (string | null)[]) => word.map((letter) => letter ?? false)),
  };
  const newPlaylist = {
    ...modifiedExistingPlaylist,
    ...modifiedPlaylistData,
  };
  await writePath(path, newPlaylist);
  return json(newPlaylist);
}) satisfies RequestHandler;

export const DELETE = (async (event) => {
  const { playlistId } = event.params;
  const { uid } = await authenticate(event);
  const path = `/playlists/user/${uid}/${playlistId}`;
  const existingPlaylist = (await readPath(path)) as Object | null;
  if (!existingPlaylist) {
    throw error(404, `No playlist exists with refId ${existingPlaylist}`);
  }
  await deletePath(path);
  return json(existingPlaylist);
}) satisfies RequestHandler;

export const OPTIONS = (() => {
  return new Response(null, {
    headers: [['Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE']],
  });
}) satisfies RequestHandler;
