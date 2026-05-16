Param(
  [switch]$DryRun
)

$ErrorActionPreference = "Stop"

function Step($Message) {
  Write-Host ""
  Write-Host "== $Message =="
}

Step "Checking Windows and WSL2"
$os = Get-CimInstance Win32_OperatingSystem
Write-Host "Windows: $($os.Caption) $($os.Version)"

if (-not (Get-Command wsl.exe -ErrorAction SilentlyContinue)) {
  throw "wsl.exe was not found. Windows 10/11 with WSL2 is required."
}

wsl.exe --status

if ($DryRun) {
  Write-Host "Dry run only. Suggested path:"
  Write-Host "1. Enable WSL2"
  Write-Host "2. Install Ubuntu"
  Write-Host "3. Run scripts/installers/install-linux-docker.sh inside the distro"
  exit 0
}

Step "Ensuring WSL2 is enabled"
wsl.exe --set-default-version 2

Step "Install Docker inside your WSL distro"
Write-Host "Open your Ubuntu WSL shell and run:"
Write-Host "  curl -fsSL https://get.docker.com | sh"
Write-Host "  sudo usermod -aG docker `$USER"
Write-Host "Then restart WSL and start Lima Docker Desktop UI on the host or inside WSL."
