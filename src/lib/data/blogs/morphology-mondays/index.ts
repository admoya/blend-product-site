import thumbnail from './images/morphology-mondays-thumbnail.png';
const post: Blog.BlogPost = {
  slug: 'morphology-mondays',
  summary: 'Every Monday we learn a new morpheme! Check out this post for free resources for morphology and vocabulary teaching.',
  title: 'Resources: Morphology Mondays',
  previewImg: {
    type: 'image',
    src: thumbnail,
    altText: 'Morphology Monday Thumbnail',
  },
  blocks: [
    {
      type: 'youtube',
      source: 'https://www.youtube.com/embed/videoseries?si=I8G5UjtySd-k_KGs&amp;list=PL2TEs6eelwhciW6mQd9y3h5-rR305cUli',
    },
    {
      type: 'text',
      content: `Teaching morphology early on is a great practice to build strong vocabulary and spelling skills! We've created a series of videos called <a href="https://youtube.com/playlist?list=PL2TEs6eelwhciW6mQd9y3h5-rR305cUli&si=HUyQj7oc8HhFYz1R" target="_blank">Morphology Mondays</a> featuring a new morpheme each week with examples of vocabulary words and how to teach their meanings.`,
    },
    {
      type: 'text',
      content: `Along with each video, we have created a free word list with words containing each of the morphemes, as well as definitions and example sentences. Download them below!`,
    },
    {
      type: 'text', 
      content: `<h2>Resources</h2>
      <ul style="text-align: left">
        <li><a href="https://drive.google.com/file/d/1uwGWNwnJ0nVA9ONcKVjShNdtD2giV6lr/view" target="_blank">Blend Reading: Morphology Freebie - "Re"</a></li>
        <li><a href="https://drive.google.com/file/d/1zhMouB7A6LtPHa1ITmAFTbqcsuERgOEN/view" target="_blank">Blend Reading: Morphology Freebie - "Tract"</a></li>
        <li><a href="https://drive.google.com/file/d/1YB9FRBGff6nhxJeVPFvmYDHzEBsMynoA/view" target="_blank">Blend Reading: Morphology Freebie - "Ex"</a></li>
      </ul>`
    }
  ],
};

export default post;
