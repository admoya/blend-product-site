import ck from '$lib/assets/playlistLibrary/consonant-digraphs/ck-digraph.png';
import sh from '$lib/assets/playlistLibrary/consonant-digraphs/sh-digraph.png';
import voicedTh from '$lib/assets/playlistLibrary/consonant-digraphs/voiced-th-digraph.png';
import unvoicedTh from '$lib/assets/playlistLibrary/consonant-digraphs/unvoiced-th-digraph.png';
import ch from '$lib/assets/playlistLibrary/consonant-digraphs/ch-digraph.png';
import digraphMix from '$lib/assets/playlistLibrary/consonant-digraphs/ck-sh-th-ch-mix.png';

const consonantDigraphs: BlendLibrary.Section = {
  title: 'Consonant Digraphs',
  items: [
    { type: 'playlist', name: 'ck digraph', id: 'ck-digraph', imagePath: ck },
    { type: 'playlist', name: 'sh digraph', id: 'sh-digraph', imagePath: sh },
    { type: 'playlist', name: 'Voiced th digraph', id: 'voiced-th-digraph', imagePath: voicedTh },
    { type: 'playlist', name: 'Unvoiced th digraph', id: 'unvoiced-th-digraph', imagePath: unvoicedTh },
    { type: 'playlist', name: 'ch digraph', id: 'ch-digraph', imagePath: ch },
    { type: 'playlist', name: 'ck, sh, th, ch mix', id: 'ck-sh-th-ch-mix', imagePath: digraphMix },
  ],
};

export default consonantDigraphs;
