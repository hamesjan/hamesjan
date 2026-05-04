import { getMovies } from '$lib/server/db.js';

export function load() {
  const movies = getMovies();
  return {
    movies: [...movies].sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating;
      return b.dateWatched.localeCompare(a.dateWatched);
    })
  };
}
