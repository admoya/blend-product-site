import { transformImages } from '$lib/utils';

const images = transformImages(
  import.meta.glob('$lib/assets/playlistLibrary/diphthongs/**/*.{png,jpg,jpeg}', {
    query: { enhanced: true },
    import: 'default',
    eager: true,
  }),
);

const diphthongs: BlendLibrary.Section = {
  title: 'Diphthongs',
  items: [
    { type: 'playlist', name: 'oi, oy', id: 'oi-oy', image: images['oi-oy'] },
    { type: 'playlist', name: 'ou and ow (town)', id: 'ou-and-ow-town', image: images['ou-and-ow-town'] },
    { type: 'playlist', name: 'Diphthong Review	', id: 'diphthong-review', image: images['diphthong-review'] },
  ],
};

export default diphthongs;
