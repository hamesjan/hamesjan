import { appendFileSync, existsSync, mkdirSync, renameSync, readdirSync, statSync, unlinkSync } from 'fs';
import { join } from 'path';

const LOG_DIR = join(process.cwd(), 'logs', 'hamesjan');
const CURRENT = join(LOG_DIR, 'current.log');
const ROTATE_AT = 1 * 1024 * 1024;  // 1MB per file before rotating
const MAX_DIR_BYTES = 5 * 1024 * 1024;  // 5MB total cap

function ensureDir() {
  if (!existsSync(LOG_DIR)) mkdirSync(LOG_DIR, { recursive: true });
}

function dirSize() {
  return readdirSync(LOG_DIR).reduce((sum, name) => {
    try { return sum + statSync(join(LOG_DIR, name)).size; } catch { return sum; }
  }, 0);
}

function rotate() {
  const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  renameSync(CURRENT, join(LOG_DIR, `${stamp}.log`));

  // trim oldest rotated files until under cap
  while (dirSize() > MAX_DIR_BYTES) {
    const rotated = readdirSync(LOG_DIR)
      .filter(n => n !== 'current.log')
      .sort();
    if (!rotated.length) break;
    unlinkSync(join(LOG_DIR, rotated[0]));
  }
}

function write(level, event, data) {
  ensureDir();

  try {
    if (existsSync(CURRENT) && statSync(CURRENT).size >= ROTATE_AT) {
      rotate();
    }
  } catch { /* if rotation fails, keep writing to current */ }

  const line = JSON.stringify({ ts: new Date().toISOString(), level, event, ...data }) + '\n';
  try {
    appendFileSync(CURRENT, line);
  } catch { /* never crash the app over logging */ }
}

export const log = {
  info:  (event, data = {}) => write('info',  event, data),
  warn:  (event, data = {}) => write('warn',  event, data),
  error: (event, data = {}) => write('error', event, data),
};
