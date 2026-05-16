#!/usr/bin/env bash
set -euo pipefail

export PATH="/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"

if [ "$(id -u)" -eq 0 ]; then
  SUDO=""
else
  SUDO="sudo"
fi

if command -v docker >/dev/null 2>&1 && docker version >/dev/null 2>&1; then
  echo "Docker is already installed and reachable."
  docker version
  exit 0
fi

if ! command -v curl >/dev/null 2>&1; then
  echo "curl is required to run Docker's official installer." >&2
  exit 1
fi

echo "Installing Docker Engine with Docker's official convenience script."
echo "Set DRY_RUN=1 to inspect commands without installing."

if [ "${DRY_RUN:-0}" = "1" ]; then
  curl -fsSL https://get.docker.com | sh -s -- --dry-run
  exit 0
fi

curl -fsSL https://get.docker.com | sh

if command -v systemctl >/dev/null 2>&1; then
  $SUDO systemctl enable --now docker || true
fi

if [ -n "${SUDO}" ]; then
  $SUDO usermod -aG docker "$USER" || true
  echo "If docker requires sudo, log out and back in so the docker group takes effect."
fi

docker version || $SUDO docker version
echo "Docker Engine install complete."
