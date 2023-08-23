import { deletePath, getUserData, readPath, writePath } from '$lib/server/firebaseUtils';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load = (async ({ params: { sharedKey } }) => {
  const { sourceUid, deck } = (await readPath(`/decks/shared/${sharedKey}`)) ?? {};
  if (!sourceUid || !deck) throw error(404, 'This link is expired or invalid.');
  const { displayName } = await getUserData(sourceUid);
  return {
    authorName: displayName,
    deckName: deck.name,
  };
}) satisfies PageServerLoad;

export const actions: Actions = {
  accept: async (event) => {
    const {
      params: { sharedKey },
      request,
    } = event;
    const uid = (await request.formData()).get('uid');
    const deck = await readPath(`/decks/shared/${sharedKey}/deck`);

    // Adjust deck metadata, to behave as if it is a new deck getting created now
    const timestamp = new Date().toISOString().split('.')[0];
    // Godot is currently generating a random unsigned 32-bit int for the deck ID, so we will do the same
    const newRefId = Math.floor(Math.random() * 4294967295);
    deck.created_ts = timestamp;
    deck.modified_ts = timestamp;
    deck.position = -1;
    deck.refId = newRefId;

    await writePath(`/decks/user/${uid}/${deck.refId}`, deck);
    deletePath(`/decks/shared/${sharedKey}`);
    throw redirect(303, '/deckShare/accepted');
  },
  decline: async (event) => {
    const {
      params: { sharedKey },
    } = event;
    deletePath(`/decks/shared/${sharedKey}`);
    throw redirect(303, '/deckShare/declined');
  },
};
