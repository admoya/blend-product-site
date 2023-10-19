import { getOrganizationDecks, getUserData, getUserOrganizations, readPath, weaklyAuthenticate } from '$lib/server/firebaseUtils';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async (request) => {
  let organizationDeckArray: Database.Deck[] = [];
  const user = await weaklyAuthenticate(request);
  const decks = (await readPath<Database.Decks.Preloaded>('/decks/preloaded')) || {};
  const deckArray = Object.entries(decks).map(([key, val]) => val);
  if (user) {
    const positionOffset = Math.max(...deckArray.map(({ position }) => position)) + 2; // +2 because legacy position can be -1, and we want the new position to be strictly greater TODO: refactor this once we get rid of the legacy magic numbers in positioning
    const organizationIds = await getUserOrganizations(user.uid);
    organizationDeckArray = (
      await Promise.all(
        organizationIds.map(async (orgId) => {
          const decks = (await getOrganizationDecks(orgId)) ?? {};
          return Object.values(decks).map(({ deck }) => ({ ...deck, position: deck.position + positionOffset }));
        }),
      )
    ).flat();
  }
  return json([...deckArray, ...organizationDeckArray], {
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
