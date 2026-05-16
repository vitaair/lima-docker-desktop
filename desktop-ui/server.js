const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { execFile } = require("node:child_process");
const { capabilities, hostPlatform, recommendations, supportProfile } = require("./lib/platform");

const PORT = Number(process.env.PORT || 3875);
const ROOT = __dirname;

function run(command, args = []) {
  return new Promise((resolve) => {
    execFile(command, args, { timeout: 20000, maxBuffer: 1024 * 1024 * 8 }, (error, stdout, stderr) => {
      resolve({
        ok: !error,
        code: error && typeof error.code === "number" ? error.code : 0,
        stdout: stdout.trim(),
        stderr: stderr.trim(),
      });
    });
  });
}

function jsonLines(text) {
  if (!text) return [];
  return text
    .split(/\n+/)
    .filter(Boolean)
    .map((line) => {
      try {
        return JSON.parse(line);
      } catch {
        return { raw: line };
      }
    });
}

async function docker(args) {
  return run("docker", args);
}

function skipped() {
  return { ok: true, code: 0, stdout: "", stderr: "" };
}

async function state() {
  const host = hostPlatform();
  const profile = supportProfile(host);
  const [version, containers, images, volumes, networks, lima, qemuVersion, qemuNetdev, autostart, diskUsage, systemctlDocker, wslStatus] = await Promise.all([
    docker(["version", "--format", "{{json .}}"]),
    docker(["ps", "-a", "--format", "{{json .}}"]),
    docker(["images", "--format", "{{json .}}"]),
    docker(["volume", "ls", "--format", "{{json .}}"]),
    docker(["network", "ls", "--format", "{{json .}}"]),
    host.family === "macos" ? run("limactl", ["list", "--format", "{{json .}}"]) : skipped(),
    host.family === "macos" ? run("qemu-system-x86_64", ["--version"]) : skipped(),
    host.family === "macos" ? run("qemu-system-x86_64", ["-netdev", "help"]) : skipped(),
    host.family === "macos" ? run("launchctl", ["list"]) : skipped(),
    run("docker", ["system", "df", "--format", "{{json .}}"]),
    host.family === "linux" ? run("systemctl", ["is-active", "docker"]) : skipped(),
    host.family === "windows" ? run("wsl.exe", ["--status"]) : skipped(),
  ]);
  const commandResults = { dockerVersion: version, limaList: lima, qemuNetdev, autostart, systemctlDocker, wslStatus };
  const caps = capabilities(host, commandResults);
  const healthy = version.ok;

  return {
    healthy,
    version: version.ok ? JSON.parse(version.stdout || "{}") : null,
    containers: jsonLines(containers.stdout),
    images: jsonLines(images.stdout),
    volumes: jsonLines(volumes.stdout),
    networks: jsonLines(networks.stdout),
    lima: jsonLines(lima.stdout),
    system: {
      host,
      profile,
      capabilities: caps,
      recommendations: recommendations(host, profile, caps, healthy),
      qemuVersion: (qemuVersion.stdout || "").split("\n")[0],
      qemuHasUserNet: /^user$/m.test(qemuNetdev.stdout || ""),
      autostartLoaded: /com\.vitaair\.docker-lima-start/.test(autostart.stdout || ""),
      diskUsage: jsonLines(diskUsage.stdout),
    },
    errors: [version, containers, images, volumes, networks, lima, qemuVersion, qemuNetdev].filter((item) => !item.ok).map((item) => item.stderr),
  };
}

async function logs(id) {
  return docker(["logs", "--tail", "160", id]);
}

async function inspect(kind, id) {
  const map = {
    container: ["inspect", id],
    image: ["image", "inspect", id],
    volume: ["volume", "inspect", id],
    network: ["network", "inspect", id],
  };
  if (!map[kind]) return { ok: false, stderr: "Unknown inspect kind" };
  return docker(map[kind]);
}

async function act(action, id) {
  const map = {
    start: ["start", id],
    stop: ["stop", id],
    restart: ["restart", id],
    remove: ["rm", "-f", id],
  };
  if (!map[action]) return { ok: false, stderr: "Unknown action" };
  return docker(map[action]);
}

function send(res, status, type, body) {
  res.writeHead(status, { "content-type": type });
  res.end(body);
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === "/api/state") {
    return send(res, 200, "application/json", JSON.stringify(await state()));
  }

  if (url.pathname === "/api/logs") {
    const result = await logs(url.searchParams.get("id") || "");
    return send(res, result.ok ? 200 : 500, "text/plain; charset=utf-8", result.ok ? result.stdout : result.stderr);
  }

  if (url.pathname === "/api/inspect") {
    const result = await inspect(url.searchParams.get("kind") || "", url.searchParams.get("id") || "");
    return send(res, result.ok ? 200 : 500, "application/json", result.ok ? result.stdout : JSON.stringify(result));
  }

  if (url.pathname === "/api/action" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
      const payload = JSON.parse(body || "{}");
      const result = await act(payload.action, payload.id);
      send(res, result.ok ? 200 : 500, "application/json", JSON.stringify(result));
    });
    return;
  }

  const file = url.pathname === "/" ? "index.html" : url.pathname.slice(1);
  const filePath = path.normalize(path.join(ROOT, "public", file));
  if (!filePath.startsWith(path.join(ROOT, "public"))) {
    return send(res, 403, "text/plain", "Forbidden");
  }
  if (!fs.existsSync(filePath)) {
    return send(res, 404, "text/plain", "Not found");
  }

  const ext = path.extname(filePath);
  const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".svg": "image/svg+xml" };
  send(res, 200, types[ext] || "application/octet-stream", fs.readFileSync(filePath));
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Lima Docker Desktop running at http://127.0.0.1:${PORT}`);
});
