import ck from '$lib/assets/playlistLibrary/consonant-digraphs/ck-digraph.png';
import sh from '$lib/assets/playlistLibrary/consonant-digraphs/sh-digraph.png';
import voicedTh from '$lib/assets/playlistLibrary/consonant-digraphs/voiced-th-digraph.png';
import unvoicedTh from '$lib/assets/playlistLibrary/consonant-digraphs/unvoiced-th-digraph.png';
import ch from '$lib/assets/playlistLibrary/consonant-digraphs/ch-digraph.png';
import digraphMix from '$lib/assets/playlistLibrary/consonant-digraphs/ck-sh-th-ch-mix.png';

const consonantDigraphs: BlendLibrary.Section = {
  title: 'Consonant Digraphs',
  description: 'This group of playlists builds on consonant and short vowel sounds, introducing consonant digraphs.',
  playlists: [
    {
      name: 'ck digraph',
      slug: 'ck-digraph',
      description: 'Sample description',
      imagePath: ck,
    },
    {
      name: 'sh digraph',
      slug: 'sh-digraph',
      description: 'Sample description',
      imagePath: sh,
    },
    {
      name: 'Voiced th digraph',
      slug: 'voiced-th-digraph',
      description: 'Sample description',
      imagePath: voicedTh,
    },
    {
      name: 'Unvoiced th digraph',
      slug: 'unvoiced-th-digraph',
      description: 'Sample description',
      imagePath: unvoicedTh,
    },
    {
      name: 'ch digraph',
      slug: 'ch-digraph',
      description: 'Sample description',
      imagePath: ch,
    },
    {
      name: 'ck, sh, th, ch mix',
      slug: 'ck-sh-th-ch-mix',
      description: 'Sample description',
      imagePath: digraphMix,
    },
  ],
};

export default consonantDigraphs;
