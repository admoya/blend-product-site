import { authenticate, deletePath, readPath, writePath } from '$lib/server/firebaseUtils';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async (event) => {
    const { playlistId } = event.params;
    const { uid } = await authenticate(event);
    const playlist = await readPath(`/playlists/user/${uid}/${playlistId}`);
    if (!playlist) {
        throw error(404, `No playlist exists with refId ${playlistId}`);
    }
    return json(playlist, { headers: [ ['Access-Control-Allow-Origin', "*"] ]});
}) satisfies RequestHandler;

export const POST = (async (event) => {
    const { playlistId } = event.params;
    const { uid } = await authenticate(event);
    const playlistData = await event.request.json();
    await writePath(`/playlists/user/${uid}/${playlistId}`, playlistData);
    return json(playlistData, { status: 201, headers: [ ['Access-Control-Allow-Origin', "*"] ] });
}) satisfies RequestHandler;

export const PUT = (async (event) => {
    const { playlistId } = event.params;
    const { uid } = await authenticate(event);
    const playlistData = await event.request.json();
    const path = `/playlists/user/${uid}/${playlistId}`;
    const existingPlaylist = await readPath(path) as Object|null;
    if (!existingPlaylist) {
        throw error(404, `No playlist exists with refId ${playlistId}`);
    }
    const newPlaylist = {
        ...existingPlaylist,
        ...playlistData
    }
    await writePath(path, newPlaylist);
    return json(newPlaylist, { headers: [ ['Access-Control-Allow-Origin', "*"] ]})
}) satisfies RequestHandler;

export const DELETE = (async (event) => {
    const { playlistId } = event.params;
    const { uid } = await authenticate(event);
    const path = `/playlists/user/${uid}/${playlistId}`;
    const existingPlaylist = await readPath(path) as Object|null;
    if (!existingPlaylist) {
        throw error(404, `No playlist exists with refId ${existingPlaylist}`);
    }
    await deletePath(path);
    return json(existingPlaylist, { headers: [ ['Access-Control-Allow-Origin', "*"] ]});
}) satisfies RequestHandler;

export const OPTIONS = (() => {
    return new Response(null, { headers: [[ 'Access-Control-Allow-Origin', "*" ], [ 'Access-Control-Allow-Headers', '*' ], ['Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE']]});
}) satisfies RequestHandler;