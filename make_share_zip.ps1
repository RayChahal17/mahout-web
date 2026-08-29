# make_share_zip.ps1
Set-StrictMode -Version 2.0
$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSCommandPath
Set-Location -LiteralPath $root

$outZip = Join-Path $root 'mahout-web-src.zip'
$runId = [Guid]::NewGuid().ToString('N')
$tmp = Join-Path $env:TEMP ('mahout_web_share_' + $runId)
$stagingZip = Join-Path $env:TEMP ('mahout_web_share_' + $runId + '.zip')

$MaxFileMB = 25
$MaxBytes = $MaxFileMB * 1024 * 1024

$excludeDirs = @(
  'node_modules',
  '.next',
  'dist',
  'build',
  'coverage',
  '.turbo',
  '.cache',
  '.parcel-cache',
  '.vercel',
  '.output',
  '.nuxt',
  '.vite',
  '.svelte-kit',
  '.git',
  '.idea'
)

$excludeExt = @('.mp4','.mov','.mkv','.avi','.psd','.ai','.sketch','.fig','.zip','.7z')

function ShouldExclude([string]$relPath) {
  $p = ($relPath -replace '\\','/')

  if ($p -match '(^|/)\.env(\.|$)' -and $p -notmatch '(^|/)\.env\.example$') { return $true }

  foreach ($d in $excludeDirs) {
    $dn = ($d -replace '\\','/')
    if ($p -match "(^|/)$([regex]::Escape($dn))(/|$)") { return $true }
  }

  $ext = [System.IO.Path]::GetExtension($p)
  if ($excludeExt -contains $ext) { return $true }

  if ($p -match '(^|/)\.DS_Store$') { return $true }
  if ($p -match '(^|/)Thumbs\.db$') { return $true }
  if ($p -match '(^|/)npm-debug\.log$') { return $true }
  if ($p -match '(^|/)yarn-error\.log$') { return $true }
  if ($p -match '(^|/)pnpm-debug\.log$') { return $true }

  return $false
}

function GetFileList {
  $git = Get-Command git -ErrorAction SilentlyContinue
  $hasGit = Test-Path -LiteralPath (Join-Path $root '.git')

  if ($git -and $hasGit) {
    Write-Host 'Using git-aware file list (tracked + untracked, excluding ignored).'

    $tracked = @(& git ls-files)
    if ($LASTEXITCODE -ne 0) { throw 'git ls-files failed.' }

    $untracked = @(& git ls-files -o --exclude-standard)
    if ($LASTEXITCODE -ne 0) { throw 'git ls-files -o --exclude-standard failed.' }

    return @($tracked + $untracked) | Where-Object { $_ } | Sort-Object -Unique
  }

  Write-Host 'Git not detected. Using filesystem scan (with excludes).'
  $all = Get-ChildItem -LiteralPath $root -Recurse -File -Force
  $rels = @()
  foreach ($f in $all) {
    $rels += $f.FullName.Substring($root.Length).TrimStart('\','/')
  }
  return $rels | Sort-Object -Unique
}

$final = New-Object System.Collections.Generic.List[string]
$skippedExcluded = 0
$skippedLarge = 0
$oldZipInfo = $null

try {
  New-Item -ItemType Directory -Path $tmp -Force | Out-Null

  if (Test-Path -LiteralPath $outZip) {
    $oldZipInfo = Get-Item -LiteralPath $outZip
    Write-Host ('Existing zip found: ' + $oldZipInfo.FullName)
    Write-Host ('Existing zip size: ' + $oldZipInfo.Length + ' bytes')
    Write-Host ('Existing zip last write: ' + $oldZipInfo.LastWriteTime.ToString('yyyy-MM-dd HH:mm:ss'))
  } else {
    Write-Host 'No existing zip found at target path.'
  }

  $files = GetFileList
  Write-Host ('Collected candidate paths: ' + $files.Count)

  foreach ($rel in $files) {
    $src = Join-Path $root $rel
    if (!(Test-Path -LiteralPath $src)) { continue }

    if (ShouldExclude $rel) {
      $skippedExcluded++
      continue
    }

    $len = (Get-Item -LiteralPath $src).Length
    if ($len -gt $MaxBytes) {
      $skippedLarge++
      continue
    }

    $final.Add($rel)
  }

  Write-Host ('Files selected for zip: ' + $final.Count)
  Write-Host ('Copying included files to temp staging folder: ' + $final.Count)

  foreach ($rel in $final) {
    $src = Join-Path $root $rel
    $dest = Join-Path $tmp $rel
    $destDir = Split-Path $dest -Parent

    if (!(Test-Path -LiteralPath $destDir)) {
      New-Item -ItemType Directory -Path $destDir -Force | Out-Null
    }

    Copy-Item -LiteralPath $src -Destination $dest -Force
  }

  Write-Host 'Creating staging zip...'
  if (Test-Path -LiteralPath $stagingZip) {
    Remove-Item -LiteralPath $stagingZip -Force
  }

  Compress-Archive -Path (Join-Path $tmp '*') -DestinationPath $stagingZip -Force

  if (!(Test-Path -LiteralPath $stagingZip)) {
    throw 'Staging zip was not created.'
  }

  $stagingInfo = Get-Item -LiteralPath $stagingZip
  if ($stagingInfo.Length -le 0) {
    throw 'Staging zip was created but is empty.'
  }

  Write-Host ('Staging zip created: ' + $stagingInfo.FullName)
  Write-Host ('Staging zip size: ' + $stagingInfo.Length + ' bytes')

  Write-Host 'Replacing final zip...'
  if (Test-Path -LiteralPath $outZip) {
    $existing = Get-Item -LiteralPath $outZip
    if ($existing.IsReadOnly) {
      $existing.IsReadOnly = $false
    }
    Remove-Item -LiteralPath $outZip -Force
  }

  Move-Item -LiteralPath $stagingZip -Destination $outZip -Force

  if (!(Test-Path -LiteralPath $outZip)) {
    throw ('Final zip not found at expected path: ' + $outZip)
  }

  $newZipInfo = Get-Item -LiteralPath $outZip
  if ($newZipInfo.Length -le 0) {
    throw ('Final zip exists but is empty: ' + $outZip)
  }

  Write-Host ''
  Write-Host ('Created: ' + $newZipInfo.FullName)
  Write-Host ('Final zip size: ' + $newZipInfo.Length + ' bytes')
  Write-Host ('Final zip last write: ' + $newZipInfo.LastWriteTime.ToString('yyyy-MM-dd HH:mm:ss'))
  Write-Host ('Included files: ' + $final.Count)
  Write-Host ('Skipped (excluded): ' + $skippedExcluded)
  Write-Host ('Skipped (>' + $MaxFileMB + 'MB): ' + $skippedLarge)
  Write-Host ''
  Write-Host 'Reminder: .env files are excluded. If needed, add .env.example.'
}
catch {
  Write-Host ''
  Write-Host 'ERROR: Zip creation failed.'
  Write-Host $_.Exception.Message
  throw
}
finally {
  if (Test-Path -LiteralPath $tmp) {
    Remove-Item -LiteralPath $tmp -Recurse -Force
  }

  if (Test-Path -LiteralPath $stagingZip) {
    Remove-Item -LiteralPath $stagingZip -Force
  }
}