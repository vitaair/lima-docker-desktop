const os = require("node:os");

function hostPlatform() {
  const platform = os.platform();
  const arch = os.arch();
  const release = os.release();
  const family = platform === "darwin" ? "macos" : platform === "win32" ? "windows" : platform === "linux" ? "linux" : "unknown";

  return {
    family,
    platform,
    arch,
    release,
    label: labelFor(family, arch),
    adapter: adapterFor(family, arch),
  };
}

function labelFor(family, arch) {
  if (family === "macos") return `macOS ${arch}`;
  if (family === "windows") return `Windows ${arch}`;
  if (family === "linux") return `Linux ${arch}`;
  return `${family} ${arch}`;
}

function adapterFor(family, arch) {
  if (family === "macos" && arch === "x64") return "macos-lima-qemu";
  if (family === "macos" && arch === "arm64") return "macos-lima-vz";
  if (family === "windows") return "windows-wsl2";
  if (family === "linux") return "linux-systemd";
  return "generic-docker-cli";
}

function supportProfile(host) {
  const profiles = {
    "macos-lima-qemu": {
      tier: "validated",
      engine: "Lima + QEMU + Docker Engine",
      installScript: "scripts/deploy-docker-lima.sh",
      autostart: "launchd",
      notes: ["Validated on macOS 12 Intel.", "Builds QEMU with user-mode networking when needed."],
    },
    "macos-lima-vz": {
      tier: "planned",
      engine: "Lima + Apple Virtualization + Docker Engine",
      installScript: "scripts/installers/install-macos-apple-silicon.sh",
      autostart: "launchd",
      notes: ["Designed for Apple Silicon.", "Uses the system-supported Lima path instead of the Intel QEMU repair flow."],
    },
    "linux-systemd": {
      tier: "planned",
      engine: "Native Docker Engine",
      installScript: "scripts/installers/install-linux-docker.sh",
      autostart: "systemd",
      notes: ["Uses Docker's official install script by default.", "UI talks to the local Docker CLI/API after installation."],
    },
    "windows-wsl2": {
      tier: "planned",
      engine: "WSL2 + Docker Engine",
      installScript: "scripts/installers/install-windows-wsl2.ps1",
      autostart: "Task Scheduler / WSL",
      notes: ["Targets Windows 10/11 with WSL2.", "Windows 7 is intentionally not a supported target."],
    },
    "generic-docker-cli": {
      tier: "experimental",
      engine: "Existing Docker CLI",
      installScript: null,
      autostart: "manual",
      notes: ["Unknown host. The UI can still work if docker is already installed and reachable."],
    },
  };

  return profiles[host.adapter] || profiles["generic-docker-cli"];
}

function capabilities(host, commands) {
  const has = (name) => Boolean(commands[name]?.ok);
  return {
    dockerCli: has("dockerVersion"),
    lima: host.family === "macos" && has("limaList"),
    qemuUserNetwork: host.family === "macos" ? Boolean(commands.qemuNetdev?.stdout && /^user$/m.test(commands.qemuNetdev.stdout)) : null,
    launchdAutostart: host.family === "macos" ? /com\.vitaair\.docker-lima-start/.test(commands.autostart?.stdout || "") : null,
    systemd: host.family === "linux" ? has("systemctlDocker") : null,
    wsl2: host.family === "windows" ? has("wslStatus") : null,
  };
}

function recommendations(host, profile, caps, healthy) {
  const items = [];

  if (healthy) {
    items.push({ id: "dockerReachable", level: "ok", title: "Docker is reachable", detail: "The UI can manage local Docker resources." });
  } else if (profile.installScript) {
    items.push({ id: "dockerMissingWithInstaller", level: "warn", title: "Docker is not reachable", detail: `Run ${profile.installScript} for the ${profile.engine} path.` });
  } else {
    items.push({ id: "dockerMissingGeneric", level: "warn", title: "Docker is not reachable", detail: "Install Docker for this host, then restart the UI." });
  }

  if (host.adapter === "macos-lima-qemu" && caps.qemuUserNetwork === false) {
    items.push({ id: "qemuUserNetworkMissing", level: "warn", title: "QEMU user networking missing", detail: "Run scripts/build-qemu-8.2.3-macos12.sh, then restart Lima." });
  }

  if (host.adapter === "macos-lima-qemu" && caps.launchdAutostart === false) {
    items.push({ id: "autostartMissing", level: "info", title: "Autostart is not loaded", detail: "Run scripts/install-autostart.sh to start Docker at login." });
  }

  if (host.adapter === "windows-wsl2") {
    items.push({ id: "windowsWsl2Required", level: "info", title: "Windows support requires WSL2", detail: "Windows 10/11 are planned. Windows 7 is not a supported target." });
  }

  return items;
}

module.exports = {
  capabilities,
  hostPlatform,
  recommendations,
  supportProfile,
};
