# hamesjan.com

Personal site for James Han. SvelteKit with adapter-node, served by Caddy via reverse proxy on port 3000.

## Stack

- SvelteKit (adapter-node) → `build/` → runs as `node build/index.js` on port 3000
- Caddy reverse proxies hamesjan.com → localhost:3000 (config: `Caddyfile.site`)
- Data stored as JSON flat files in `data/` (no database)
- Systemd service: `hamesjan.service` (copied to `/etc/systemd/system/`)

## Data files

- `data/posts.json` — blog posts
- `data/movies.json` — movie reviews

Both are read/written by `src/lib/server/db.js`. Do not import `db.js` from client-side code.

## Auth

- Admin password lives in `/root/hamesjan/.env` as `ADMIN_PASSWORD=...`
- Auth flow: triple-click the bottom-left counter block → password modal → HttpOnly cookie (`admin_session`)
- Auth helpers: `src/lib/server/auth.js`
- API: `POST /api/auth` (login), `GET /api/auth` (check), `DELETE /api/auth` (logout)

## Routes

| Route | Description |
|---|---|
| `/` | Homepage with terminal interests block + recent posts |
| `/blog` | All posts, sorted newest first |
| `/blog/[year]/[month]/[day]` | Single post |
| `/movies` | Movie reviews, sorted by rating |
| `/tags` | All tags |
| `/tags/[tag]` | Posts filtered by tag |
| `/portfolio` | Portfolio page |
| `/admin` | Blog + movie editor (client-side only, redirects if not authed) |
| `/api/posts` | GET all, POST new (auth required) |
| `/api/posts/[slug]` | PUT update, DELETE (auth required) |
| `/api/movies` | GET all, POST new (auth required) |
| `/api/movies/[id]` | PUT update, DELETE (auth required) |

## Post schema

```json
{
  "slug": "2026/05/03",
  "title": "on starting this",
  "date": "may 3, 2026",
  "isoDate": "2026-05-03",
  "tags": ["general"],
  "content": "..."
}
```

## Movie schema

```json
{
  "id": "1234567890",
  "title": "Dune: Part Two",
  "year": 2024,
  "director": "Denis Villeneuve",
  "rating": 9,
  "review": "...",
  "dateWatched": "2026-05-04"
}
```

## Layout

- `+layout.svelte` — header, nav, counter block, password modal. Dark mode toggled via `localStorage` and `data-theme` attribute on `<html>`
- Counter image is bottom-left, covered by a div 5% lighter than bg. Triple-click reveals it
- Admin nav link (`/admin`) only appears after successful auth

## Deploy

First time only:
```bash
make -C /root/jamesdroplet install-site-hamesjan
make -C /root/jamesdroplet caddy-reload
```

Every deploy after:
```bash
make -C /root/jamesdroplet deploy-hamesjan
```

Deploy script: `/root/jamesdroplet/scripts/deploy-hamesjan.sh` (pull → npm install → build → restart service → caddy reload)
