import { getPost } from '$lib/server/db.js';
import { error } from '@sveltejs/kit';

export function load({ params }) {
  const post = getPost(params.year, params.month, params.day);
  if (!post) throw error(404, 'Post not found');
  return { post };
}
