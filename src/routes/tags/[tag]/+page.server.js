import { getPublishedPosts } from '$lib/server/db.js';

export function load({ params }) {
  const posts = getPublishedPosts().filter(p => p.tags.includes(params.tag));
  return { tag: params.tag, posts };
}
