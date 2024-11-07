import { transformImages } from '$lib/utils';

const images = transformImages(
  import.meta.glob('$lib/assets/playlistLibrary/long-vowel-teams/**/*.{png,jpg,jpeg}', {
    query: { enhanced: true },
    import: 'default',
    eager: true,
  }),
);

const longVowelTeams: BlendLibrary.Section = {
  title: 'Long Vowel Teams',
  items: [
    { type: 'playlist', name: 'ai (rain)', id: 'ai-rain', image: images['ai-rain'] },
    { type: 'playlist', name: 'ay (play)', id: 'ay-play', image: images['ay-play'] },
    { type: 'playlist', name: 'ee (seem)', id: 'ee-seem', image: images['ee-seem'] },
    { type: 'playlist', name: 'ea (meat)', id: 'ea-meat', image: images['ea-meat'] },
    { type: 'playlist', name: 'ey (valley)', id: 'ey-valley', image: images['ey-valley'] },
    { type: 'playlist', name: 'oa (boat)', id: 'oa-boat', image: images['oa-boat'] },
    { type: 'playlist', name: 'ow (snow)', id: 'ow-snow', image: images['ow-snow'] },
    { type: 'playlist', name: 'igh/ie', id: 'igh-ie', image: images['igh-ie'] },
    { type: 'playlist', name: 'Long Vowel Teams Review', id: 'long-vowel-teams-review', image: images['long-vowel-teams-review'] },
  ],
};

export default longVowelTeams;
