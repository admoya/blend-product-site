<script lang="ts">
  import BlogPost from '$lib/components/BlogPost.svelte';
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<div class="paper">
  <BlogPost blogPost={data.postData} />
</div>
