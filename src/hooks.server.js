import { log } from '$lib/server/logger.js';

export function handleError({ error, event, status, message }) {
  log.error('server_error', {
    status,
    message,
    path: event?.url?.pathname,
    method: event?.request?.method,
    stack: error?.stack ?? String(error),
  });
}
