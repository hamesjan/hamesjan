import { json } from '@sveltejs/kit';
import { validateToken } from '$lib/server/auth.js';
import { log } from '$lib/server/logger.js';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'changeme';
import { updateMovie, deleteMovie } from '$lib/server/db.js';

function authed(cookies) {
  return validateToken(cookies.get('admin_session'), ADMIN_PASSWORD);
}

export async function PUT({ request, cookies, params }) {
  if (!authed(cookies)) {
    log.warn('movie_update_unauthorized', { id: params.id });
    return json({ error: 'unauthorized' }, { status: 401 });
  }
  const updates = await request.json();
  const result = updateMovie(params.id, updates);
  if (!result) return json({ error: 'not found' }, { status: 404 });
  log.info('movie_update', { id: params.id });
  return json(result);
}

export async function DELETE({ cookies, params }) {
  if (!authed(cookies)) {
    log.warn('movie_delete_unauthorized', { id: params.id });
    return json({ error: 'unauthorized' }, { status: 401 });
  }
  const ok = deleteMovie(params.id);
  if (!ok) return json({ error: 'not found' }, { status: 404 });
  log.info('movie_delete', { id: params.id });
  return json({ ok: true });
}
