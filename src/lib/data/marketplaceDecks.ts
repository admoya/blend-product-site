import combinedBlends from '$lib/assets/marketplace/combined-blends.png';
import doublingPractice from '$lib/assets/marketplace/doubling-practice.png';
import weldedSounds from '$lib/assets/marketplace/welded-sounds.png';
import latin from '$lib/assets/marketplace/latin.png';

export type MarketplaceDeck = {
  name: string;
  description: string;
  author: string;
  image: string;
  id: string;
};

const marketplaceDecks: MarketplaceDeck[] = [
  {
    name: 'Combined Blends',
    description:
      "This deck contains all consonant blends and vowel graphemes. We've created this deck for those who prefer to have their blends on one card, rather than spread out by sound.",
    author: 'Summer Kiesel',
    image: combinedBlends,
    id: '-NaT4aMfMtKhI7de8PQb',
  },
  {
    name: 'Doubling Practice',
    description: 'This deck is perfect for practicing the doubling rule when adding on a vowel suffix or consonant-le.',
    author: 'Summer Kiesel',
    image: doublingPractice,
    id: '-Nami4dTLiMr5iCw2UNz',
  },
  {
    name: 'Welded Sounds',
    description:
      'Whether you call these welded sounds, glued sounds, wild old words, or closed syllable exceptions, this deck is great for practicing those trickier word families.',
    author: 'Summer Kiesel',
    image: weldedSounds,
    id: '-Nami9-twBSGvYqDI1HW',
  },
  {
    name: 'Latin Roots',
    description:
      'This deck contains 100 of the most common Latin roots and affixes for practicing morphology and fluency with multi-syllabic words. We recommend this deck for creating playlists or editing down to a smaller selection of morphemes to work on.',
    author: 'Summer Kiesel',
    image: latin,
    id: '-NarqpewAp2p8H6inYXL',
  },
];

export default marketplaceDecks;
