param(
    [switch]$VerifyOnly
)

$ErrorActionPreference = "Stop"

$sourceDir = Split-Path -Parent $PSCommandPath
$installerPath = Join-Path $sourceDir "Star Writer Installer.exe"
$payloadPath = Join-Path $sourceDir "Star Writer Installer.payload.zip"
$temporaryPath = "$payloadPath.assembling"
$expectedPayloadBytes = 10715530468
$expectedPayloadHash = "398EF752A15ECF5B47EEA4DB8D6617F7F1571688F2356D3A40FBBAA3CACCB966"
$expectedInstallerHash = "39A148FBF75762039EA51CC971B451755434A309AFBD232F386BDA1D2091F562"

function Get-Sha256([string]$Path) {
    return (Get-FileHash -LiteralPath $Path -Algorithm SHA256).Hash.ToUpperInvariant()
}

if (-not (Test-Path -LiteralPath $installerPath)) {
    throw "Star Writer Installer.exe is missing. Download the complete release folder and try again."
}

if ((Get-Sha256 $installerPath) -ne $expectedInstallerHash) {
    throw "The installer EXE failed its security check. Delete this download and obtain a fresh copy from the official Star Writer repository."
}

$parts = @(Get-ChildItem -LiteralPath $sourceDir -File -Filter "Star Writer Installer.payload.zip.part*" | Sort-Object Name)
if ($parts.Count -ne 6) {
    throw "Six payload parts are required, but $($parts.Count) were found. Let GitHub Desktop finish the Git LFS download and try again."
}

$partsBytes = ($parts | Measure-Object -Property Length -Sum).Sum
if ($partsBytes -ne $expectedPayloadBytes) {
    throw "The payload parts are incomplete. Expected $expectedPayloadBytes bytes but found $partsBytes bytes. Run Git LFS Pull in GitHub Desktop and try again."
}

if (Test-Path -LiteralPath $payloadPath) {
    Write-Host "Checking the existing reconstructed payload..."
    if ((Get-Item -LiteralPath $payloadPath).Length -eq $expectedPayloadBytes -and (Get-Sha256 $payloadPath) -eq $expectedPayloadHash) {
        Write-Host "The existing payload is complete and verified."
    }
    else {
        throw "An invalid reconstructed payload already exists. Delete 'Star Writer Installer.payload.zip' from this folder and run this launcher again."
    }
}
else {
    $driveRoot = [System.IO.Path]::GetPathRoot($sourceDir)
    $availableBytes = ([System.IO.DriveInfo]::new($driveRoot)).AvailableFreeSpace
    if ($availableBytes -lt ($expectedPayloadBytes + 1GB)) {
        throw "There is not enough free space to reconstruct the installer payload. Free at least 11 GB on this drive and try again."
    }

    Remove-Item -LiteralPath $temporaryPath -Force -ErrorAction SilentlyContinue
    $output = [System.IO.File]::Open($temporaryPath, [System.IO.FileMode]::CreateNew, [System.IO.FileAccess]::Write, [System.IO.FileShare]::None)
    $buffer = New-Object byte[] (8MB)
    $written = [int64]0
    $lastProgressAt = [DateTime]::MinValue
    try {
        foreach ($part in $parts) {
            $input = [System.IO.File]::OpenRead($part.FullName)
            try {
                while (($read = $input.Read($buffer, 0, $buffer.Length)) -gt 0) {
                    $output.Write($buffer, 0, $read)
                    $written += $read
                    if (([DateTime]::UtcNow - $lastProgressAt).TotalMilliseconds -ge 250) {
                        $percent = [math]::Min(100, [math]::Floor(($written / $expectedPayloadBytes) * 100))
                        Write-Progress -Activity "Preparing Star Writer 0.74" -Status "$percent% complete" -PercentComplete $percent
                        $lastProgressAt = [DateTime]::UtcNow
                    }
                }
            }
            finally {
                $input.Dispose()
            }
        }
    }
    finally {
        $output.Dispose()
        Write-Progress -Activity "Preparing Star Writer 0.74" -Completed
    }

    if ((Get-Item -LiteralPath $temporaryPath).Length -ne $expectedPayloadBytes -or (Get-Sha256 $temporaryPath) -ne $expectedPayloadHash) {
        Remove-Item -LiteralPath $temporaryPath -Force -ErrorAction SilentlyContinue
        throw "The reconstructed payload failed its security check. Run Git LFS Pull and try again."
    }

    Move-Item -LiteralPath $temporaryPath -Destination $payloadPath
    Write-Host "The Star Writer payload was reconstructed and verified successfully."
}

if ($VerifyOnly) {
    Write-Host "Star Writer Installer 0.74 is complete and verified."
    exit 0
}

Write-Host "Opening Star Writer Installer 0.74..."
Start-Process -FilePath $installerPath -WorkingDirectory $sourceDir
