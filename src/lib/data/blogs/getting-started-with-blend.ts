import blendLogo from '$lib/assets/blend_logo.png';
const post: Blog.BlogPost = {
  slug: "getting-started-with-blend",
  summary: "Learn the basics of using the Blend app and jump start your phonics instruction!",
  title: "Tutorial: Getting Started with Blend",
  previewImg: {
    type: 'image',
    src: blendLogo,
    altText: "The Blend Logo"
  },
  blocks: [
    {
      type: 'youtube',
      source: "https://www.youtube.com/embed/cEoXlABrulE",
    },
    {
      type: "text",
      content: `Have you been searching for a way to practice phonics skills with your students in a way that is quick and easy to plan? With our digital blending board app, you can build phonemic awareness and fluency through the use of completely customizable decks for any lesson or level. This video will walk you through the basics of navigating the play screen, creating a new deck, and copying from an existing deck.`
    },
  ]
}

export default post;