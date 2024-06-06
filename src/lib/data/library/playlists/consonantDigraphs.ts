import { transformImages } from '$lib/utils';

const images = transformImages(
  import.meta.glob('$lib/assets/playlistLibrary/consonant-digraphs/**/*.{png,jpg,jpeg}', {
    query: { enhanced: true },
    import: 'default',
    eager: true,
  }),
);

const consonantDigraphs: BlendLibrary.Section = {
  title: 'Consonant Digraphs',
  items: [
    { type: 'playlist', name: 'ck digraph', id: 'ck-digraph', image: images['ck-digraph'] },
    { type: 'playlist', name: 'sh digraph', id: 'sh-digraph', image: images['sh-digraph'] },
    { type: 'playlist', name: 'Voiced th digraph', id: 'voiced-th-digraph', image: images['voiced-th-digraph'] },
    { type: 'playlist', name: 'Unvoiced th digraph', id: 'unvoiced-th-digraph', image: images['unvoiced-th-digraph'] },
    { type: 'playlist', name: 'ch digraph', id: 'ch-digraph', image: images['ch-digraph'] },
    { type: 'playlist', name: 'ck, sh, th, ch mix', id: 'ck-sh-th-ch-mix', image: images['ck-sh-th-ch-mix'] },
  ],
};

export default consonantDigraphs;
