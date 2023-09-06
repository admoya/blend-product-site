import { getOrganizationDecks, getUserData, getUserOrganizations, readPath, weaklyAuthenticate } from '$lib/server/firebaseUtils';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async (request) => {
  let organizationDeckArray: Database.Deck[] = [];
  const user = await weaklyAuthenticate(request);
  if (user) {
    const organizationIds = await getUserOrganizations(user.uid);
    organizationDeckArray = (
      await Promise.all(
        organizationIds.map(async (orgId) => {
          const decks = (await getOrganizationDecks(orgId)) ?? {};
          return Object.values(decks).map(({ deck }) => deck);
        }),
      )
    ).flat();
  }
  const decks = ((await readPath('/decks/preloaded')) as Object | null) || {};
  const deckArray = Object.entries(decks).map(([key, val]) => val);
  return json([...deckArray, ...organizationDeckArray], {
    headers: [['Access-Control-Allow-Origin', '*']],
  });
}) satisfies RequestHandler;
