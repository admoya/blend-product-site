import { error } from '@sveltejs/kit';
import blogPosts from '$lib/data/blogs';
import type { PageLoad } from './$types.js';

export const load = (({ params }) => {
  const postData = blogPosts.find((post) => post.slug === params.slug);
  if (postData) {
    return {
      postData,
    };
  }

  throw error(404, 'Not found');
}) satisfies PageLoad;
