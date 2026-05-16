#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PLIST_PATH="${HOME}/Library/LaunchAgents/com.vitaair.docker-lima-start.plist"
SCRIPT_PATH="${SCRIPT_DIR}/shell-start.sh"

mkdir -p "${HOME}/Library/LaunchAgents"

cat > "$PLIST_PATH" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>com.vitaair.docker-lima-start</string>

  <key>ProgramArguments</key>
  <array>
    <string>/bin/bash</string>
    <string>${SCRIPT_PATH}</string>
  </array>

  <key>RunAtLoad</key>
  <true/>

  <key>KeepAlive</key>
  <false/>

  <key>StandardOutPath</key>
  <string>${HOME}/Library/Logs/docker-lima-launchd.out.log</string>

  <key>StandardErrorPath</key>
  <string>${HOME}/Library/Logs/docker-lima-launchd.err.log</string>
</dict>
</plist>
PLIST

launchctl unload "$PLIST_PATH" >/dev/null 2>&1 || true
launchctl load "$PLIST_PATH"

echo "Autostart installed: $PLIST_PATH"
launchctl list | grep com.vitaair.docker-lima-start || true

