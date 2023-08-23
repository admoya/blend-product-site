<script lang="ts">
  export let blogPost: Blog.BlogPost;
</script>

<svelte:head>
  <title>{blogPost.title}</title>
</svelte:head>

<article class="blog-post">
  <h1 style="text-align: center">{blogPost.title}</h1>
  {#each blogPost.blocks as block}
    {#if block.type === 'heading'}
      {#if block.size === 1}
        <h1>{block.content}</h1>
      {:else if block.size === 2}
        <h2>{block.content}</h2>
      {:else}
        <h3>{block.content}</h3>
      {/if}
    {:else if block.type === 'youtube'}
      <div class="youtube-block">
        <iframe
          class="youtube-video"
          width={block.size?.width || 560}
          height={block.size?.height || 315}
          src={block.source}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          style="max-width: 100%;" />
      </div>
    {:else if block.type === 'image'}
      <div class="image-block" style={block.align ? `padding: 0 1rem; padding-${block.align}: 0; float: ${block.align}` : 'text-align: center'}>
        <img src={block.src} alt={block.altText} width={block.size?.width || 'auto'} height={block.size?.height || 'auto'} style="max-width: 100%" />
        {#if block.caption}
          <p style={`margin-top: 0; font-size: 0.9rem; text-align: center; text-wrap: wrap; min-width: 100%; width: 0`}>{block.caption}</p>
        {/if}
      </div>
    {:else}
      <p>{@html block.content}</p>
    {/if}
  {/each}
</article>

<style>
  h2 {
    text-align: center;
    font-family: 'Contrail One';
    font-size: xx-large;
  }
  .blog-post {
    /* Styles for the blog post container */
  }

  .youtube-block {
    text-align: center;
  }

  @media (max-width: 480px) {
    .image-block {
      padding: 0 !important;
    }
  }
</style>
