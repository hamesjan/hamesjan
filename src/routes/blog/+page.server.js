import { getPosts } from '$lib/server/db.js';

export function load() {
  return { posts: getPosts() };
}
