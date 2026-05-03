import { getAllTags, getPostsByTag } from '$lib/posts.js';

export function entries() {
  return getAllTags().map(tag => ({ tag }));
}

export function load({ params }) {
  return { tag: params.tag, posts: getPostsByTag(params.tag) };
}
