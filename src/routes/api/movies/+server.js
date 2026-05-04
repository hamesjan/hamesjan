import { json } from '@sveltejs/kit';
import { validateToken } from '$lib/server/auth.js';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'changeme';
import { getMovies, createMovie } from '$lib/server/db.js';

function authed(cookies) {
  return validateToken(cookies.get('admin_session'), ADMIN_PASSWORD);
}

export async function GET() {
  return json(getMovies());
}

export async function POST({ request, cookies }) {
  if (!authed(cookies)) return json({ error: 'unauthorized' }, { status: 401 });
  const movie = await request.json();
  return json(createMovie(movie));
}
