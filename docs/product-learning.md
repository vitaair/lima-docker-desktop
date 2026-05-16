# Product Learning Notes

This project should keep learning from excellent local container products while staying honest about its own role: a lightweight, open, repairable Docker control plane.

Local source checkout details are tracked in `docs/upstream-source-checkouts.md`.

## Products To Study

### Docker Desktop

What to learn:

- Familiar navigation: Containers, Images, Volumes, Builds, Settings, Troubleshooting.
- One clear health status instead of forcing users to read logs first.
- Action buttons close to the resource they affect.
- A desktop product should make common Docker commands visible, not hide them.

What not to copy:

- Heavy background services without transparent diagnostics.
- Version or OS lock-in that leaves older machines stranded.
- Opaque repair flows.

### OrbStack

Reference: https://orbstack.dev

What to learn:

- Extremely fast startup matters more than feature count for daily development.
- Native host integration is a product feature, not an implementation detail.
- File sharing, port forwarding, and hostnames should feel automatic.
- Low memory, low CPU, and low battery impact should be tracked as product quality.

How we adapt it:

- Prefer native Docker Engine on Linux.
- Prefer Lima with the lightest viable virtualization path on macOS.
- Show startup, health, and resource signals directly in the UI.

### Podman Desktop

References:

- https://podman-desktop.io
- https://podman.io/features

What to learn:

- A desktop UI can manage more than one engine through adapters.
- Extensions are a durable way to grow without bloating the core.
- Docker compatibility is useful even when Docker is not the only runtime.
- Kubernetes, Kind, Lima, Docker, and Podman can live behind a unified interface.

How we adapt it:

- Keep platform support behind adapter metadata.
- Add extension points gradually instead of hard-coding every workflow.
- Start with Docker Engine, but keep room for Podman, containerd, Kind, and Compose.

### Rancher Desktop

Reference: https://rancherdesktop.io

What to learn:

- Open-source transparency is a meaningful product advantage.
- Kubernetes version selection is important for teams that mirror production locally.
- Runtime choice should be explicit and understandable.
- The UI should explain what engine path is active.

How we adapt it:

- Treat Kubernetes as an optional capability, not a mandatory startup tax.
- Keep the current adapter, support tier, install script, and engine path visible.
- Build clear installers before adding heavyweight orchestration features.

### Colima and Lima

References:

- https://github.com/abiosoft/colima
- https://github.com/lima-vm/lima

What to learn:

- A small CLI-first tool can be more reliable than a large desktop application.
- Lima is a strong base because it stays focused on Linux VMs.
- The desktop layer should improve discoverability without hiding the underlying CLI.

How we adapt it:

- Keep every UI operation reproducible as a command.
- Keep scripts small and auditable.
- Document every repair path and failure mode.

### Portainer

Reference: https://www.portainer.io

What to learn:

- Multi-environment management becomes valuable once the local path is stable.
- Clear role, environment, and endpoint concepts help advanced teams.
- Dashboards should guide attention rather than dump raw tables.

How we adapt it:

- Local-first now, remote endpoints later.
- Add a plugin/adapter model before attempting team management.

## Product Development Lenses

### Lightweight

- Start fast.
- Avoid heavyweight background work by default.
- Show resource usage and disk usage.
- Make Kubernetes optional.
- Keep bundled binaries out of the source tree when they belong in Releases.

### Convenient

- One command per host family.
- Start Docker and the UI together.
- Detect the current adapter automatically.
- Offer direct repair hints in the UI.
- Keep Chinese and English available from the first screen.

### Beautiful

- Familiar enough that Docker users feel at home.
- Distinct enough that the project has its own identity.
- Calm status colors, simple icon, readable typography.
- Avoid noisy decoration when the user is debugging.

### Extensible

- Platform adapters instead of platform forks.
- A future extension manifest for new engines, diagnostics, and workflows.
- Keep the server API small and stable.
- Use scripts as implementation details behind UI actions.

## Next Product Bets

1. Add a release packaging path with checksums and install commands.
2. Add a first-run guide that detects host, engine path, and missing tools.
3. Add Compose project visibility.
4. Add disk usage and cleanup actions.
5. Add a plugin manifest proposal for future engine adapters.
6. Add optional Kubernetes/Kind integration after Docker basics are stable.
7. Add Windows WSL2 and Linux native validation reports.
