#!/bin/sh
# Runs when the nginx container starts (from /docker-entrypoint.d).
# Writes every REACT_APP_* environment variable into env-config.js, so the web image
# is built once and configured per environment.
set -e

OUT=/usr/share/nginx/html/env-config.js

echo "window.__ENV__ = {" > "$OUT"
env | grep '^REACT_APP_' | sort | while IFS='=' read -r key value; do
  escaped=$(printf '%s' "$value" | sed 's/\\/\\\\/g; s/"/\\"/g')
  printf '  "%s": "%s",\n' "$key" "$escaped" >> "$OUT"
done
echo "};" >> "$OUT"
