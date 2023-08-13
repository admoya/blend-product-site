import blendExample from './images/blendExample.gif';
import physicalBlendingBoard from './images/physicalBlendingBoard.png';
const post: Blog.BlogPost = {
  title: "What is a Blending Board?",
  slug: "what-is-a-blending-board",
  summary: "A quick overview of the history, applications, and modern tooling for blending boards",
  previewImg: {
    type: 'image',
    src: physicalBlendingBoard,
    altText: 'A physical blending board displaying the word "back"',
  },
  blocks: [
    {
      type: "text",
      content: `Learning to read is a complex process involving many different skills, one of which is blending. Blending is the process of combining individual sounds (phonemes) to form words, and it's critical for reading fluency. A blending board is a great tool to use to practice this skill with your students.`
    },
    {
      type: 'image',
      src: physicalBlendingBoard,
      align: 'left',
      altText: 'A physical blending board displaying the word "back"',
      size: { width: 400 },
      caption: "A physical blending board"
    },
    {
      type: "text",
      content: `A typical blending board consists of a deck of cards containing different phonemes, and a (usually wooden) stand for arranging and displaying the cards during blending drills. Blending boards are a key component of a <a href="https://www.understood.org/en/articles/what-is-structured-literacy" target="_blank">structured literacy</a> curriculum and the <a href="https://en.wikipedia.org/wiki/Orton-Gillingham" target="_blank">Orton-Gillingham approach</a>
      `
    },
    {
      type: "text",
      content: `Traditionally, blending boards have been used in one-on-one or small group settings, but as <a href="https://www.nytimes.com/2023/04/16/us/science-of-reading-literacy-parents.html" target="_blank">momentum builds</a> for science-based approaches to literacy, they are increasingly found in classrooms across the world. With the rise of online learning and technology-equipped classrooms, virtual blending boards (like Blend!) are becoming a popular option for teachers. These virtual options offer a number of advantages over traditional blending boards, including affordability, ease of use, and <a href="https://blendreading.com/features" target="_blank">additional features</a> for maximizing the effectiveness of this technique.`
    },
    {
      type: "heading",
      size: 2,
      content: `History`
    },
    {
      type: "text",
      content: `<a href="https://en.wikipedia.org/wiki/Samuel_Orton" target="_blank">Samuel Orton</a> was an American physician who studied learning disabilities in children in the early 20th century. He spent his early career studying brain damage in adults, and applied that neurological expertise to the study of children with reading difficulties.`
    },
    {
      type: "text",
      content: `<a href="https://en.wikipedia.org/wiki/Anna_Gillingham" target="_blank">Anna Gillingham</a> was an educator and psychologist, and was an early pioneer in the field of phonics education. In the 1930s, she partnered with Orton and Bessie Stillman, a fellow educator, to develop and publish <a href="https://www.amazon.com/Remedial-Training-Children-Disability-Penmanship/dp/B001P6AW60" target="_blank">Remedial Training for Children with Specific Disability in Reading, Spelling and Penmanship</a> in 1935. This work would be updated over the years and become known as the Orton-Gillingham manual.`
    },
    {
      type: "text",
      content: `So what does all this have to do with blending boards? Glad you asked! The Orton-Gillingham method emphasized a structured, phonetic, multisensory approach to literacy education, and the blending board is a tool that has developed over the years to aid in that approach. The nature of the board, with its distinct phonemes and the kinetic nature of blending drills helps students map the visual elements they see to the sounds they hear and pronounce.`
    },
    {
      type: "text",
      content: `The blending board has been a staple of private instruction for decades, especially for students with reading challenges. In recent years, as the “science of reading” <a href="https://www.nytimes.com/2022/10/06/education/learning/schools-teaching-reading-phonics.html" target="_blank">gains popularity</a> across the country as part of the solution to the <a href="https://features.apmreports.org/sold-a-story/" target="_blank">literacy crisis</a>, blending boards have increasingly gone mainstream and found their way into classrooms and large group lessons.`
    },
    {
      type: "heading",
      size: 2,
      content: `How it works`
    },
    {
      type: "text",
      content: `A blending board is a simple, yet powerful tool for phonics instruction. A physical blending board consists of a deck of cards that have word sounds (phonemes) written on them, and a stand which can hold up a few of those cards and present them to students. An instructor will combine several phonemes into a word and the students will sound it out. Next, the instructor will swap out one phoneme at a time, changing the words and allowing the students to explore how the sounds can blend together differently.`
    },
    {
      type: 'image',
      align: 'right',
      size: { width: 400 },
      src: blendExample,
      altText: 'An animation of the Blend app progressing through a word chain',
      caption: "An example of a blending board progressing through a word chain"
    },
    {
      type: "text",
      content: `Word chains are an ordered collection of phonemes that an instructor can use as a blueprint for a blending drill. Some organizations <a href="https://www.dyslexiclogic.com/blending" target="_blank">provide word chains for free</a>, and they are a great way to get started with blending boards!`
    },
    {
      type: "text",
      content: `A virtual blending board serves the same purpose as a physical one, but is intended to streamline the lesson by making it easier for instructors and students to stay organized and follow the drill. For example, Blend offers the ability to download pre-made decks and customize them. It also allows instructors to set up “playlists” (word chains) in advance of a lesson to streamline the blending drill, or take a completed drill and turn it into a playlist for re-use. Whether working with an entire classroom or an individual student, in person or through remote learning, virtual blending boards offer more flexibility and ease of use for instructors and students alike.`
    },
    {
      type: "heading",
      size: 2,
      content: `How to Get Started`
    },
    {
      type: "text",
      content: `Blend is designed to supercharge your phonics instruction with modern features built around the familiar blending board experience. Check out our <a href="https://blendreading.com/features" target="_blank">features</a> page to learn about everything Blend has to offer, and then dive right in with the free version of our app!`
    },
    {
      type: "text",
      content: `If you're ready to take your phonics instruction to the next level, you can try a free trial of Blend Pro for 30 days, with absolutely no commitment. Just sign up from the <a href="https://blendreading.com/account" target="_blank">account</a> page. If you work for a school or instructional group, please reach out to us for site licensing!`
    },
  ]
}

export default post;