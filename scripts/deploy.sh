#!/usr/bin/env bash
set -euo pipefail

cd /root/hamesjan

echo "==> pulling latest"
git pull

echo "==> installing deps"
npm install

echo "==> building"
npm run build

echo "==> restarting service"
systemctl restart hamesjan

echo "==> reloading caddy"
caddy reload --config /root/jamesdroplet/Caddyfile --force

echo "==> done"
