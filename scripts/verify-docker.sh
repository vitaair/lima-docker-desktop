#!/usr/bin/env bash
set -euo pipefail

export PATH="/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin"

echo "== System =="
sw_vers
uname -m

echo
echo "== QEMU =="
which qemu-system-x86_64
qemu-system-x86_64 --version | head -n 1
qemu-system-x86_64 -netdev help | grep '^user$'

echo
echo "== Lima =="
limactl --version
limactl list

echo
echo "== Docker =="
which docker
docker version
docker ps

echo
echo "== launchd =="
launchctl list | grep com.vitaair.docker-lima-start || true

