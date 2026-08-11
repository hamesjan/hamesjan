import { error } from '@sveltejs/kit';
import { getMovieById } from '$lib/server/db.js';

export function load({ params }) {
  const movie = getMovieById(params.id);
  if (!movie) throw error(404, 'Not found');
  return { movie };
}
