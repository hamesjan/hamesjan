import { getPublishedPosts } from '$lib/server/db.js';

export function load() {
  const posts = getPublishedPosts();
  const allTags = [...new Set(posts.flatMap(p => p.tags))].sort();
  return {
    tags: allTags.map(tag => ({
      tag,
      count: posts.filter(p => p.tags.includes(tag)).length
    }))
  };
}
