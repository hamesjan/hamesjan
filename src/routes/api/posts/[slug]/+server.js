import { json } from '@sveltejs/kit';
import { validateToken } from '$lib/server/auth.js';
import { log } from '$lib/server/logger.js';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'changeme';
import { updatePost, deletePost } from '$lib/server/db.js';

function authed(cookies) {
  return validateToken(cookies.get('admin_session'), ADMIN_PASSWORD);
}

export async function PUT({ request, cookies, params }) {
  if (!authed(cookies)) {
    log.warn('post_update_unauthorized', { slug: params.slug });
    return json({ error: 'unauthorized' }, { status: 401 });
  }
  const updates = await request.json();
  const result = updatePost(decodeURIComponent(params.slug), updates);
  if (!result) return json({ error: 'not found' }, { status: 404 });
  log.info('post_update', { slug: params.slug });
  return json(result);
}

export async function DELETE({ cookies, params }) {
  if (!authed(cookies)) {
    log.warn('post_delete_unauthorized', { slug: params.slug });
    return json({ error: 'unauthorized' }, { status: 401 });
  }
  const ok = deletePost(decodeURIComponent(params.slug));
  if (!ok) return json({ error: 'not found' }, { status: 404 });
  log.info('post_delete', { slug: params.slug });
  return json({ ok: true });
}
