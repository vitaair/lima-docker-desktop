#!/usr/bin/env bash
set -euo pipefail

export PATH="/Applications/Codex.app/Contents/Resources:/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

exec node "${ROOT_DIR}/desktop-ui/server.js"

