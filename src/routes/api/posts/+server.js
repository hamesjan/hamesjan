import { json } from '@sveltejs/kit';
import { validateToken } from '$lib/server/auth.js';
import { log } from '$lib/server/logger.js';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'changeme';
import { getPosts, createPost } from '$lib/server/db.js';

function authed(cookies) {
  return validateToken(cookies.get('admin_session'), ADMIN_PASSWORD);
}

export async function GET() {
  return json(getPosts());
}

export async function POST({ request, cookies }) {
  if (!authed(cookies)) {
    log.warn('post_create_unauthorized');
    return json({ error: 'unauthorized' }, { status: 401 });
  }
  const post = await request.json();
  const created = createPost(post);
  log.info('post_create', { slug: created.slug, title: created.title });
  return json(created);
}
