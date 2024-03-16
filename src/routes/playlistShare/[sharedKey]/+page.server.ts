import { deletePath, getUserData, readPath, writePath } from '$lib/server/firebaseUtils';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load = (async ({ params: { sharedKey } }) => {
  const { sourceUid, playlist } = (await readPath(`/playlists/shared/${sharedKey}`)) ?? {};
  if (!sourceUid || !playlist) throw error(404, 'This link is expired or invalid.');
  const { displayName } = await getUserData(sourceUid);
  return {
    authorName: displayName,
    playlistName: playlist.name,
  };
}) satisfies PageServerLoad;

export const actions: Actions = {
  accept: async (event) => {
    const {
      params: { sharedKey },
      request,
    } = event;
    const uid = (await request.formData()).get('uid');
    const playlist = await readPath(`/playlists/shared/${sharedKey}/playlist`);

    // Adjust playlist metadata, to behave as if it is a new playlist getting created now
    const timestamp = new Date().toISOString().split('.')[0];
    // Godot is currently generating a random unsigned 32-bit int for the deck ID, so we will do the same
    const newRefId = Math.floor(Math.random() * 4294967295);
    playlist.created_ts = timestamp;
    playlist.modified_ts = timestamp;
    playlist.position = -1;
    playlist.refId = newRefId;

    await writePath(`/playlists/user/${uid}/${playlist.refId}`, playlist);
    deletePath(`/playlists/shared/${sharedKey}`);
    throw redirect(303, '/playlistShare/accepted');
  },
  decline: async (event) => {
    const {
      params: { sharedKey },
    } = event;
    deletePath(`/playlists/shared/${sharedKey}`);
    throw redirect(303, '/playlistShare/declined');
  },
};
