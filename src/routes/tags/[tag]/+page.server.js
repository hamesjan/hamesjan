import { getPostsByTag } from '$lib/server/db.js';
import { error } from '@sveltejs/kit';

export function load({ params }) {
  const posts = getPostsByTag(params.tag);
  if (posts === null) throw error(404, 'Tag not found');
  return { tag: params.tag, posts };
}
