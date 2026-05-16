const translations = {
  en: {
    "app.subtitle": "Docker Engine running inside Lima, with a local desktop-style control plane.",
    "status.checking": "Checking",
    "status.syncing": "Syncing",
    "status.engineRunning": "Engine running",
    "status.engineUnavailable": "Engine unavailable",
    "status.loadFailed": "Unable to refresh",
    "nav.containers": "Containers",
    "nav.images": "Images",
    "nav.volumes": "Volumes",
    "nav.builds": "Builds",
    "nav.settings": "Settings",
    "nav.troubleshooting": "Troubleshooting",
    "action.refresh": "Refresh",
    "action.close": "Close",
    "action.logs": "Logs",
    "action.inspect": "Inspect",
    "action.start": "Start",
    "action.stop": "Stop",
    "action.restart": "Restart",
    "summary.lima": "Lima",
    "summary.unknown": "Unknown",
    "empty.title": "No {item}",
    "empty.hint": "Nothing to show yet.",
    "empty.loadingTitle": "Loading Docker state",
    "empty.loadingHint": "Checking Docker Engine, Lima, QEMU, and local resources.",
    "empty.errorTitle": "Unable to load Docker state",
    "empty.errorHint": "Check that the Lima Docker instance is running, then try refreshing.",
    "count.total": "{count} total",
    "container.noPorts": "No ports",
    "builds.title": "Builds",
    "builds.description": "Build history is not tracked by Docker Engine directly. This page is reserved for BuildKit and compose workflow integration.",
    "builds.available": "Available now",
    "settings.engine": "Engine",
    "settings.docker": "Docker",
    "settings.context": "Context",
    "settings.mode": "Mode",
    "settings.rootless": "Rootless",
    "settings.lima": "Lima",
    "settings.instance": "Instance",
    "settings.status": "Status",
    "settings.cpu": "CPU",
    "settings.memory": "Memory",
    "settings.qemu": "QEMU",
    "settings.version": "Version",
    "settings.userNetworking": "User networking",
    "settings.enabled": "Enabled",
    "settings.missing": "Missing",
    "settings.autostart": "Autostart",
    "settings.launchAgent": "LaunchAgent",
    "settings.loaded": "Loaded",
    "settings.notLoaded": "Not loaded",
    "settings.platform": "Platform",
    "settings.host": "Host",
    "settings.arch": "Architecture",
    "settings.adapter": "Adapter",
    "settings.support": "Support",
    "settings.install": "Installer",
    "settings.enginePath": "Engine path",
    "troubleshooting.dockerApi": "Docker API",
    "troubleshooting.dockerApiNote": "docker version responds",
    "troubleshooting.limaVm": "Lima VM",
    "troubleshooting.limaVmNote": "docker instance is running",
    "troubleshooting.qemuNet": "QEMU user network",
    "troubleshooting.qemuNetNote": "required by Lima user-mode networking",
    "troubleshooting.autostart": "Autostart",
    "troubleshooting.autostartNote": "launchd agent is loaded",
    "troubleshooting.ok": "OK",
    "troubleshooting.needsAttention": "Needs attention",
    "troubleshooting.recommendations": "Recommendations",
    "recommendation.dockerReachable.title": "Docker is reachable",
    "recommendation.dockerReachable.detail": "The UI can manage local Docker resources.",
    "recommendation.dockerMissingWithInstaller.title": "Docker is not reachable",
    "recommendation.dockerMissingWithInstaller.detail": "Run the platform installer shown in Settings, then refresh.",
    "recommendation.dockerMissingGeneric.title": "Docker is not reachable",
    "recommendation.dockerMissingGeneric.detail": "Install Docker for this host, then restart the UI.",
    "recommendation.qemuUserNetworkMissing.title": "QEMU user networking missing",
    "recommendation.qemuUserNetworkMissing.detail": "Run scripts/build-qemu-8.2.3-macos12.sh, then restart Lima.",
    "recommendation.autostartMissing.title": "Autostart is not loaded",
    "recommendation.autostartMissing.detail": "Run scripts/install-autostart.sh to start Docker at login.",
    "recommendation.windowsWsl2Required.title": "Windows support requires WSL2",
    "recommendation.windowsWsl2Required.detail": "Windows 10/11 are planned. Windows 7 is not a supported target.",
    "dialog.logsSuffix": "logs",
    "dialog.inspectSuffix": "inspect",
  },
  zh: {
    "app.subtitle": "Docker Engine 运行在 Lima 中，这里是本机桌面式控制台。",
    "status.checking": "检查中",
    "status.syncing": "同步中",
    "status.engineRunning": "引擎运行中",
    "status.engineUnavailable": "引擎不可用",
    "status.loadFailed": "刷新失败",
    "nav.containers": "容器",
    "nav.images": "镜像",
    "nav.volumes": "数据卷",
    "nav.builds": "构建",
    "nav.settings": "设置",
    "nav.troubleshooting": "故障排查",
    "action.refresh": "刷新",
    "action.close": "关闭",
    "action.logs": "日志",
    "action.inspect": "检查",
    "action.start": "启动",
    "action.stop": "停止",
    "action.restart": "重启",
    "summary.lima": "Lima",
    "summary.unknown": "未知",
    "empty.title": "暂无{item}",
    "empty.hint": "这里暂时还没有内容。",
    "empty.loadingTitle": "正在加载 Docker 状态",
    "empty.loadingHint": "正在检查 Docker Engine、Lima、QEMU 和本地资源。",
    "empty.errorTitle": "无法加载 Docker 状态",
    "empty.errorHint": "请确认 Lima Docker 实例正在运行，然后再刷新。",
    "count.total": "共 {count} 项",
    "container.noPorts": "无端口",
    "builds.title": "构建",
    "builds.description": "Docker Engine 本身不直接记录构建历史。这个页面预留给 BuildKit 和 compose 工作流集成。",
    "builds.available": "当前可用",
    "settings.engine": "引擎",
    "settings.docker": "Docker",
    "settings.context": "上下文",
    "settings.mode": "模式",
    "settings.rootless": "Rootless",
    "settings.lima": "Lima",
    "settings.instance": "实例",
    "settings.status": "状态",
    "settings.cpu": "CPU",
    "settings.memory": "内存",
    "settings.qemu": "QEMU",
    "settings.version": "版本",
    "settings.userNetworking": "用户态网络",
    "settings.enabled": "已启用",
    "settings.missing": "缺失",
    "settings.autostart": "开机启动",
    "settings.launchAgent": "LaunchAgent",
    "settings.loaded": "已加载",
    "settings.notLoaded": "未加载",
    "settings.platform": "平台",
    "settings.host": "主机",
    "settings.arch": "架构",
    "settings.adapter": "适配器",
    "settings.support": "支持级别",
    "settings.install": "安装脚本",
    "settings.enginePath": "引擎路径",
    "troubleshooting.dockerApi": "Docker API",
    "troubleshooting.dockerApiNote": "docker version 可以响应",
    "troubleshooting.limaVm": "Lima 虚拟机",
    "troubleshooting.limaVmNote": "docker 实例正在运行",
    "troubleshooting.qemuNet": "QEMU 用户态网络",
    "troubleshooting.qemuNetNote": "Lima 用户态网络必需能力",
    "troubleshooting.autostart": "开机启动",
    "troubleshooting.autostartNote": "launchd agent 已加载",
    "troubleshooting.ok": "正常",
    "troubleshooting.needsAttention": "需要处理",
    "troubleshooting.recommendations": "建议",
    "recommendation.dockerReachable.title": "Docker 可访问",
    "recommendation.dockerReachable.detail": "UI 可以管理本地 Docker 资源。",
    "recommendation.dockerMissingWithInstaller.title": "Docker 不可访问",
    "recommendation.dockerMissingWithInstaller.detail": "运行设置页显示的平台安装脚本，然后刷新。",
    "recommendation.dockerMissingGeneric.title": "Docker 不可访问",
    "recommendation.dockerMissingGeneric.detail": "先为当前主机安装 Docker，然后重启 UI。",
    "recommendation.qemuUserNetworkMissing.title": "QEMU 缺少用户态网络",
    "recommendation.qemuUserNetworkMissing.detail": "运行 scripts/build-qemu-8.2.3-macos12.sh，然后重启 Lima。",
    "recommendation.autostartMissing.title": "开机启动未加载",
    "recommendation.autostartMissing.detail": "运行 scripts/install-autostart.sh，让 Docker 在登录时自动启动。",
    "recommendation.windowsWsl2Required.title": "Windows 支持需要 WSL2",
    "recommendation.windowsWsl2Required.detail": "计划支持 Windows 10/11，Windows 7 不作为正式支持目标。",
    "dialog.logsSuffix": "日志",
    "dialog.inspectSuffix": "检查",
  },
};

