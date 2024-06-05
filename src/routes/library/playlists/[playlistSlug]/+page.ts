import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types.js';
import consonantsAndShortVowels from '$lib/data/library/playlists/consonantsAndShortVowels';
import consonantDigraphs from '$lib/data/library/playlists/consonantDigraphs';

export const load = (({ params }) => {
  const playlists: BlendLibrary.Playlist[] = [...consonantsAndShortVowels.playlists, ...consonantDigraphs.playlists];
  const playlist: BlendLibrary.Playlist | undefined = playlists.find((playlist) => playlist.slug === params.playlistSlug);
  if (playlist) {
    return {
      playlist,
    };
  }

  throw error(404, 'Not found');
}) satisfies PageLoad;
