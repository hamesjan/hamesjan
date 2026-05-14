import { getPublishedPosts } from '$lib/server/db.js';

export function load() {
  return { posts: getPublishedPosts() };
}