const viewKeys = {
  containers: "nav.containers",
  images: "nav.images",
  volumes: "nav.volumes",
  builds: "nav.builds",
  settings: "nav.settings",
  troubleshooting: "nav.troubleshooting",
};

function initialLanguage() {
  const saved = localStorage.getItem("limaDockerDesktop.language");
  if (saved && translations[saved]) return saved;
  return (navigator.language || "").toLowerCase().startsWith("zh") ? "zh" : "en";
}

const state = {
  view: "containers",
  data: null,
  lang: initialLanguage(),
  refreshing: false,
};

const content = document.querySelector("#content");
const viewTitle = document.querySelector("#view-title");
const viewCount = document.querySelector("#view-count");
const summary = document.querySelector("#summary");
const healthDot = document.querySelector("#health-dot");
const healthText = document.querySelector("#health-text");
const language = document.querySelector("#language");
const logsDialog = document.querySelector("#logs-dialog");
const logs = document.querySelector("#logs");
const logsTitle = document.querySelector("#logs-title");
const inspectDialog = document.querySelector("#inspect-dialog");
const inspectOutput = document.querySelector("#inspect");
const inspectTitle = document.querySelector("#inspect-title");

function t(key, values = {}) {
  const phrase = translations[state.lang]?.[key] || translations.en[key] || key;
  return Object.entries(values).reduce((result, [name, value]) => result.replaceAll(`{${name}}`, value), phrase);
}

