#!/usr/bin/env bash
set -euo pipefail

export PATH="/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin"

INSTANCE_NAME="${INSTANCE_NAME:-docker}"
DOCKER_WRAPPER="/usr/local/bin/docker"
COMPOSE_WRAPPER="/usr/local/bin/docker-compose"

if [ "$(uname -s)" != "Darwin" ] || [ "$(uname -m)" != "arm64" ]; then
  echo "This installer is for macOS Apple Silicon only." >&2
  exit 1
fi

need() {
  command -v "$1" >/dev/null 2>&1 || {
    echo "Missing command: $1" >&2
    exit 1
  }
}

need brew

if ! command -v limactl >/dev/null 2>&1; then
  brew install lima
fi

if [ ! -d "${HOME}/.lima/${INSTANCE_NAME}" ]; then
  limactl start --name="${INSTANCE_NAME}" template://docker
else
  limactl start "$INSTANCE_NAME"
fi

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

docker version
echo "Apple Silicon Lima Docker install complete."
