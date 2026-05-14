import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';

function readJson(path) {
  if (!existsSync(path)) return [];
  return JSON.parse(readFileSync(path, 'utf-8'));
}

function writeJson(path, data) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(data, null, 2));
}

const postsPath = join(process.cwd(), 'data', 'posts.json');
const moviesPath = join(process.cwd(), 'data', 'movies.json');

export function getPosts() {
  return readJson(postsPath);
}

export function getPublishedPosts() {
  return getPosts().filter(p => p.published !== false);
}

export function getPost(year, month, day) {
  return getPosts().find(p => p.slug === `${year}/${month}/${day}`) ?? null;
}

export function createPost(post) {
  const posts = getPosts();
  posts.push(post);
  posts.sort((a, b) => b.isoDate.localeCompare(a.isoDate));
  writeJson(postsPath, posts);
  return post;
}

export function updatePost(slug, updates) {
  const posts = getPosts();
  const idx = posts.findIndex(p => p.slug === slug);
  if (idx === -1) return null;
  posts[idx] = { ...posts[idx], ...updates };
  writeJson(postsPath, posts);
  return posts[idx];
}

export function deletePost(slug) {
  const posts = getPosts();
  const filtered = posts.filter(p => p.slug !== slug);
  if (filtered.length === posts.length) return false;
  writeJson(postsPath, filtered);
  return true;
}

export function getPostsByTag(tag) {
  return getPosts().filter(p => p.tags.includes(tag));
}

export function getAllTags() {
  return [...new Set(getPosts().flatMap(p => p.tags))].sort();
}

export function getMovies() {
  return readJson(moviesPath);
}

export function getMovieById(id) {
  return getMovies().find(m => m.id === id) ?? null;
}

export function createMovie(movie) {
  const movies = getMovies();
  const newMovie = { ...movie, id: Date.now().toString() };
  movies.push(newMovie);
  writeJson(moviesPath, movies);
  return newMovie;
}

export function updateMovie(id, updates) {
  const movies = getMovies();
  const idx = movies.findIndex(m => m.id === id);
  if (idx === -1) return null;
  movies[idx] = { ...movies[idx], ...updates };
  writeJson(moviesPath, movies);
  return movies[idx];
}

export function deleteMovie(id) {
  const movies = getMovies();
  const filtered = movies.filter(m => m.id !== id);
  if (filtered.length === movies.length) return false;
  writeJson(moviesPath, filtered);
  return true;
}
