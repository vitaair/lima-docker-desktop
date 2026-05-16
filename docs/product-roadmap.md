# Product Roadmap

Lima Docker Desktop should evolve as a maintained open-source product, not a one-off repair script.

## Product Principles

- Keep the Docker Engine path native whenever the host supports it.
- Keep the UI consistent across macOS, Linux, and Windows.
- Treat platform installers as adapters, not forks of Docker.
- Prefer small auditable scripts over opaque automation.
- Document every successful repair path and every dead end.
- Learn continuously from strong adjacent products, then translate the useful parts into our own lightweight open-source workflow.
- Optimize for startup speed, battery friendliness, clear repair paths, and a UI that stays useful under stress.

## Near-Term Priorities

1. Stabilize GitHub publishing
   - Restore local GitHub authentication.
   - Push the local git history to `vitaair/lima-docker-desktop`.
   - Move the 24MB QEMU binary into GitHub Releases.

2. Improve the local desktop UI
   - Add a platform overview card on the landing screen.
   - Add explicit install/repair action buttons for each adapter.
   - Add Docker Compose project visibility.
   - Add resource usage and disk usage views.
   - Add a product lab view for learning notes, extension ideas, and release readiness.

3. Validate more hosts
   - macOS Apple Silicon with Lima.
   - Ubuntu LTS.
   - CentOS/RHEL/openEuler family.
   - Windows 10/11 with WSL2.

4. Improve installers
   - Add dry-run mode to every installer.
   - Add rollback notes where scripts modify host state.
   - Add clearer permission prompts for sudo/launchd/systemd.

5. Release packaging
   - Publish QEMU binaries as release assets.
   - Add checksums per release.
   - Add a copy-paste install command per platform.

6. Product learning loop
   - Review Docker Desktop, OrbStack, Podman Desktop, Rancher Desktop, Colima/Lima, and Portainer before major UI changes.
   - Keep `docs/product-learning.md` updated with product lessons and decisions.
   - Turn repeated user pain into visible UI affordances or one-command scripts.

## Quality Gates

Before each release:

- `node -c desktop-ui/server.js`
- `node -c desktop-ui/lib/platform.js`
- `node -c desktop-ui/public/app.js`
- `bash -n scripts/*.sh scripts/installers/*.sh`
- `./scripts/doctor.sh`
- UI loads at `http://127.0.0.1:3875`
- `/api/state` returns `healthy`, `system.host`, `system.profile`, and `system.recommendations`

## Current Known Blockers

- Local `git push` is blocked by missing GitHub HTTPS credentials.
- Large QEMU binary should be published as a GitHub Release asset, not uploaded through the connector into the source tree.
- Windows and Linux installers are planned paths and need real host validation.
