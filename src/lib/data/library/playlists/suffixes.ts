import { transformImages } from '$lib/utils';

const images = transformImages(
  import.meta.glob('$lib/assets/playlistLibrary/suffixes/**/*.{png,jpg,jpeg}', {
    query: { enhanced: true },
    import: 'default',
    eager: true,
  }),
);

const consonantDigraphs: BlendLibrary.Section = {
  title: 'Suffixes',
  items: [
    { type: 'playlist', name: '-es suffix', id: 'es-suffix', image: images['es-suffix'] },
    { type: 'playlist', name: '-ed suffix', id: 'ed-suffix', image: images['ed-suffix'] },
    { type: 'playlist', name: '-ing suffix', id: 'ing-suffix', image: images['ing-suffix'] },
  ],
};

export default consonantDigraphs;
