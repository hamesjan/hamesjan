import { error } from '@sveltejs/kit';
import { readFileSync, existsSync } from 'fs';
import { join, extname, basename } from 'path';

const UPLOADS_DIR = join(process.cwd(), 'uploads');

const MIME = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.avif': 'image/avif'
};

export function GET({ params }) {
  const filename = basename(params.file);
  const filepath = join(UPLOADS_DIR, filename);

  if (!existsSync(filepath)) throw error(404, 'Not found');

  const ext = extname(filename).toLowerCase();
  const mime = MIME[ext] ?? 'application/octet-stream';
  const buffer = readFileSync(filepath);

  return new Response(buffer, {
    headers: {
      'Content-Type': mime,
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  });
}
