# Platform Support Matrix

Lima Docker Desktop is designed as a cross-platform Docker UI plus host-specific install and repair scripts.

## Principles

- Prefer the host's native Docker Engine path.
- Use Lima on macOS where Docker Engine needs a Linux VM.
- Use WSL2 on supported Windows versions.
- Do not support Windows 7 as a first-class target.
- Keep the UI API stable across platforms.

## Support Tiers

| Tier | Meaning |
| --- | --- |
| validated | Tested on a real host and used successfully. |
| planned | Installer or adapter exists, but still needs real host validation. |
| experimental | UI can work if Docker is already reachable. |
| unsupported | Documented as out of scope. |

## Current Targets

| Host | Adapter | Engine | Tier | Entry point |
| --- | --- | --- | --- | --- |
| macOS Intel | `macos-lima-qemu` | Lima + QEMU + Docker Engine | validated | `scripts/deploy-docker-lima.sh` |
| macOS Apple Silicon | `macos-lima-vz` | Lima + Apple Virtualization + Docker Engine | planned | `scripts/installers/install-macos-apple-silicon.sh` |
| Ubuntu / Debian | `linux-systemd` | Docker Engine + systemd | planned | `scripts/installers/install-linux-docker.sh` |
| CentOS / RHEL / openEuler | `linux-systemd` | Docker Engine + systemd | planned | `scripts/installers/install-linux-docker.sh` |
| Windows 10/11 | `windows-wsl2` | WSL2 + Docker Engine | planned | `scripts/installers/install-windows-wsl2.ps1` |
| Windows 7 | none | none | unsupported | FAQ/documentation only |

## UI Contract

The UI reads platform data from `/api/state`:

- `system.host`
- `system.profile`
- `system.capabilities`
- `system.recommendations`

This lets the same UI render host-specific install and repair guidance without hard-coding macOS, Linux, or Windows assumptions in the frontend.
