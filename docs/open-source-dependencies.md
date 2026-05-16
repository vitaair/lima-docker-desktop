# Open Source Dependencies

This setup stands on these projects:

| Project | Purpose | URL |
| --- | --- | --- |
| Lima | Linux VM manager on macOS | https://github.com/lima-vm/lima |
| QEMU | Virtual machine emulator used by Lima | https://github.com/qemu/qemu |
| libslirp | User-mode networking backend for QEMU | https://gitlab.freedesktop.org/slirp/libslirp |
| Docker Engine | Container runtime inside the Lima VM | https://github.com/moby/moby |
| Docker install script | Installs Docker packages inside Ubuntu | https://get.docker.com |
| Homebrew | macOS package manager used for dependencies | https://brew.sh |

The included QEMU binary, if present in `artifacts/`, is built from QEMU 8.2.3 source and should be treated as a local convenience artifact, not a universal upstream replacement.
