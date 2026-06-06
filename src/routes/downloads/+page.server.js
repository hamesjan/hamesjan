import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export function load() {
  const path = join(process.cwd(), 'data', 'releases.json');
  const releases = existsSync(path) ? JSON.parse(readFileSync(path, 'utf-8')) : [];
  return { releases };
}
