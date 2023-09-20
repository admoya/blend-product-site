import thumbnail from './images/blendable-sounds-thumbnail.png';
const post: Blog.BlogPost = {
  slug: 'blendable-sounds-tutorial',
  summary: 'Are you teaching letter sounds correctly? Check out this video for tips.',
  title: 'Tutorial: Blendable Sounds',
  previewImg: {
    type: 'image',
    src: thumbnail,
    altText: 'Blendable Sounds Tutorial Thumbnail',
  },
  blocks: [
    {
      type: 'youtube',
      source: 'https://www.youtube.com/embed/fbc-DyNE_5E',
    },
    {
      type: 'text',
      content: `Raise your hand if you have a student that pronounces the letter b as “buuuh” 🙋🏻‍♀️`,
    },
    {
      type: 'text',
      content: `When first introduced to the alphabet, students can learn the wrong pronunciation of a letter, which can make it tricky when they try to blend those sounds into words. As teachers, we need to make sure our children are correctly articulating each sound in order to help them blend those sounds and begin reading.`,
    },
    {
      type: 'text',
      content: `Save this video so you can reference when teaching a new letter sound! Let us know if you’d like to see another video breaking down the difference between “voiced” and “unvoiced” letter sounds. 🧐`,
    },
  ],
};

export default post;
