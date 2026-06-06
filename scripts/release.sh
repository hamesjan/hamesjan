#!/usr/bin/env bash
# Usage: ./scripts/release.sh v1.2.0
# Creates a release tarball in static/releases/ and updates data/releases.json.
set -euo pipefail

REPO="/root/hamesjan"
VERSION="${1:?Usage: release.sh <version>  e.g. v1.0.0}"
TIMESTAMP=$(date +%Y%m%d)
NAME="hamesjan_${TIMESTAMP}_${VERSION}"
RELEASES_DIR="$REPO/static/releases"
OUT="$RELEASES_DIR/${NAME}.tar.gz"
WORK=$(mktemp -d)

mkdir -p "$RELEASES_DIR"

# Assemble source tree
rsync -a \
  --exclude='node_modules/' \
  --exclude='build/' \
  --exclude='.svelte-kit/' \
  --exclude='.env' \
  --exclude='.env.*' \
  --exclude='uploads/' \
  --exclude='logs/' \
  --exclude='.git/' \
  --exclude='static/releases/' \
  "$REPO/" "$WORK/$NAME/"

# Bundle infra files alongside the source
cp "$REPO/Caddyfile.site"    "$WORK/$NAME/Caddyfile.site"
cp "$REPO/hamesjan.service"  "$WORK/$NAME/hamesjan.service"

tar -czf "$OUT" -C "$WORK" "$NAME"
rm -rf "$WORK"

SIZE=$(du -sh "$OUT" | cut -f1)
echo "Created: $OUT ($SIZE)"

# Update data/releases.json
node - "$NAME.tar.gz" "$VERSION" "$TIMESTAMP" "$SIZE" <<'EOF'
const fs = require('fs');
const [,, file, version, ts, size] = process.argv;
const path = '/root/hamesjan/data/releases.json';
const releases = fs.existsSync(path) ? JSON.parse(fs.readFileSync(path, 'utf8')) : [];
const date = `${ts.slice(0,4)}-${ts.slice(4,6)}-${ts.slice(6,8)}`;
releases.unshift({ file, version, date, size });
fs.writeFileSync(path, JSON.stringify(releases, null, 2));
console.log(`Added ${file} to releases.json`);
EOF
