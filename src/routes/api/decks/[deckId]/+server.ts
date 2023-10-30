import { getUserOrganizations, readPath, weaklyAuthenticate } from '$lib/server/firebaseUtils';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async (request) => {
  const { deckId } = request.params;
  let deck = await readPath<Database.Deck>(`/decks/preloaded/${deckId}`);
  if (!deck) {
    const user = await weaklyAuthenticate(request);
    if (user) {
      deck = await readPath<Database.Deck>(`/decks/user/${user.uid}/${deckId}`);
      if (!deck) {
        const organizationIds = await getUserOrganizations(user.uid);
        const orgDecks = await Promise.all(organizationIds.map((orgId) => readPath<Database.Deck>(`/decks/organization/${orgId}/${deckId}`)));
        deck = orgDecks.find((deck) => deck) ?? null;
      }
    }
  }
  if (!deck) throw error(404);

  return json(deck);
};

export const OPTIONS: RequestHandler = () => {
  return new Response(null, {
    headers: [
      ['Access-Control-Allow-Origin', '*'],
      ['Access-Control-Allow-Headers', '*'],
      ['Access-Control-Allow-Methods', 'GET'],
    ],
  });
};
