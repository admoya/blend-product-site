import thumbnail from './images/blend-2_0-thumbnail.jpg';
const post: Blog.BlogPost = {
  slug: 'blend-2_0-overview',
  summary: 'Blend 2.0 is here! Check out this tutorial about our biggest release ever.',
  title: 'Tutorial: Blend 2.0 Overview',
  previewImg: {
    type: 'image',
    src: thumbnail,
    altText: 'Blend 2.0 Tutorial Thumbnail',
  },
  blocks: [
    {
      type: 'youtube',
      source: 'https://www.youtube.com/embed/rcZNsZfWXIE',
    },
    {
      type: 'text',
      content: `Blend 2.0 is finally here!! It brings with it so many new features to align your teaching with the science of reading and ignite your structured literacy instruction.`,
    },
  ],
};

export default post;
