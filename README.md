# Lima Docker Desktop

![Lima Docker Desktop icon](assets/icon.svg)

Lima Docker Desktop is an independent community tool that gives Docker a lightweight local desktop UI and a set of host-specific install and repair scripts.

The project started as a working macOS 12 Intel recovery kit for Lima, QEMU, and Docker Engine. It is now being upgraded into a cross-platform Docker control plane: use the native Docker path when the host supports it, and use Lima or WSL2 only where a compatibility layer is needed.

This project is not affiliated with Docker Inc. or the Lima project.

## Product Direction

- one local Docker Desktop-like UI
- one platform detector and doctor
- one install command per host family
- no custom Docker engine fork
- native Docker Engine first, compatibility layer only when needed
- a lightweight, beautiful, repairable desktop experience that learns from Docker Desktop, OrbStack, Podman Desktop, Rancher Desktop, Colima/Lima, and Portainer

## Platform Strategy

| Platform | Engine path | Status |
| --- | --- | --- |
| macOS Intel | Lima + QEMU + Docker Engine | validated |
| macOS Apple Silicon | Lima + Apple Virtualization + Docker Engine | planned |
| Ubuntu / Debian | native Docker Engine + systemd | planned |
| CentOS / RHEL / openEuler | native Docker Engine + systemd | planned |
| Windows 10/11 | WSL2 + Docker Engine | planned |
| Windows 7 | not supported | documented only |

The validated stack is:

- macOS 12.7.6 on Intel x86_64
- Lima 2.1.0
- QEMU 8.2.3 built from source
- QEMU user-mode networking enabled through libslirp
- Docker Engine 29.5.0 inside the Lima VM
- rootless Docker exposed to the macOS host through wrapper scripts
- launchd autostart for boot-time Docker startup

## Quick Start

Run this from the repository root:

```bash
./scripts/install-docker.sh
./scripts/doctor.sh
```

On macOS, install the login-time Docker startup agent:

```bash
./scripts/install-autostart.sh
```

After that:

```bash
docker ps
docker run hello-world
```

Start the lightweight UI:

```bash
./scripts/start-lima-docker-desktop.sh
```

Then open:

```text
http://127.0.0.1:3875
```

## What This Fixes

The main failure chain we hit was:

- Docker Desktop latest refused to install on macOS older than Sonoma.
- Lima existed, but the `docker` instance was stopped.
- `limactl start docker` failed because `qemu-system-x86_64` was missing.
- Homebrew's `brew install qemu` dragged in large source builds on macOS 12.
- QEMU master required a newer Xcode clang than this Mac had.
- QEMU 8.2.3 built successfully, but the first build was missing the `user` network backend.
- Lima failed with: `network backend 'user' is not compiled into this binary`.
- Installing `libslirp` and rebuilding QEMU with `--enable-slirp --disable-nettle` fixed the network backend.
- launchd initially could not find `limactl` because it did not inherit the interactive shell PATH.

## Repository Layout

- `scripts/install-docker.sh`: cross-platform install dispatcher
- `scripts/doctor.sh`: cross-platform diagnostic report
- `scripts/installers/`: host-specific installers for macOS Apple Silicon, Linux, and Windows WSL2
- `scripts/deploy-docker-lima.sh`: one-time repair/deploy script
- `scripts/build-qemu-8.2.3-macos12.sh`: source-build QEMU with Lima-compatible options
- `scripts/shell-start.sh`: boot-time startup script
- `scripts/install-autostart.sh`: installs the launchd user agent
- `scripts/start-lima-docker-desktop.sh`: starts the lightweight local web UI
- `scripts/verify-docker.sh`: verifies QEMU, Lima, Docker, and launchd status
- `desktop-ui/`: zero-dependency Docker Desktop-style UI backed by the local `docker` command
- `desktop-ui/lib/platform.js`: platform adapter and recommendation model
- `docs/debug-log.md`: detailed debugging notes from the successful repair
- `docs/known-pitfalls.md`: errors and fixes
- `docs/research-notes.md`: related projects and what this kit borrows from them
- `docs/product-learning.md`: product case-study notes and future product bets
- `docs/platforms/`: platform support notes
- `artifacts/`: optional local compiled binary and checksums

## Upstream Projects Used

- Lima: https://github.com/lima-vm/lima
- QEMU: https://github.com/qemu/qemu
- libslirp: https://gitlab.freedesktop.org/slirp/libslirp
- Docker Engine: https://github.com/moby/moby
- Docker install script: https://get.docker.com
- Homebrew: https://brew.sh

## Compatibility Notes

The macOS Intel path was validated on:

```text
macOS 12.7.6
Intel Core i7-4980HQ
Lima 2.1.0
QEMU 8.2.3
Docker Engine 29.5.0
```

The UI can run on any host with Node.js and a reachable `docker` CLI. Installers for additional hosts are intentionally small wrappers around official Docker, Lima, WSL2, or system service paths.
