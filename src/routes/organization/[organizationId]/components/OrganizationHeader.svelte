<script lang="ts">
  import { enhance } from '$app/forms';
  import type { Writable } from 'svelte/store';
  import { fade } from 'svelte/transition';

  export let organization: Writable<Database.Organization | null>;

  $: isUpdatingLogo = !$organization?.public.logoUrl;
  let logoFileList: FileList;
  $: isLogoFileTooBig = logoFileList?.[0]?.size > 5 * 1024 * 1024;
  let isLogoWrongSize = false;
  $: {
    let image = new Image();
    image.src = logoFileList ? URL.createObjectURL(logoFileList?.[0]) : '';
    image.onload = () => {
      if (image.width > 128 || image.width !== image.height) {
        isLogoWrongSize = true;
        return;
      }
      isLogoWrongSize = false;
    };
  }
</script>

<div class="row flex-center my-4 max-md:flex-wrap" style="gap: 1rem; align-items: center;">
  {#if $organization?.locked.isLicensed}
    <!-- Below is a spacer to keep the org name centered -->
    <div
      class={`!m-0 ${isUpdatingLogo ? `${isLogoFileTooBig || isLogoWrongSize ? 'h-48' : 'h-40'} w-96` : 'h-24 w-24'} !max-w-sm transition-all duration-500 max-sm:!mx-auto`}>
    </div>

    <h1 class="mb-0">{$organization.public.name}</h1>
    <div
      class={`card !m-0 ${isUpdatingLogo ? `${isLogoFileTooBig || isLogoWrongSize ? 'h-48' : 'h-40'} w-96` : 'h-24 w-24'} !max-w-sm transition-all duration-500 max-sm:!mx-auto`}>
      {#if !isUpdatingLogo}
        <img src={$organization.public.logoUrl} class="mx-auto" width="64" height="64" alt="Organization Logo" />
        <button
          class="btn btn-small !mx-auto !border-gray-500 !text-gray-600"
          on:click={() => {
            isUpdatingLogo = true;
          }}>Change Logo</button>
      {:else}
        <form
          class="flex flex-col items-center gap-1 text-nowrap text-sm"
          in:fade={{ delay: 150 }}
          method="POST"
          use:enhance
          action="?/updateLogo"
          enctype="multipart/form-data"
          on:submit={() => {
            isUpdatingLogo = false;
            return true;
          }}>
          <label for="logo" class="text-lg"> Upload a Logo</label>
          <div class="text-center">
            <p>
              This logo will appear as a small badge in the Blend app. <br />
              If you need help resizing your image, please email it to <br />
              <a href="mailto:support@blendreading.com">support@blendreading.com</a>
            </p>
            {#if isLogoFileTooBig}
              <p class="!w-full text-red-600">File size must be less than 5MB</p>
            {:else if isLogoWrongSize}
              <p class="!w-full text-red-600">Image must be square and less than 128x128 pixels</p>
            {/if}
          </div>
          <input
            id="logo"
            class="my-1 block w-full max-w-[200px] rounded-lg border border-gray-100 text-sm file:rounded-lg file:border-transparent file:bg-blue-50 focus:outline-none"
            bind:files={logoFileList}
            name="logo"
            type="file"
            accept=".jpg,.jpeg,.png,.gif,.webp"
            required />
          <div class="flex flex-row gap-1">
            <button disabled={isLogoFileTooBig} class="btn btn-small btn-gray w-fit !px-5" style="margin: 0">Upload</button>
            {#if $organization.public.logoUrl}
              <button
                class="btn btn-small btn-gray w-fit !px-5"
                style="margin: 0"
                type="button"
                on:click={() => {
                  isUpdatingLogo = false;
                }}
                >Cancel
              </button>
            {/if}
          </div>
        </form>
      {/if}
    </div>
  {:else}
    <h1 class="mb-0">{$organization?.public.name}</h1>
  {/if}
</div>
