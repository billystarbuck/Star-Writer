# Star Writer Beta Downloader

`Star Writer Beta Downloader.exe` is the public bootstrap downloader for Star Writer 0.76 Beta.

It downloads the eleven required GitHub Release assets into the user's selected folder, resumes interrupted files with HTTP range requests, verifies each file with a pinned SHA-256 checksum, and launches `Install-Star-Writer-0.76.cmd` only after every check succeeds.

## Build

The downloader targets the .NET Framework included with supported Windows 10 and Windows 11 systems. Build it with the 64-bit .NET Framework C# compiler and references to WinForms, Drawing, and HttpClient. Embed `StarWriter.ico` and `StarWriterBetaDownloader.manifest` in the executable.

The published binary is Authenticode-signed and timestamped. Its SHA-256 checksum is:

`A8BBC0F71E432E27E3D53B95813169E40633FE5C6B1236D0CB4CEB8A9C25559F`
