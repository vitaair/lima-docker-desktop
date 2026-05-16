# Upstream Source Checkouts

Local product research source code lives outside this repository at:

```text
/Users/vitaair/docker/product-research
```

The checkouts are intentionally not submodules and are not vendored into this repository. They are for reading architecture, UI patterns, diagnostics, packaging, and extension ideas only.

## Current Local Sources

| Project | Local path | Upstream | Ref checked locally | Why study it |
| --- | --- | --- | --- | --- |
| Colima | `/Users/vitaair/docker/product-research/colima` | `https://github.com/abiosoft/colima.git` | `main` / `09814c0` | Small Docker-on-Lima workflow, CLI-first reliability, minimal macOS UX. |
| Lima | `/Users/vitaair/docker/product-research/lima` | `https://github.com/lima-vm/lima.git` | `master` / `8f74e63` | VM lifecycle, templates, networking, host integration, supported backends. |
| Portainer | `/Users/vitaair/docker/product-research/portainer` | `https://github.com/portainer/portainer.git` | `develop` / `2570a30` | Container management IA, dashboards, environment model, resource operations. |
| Rancher Desktop | `/Users/vitaair/docker/product-research/rancher-desktop` | `https://github.com/rancher-sandbox/rancher-desktop.git` | `main` / `698fc8b` | Desktop packaging, Kubernetes/runtime selection, diagnostics, settings UX. |

## Pending / Special Cases

| Project | Status | Reason |
| --- | --- | --- |
| Podman Desktop | Pending retry | `git clone` and GitHub tarball download both stalled or failed over the current network. Retry with a better network path. |
| Docker Desktop | Documentation only | Docker Desktop itself is not an open-source desktop app that we can clone as product source. Study public docs and CLI/Engine open-source components instead. |
| OrbStack | Documentation only | OrbStack is commercial/closed-source. Study public docs, release notes, and UX behavior only. |

## Refresh Commands

Use these commands to refresh existing local study sources:

```bash
cd /Users/vitaair/docker/product-research
for repo in colima lima portainer rancher-desktop; do
  git -C "$repo" fetch --depth=1 origin
  git -C "$repo" pull --ff-only
done
```

Retry Podman Desktop when the network is healthier:

```bash
cd /Users/vitaair/docker/product-research
git clone --depth 1 https://github.com/podman-desktop/podman-desktop.git podman-desktop
```

If full clone is still too slow, try sparse clone for the UI and main-process source:

```bash
cd /Users/vitaair/docker/product-research
git clone --depth 1 --filter=blob:none --sparse --no-checkout https://github.com/podman-desktop/podman-desktop.git podman-desktop
cd podman-desktop
git sparse-checkout set README.md package.json pnpm-workspace.yaml packages/main packages/renderer packages/api packages/extension-api website
git checkout
```

## First Reading Targets

- Colima: `cmd/`, `core/`, `daemon/`, `environment/`, `docs/`.
- Lima: `cmd/`, `pkg/`, `templates/`, `docs/`.
- Rancher Desktop: `src/`, `pkg/`, `packaging/`, `resources/`, `docs/`.
- Portainer: `app/`, `api/`, `pkg/`, `build/`.

## Product Questions To Answer From Source

1. How do mature products separate engine lifecycle, diagnostics, and UI state?
2. Which operations are safe enough for one-click UI actions, and which need confirmation?
3. How do they model multiple environments, contexts, runtimes, and adapters?
4. How do they package desktop apps across macOS, Windows, and Linux?
5. What can remain script-first in Lima Docker Desktop without hurting usability?
