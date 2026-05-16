#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
OS_NAME="$(uname -s 2>/dev/null || echo unknown)"
ARCH_NAME="$(uname -m 2>/dev/null || echo unknown)"

case "$OS_NAME" in
  Darwin)
    case "$ARCH_NAME" in
      x86_64)
        exec "${SCRIPT_DIR}/deploy-docker-lima.sh"
        ;;
      arm64)
        exec "${SCRIPT_DIR}/installers/install-macos-apple-silicon.sh"
        ;;
      *)
        echo "Unsupported macOS architecture: ${ARCH_NAME}" >&2
        exit 1
        ;;
    esac
    ;;
  Linux)
    exec "${SCRIPT_DIR}/installers/install-linux-docker.sh"
    ;;
  *)
    echo "Unsupported OS for this shell installer: ${OS_NAME}" >&2
    echo "Windows 10/11 users should run scripts/installers/install-windows-wsl2.ps1 in PowerShell." >&2
    exit 1
    ;;
esac
