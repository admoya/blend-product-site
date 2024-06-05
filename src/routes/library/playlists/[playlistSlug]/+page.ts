import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types.js';
import consonantsAndShortVowels from '$lib/data/library/playlists/consonantsAndShortVowels';
import consonantDigraphs from '$lib/data/library/playlists/consonantDigraphs';

export const load = (({ params }) => {
  const playlists: BlendLibrary.Item[] = [...consonantsAndShortVowels.items, ...consonantDigraphs.items];
  const playlist: BlendLibrary.Item | undefined = playlists.find((playlist) => playlist.id === params.playlistSlug);
  if (playlist) {
    return {
      playlist,
    };
  }

  throw error(404, 'Not found');
}) satisfies PageLoad;
