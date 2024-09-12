import thumbnail from './images/thumbnail.png';
import collage from './images/collage.png';
import sounds from './images/sounds.gif';
import syllables from './images/syllables.gif';
import mats from './images/mats.png';
import themes from './images/themes.png';
import badge from './images/badge.png';
import menu from './images/menu.png';
import createDeck from './images/create-deck.png';
import stephHeadshot from '$lib/assets/people/stephanie-headshot.jpg';
const post: Blog.BlogPost = {
  slug: 'fall-24-launch',
  summary: `This is Blend's biggest launch ever! You don't want to miss out on all the new features we have to offer. Check out this post to read all about it!`,
  title: `What's New: Fall Launch`,
  previewImg: {
    type: 'image',
    src: thumbnail,
    altText: 'Science of Reading Thumbnail',
  },
  blocks: [
    {
      type: 'byline',
      name: 'Stephanie Cruz',
      imageSrc: stephHeadshot,
      date: 'September 11th, 2024',
    },
    {
      type: 'text',
      content: `This launch is unlike any other for Blend. We asked our users what they wanted to see from us, and we're excited to announce that we've implmented some of the most requested features! Read on to see what's new.`,
    },
    {
      type: 'text',
      content: `<div style="display: flex; justify-content: center;"><a href="https://app.blendreading.com" class="btn btn-blurple" style="width: 20rem;">Check out the Blend app</a><a href="/account?action=upgrade&successRedirect=app&jumpScene=res%3a%2f%2fScenes%2fAccount%2fAccount.tscn" class="btn btn-green" style="width: 20rem;">Try Blend Pro Free for 7 days</a></div>`,
    },
    {
      type: 'image',
      src: collage,
      size: {
        width: 750,
      },
      altText: 'Collage of new features',
    },
    {
      type: 'heading',
      size: 2,
      content: `It's finally here: the Blend Word Mat`,
    },
    {
      type: 'text',
      content: `The question we get asked most often is: "Do you have a feature for spelling?" We're proud to say: YES - we do! The new Word Mat feature is the perfect complement to Decks and Playlists, which focus on the blending drill. With the word mat, you can focus on spelling and segmenting - on any device.`,
    },
    {
      type: 'heading',
      size: 3,
      content: `Built-in support for Elkonin boxes`,
    },
    {
      type: 'text',
      content: `On our Word Mat, you can tap to add boxes to represent each sound in the word, reinforcing phonemic awareness for students. The number of boxes is adjustable at any time, so you can practice with individal words or even word chains!`,
    },
    {
      type: 'image',
      src: sounds,
      size: {
        width: 600,
      },
      altText: 'Gif showing how to add Elkonin boxes and segment words',
      caption: 'Tap to add Elkonin boxes and segment words',
    },
    {
      type: 'heading',
      size: 3,
      content: `Practice multisyllabic words`,
    },
    {
      type: 'text',
      content: `Most of the solutions we've seen for Elkonin boxes only support single-syllable words. With the Blend Word Mat, you can practice syllable division, too! As always, our tools are designed to grow with your students as they build fluency.`,
    },
    {
      type: 'image',
      src: syllables,
      size: {
        width: 600,
      },
      altText: 'Gif showing syllable division in Blend',
      caption: 'Work on syllable division from the same word mat',
    },
    {
      type: 'heading',
      size: 3,
      content: `Two Preloaded Mats`,
    },
    {
      type: 'text',
      content: `We have two mats available in the app: A-Z Tiles and Advanced Sounds. In addition to the grapheme tiles, we've also added a nifty heart tile for practicing those heart words and irregular sounds. Choose the mat that fits your needs and start spelling!`,
    },
    {
      type: 'image',
      src: mats,
      size: {
        width: 750,
      },
      altText: 'Screenshots showing the two mats available in Blend',
      caption: 'Choose from the A-Z Tiles mat (left) or the Advanced Sounds mat (right)',
    },
    {
      type: 'heading',
      size: 2,
      content: `Phonics is fun and festive with Blend`,
    },
    {
      type: 'text',
      content: `There's something satisfying about making your tools your own. We've added some customization features to the app to help you do just that!`,
    },
    {
      type: 'heading',
      size: 3,
      content: `Custom in-app themes`,
    },
    {
      type: 'text',
      content: `Part of teaching is always making things fun and engaging for your students. You can now choose from a variety of themes that feature different backgrounds and characters. We have a few themes already, and more are coming soon!`,
    },
    {
      type: 'image',
      src: themes,
      size: {
        width: 750,
      },
      altText: 'Screenshots of the different themes available in Blend',
      caption: 'Choose from a variety of themes like "Fall" (left) and "Halloween" (right)',
    },
    {
      type: 'heading',
      size: 3,
      content: `Blend badges`,
    },
    {
      type: 'image',
      src: badge,
      align: 'left',
      size: {
        width: 300,
      },
      altText: 'Screenshot of the badge feature in Blend',
      caption: 'Your badge appears in app next to the Blend logo',
    },
    {
      type: 'text',
      content: `Show some pride for your school or organization with badges! You can now add a badge to your profile to show off your school spirit. Organization admins can upload a logo image on the organization dashboard, and it will display for all members in the app!<br/><br/>`,
    },
    {
      type: 'heading',
      size: 2,
      content: `Blend's got a new look`,
    },
    {
      type: 'text',
      content: `We've made some changes in the app to make it easier to navigate and find the tools you need for your lessons! Our goal is to help you spend less time planning and more time teaching. Here are some of the changes we've made:`,
    },
    {
      type: 'heading',
      size: 3,
      content: `New Menu Bar`,
    },
    {
      type: 'text',
      content: `Our original app layout made it hard to find some of the most useful features, like Playlists! Now, you can access all of our tools - Playlists, Decks, and Word Mats - from the menu bar at the top of the screen.`,
    },
    {
      type: 'image',
      src: menu,
      size: {
        width: 500,
      },
      altText: 'Screenshot of new Blend menu',
      caption: 'Access our tools easily with the new menu bar',
    },
    {
      type: 'heading',
      size: 3,
      content: `An easier way to customize your decks`,
    },
    {
      type: 'text',
      content: `The process of creating a custom deck is now more streamlined. Now, you can easily select another deck to copy from, so you don't have to start from scratch. Simply choose a deck to start with, then remove or add graphemes as needed to differentiate for each student.`,
    },
    {
      type: 'image',
      src: createDeck,
      size: {
        width: 500,
      },
      altText: 'Screenshot of the new deck creation process',
      caption: 'Choose to create a blank deck or copy from an existing one',
    },
    {
      type: 'heading',
      size: 2,
      content: `Ready to jump in?`,
    },
    {
      type: 'text',
      content: `<div style="display: flex; justify-content: center;"><a href="https://app.blendreading.com" class="btn btn-blurple" style="width: 20rem;">Check out the Blend app</a><a href="/account?action=upgrade&successRedirect=app&jumpScene=res%3a%2f%2fScenes%2fAccount%2fAccount.tscn" class="btn btn-green" style="width: 20rem;">Try Blend Pro Free for 7 days</a></div>`,
    },
    {
      type: 'heading',
      size: 2,
      content: `More Blend Updates`,
    },
    {
      type: 'heading',
      size: 3,
      content: `A library of resources at your fingertips`,
    },
    {
      type: 'text',
      content: `In case you missed it, over the summer we launched an amazing collection of playlists in The Blend Library. Curated by our very own dyslexia specialist, these playlists follow a scope and sequence that makes sense for your students. Check out the library to learn more, and head to the app to start using them out of the box!`,
    },
    {
      type: 'text',
      content: `<div style="display: flex; justify-content: center;"><a href="/library" class="btn" style="width: 15rem; background-color:#7e89ec;">Go to the Blend Library</a></div>`,
    },
    {
      type: 'heading',
      size: 3,
      content: `COMING SOON: Blend Teams`,
    },
    {
      type: 'text',
      content: `Have you ever wanted to collaborate with other teachers, but you're not quite sure about an organization license? With a Blend Team, you can share resources while being in control of your own subscription. Stay tuned for more info on Teams!`,
    },
    {
      type: 'heading',
      size: 3,
      content: `Make sure to subscribe to Blend emails for the latest updates!`,
    },
    {
      type: 'text',
      content: `<div style="display: flex; justify-content: center;"><a href="/newsletter" class="btn" style="width: 16rem; background-color:#fa9a9a;">Sign up for the newsletter</a></div>`,
    },
  ],
};

export default post;
