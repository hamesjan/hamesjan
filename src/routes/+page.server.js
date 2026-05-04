import { getPosts } from '$lib/server/db.js';

export function load() {
  const posts = getPosts();
  return { posts };
}
