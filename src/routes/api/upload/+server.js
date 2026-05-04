import { json } from '@sveltejs/kit';
import { validateToken } from '$lib/server/auth.js';
import { writeFileSync, mkdirSync } from 'fs';
import { join, extname } from 'path';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'changeme';
const UPLOADS_DIR = join(process.cwd(), 'uploads');

const ALLOWED = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']);

export async function POST({ request, cookies }) {
  if (!validateToken(cookies.get('admin_session'), ADMIN_PASSWORD)) {
    return json({ error: 'unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file');

  if (!file || typeof file === 'string') {
    return json({ error: 'no file' }, { status: 400 });
  }

  const ext = extname(file.name).toLowerCase();
  if (!ALLOWED.has(ext)) {
    return json({ error: 'unsupported file type' }, { status: 400 });
  }

  const filename = `${Date.now()}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  mkdirSync(UPLOADS_DIR, { recursive: true });
  writeFileSync(join(UPLOADS_DIR, filename), buffer);

  return json({ path: `/uploads/${filename}` });
}