function applyI18n() {
  document.documentElement.lang = state.lang === "zh" ? "zh-CN" : "en";
  language.value = state.lang;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelector("#close-logs").textContent = t("action.close");
  document.querySelector("#close-inspect").textContent = t("action.close");
  viewTitle.textContent = t(viewKeys[state.view]);
  if (!state.data) {
    healthText.textContent = state.refreshing ? t("status.syncing") : t("status.checking");
    viewCount.textContent = "";
  }
}

async function api(path, options) {
  const response = await fetch(path, options);
  if (!response.ok) throw new Error(await response.text());
  const type = response.headers.get("content-type") || "";
  return type.includes("application/json") ? response.json() : response.text();
}

function text(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function metric(label, value) {
  return `<div class="metric"><span class="muted">${text(label)}</span><strong>${text(value)}</strong></div>`;
}

function renderSummary() {
  const data = state.data;
  const running = data.containers.filter((item) => item.State === "running").length;
  const lima = data.lima.find((item) => item.name === "docker" || item.Name === "docker") || data.lima[0] || {};
  summary.innerHTML = [
    metric(t("nav.containers"), `${running}/${data.containers.length}`),
    metric(t("nav.images"), data.images.length),
    metric(t("nav.volumes"), data.volumes.length),
    metric(t("summary.lima"), lima.status || lima.Status || t("summary.unknown")),
  ].join("");
}

function empty(label) {
  return `<div class="empty"><strong>${text(label)}</strong><span class="muted">${text(t("empty.hint"))}</span></div>`;
}

function notice(title, hint, tone = "") {
  return `<div class="empty ${tone}"><strong>${text(title)}</strong><span class="muted">${text(hint)}</span></div>`;
}

function pill(label, tone = "") {
  return `<span class="pill ${tone}">${text(label)}</span>`;
}

function actionButton(label, action, id, tone = "") {
  return `<button class="${tone}" data-action="${action}" data-id="${text(id)}">${text(label)}</button>`;
}

function containerRow(item) {
  const running = item.State === "running";
  const name = item.Names || item.ID;
  return `
    <div class="row containers-row">
      <div><div class="name">${text(name)}</div><div class="muted">${text(item.ID)}</div></div>
      <div>${text(item.Image)}</div>
      <div>${pill(item.State || "unknown", running ? "running" : "")}</div>
      <div class="muted">${text(item.Ports || t("container.noPorts"))}</div>
      <div class="actions">
        <button data-log="${text(name)}">${text(t("action.logs"))}</button>
        <button data-inspect-kind="container" data-inspect-id="${text(name)}">${text(t("action.inspect"))}</button>
        ${actionButton(running ? t("action.stop") : t("action.start"), running ? "stop" : "start", name)}
        ${actionButton(t("action.restart"), "restart", name)}
      </div>
    </div>`;
}

function imageRow(item) {
  const id = item.Repository && item.Tag ? `${item.Repository}:${item.Tag}` : item.ID;
  return `
    <div class="row images-row">
      <div><div class="name">${text(item.Repository || "<none>")}</div><div class="muted">${text(item.ID)}</div></div>
      <div>${text(item.Tag || "")}</div>
      <div>${text(item.Size || "")}</div>
      <div class="muted">${text(item.CreatedSince || item.CreatedAt || "")}</div>
      <div class="actions"><button data-inspect-kind="image" data-inspect-id="${text(id)}">${text(t("action.inspect"))}</button></div>
    </div>`;
}

function volumeRow(item) {
  return `
    <div class="row volumes-row">
      <div><div class="name">${text(item.Name)}</div><div class="muted">${text(item.Driver)}</div></div>
      <div>${text(item.Scope || "local")}</div>
      <div class="muted">${text(item.Mountpoint || "")}</div>
      <div class="actions"><button data-inspect-kind="volume" data-inspect-id="${text(item.Name)}">${text(t("action.inspect"))}</button></div>
    </div>`;
}

function buildView() {
  return `
    <div class="detail-grid">
      <section class="detail-block">
        <h3>${text(t("builds.title"))}</h3>
        <p class="muted">${text(t("builds.description"))}</p>
      </section>
      <section class="detail-block">
        <h3>${text(t("builds.available"))}</h3>
        <code>docker build</code>
        <code>docker compose build</code>
      </section>
    </div>`;
}

function settingsView() {
  const lima = state.data.lima.find((item) => item.name === "docker" || item.Name === "docker") || state.data.lima[0] || {};
  const host = state.data.system.host || {};
  const profile = state.data.system.profile || {};
  return `
    <div class="detail-grid">
      <section class="detail-block">
        <h3>${text(t("settings.platform"))}</h3>
        <dl>
          <dt>${text(t("settings.host"))}</dt><dd>${text(host.label || t("summary.unknown"))}</dd>
          <dt>${text(t("settings.arch"))}</dt><dd>${text(host.arch || t("summary.unknown"))}</dd>
          <dt>${text(t("settings.adapter"))}</dt><dd>${text(host.adapter || t("summary.unknown"))}</dd>
          <dt>${text(t("settings.support"))}</dt><dd>${text(profile.tier || t("summary.unknown"))}</dd>
        </dl>
      </section>
      <section class="detail-block">
        <h3>${text(t("settings.engine"))}</h3>
        <dl>
          <dt>${text(t("settings.docker"))}</dt><dd>${text(state.data.version?.Server?.Version || t("summary.unknown"))}</dd>
          <dt>${text(t("settings.context"))}</dt><dd>${text(state.data.version?.Client?.Context || t("summary.unknown"))}</dd>
          <dt>${text(t("settings.enginePath"))}</dt><dd>${text(profile.engine || t("summary.unknown"))}</dd>
          <dt>${text(t("settings.install"))}</dt><dd>${text(profile.installScript || t("summary.unknown"))}</dd>
        </dl>
      </section>
      <section class="detail-block">
        <h3>${text(t("settings.lima"))}</h3>
        <dl>
          <dt>${text(t("settings.instance"))}</dt><dd>${text(lima.name || lima.Name || "docker")}</dd>
          <dt>${text(t("settings.status"))}</dt><dd>${text(lima.status || lima.Status || t("summary.unknown"))}</dd>
          <dt>${text(t("settings.cpu"))}</dt><dd>${text(lima.cpus || lima.CPUS || "4")}</dd>
          <dt>${text(t("settings.memory"))}</dt><dd>${text(lima.memory || lima.MEMORY || "4GiB")}</dd>
        </dl>
      </section>
      <section class="detail-block">
        <h3>${text(t("settings.qemu"))}</h3>
        <dl>
          <dt>${text(t("settings.version"))}</dt><dd>${text(state.data.system.qemuVersion)}</dd>
          <dt>${text(t("settings.userNetworking"))}</dt><dd>${text(state.data.system.qemuHasUserNet ? t("settings.enabled") : t("settings.missing"))}</dd>
        </dl>
      </section>
      <section class="detail-block">
        <h3>${text(t("settings.autostart"))}</h3>
        <dl>
          <dt>${text(t("settings.launchAgent"))}</dt><dd>${text(state.data.system.autostartLoaded ? t("settings.loaded") : t("settings.notLoaded"))}</dd>
        </dl>
      </section>
    </div>`;
}

function troubleshootingView() {
  const caps = state.data.system.capabilities || {};
  const recommendations = state.data.system.recommendations || [];
  const recommendationText = (item, field) => t(`recommendation.${item.id}.${field}`) || item[field];
  const checks = [
    [t("troubleshooting.dockerApi"), state.data.healthy, t("troubleshooting.dockerApiNote")],
    [t("troubleshooting.limaVm"), caps.lima === null ? true : Boolean(caps.lima), t("troubleshooting.limaVmNote")],
    [t("troubleshooting.qemuNet"), caps.qemuUserNetwork === null ? true : Boolean(caps.qemuUserNetwork), t("troubleshooting.qemuNetNote")],
    [t("troubleshooting.autostart"), caps.launchdAutostart === null ? true : Boolean(caps.launchdAutostart), t("troubleshooting.autostartNote")],
  ];
  return `
    <div class="checks">
      ${checks
        .map(([name, ok, note]) => `
          <div class="check">
            ${pill(ok ? t("troubleshooting.ok") : t("troubleshooting.needsAttention"), ok ? "running" : "warn")}
            <strong>${text(name)}</strong>
            <span class="muted">${text(note)}</span>
          </div>`)
        .join("")}
      <h3>${text(t("troubleshooting.recommendations"))}</h3>
      ${recommendations
        .map((item) => `
          <div class="check">
            ${pill(text(item.level || "info"), item.level === "ok" ? "running" : "warn")}
            <strong>${text(recommendationText(item, "title"))}</strong>
            <span class="muted">${text(recommendationText(item, "detail"))}</span>
          </div>`)
        .join("")}
    </div>`;
}

function renderRows() {
  const data = state.data;
  const renderers = {
    containers: () => data.containers.map(containerRow),
    images: () => data.images.map(imageRow),
    volumes: () => data.volumes.map(volumeRow),
    builds: () => [buildView()],
    settings: () => [settingsView()],
    troubleshooting: () => [troubleshootingView()],
  };
  const rows = renderers[state.view]();
  const viewLabel = t(viewKeys[state.view]);

  viewTitle.textContent = viewLabel;
  viewCount.textContent = ["builds", "settings", "troubleshooting"].includes(state.view) ? "" : t("count.total", { count: rows.length });
  content.innerHTML = rows.length ? rows.join("") : empty(t("empty.title", { item: viewLabel.toLowerCase() }));
}

async function refresh() {
  if (state.refreshing) return;
  state.refreshing = true;
  healthDot.classList.remove("good", "bad");
  healthDot.classList.add("checking");
  healthText.textContent = t("status.syncing");
  document.querySelector("#refresh").disabled = true;

  try {
    state.data = await api("/api/state");
    healthDot.classList.toggle("good", state.data.healthy);
    healthDot.classList.toggle("bad", !state.data.healthy);
    healthText.textContent = state.data.healthy ? t("status.engineRunning") : t("status.engineUnavailable");
    renderSummary();
    renderRows();
  } catch (error) {
    healthDot.classList.add("bad");
    healthText.textContent = t("status.loadFailed");
    summary.innerHTML = "";
    content.innerHTML = notice(t("empty.errorTitle"), `${t("empty.errorHint")} ${error.message || ""}`.trim(), "error");
  } finally {
    healthDot.classList.remove("checking");
    state.refreshing = false;
    document.querySelector("#refresh").disabled = false;
  }
}

document.querySelector("#refresh").addEventListener("click", refresh);
document.querySelector("#close-logs").addEventListener("click", () => logsDialog.close());
document.querySelector("#close-inspect").addEventListener("click", () => inspectDialog.close());
language.addEventListener("change", () => {
  state.lang = language.value;
  localStorage.setItem("limaDockerDesktop.language", state.lang);
  applyI18n();
  if (state.data) {
    healthText.textContent = state.data.healthy ? t("status.engineRunning") : t("status.engineUnavailable");
    renderSummary();
    renderRows();
  }
});

document.querySelectorAll(".rail-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".rail-button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    state.view = button.dataset.view;
    renderRows();
  });
});

content.addEventListener("click", async (event) => {
  const target = event.target;
  if (target.dataset.action) {
    await api("/api/action", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: target.dataset.action, id: target.dataset.id }),
    });
    await refresh();
  }
  if (target.dataset.log) {
    logsTitle.textContent = `${target.dataset.log} ${t("dialog.logsSuffix")}`;
    logs.textContent = await api(`/api/logs?id=${encodeURIComponent(target.dataset.log)}`);
    logsDialog.showModal();
  }
  if (target.dataset.inspectKind) {
    inspectTitle.textContent = `${target.dataset.inspectId} ${t("dialog.inspectSuffix")}`;
    const result = await api(`/api/inspect?kind=${encodeURIComponent(target.dataset.inspectKind)}&id=${encodeURIComponent(target.dataset.inspectId)}`);
    inspectOutput.textContent = JSON.stringify(result, null, 2);
    inspectDialog.showModal();
  }
});

applyI18n();
content.innerHTML = notice(t("empty.loadingTitle"), t("empty.loadingHint"), "loading");
refresh();
setInterval(refresh, 5000);
