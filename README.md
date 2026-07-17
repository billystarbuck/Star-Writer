# Star Writer 0.76 Beta

Star Writer is a local AI-assisted writing program for Windows. Version 0.76 includes the Qwen2.5-14B model and its required local runtime, so the installer download is large but the writing model can run on the computer after installation without monthly AI fees or per-token charges.

This is beta software. Back up important writing before testing it and report problems through the **Feature Suggestions** option inside Star Writer.

## Recommended Download

Download and run the signed [Star Writer Beta Downloader](https://github.com/billystarbuck/Star-Writer/releases/download/v0.76-beta/Star.Writer.Beta.Downloader.exe).

The downloader retrieves all eleven required Release assets, resumes interrupted downloads, verifies every file with SHA-256, and opens the installer preparation launcher automatically. The complete download is approximately 10.7 GB.

The [Star Writer 0.76 Beta Release](https://github.com/billystarbuck/Star-Writer/releases/tag/v0.76-beta) contains the downloader, installer, verification files, and six payload segments. The Release assets do not require Git LFS or a GitHub account.

The public download page is available at [Billystarbuck.com](https://billystarbuck.com/pages/free-ai-writing-tool).

## Star Writer Lite 0.76.1 Beta

Star Writer Lite is the lower-resource edition. It uses the included **Qwen2.5-7B Q4_K_M** model with a 4,096-token working context and installs separately from the full edition.

Download and run the signed [Star Writer Lite Beta Downloader](https://github.com/billystarbuck/Star-Writer/releases/download/v0.76.1-lite-beta/Star.Writer.Lite.Beta.Downloader.exe).

The Lite downloader retrieves its eleven required GitHub Release assets, resumes interrupted downloads, verifies every file with SHA-256, and launches the installer preparation tool. The complete Lite download is approximately 6.6 GB. Allow approximately 18 GB of free space while downloading, reconstructing, and installing it.

The [Star Writer Lite 0.76.1 Beta Release](https://github.com/billystarbuck/Star-Writer/releases/tag/v0.76.1-lite-beta) contains the downloader, installer, verification files, and six payload segments. Version 0.76.1 automatically falls back to CPU compatibility mode when NVIDIA CUDA/PTX acceleration is not supported. The Release assets are downloaded directly and do not require Git LFS or a GitHub account.

## Manual Release Download

The recommended downloader handles the complete process automatically. For manual installation:

1. Open the [Star Writer 0.76 Beta Release](https://github.com/billystarbuck/Star-Writer/releases/tag/v0.76-beta).
2. Download the eleven required files into one folder.
3. Double-click `Install-Star-Writer-0.76.cmd`.
4. The launcher verifies all six payload segments, reconstructs the payload, verifies it again, and opens the signed installer.

Do not rename or separate the installer, scripts, or payload segments.

## Requirements

- 64-bit Windows 10 or Windows 11
- Approximately 40 GB of free disk space for the download, reconstructed payload, and installation
- A computer capable of running the bundled Qwen2.5-14B model
- Internet access for the initial Release download

## Installer Files

The Star Writer 0.76 Release contains:

- `Star.Writer.Beta.Downloader.exe`: the recommended signed downloader
- `Star.Writer.Installer.exe`: the signed installer interface
- `Star.Writer.Installer.payload.zip.part01` through `.part06`: the payload segments
- `Install-Star-Writer-0.76.cmd`: the double-click launcher
- `Install-Star-Writer-0.76.ps1`: the checksum and reconstruction logic
- `SHA256SUMS.txt`: checksums for verification
- `Installer.Notes.txt`: installation, privacy, and beta notes

The reconstructed payload must have this SHA-256 checksum:

`8AC94483F9178B7DC271421D7636E2EDE927D1A326C7F6B6D1FDFDE97D06127A`

After installation, the reconstructed `Star Writer Installer.payload.zip` may be deleted to recover about 10.7 GB. Keep the six downloaded parts if you want to reconstruct it again later.

## Beta Notice

Star Writer 0.76 is provided for testing. The installer contains the license agreement and third-party notices. The program defaults local computer, file-read, and file-write permissions to off. Feature Suggestions are delivered to `billy@billystarbuck.com` through an HTTPS relay and do not contain the creator's mailbox password.
