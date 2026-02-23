param(
    [string]$RepoPath = "C:\\LaTaifas",
    [string]$RenderGitUrl = "",
    [string]$Branch = ""
)

function Exec([string]$cmd) {
    Write-Host "> $cmd"
    & cmd /c $cmd
}

Write-Host "Running install-and-push helper"

# Ensure RepoPath exists
if (-not (Test-Path $RepoPath)) {
    Write-Error "Repo path '$RepoPath' not found."
    exit 1
}

# Try calling git directly; if not found, attempt install via winget or choco
$gitOK = $false
try { & git --version > $null 2>&1; $gitOK = $true } catch { $gitOK = $false }

if (-not $gitOK) {
    Write-Host "Git not found in PATH. Attempting install..."
    if (Get-Command winget -ErrorAction SilentlyContinue) {
        Write-Host "Installing Git with winget (requires elevated prompt)..."
        winget install --id Git.Git -e --source winget --accept-package-agreements --accept-source-agreements
    } elseif (Get-Command choco -ErrorAction SilentlyContinue) {
        Write-Host "Installing Git with Chocolatey (requires elevated prompt)..."
        choco install git -y
    } else {
        Write-Host "No package manager found. Please install Git from https://git-scm.com/download/win and re-run this script."
        exit 1
    }

    # Add common Git path for session
    if (Test-Path "C:\\Program Files\\Git\\cmd\\git.exe") {
        $env:Path += ";C:\\Program Files\\Git\\cmd"
    }

    try { & git --version > $null 2>&1; $gitOK = $true } catch { $gitOK = $false }
    if (-not $gitOK) { Write-Error "git still not available in PATH. Re-open shell or add 'C:\\Program Files\\Git\\cmd' to PATH and retry."; exit 1 }
    Write-Host "Git installed and available."
}

# Ensure git config present
$name = (& git config --global user.name 2>$null) -join ""
if ([string]::IsNullOrWhiteSpace($name)) { & git config --global user.name "LaTaifas User" }
$email = (& git config --global user.email 2>$null) -join ""
if ([string]::IsNullOrWhiteSpace($email)) { & git config --global user.email "user@example.com" }

# Operate in repo
Set-Location $RepoPath

Write-Host "Repo path: $RepoPath"

# Show status
$porcelain = (& git status --porcelain) -join "`n"
Write-Host "git status output:`n$porcelain"

if (-not [string]::IsNullOrEmpty($porcelain)) {
    Write-Host "There are changes — creating commit..."
    & git add -A
    try { & git commit -m "Auto commit before Render push" } catch { Write-Host "No commit created (maybe no staged changes)." }
} else {
    Write-Host "No changes to commit."
}

if (-not $Branch) {
    $Branch = (& git rev-parse --abbrev-ref HEAD) -join ""
}
Write-Host "Using branch: $Branch"

if ($RenderGitUrl) {
    $existing = $null
    try { $existing = (& git remote get-url render) -join "" } catch {}
    if (-not $existing) {
        Write-Host "Adding remote 'render' -> $RenderGitUrl"
        & git remote add render $RenderGitUrl
    } else { Write-Host "Remote 'render' already configured -> $existing" }
    Write-Host "Pushing to 'render'..."
    & git push render $Branch
} else {
    Write-Host "No Render URL provided — pushing to 'origin'..."
    & git push origin $Branch
}

Write-Host "Script finished. Check remote/deploy status on Render or remote provider."
