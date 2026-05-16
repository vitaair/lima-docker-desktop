#!/usr/bin/env bash
set -euo pipefail

export PATH="/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin"

os_name="$(uname -s 2>/dev/null || echo unknown)"
arch_name="$(uname -m 2>/dev/null || echo unknown)"

section() {
  printf "\n== %s ==\n" "$1"
}

exists() {
  command -v "$1" >/dev/null 2>&1
}

section "Host"
printf "OS: %s\n" "$os_name"
printf "Arch: %s\n" "$arch_name"
if [ "$os_name" = "Darwin" ]; then
  sw_vers || true
elif [ -f /etc/os-release ]; then
  sed -n 's/^PRETTY_NAME=//p' /etc/os-release | tr -d '"'
fi

section "Docker"
if exists docker; then
  docker version || true
  docker ps || true
else
  echo "docker: missing"
fi

if [ "$os_name" = "Darwin" ]; then
  section "macOS virtualization"
  if exists limactl; then
    limactl --version || true
    limactl list || true
  else
    echo "limactl: missing"
  fi

  if exists qemu-system-x86_64; then
    qemu-system-x86_64 --version | head -n 1 || true
    qemu-system-x86_64 -netdev help | grep '^user$' || echo "qemu user network: missing"
  else
    echo "qemu-system-x86_64: missing"
  fi

  section "launchd"
  launchctl list | grep com.vitaair.docker-lima-start || echo "autostart agent: not loaded"
elif [ "$os_name" = "Linux" ]; then
  section "Linux service"
  if exists systemctl; then
    systemctl is-active docker || true
    systemctl is-enabled docker || true
  else
    echo "systemctl: missing"
  fi
else
  section "Unsupported host"
  echo "Use scripts/installers/install-windows-wsl2.ps1 for Windows 10/11."
fi
