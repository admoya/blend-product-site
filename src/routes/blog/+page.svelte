<script lang="ts">
  import blogPosts from '$lib/data/blogs';
  import blendLogo from '$lib/assets/blend_logo.png';
</script>

<svelte:head>
  <title>Blend Blog</title>
</svelte:head>

<div class="content">
  <h1 id="title">Blend Blog</h1>
  <p id="subtitle">Check out our blog posts below for Blend tutorials and more!</p>
  <ul class="post-list">
    {#each blogPosts as blogPost}
      <li>
        <a href={`/blog/${blogPost.slug}`}>
          <div class="paper post-preview">
            <div>
              <p class="post-title">{blogPost.title}</p>
              <p class="post-subtitle">{blogPost.summary}</p>
            </div>
            <img class="post-preview-image" src={blogPost.previewImg?.src || blendLogo} alt={blogPost.previewImg?.altText} />
          </div>
        </a>
      </li>
    {/each}
  </ul>
</div>

<style>
  #title {
    margin-bottom: 0;
  }
  #subtitle {
    margin-top: 0.2rem;
  }
  .post-preview {
    display: inline-flex;
    gap: 2rem;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 100%;
    margin-top: 0;
    box-sizing: border-box;
  }
  .post-list {
    padding: 0;
    list-style-type: none;
    margin: 0 auto;
    width: min(35rem, 100vw);
  }
  .post-title {
    text-align: left;
    font-size: x-large;
    margin: 0 auto;
  }
  .post-subtitle {
    text-align: justify;
    min-width: 100%;
    width: 0;
    font-size: 0.95rem;
    font-weight: lighter;
    margin: 0 auto;
  }
  .post-preview-image {
    width: 150px;
    height: 150px;
    border-radius: 5px;
    /* object-fit: cover; */
  }

  @media (max-width: 480px) {
    .post-preview-image {
      width: 120px;
      height: 120px;
    }
    .post-title {
      font-size: large;
    }
    .post-subtitle {
      font-size: 0.9rem;
    }
    .post-preview {
      gap: 1rem;
    }
  }
</style>
