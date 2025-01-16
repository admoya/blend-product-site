import { transformImages } from '$lib/utils';

const images = transformImages(
  import.meta.glob('$lib/assets/playlistLibrary/vowel-teams/**/*.{png,jpg,jpeg}', {
    query: { enhanced: true },
    import: 'default',
    eager: true,
  }),
);

const vowelTeams: BlendLibrary.Section = {
  title: 'Vowel Teams',
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
    { type: 'playlist', name: 'oo (wood) and u (put)', id: 'oo-wood-and-u-put', image: images['oo-wood-and-u-put'] },
    { type: 'playlist', name: 'oo (moon)', id: 'oo-moon', image: images['oo-moon'] },
    { type: 'playlist', name: 'au, aw', id: 'au-aw', image: images['au-aw'] },
    { type: 'playlist', name: 'short ea (bread)', id: 'short-ea-bread', image: images['short-ea-bread'] },
    { type: 'playlist', name: 'ew, ui and ue', id: 'ew-ui-and-ue', image: images['ew-ui-and-ue'] },
    { type: 'playlist', name: 'a as short o (swan)', id: 'a-as-short-o-swan', image: images['a-as-short-o-swan'] },
    { type: 'playlist', name: 'Other Vowel Teams Review', id: 'other-vowel-teams-review', image: images['other-vowel-teams-review'] },
  ],
};

export default vowelTeams;
