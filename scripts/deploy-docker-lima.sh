#!/usr/bin/env bash
set -euo pipefail

export PATH="/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin"

INSTANCE_NAME="${INSTANCE_NAME:-docker}"
LIMA_DIR="${HOME}/.lima/${INSTANCE_NAME}"
LIMA_YAML="${LIMA_DIR}/lima.yaml"
DOCKER_WRAPPER="/usr/local/bin/docker"
COMPOSE_WRAPPER="/usr/local/bin/docker-compose"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

log() {
  printf "\n[%s] %s\n" "$(date '+%Y-%m-%d %H:%M:%S')" "$*"
}

need() {
  command -v "$1" >/dev/null 2>&1 || {
    echo "Missing command: $1" >&2
    exit 1
  }
}

log "Checking prerequisites"
need brew
need limactl

if ! command -v qemu-system-x86_64 >/dev/null 2>&1 || ! qemu-system-x86_64 -netdev help | grep -q '^user$'; then
  log "QEMU is missing or lacks user networking; building QEMU"
  "${SCRIPT_DIR}/build-qemu-8.2.3-macos12.sh"
fi

if [ ! -d "$LIMA_DIR" ]; then
  log "Creating Lima instance '${INSTANCE_NAME}'"
  limactl start --name="${INSTANCE_NAME}" template://docker
fi

if [ ! -f "$LIMA_YAML" ]; then
  echo "Missing Lima config: $LIMA_YAML" >&2
  exit 1
fi

log "Ensuring Lima uses qemu"
cp "$LIMA_YAML" "${LIMA_YAML}.bak.$(date +%Y%m%d%H%M%S)"
if grep -q '^vmType: ' "$LIMA_YAML"; then
  sed -i '' 's/^vmType: .*/vmType: qemu/' "$LIMA_YAML"
else
  printf "\nvmType: qemu\n" >> "$LIMA_YAML"
fi

log "Installing host docker wrappers"
install -m 0755 /dev/stdin "$DOCKER_WRAPPER" <<'SH'
#!/bin/sh
set -eu
exec limactl shell docker docker "$@"
SH

install -m 0755 /dev/stdin "$COMPOSE_WRAPPER" <<'SH'
#!/bin/sh
set -eu
exec limactl shell docker docker compose "$@"
SH

log "Starting Lima Docker"
limactl start "$INSTANCE_NAME"

log "Verifying Docker"
docker version >/dev/null
docker ps >/dev/null

echo
echo "Docker on Lima is ready"

