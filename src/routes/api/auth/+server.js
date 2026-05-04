import { json } from '@sveltejs/kit';
import { computeToken, validateToken } from '$lib/server/auth.js';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'changeme';

const COOKIE = 'admin_session';

export async function POST({ request, cookies }) {
  const { password } = await request.json();
  if (!password || password !== ADMIN_PASSWORD) {
    return json({ ok: false, error: 'incorrect password' }, { status: 401 });
  }
  const token = computeToken(password);
  cookies.set(COOKIE, token, {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 30
  });
  return json({ ok: true });
}

export async function GET({ cookies }) {
  const token = cookies.get(COOKIE);
  return json({ authenticated: validateToken(token, ADMIN_PASSWORD) });
}

export async function DELETE({ cookies }) {
  cookies.delete(COOKIE, { path: '/' });
  return json({ ok: true });
}
