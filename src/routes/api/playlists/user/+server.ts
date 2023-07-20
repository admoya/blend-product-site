import { authenticate, readPath } from '$lib/server/firebaseUtils';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async (event) => {
    const { uid } = await authenticate(event);
    const playlists = await readPath(`/playlists/user/${uid}`) || {};
    const modifiedPlaylists = Object.values(playlists).map(playlist => ({ ...playlist, words: playlist.words.map(word => Object.values(word).map(letters => (letters === false ? null : letters)))}));
    return json(modifiedPlaylists, { headers: [ ['Access-Control-Allow-Origin', "*"] ]});
}) satisfies RequestHandler;

export const OPTIONS = (() => {
    return new Response(null, { headers: [[ 'Access-Control-Allow-Origin', "*" ], [ 'Access-Control-Allow-Headers', '*' ], ['Access-Control-Allow-Methods', 'GET']]});
}) satisfies RequestHandler;