# Star Writer 0.74 Beta

Star Writer is a local AI-assisted writing program for Windows. Version 0.74 includes the Qwen2.5-14B model and its required local runtime, so the installer download is large but the writing model can run on the computer after installation without monthly AI fees or per-token charges.

This is beta software. Back up important writing before testing it and report problems through the **Feature Suggestions** option inside Star Writer.

## Recommended Download

Download and run the signed [Star Writer Beta Downloader](https://github.com/billystarbuck/Star-Writer/releases/download/v0.74-beta/Star.Writer.Beta.Downloader.exe).

The downloader retrieves all eleven required Release assets, resumes interrupted downloads, verifies every file with SHA-256, and opens the installer preparation launcher automatically. The complete download is approximately 10 GB.

The public download page is available at [Billystarbuck.com](https://billystarbuck.com/pages/free-ai-writing-tool).

## Star Writer Lite 0.76 Beta

Star Writer Lite is the lower-resource edition. It uses the included **Qwen2.5-7B Q4_K_M** model with a 4,096-token working context and installs separately from the full edition.

Download and run the signed [Star Writer Lite Beta Downloader](https://github.com/billystarbuck/Star-Writer/releases/download/v0.76-lite-beta/Star.Writer.Lite.Beta.Downloader.exe).

The Lite downloader retrieves its eleven required GitHub Release assets, resumes interrupted downloads, verifies every file with SHA-256, and launches the installer preparation tool. The complete Lite download is approximately 6.6 GB. Allow approximately 18 GB of free space while downloading, reconstructing, and installing it.

The [Star Writer Lite 0.76 Beta Release](https://github.com/billystarbuck/Star-Writer/releases/tag/v0.76-lite-beta) contains the downloader, installer, verification files, and six payload segments. The Release assets are downloaded directly and do not require Git LFS or a GitHub account.

## Manual Git LFS Download

The AI payload is stored with Git Large File Storage (Git LFS). GitHub Desktop supports Git LFS.

1. Install GitHub Desktop and Git LFS.
2. Clone this repository in GitHub Desktop.
3. Wait until GitHub Desktop finishes downloading all six large payload parts.
4. Open the `Star Writer 0.74` folder.
5. Double-click `Install-Star-Writer-0.74.cmd`.
6. The launcher combines the six parts, verifies the official SHA-256 checksum, and opens `Star Writer Installer.exe`.

Do not use GitHub's **Download ZIP** button unless the downloaded archive contains the real LFS files. A source archive can contain small LFS pointer files instead of the model data.

## Requirements

- 64-bit Windows 10 or Windows 11
- Approximately 40 GB of free disk space for the download, reconstructed payload, and installation
- A computer capable of running the bundled Qwen2.5-14B model
- Internet access for the initial Git LFS download

## Installer Files

The `Star Writer 0.74` folder contains:

- `Star Writer Installer.exe`: the signed installer interface
- `Star Writer Installer.payload.zip.part01` through `.part06`: the Git LFS payload pieces
- `Install-Star-Writer-0.74.cmd`: the double-click launcher
- `Install-Star-Writer-0.74.ps1`: the checksum and reconstruction logic
- `SHA256SUMS.txt`: checksums for verification
- `Installer Notes.txt`: installation, privacy, and beta notes

The reconstructed payload must have this SHA-256 checksum:

`398EF752A15ECF5B47EEA4DB8D6617F7F1571688F2356D3A40FBBAA3CACCB966`

After installation, the reconstructed `Star Writer Installer.payload.zip` may be deleted to recover about 10 GB. Keep the six downloaded parts if you want to reconstruct it again later.

## Beta Notice

Star Writer 0.74 is provided for testing. The installer contains the license agreement and third-party notices. The program defaults local computer, file-read, and file-write permissions to off. Feature Suggestions are delivered to `billy@billystarbuck.com` through an HTTPS relay and do not contain the creator's mailbox password.
