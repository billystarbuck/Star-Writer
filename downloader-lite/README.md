# Star Writer Lite Beta Downloader

`Star Writer Lite Beta Downloader.exe` is the public bootstrap downloader for Star Writer Lite 0.77 Beta.

It downloads twelve GitHub Release assets into the folder you select, resumes interrupted files with HTTP range requests, verifies each file against a pinned SHA-256 checksum, and launches `Install-Star-Writer-Lite-0.77.cmd` after all checks pass.

The downloader targets the .NET Framework included with supported 64-bit Windows 10 and Windows 11 systems. The published executable is signed and timestamped with the Billy Starbuck Star Writer code-signing certificate.

Release tag: `v0.77-lite-beta`
