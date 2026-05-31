import { json } from '@sveltejs/kit';
import { validateToken } from '$lib/server/auth.js';
import { writeFileSync, mkdirSync } from 'fs';
import { join, extname } from 'path';
import { log } from '$lib/server/logger.js';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'changeme';
const UPLOADS_DIR = join(process.cwd(), 'uploads');

const ALLOWED = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']);

export async function POST({ request, cookies }) {
  if (!validateToken(cookies.get('admin_session'), ADMIN_PASSWORD)) {
    log.warn('upload_unauthorized');
    return json({ error: 'unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file');

  if (!file || typeof file === 'string') {
    log.warn('upload_no_file');
    return json({ error: 'no file' }, { status: 400 });
  }

  const ext = extname(file.name).toLowerCase();
  if (!ALLOWED.has(ext)) {
    log.warn('upload_bad_type', { ext, name: file.name });
    return json({ error: 'unsupported file type' }, { status: 400 });
  }

  const filename = `${Date.now()}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  mkdirSync(UPLOADS_DIR, { recursive: true });
  writeFileSync(join(UPLOADS_DIR, filename), buffer);

  log.info('upload_ok', { filename, size: buffer.byteLength, originalName: file.name });
  return json({ path: `/uploads/${filename}` });
}
