#!/usr/bin/env bash
set -euo pipefail

export PATH="/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin"

INSTANCE_NAME="${INSTANCE_NAME:-docker}"
LOG_DIR="${HOME}/Library/Logs"
LOG_FILE="${LOG_DIR}/docker-lima-start.log"

mkdir -p "$LOG_DIR"
exec >>"$LOG_FILE" 2>&1

echo
echo "[$(date '+%Y-%m-%d %H:%M:%S')] docker-lima boot script"

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
    exit 0
  fi
  sleep 3
done

echo "docker daemon not ready after retries"
exit 1

