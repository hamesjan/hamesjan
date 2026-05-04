import { createHmac } from 'crypto';

const SALT = 'hamesjan-site-2026';

export function computeToken(password) {
  return createHmac('sha256', SALT).update(password).digest('hex');
}

export function validateToken(token, adminPassword) {
  if (!token || !adminPassword) return false;
  return token === computeToken(adminPassword);
}
