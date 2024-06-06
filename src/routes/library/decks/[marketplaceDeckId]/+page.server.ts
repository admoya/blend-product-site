import marketplaceDecks from '$lib/data/library/marketplaceDecks';
import { checkSessionAuth, readPath, writePath } from '$lib/server/firebaseUtils';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { isOrganizationMember, isSubscribedToBlendPro } from '$lib/server/subscriptionUtils';

export const load = (async ({ params: { marketplaceDeckId } }) => {
  const deckMetadata = marketplaceDecks.items.find((deck: BlendLibrary.Item) => deck.id === marketplaceDeckId);
  if (!deckMetadata) throw error(404);
  return {
    deckMetadata,
  };
}) satisfies PageServerLoad;

export const actions: Actions = {
  accept: async (event) => {
    const {
      params: { marketplaceDeckId },
      request,
    } = event;
    const uid = (await checkSessionAuth(event.cookies, { loginRedirect: event.request.url })).uid;
    const isPro = await isSubscribedToBlendPro(uid);
    const isOrgMember = await isOrganizationMember(uid);
    if (isPro || isOrgMember) {
      const deck = await readPath(`/decks/marketplace/${marketplaceDeckId}/deck`);

      // Update deck metadata to create a new copy of the deck on the user's library
      const timestamp = new Date().toISOString().split('.')[0];
      // Generate random number for deck ID
      const newRefId = Math.floor(Math.random() * 4294967295);
      deck.created_ts = timestamp;
      deck.modified_ts = timestamp;
      deck.position = -1;
      deck.refId = newRefId;

      await writePath(`/decks/user/${uid}/${deck.refId}`, deck);
      throw redirect(303, '/deckShare/accepted');
    } else {
      throw redirect(303, '/library/decks/upgrade');
    }
  },
  decline: async () => {
    throw redirect(303, '/library');
  },
};
