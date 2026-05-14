import { getMovies } from '$lib/server/db.js';

export function load() {
  const movies = getMovies();
  return {
    movies: [...movies].sort((a, b) => {
      if (!a.dateWatched) return 1;
      if (!b.dateWatched) return -1;
      return a.dateWatched > b.dateWatched ? -1 : a.dateWatched < b.dateWatched ? 1 : 0;
    })
  };
}
