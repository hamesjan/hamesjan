// shared helpers for the tiny markdown subset used in posts

const SCHEME = /^([a-z][a-z0-9+.-]*):/i;
const ALLOWED_SCHEMES = ['http', 'https', 'mailto', 'tel'];

// links written without a scheme (`google.com`) are otherwise treated as
// relative paths by the browser and resolve to hamesjan.com/<url>
export function normalizeUrl(url) {
  const trimmed = url.trim();
  if (!trimmed) return '#';
  // in-site or in-page targets stay relative
  if (trimmed.startsWith('/') || trimmed.startsWith('#') || trimmed.startsWith('?')) return trimmed;
  const scheme = trimmed.match(SCHEME);
  if (scheme) return ALLOWED_SCHEMES.includes(scheme[1].toLowerCase()) ? trimmed : '#';
  return `https://${trimmed}`;
}

export function isExternal(href) {
  return /^(https?:)?\/\//i.test(href);
}

// plain-text version for previews: drop images, keep link labels only
export function stripMarkdown(text) {
  return text
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .trim();
}

export function renderLink(text, url) {
  const href = normalizeUrl(url).replace(/"/g, '&quot;');
  const attrs = isExternal(href) ? ' target="_blank" rel="noopener noreferrer"' : '';
  return `<a href="${href}"${attrs}>${text}</a>`;
}
