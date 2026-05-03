import { posts, getPost } from '$lib/posts.js';
import { error } from '@sveltejs/kit';

export function entries() {
  return posts.map(p => {
    const [year, month, day] = p.slug.split('/');
    return { year, month, day };
  });
}

export function load({ params }) {
  const post = getPost(params.year, params.month, params.day);
  if (!post) throw error(404, 'Post not found');
  return { post };
}
