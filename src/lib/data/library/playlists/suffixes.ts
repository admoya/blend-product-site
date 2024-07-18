import { transformImages } from '$lib/utils';

const images = transformImages(
  import.meta.glob('$lib/assets/playlistLibrary/suffixes/**/*.{png,jpg,jpeg}', {
    query: { enhanced: true },
    import: 'default',
    eager: true,
  }),
);

const consonantDigraphs: BlendLibrary.Section = {
  title: 'Ending Patterns',
  items: [
    { type: 'playlist', name: '-es suffix', id: 'es-suffix', image: images['es-suffix'] },
    { type: 'playlist', name: '-ed suffix', id: 'ed-suffix', image: images['ed-suffix'] },
    { type: 'playlist', name: '-ing suffix', id: 'ing-suffix', image: images['ing-suffix'] },
    { type: 'playlist', name: 'Open Syllables', id: 'open-syllables', image: images['open-syllables'] },
    { type: 'playlist', name: '2 Syllable (Closed/Closed)', id: '2-syllable-closed-closed', image: images['2-syllable-closed-closed'] },
    { type: 'playlist', name: '2 Syllable (Open/Closed)', id: '2-syllable-open-closed', image: images['2-syllable-open-closed'] },
    { type: 'playlist', name: 'tch trigraph', id: 'tch-trigraph', image: images['tch-trigraph'] },
    { type: 'playlist', name: 'dge trigraph', id: 'dge-trigraph', image: images['dge-trigraph'] },
    { type: 'playlist', name: 'tch/dge mix', id: 'tch-dge-mix', image: images['tch-dge-mix'] },
    { type: 'playlist', name: 'Closed Syll. Exceptions', id: 'closed-syll-exceptions', image: images['closed-syll-exceptions'] },
    { type: 'playlist', name: 'Y as Long i', id: 'y-as-long-i', image: images['y-as-long-i'] },
    { type: 'playlist', name: 'Y as Long e', id: 'y-as-long-e', image: images['y-as-long-e'] },
    { type: 'playlist', name: 'Y as a Vowel Review (cry/baby)', id: 'y-as-a-vowel-review', image: images['y-as-a-vowel-review'] },
    { type: 'playlist', name: '-le (handle)', id: 'le-handle', image: images['le-handle'] },
    { type: 'playlist', name: 'Ending Patterns Review', id: 'ending-patterns-review', image: images['ending-patterns-review'] },
  ],
};

export default consonantDigraphs;
