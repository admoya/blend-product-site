import thumbnail from './images/playlists-thumbnail.jpg';
const post: Blog.BlogPost = {
  slug: "playlists-tutorial",
  summary: "Learn all about creating, editing, and using Playlists in Blend.",
  title: "Tutorial: Get Started with Playlists",
  previewImg: {
    type: 'image',
    src: thumbnail,
    altText: "The Blend Logo"
  },
  blocks: [
    {
      type: 'youtube',
      source: "https://www.youtube.com/embed/_V_3xqkH6HA",
    },
    {
      type: "text",
      content: `Are you looking for a way to easily incorporate word chains in your phonics instruction? Blend makes it super easy to preplan your blending drills and lessons with Playlists: word chains that you can save  and reuse over and over again. This video will show you everything you need to know about creating, editing, and using Playlists.`
    },
    {
      type: "text", 
      content: `Whether you're aligning your teaching with a curriculum or creating your own unique and tailored word chains, Playlists can help streamline your lesson planning so you can focus on doing what you do best: teaching and connecting with your students.`
    }
  ]
}

export default post;