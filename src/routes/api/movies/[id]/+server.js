import { json } from '@sveltejs/kit';
import { validateToken } from '$lib/server/auth.js';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'changeme';
import { updateMovie, deleteMovie } from '$lib/server/db.js';

function authed(cookies) {
  return validateToken(cookies.get('admin_session'), ADMIN_PASSWORD);
}

export async function PUT({ request, cookies, params }) {
  if (!authed(cookies)) return json({ error: 'unauthorized' }, { status: 401 });
  const updates = await request.json();
  const result = updateMovie(params.id, updates);
  if (!result) return json({ error: 'not found' }, { status: 404 });
  return json(result);
}

export async function DELETE({ cookies, params }) {
  if (!authed(cookies)) return json({ error: 'unauthorized' }, { status: 401 });
  const ok = deleteMovie(params.id);
  if (!ok) return json({ error: 'not found' }, { status: 404 });
  return json({ ok: true });
}
