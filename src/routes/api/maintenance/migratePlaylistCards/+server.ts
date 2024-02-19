//@ts-nocheck
import type { RequestHandler } from './$types';
import { db } from '$lib/server/firebaseUtils';
export const POST: RequestHandler = async (event) => {
  const decks = (await db.ref('decks').get()).val();
  const preloadedDecks = decks.preloaded;
  const userDecks: any = Object.values(decks.user).reduce((acc: any, userDecks: any) => {
    Object.entries(userDecks).forEach(([deckId, deck]) => {
      acc[deckId] = deck;
    });
    return acc;
  }, {});
  const organizationDecks: any = Object.values(decks.organization).reduce((acc: any, orgDecks: any) => {
    Object.entries(orgDecks).forEach(([deckId, deck]) => {
      acc[deckId] = { deck, ...deck.deck };
    });
    return acc;
  }, {});

  const allDecks = { ...preloadedDecks, ...userDecks, ...organizationDecks };

  const { user: userPlaylists } = (await db.ref('playlists').get()).val();
  const findDeck = (deckId: string) => allDecks[deckId] ?? null;
  const promises = Object.entries(userPlaylists).flatMap(([userId, playlists]) =>
    Object.entries(playlists).map(([playlistId, playlistData]) => {
      const { linked_deck_id } = playlistData;
      const deck = findDeck(linked_deck_id);
      if (!deck) {
        console.log(`user:${userId}:${playlistId} -> ${linked_deck_id} ❌`);
        return Promise.resolve();
      } else {
        const { cards } = deck;
        return db
          .ref(`playlists/user/${userId}/${playlistId}/cards`)
          .set(cards ?? [])
          .then(() => {
            console.log(`user:${userId}:${playlistId} -> ${linked_deck_id} ✅`);
          });
      }
    }),
  );

  await Promise.all(promises);
  return new Response();
};
