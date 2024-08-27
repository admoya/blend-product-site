import { transformImages } from '$lib/utils';

const images = transformImages(
  import.meta.glob('$lib/assets/playlistLibrary/r-controlled-vowels/**/*.{png,jpg,jpeg}', {
    query: { enhanced: true },
    import: 'default',
    eager: true,
  }),
);

const rControlledVowels: BlendLibrary.Section = {
  title: 'R-Controlled Vowels',
  items: [
    { type: 'playlist', name: 'or (north)', id: 'or-north', image: images['or-north'] },
    { type: 'playlist', name: 'or/ore', id: 'or-ore', image: images['or-ore'] },
    { type: 'playlist', name: 'ar, or, and ore review', id: 'ar-or-ore-review', image: images['ar-or-ore-review'] },
    { type: 'playlist', name: 'er (herd)', id: 'er-herd', image: images['er-herd'] },
    { type: 'playlist', name: 'ur, ir', id: 'ur-ir', image: images['ur-ir'] },
    { type: 'playlist', name: 'w + or (world)', id: 'w-or-world', image: images['w-or-world'] },
    { type: 'playlist', name: 'R-controlled vowel review', id: 'r-controlled-vowel-review', image: images['r-controlled-vowel-review'] },
  ],
};

export default rControlledVowels;
