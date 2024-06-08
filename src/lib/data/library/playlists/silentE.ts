import { transformImages } from '$lib/utils';

const images = transformImages(
  import.meta.glob('$lib/assets/playlistLibrary/silent-e/**/*.{png,jpg,jpeg}', {
    query: { enhanced: true },
    import: 'default',
    eager: true,
  }),
);

const consonantDigraphs: BlendLibrary.Section = {
  title: 'Silent E',
  items: [
    { type: 'playlist', name: 'a_e (tape)', id: 'a-e-tape', image: images['a-e-tape'] },
    { type: 'playlist', name: 'i_e (ride)', id: 'i-e-ride', image: images['i-e-ride'] },
    { type: 'playlist', name: 'o_e (home)', id: 'o-e-home', image: images['o-e-home'] },
    { type: 'playlist', name: 'a_e, o_e, i_e mix', id: 'ae-oe-ie-mix', image: images['ae-oe-ie-mix'] },
    { type: 'playlist', name: 'u_e (cute + flute)', id: 'u-e-cute-flute', image: images['u-e-cute-flute'] },
    { type: 'playlist', name: 'silent e mix', id: 'silent-e-mix', image: images['silent-e-mix'] },
    { type: 'playlist', name: '-ce (face)', id: 'ce-face', image: images['ce-face'] },
    { type: 'playlist', name: '-ge (page)', id: 'ge-page', image: images['ge-page'] },
  ],
};

export default consonantDigraphs;
