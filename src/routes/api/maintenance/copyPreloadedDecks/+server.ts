//@ts-nocheck
import type { RequestHandler } from './$types';
import { db, readPath, writePath } from '$lib/server/firebaseUtils';

const createDeckCopy = async (deckId: number, userId: string) => {
  // Generate new reference ID
  const newRefId = Math.floor(Math.random() * 4294967295);

  // Fetch linked deck
  const linkedDeck = await readPath<Database.Decks.Preloaded>(`/decks/preloaded/${deckId}`);
  if (linkedDeck) {
    // Create a copy of the linked deck with updated fields
    const timestamp = new Date().toISOString().split('.')[0];
    const deckCopy = { ...linkedDeck };
    deckCopy.created_ts = timestamp;
    deckCopy.modified_ts = timestamp;
    deckCopy.position = -1;
    deckCopy.refId = newRefId;
    deckCopy.is_editable = true;

    // Save the copy to the user's decks
    await writePath<Database.Decks.User>(`/decks/user/${userId}/${newRefId}`, deckCopy);
  }
};

export const POST: RequestHandler = async (event) => {
  const playlists = (await db.ref('/playlists/user').get()).val();

  const counts: { [userId: string]: { [id: string]: number } } = {};
  const usersWithPlaylistsLinked = new Set();

  if (playlists) {
    Object.keys(playlists).forEach((userId) => {
      counts[userId] = { '113822357': 0, '541852177': 0 }; // Initialize counts for each user
      const userPlaylists = playlists[userId];

      Object.keys(userPlaylists).forEach((playlistId) => {
        const playlist = userPlaylists[playlistId] as PlaylistData;
        if (playlist.linked_deck_id === 113822357 || playlist.linked_deck_id === 541852177) {
          counts[userId][playlist.linked_deck_id]++;
          usersWithPlaylistsLinked.add(userId);
        }
      });
    });
  }

  Object.keys(counts).forEach((userId) => {
    const count113822357 = counts[userId]['113822357'];
    const count541852177 = counts[userId]['541852177'];

    if (count113822357 > 0 || count541852177 > 0) {
      console.log('=====================================');
      console.log(`For User ID: ${userId}`);
      if (count113822357 > 0) {
        console.log('Found this many playlists linked to Blends and Advanced Vowels:', count113822357);
        console.log('Creating copy of Blends and Advanced Vowels for this user.');
        createDeckCopy(113822357, userId);
      }
      if (count541852177 > 0) {
        console.log('Found this many playlists linked to CVC and Magic E:', count541852177);
        console.log('Creating copy of CVC and Magic E for this user.');
        createDeckCopy(541852177, userId);
      }
    }
  });
  console.log('=====================================');
  console.log('# Users whose libraries were updated with a copy of a preloaded deck: ', usersWithPlaylistsLinked.size);
  return new Response();
};
