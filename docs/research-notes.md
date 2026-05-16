# Research Notes

The closest related work falls into a few buckets.

## Lima itself

Lima is the foundation. It launches Linux virtual machines on macOS and handles file sharing and port forwarding. The official installation docs explicitly say QEMU is required when the QEMU driver is used, and Lima's default user-mode networking is based on slirp.

Useful references:

- https://github.com/lima-vm/lima
- https://lima-vm.io/docs/installation
- https://lima-vm.io/docs/config/network/user
- https://lima-vm.io/docs/config/multi-arch

What this project adds:

- A reproducible old-macOS recovery route when packaged QEMU is painful.
- A known-good QEMU source version and configure flags.
- A launchd startup path and local `docker` wrapper.

## socket_vmnet

`socket_vmnet` is a Lima-adjacent project for vmnet.framework networking. It is useful for more advanced networking, but this setup uses QEMU's user-mode networking because it is enough for Docker and keeps the boot path smaller.

Reference:

- https://github.com/lima-vm/socket_vmnet

## Colima and GitHub Actions

Projects such as `setup-docker-macos-action` use Colima/Lima to provide Docker on macOS runners. They are good references for high-level automation, but they target CI and modern runner environments more than old personal Intel Macs.

Reference:

- https://github.com/douglascamata/setup-docker-macos-action

## Older guides and gists

There are gists and one-off guides for running containers with Lima or QEMU on macOS, especially Apple Silicon era guides. They are useful background, but usually do not preserve the exact failure trail:

- Docker Desktop version floor on old macOS
- QEMU master compiler floor
- Python `distlib` missing during QEMU `mkvenv`
- `nettle/sha.h` mismatch
- QEMU missing `user` networking due to absent libslirp
- launchd PATH differences

Example references:

- https://gist.github.com/gruberdev/80b1ec493ecd25f84c8288da5b253e30
- https://github.com/lixiljp/qemu_docker_on_mac_m1

## Project Positioning

Lima Docker Desktop is not a replacement for Lima, Colima, Docker Desktop, or QEMU. It is a small field guide, script kit, and lightweight UI for one stubborn class of machines:

```text
Intel Mac + macOS 12 + Docker needed + Docker Desktop unavailable + QEMU packaging trouble
```

The goal is to make the successful path easy to audit, repeat, and improve.
