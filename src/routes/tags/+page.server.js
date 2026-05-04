import { getPosts, getAllTags } from '$lib/server/db.js';

export function load() {
  const posts = getPosts();
  const allTags = getAllTags();
  return {
    tags: allTags.map(tag => ({
      tag,
      count: posts.filter(p => p.tags.includes(tag)).length
    }))
  };
}
