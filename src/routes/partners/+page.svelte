<script lang="ts">
  import instagramGraphic from '$lib/assets/partners/instagram-graphic.png';
  import logo from '$lib/assets/partners/blend-cards.png';
  import party from '$lib/assets/partners/party.svg';
  import piggy from '$lib/assets/partners/piggy.svg';
  import formGraphic from '$lib/assets/organization/form-graphic.png';
  import facebook from '$lib/assets/footer/facebook.png';
  import instagram from '$lib/assets/footer/instagram.png';
  import newsletter from '$lib/assets/footer/email_newsletter.svg';
  import youtube from '$lib/assets/footer/youtube.png';
</script>

<div class="flex flex-wrap-reverse items-center justify-center gap-x-8 bg-[#f5f5ef] py-8 md:min-h-[calc(100vh-66px)]">
  <img src={instagramGraphic} alt="Graphic of smartphone with Instagram reel" class="min-h-[50%] w-full object-contain md:w-[40%]" />
  <div class="flex w-full flex-col items-center px-5 text-center md:w-1/3 md:p-0">
    <img class="hidden min-h-[4rem] w-[10rem] md:block" src={logo} alt="Blend Logo" />
    <h1>Partner Program</h1>
    <p class="text-center text-2xl">Help us get Blend into the hands of teachers everywhere, and get paid for doing it!</p>
    <div class="flex flex-wrap items-center justify-center">
      <a href="#info" class="btn btn-outlined !mb-0">Learn More</a>
      <a href="#apply" class="btn btn-purple !mb-0 !border-[#7f71d2]">Apply Now</a>
    </div>
  </div>
</div>
<div class="flex flex-wrap-reverse items-center justify-center gap-x-[10rem] gap-y-8 bg-[#9bebe6] p-8 md:py-[8rem]" id="info">
  <div class="flex flex-col">
    <h1>How it works</h1>
    <ul class="ml-5 list-disc space-y-2.5">
      <li>We'll set up a Partner Page for you on our website</li>
      <li>You get your own unique Partner Link that gives users 20% off of Blend Pro</li>
      <li>Gain free access to Blend Pro so you can use the app in your lessons</li>
      <li>Promote the Blend app and share your link to drive new users to your page</li>
      <li>Post when you want to - we don't require you to post on a certain schedule</li>
    </ul>
    <hr class="my-8 h-px border-0 bg-gray-700" />
    <div class="flex flex-col items-center text-center">
      <h2>Want to go for it?</h2>
      <a href="#apply" class="btn btn-outlined w-1/2">Apply Below</a>
      <p>Email us at support@blendreading.com if you have any questions!</p>
    </div>
  </div>
  <div class="relative flex flex-col items-center justify-center rounded-full bg-white p-8 text-center shadow-md md:h-[22rem] md:w-[22rem]">
    <div class="absolute left-5 top-4 hidden -translate-y-1/2 transform md:block">
      <img src={party} alt="Party Popper" class="h-[8rem] w-[8rem]" />
    </div>
    <h1 class="leading-tight">Earn on each referral</h1>
    <p>Keep 100% of the first month of each new subscription created with your link</p>
    <div class="absolute bottom-[-2.2rem] right-[-5.2rem] hidden -translate-y-0 transform md:block">
      <img src={piggy} alt="Piggy Bank" class="h-[12rem] w-[12rem]" />
    </div>
  </div>
</div>
<div class="flex flex-wrap-reverse items-center justify-center gap-x-[10rem] bg-[#fddce2] py-5 shadow-lg md:py-[5rem]" id="apply">
  <div class="flex flex-col">
    <div class="hidden md:block">
      <h1>Ready to start?</h1>
      <p>Submit the application, and we'll be in touch!</p>
      <img src={formGraphic} alt="Graphic of mail letter with heart icon" class="mt-4 w-[15rem]" />
      <hr class="my-8 h-px border-0 bg-gray-700" />
    </div>
    <div class="w-full rounded-xl bg-white p-4 shadow-md">
      <h2>Check out @blendreading!</h2>
      <div class="mt-1 flex gap-5">
        <a href="https://www.facebook.com/blendreading" target="_blank" rel="noopener noreferrer"
          ><img class="h-[2rem]" src={facebook} alt="facebook logo" /></a>
        <a href="https://www.instagram.com/blendreading/" target="_blank" rel="noopener noreferrer"
          ><img class="h-[2rem]" src={instagram} alt="instagram logo" /></a>
        <a href="https://www.youtube.com/@blendreading" target="_blank" rel="noopener noreferrer"
          ><img class="h-[2rem]" src={youtube} alt="youtube icon" /></a>
        <a href="/newsletter"><img class="h-[2rem]" src={newsletter} alt="email newsletter icon" /></a>
      </div>
    </div>
  </div>
  <div class="m-5 w-full rounded-xl bg-[#f5f5ef] p-5 shadow-md md:w-[40%]">
    <h2>Blend Partner Application</h2>
    <form
      name="partner-application"
      action="/partners/submit"
      method="POST"
      data-netlify="true"
      class="flex w-full flex-col justify-center gap-4 py-4">
      <input type="hidden" name="form-name" value="partner-application" />
      <input type="hidden" name="subject" data-remove-prefix value="New Partner Application from blendreading.com" />
      <label>
        <p>Name *</p>
        <input class="w-full rounded-md border border-gray-400 p-2" type="text" name="name" placeholder="Enter Name" required />
      </label>
      <label>
        <p>Email *</p>
        <input class="w-full rounded-md border border-gray-400 p-2" type="email" name="email" placeholder="Enter Email" required />
      </label>
      <label>
        <p>Social Link *</p>
        <input
          class="w-full rounded-md border border-gray-400 p-2"
          type="text"
          name="url"
          placeholder="Your Instagram, YouTube, Facebook or other social link"
          required />
      </label>
      <label>
        <p>Tell us about your community</p>
        <textarea
          rows="4"
          class="w-full rounded-md border border-gray-400 p-2"
          name="message"
          placeholder="What type of content do you make? Describe your audience." />
      </label>
      <button type="submit" class="btn btn-purple !mx-auto !mt-0" style="auto 0 auto">Submit</button>
    </form>
  </div>
</div>
