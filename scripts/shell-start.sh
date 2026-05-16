#!/usr/bin/env bash
set -euo pipefail

export PATH="/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin"

INSTANCE_NAME="${INSTANCE_NAME:-docker}"
LOG_DIR="${HOME}/Library/Logs"
LOG_FILE="${LOG_DIR}/docker-lima-start.log"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
UI_LOG_FILE="${LOG_DIR}/lima-docker-desktop-ui.log"
UI_URL="${UI_URL:-http://127.0.0.1:3875}"

mkdir -p "$LOG_DIR"
exec >>"$LOG_FILE" 2>&1

echo
echo "[$(date '+%Y-%m-%d %H:%M:%S')] docker-lima boot script"

start_ui() {
  if curl -fsS "${UI_URL}/api/state" >/dev/null 2>&1; then
    echo "ui is already running: ${UI_URL}"
    return 0
  fi

  if pgrep -f "${ROOT_DIR}/desktop-ui/server.js" >/dev/null 2>&1; then
    echo "ui process exists; waiting for it to become ready"
  else
    echo "starting Lima Docker Desktop UI: ${UI_URL}"
    nohup "${SCRIPT_DIR}/start-lima-docker-desktop.sh" >>"${UI_LOG_FILE}" 2>&1 &
  fi

  for _ in 1 2 3 4 5 6 7 8 9 10; do
    if curl -fsS "${UI_URL}/api/state" >/dev/null 2>&1; then
      echo "ui is ready: ${UI_URL}"
      return 0
    fi
    sleep 1
  done

  echo "ui did not become ready; see ${UI_LOG_FILE}"
  return 1
}

if ! command -v limactl >/dev/null 2>&1; then
  echo "limactl not found"
  exit 1
fi

if ! command -v qemu-system-x86_64 >/dev/null 2>&1; then
  echo "qemu-system-x86_64 not found"
  exit 1
fi

if ! qemu-system-x86_64 -netdev help | grep -q '^user$'; then
  echo "qemu-system-x86_64 exists but lacks user networking"
  exit 1
fi

echo "starting Lima instance: ${INSTANCE_NAME}"
limactl start "$INSTANCE_NAME"

for _ in 1 2 3 4 5 6 7 8 9 10; do
  if /usr/local/bin/docker info >/dev/null 2>&1; then
    echo "docker daemon is ready"
    start_ui || true
    exit 0
  fi
  sleep 3
done

echo "docker daemon not ready after retries"
exit 1
