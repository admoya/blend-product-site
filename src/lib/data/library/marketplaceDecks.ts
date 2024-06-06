import { transformImages } from '$lib/utils';

const images = transformImages(
  import.meta.glob('$lib/assets/marketplace/**/*.{png,jpg,jpeg}', {
    query: { enhanced: true },
    import: 'default',
    eager: true,
  }),
);

const marketplaceDecks: BlendLibrary.Section = {
  title: 'Available Decks',
  items: [
    {
      type: 'deck',
      name: '2 Syllables (6 cards)',
      description:
        'This deck features six columns and is great for introducing 2 syllable words and syllable division patterns to your students. Create VC/CV words or collapse the 3rd column to change them to V/CV and VC/V.',
      author: 'Summer Kiesel',
      image: images['2syllable'],
      id: '-Nl4-F3yj7JTYznUkUXL',
    },
    {
      type: 'deck',
      name: 'Doubling Practice',
      description: 'This deck is perfect for practicing the doubling rule when adding on a vowel suffix or consonant-le.',
      author: 'Summer Kiesel',
      image: images['doubling-practice'],
      id: '-Nami4dTLiMr5iCw2UNz',
    },
    {
      type: 'deck',
      name: 'Welded Sounds',
      description:
        'Whether you call these welded sounds, glued sounds, wild old words, or closed syllable exceptions, this deck is great for practicing those trickier word families.',
      author: 'Summer Kiesel',
      image: images['welded-sounds'],
      id: '-Nami9-twBSGvYqDI1HW',
    },
    {
      type: 'deck',
      name: 'Latin Roots',
      description:
        'This deck contains 100 of the most common Latin roots and affixes for practicing morphology and fluency with multi-syllabic words. We recommend this deck for creating playlists or editing down to a smaller selection of morphemes to work on.',
      author: 'Summer Kiesel',
      image: images['latin'],
      id: '-NarqpewAp2p8H6inYXL',
    },
    {
      type: 'deck',
      name: 'CVC and Magic E',
      description: 'This is one of our old preloaded decks. It contains basic graphemes for CVC words with the option to add in Magic E.',
      author: 'Summer Kiesel',
      image: images['cvc-and-magic-e'],
      id: '-NtE1MN0Cf_aInFK3FtP',
    },
    {
      type: 'deck',
      name: 'Blends & Advanced Vowels',
      description:
        'This is one of our old preloaded decks. It contains basic graphemes for some consonant blends and more advanced vowels. The blends on this board are separated.',
      author: 'Summer Kiesel',
      image: images['blends-and-advanced-vowels'],
      id: '-NtE1YEqHfSFUzdkeLzM',
    },
  ],
};

export default marketplaceDecks;
