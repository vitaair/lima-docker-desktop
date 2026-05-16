#!/usr/bin/env bash
set -euo pipefail

export PATH="/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin"

QEMU_VERSION="${QEMU_VERSION:-8.2.3}"
WORKDIR="${WORKDIR:-$HOME/.cache/lima-docker-desktop}"
SRC_DIR="${WORKDIR}/qemu-${QEMU_VERSION}"
TARBALL="${WORKDIR}/qemu-${QEMU_VERSION}.tar.gz"
JOBS="${JOBS:-4}"

log() {
  printf "\n[%s] %s\n" "$(date '+%Y-%m-%d %H:%M:%S')" "$*"
}

need() {
  command -v "$1" >/dev/null 2>&1 || {
    echo "Missing command: $1" >&2
    exit 1
  }
}

log "Checking build tools"
need curl
need tar
need make
need python3
need brew

log "Installing small QEMU build dependencies"
brew install libslirp meson ninja pkg-config glib pixman || true

if ! python3 - <<'PY' >/dev/null 2>&1
import distlib
PY
then
  log "Installing Python distlib for QEMU mkvenv"
  python3 -m pip install --user --break-system-packages distlib
fi

mkdir -p "$WORKDIR"

if [ ! -d "$SRC_DIR" ]; then
  log "Downloading QEMU ${QEMU_VERSION}"
  curl -L --fail -o "$TARBALL" "https://github.com/qemu/qemu/archive/refs/tags/v${QEMU_VERSION}.tar.gz"
  tar -xzf "$TARBALL" -C "$WORKDIR"
fi

log "Configuring QEMU with Lima-compatible networking"
rm -rf "${SRC_DIR}/build-lima"
mkdir -p "${SRC_DIR}/build-lima"
cd "${SRC_DIR}/build-lima"

../configure \
  --target-list=x86_64-softmmu \
  --disable-nettle \
  --enable-slirp

log "Building QEMU"
make -j"${JOBS}"

log "Installing QEMU into /usr/local"
make install

log "Verifying QEMU user networking"
qemu-system-x86_64 --version | head -n 1
qemu-system-x86_64 -netdev help | grep '^user$'

echo
echo "QEMU build complete"
