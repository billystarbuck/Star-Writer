# Star Writer Lite Beta Downloader

`Star Writer Lite Beta Downloader.exe` is the public bootstrap downloader for Star Writer Lite 0.76.1 Beta.

It downloads the eleven required GitHub Release assets into the user's selected folder, resumes interrupted files with HTTP range requests, verifies every file against a pinned SHA-256 checksum, and launches `Install-Star-Writer-Lite-0.76.1.cmd` only after every check succeeds.

The downloader targets the .NET Framework included with supported 64-bit Windows 10 and Windows 11 systems. The published executable is signed and timestamped with the Billy Starbuck Star Writer code-signing certificate.

Release tag: `v0.76.1-lite-beta`
