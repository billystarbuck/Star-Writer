using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Reflection;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;

[assembly: AssemblyTitle("Star Writer Lite Beta Downloader")]
[assembly: AssemblyDescription("Downloads, verifies, and launches the Star Writer Lite 0.77 Beta installer.")]
[assembly: AssemblyCompany("Billy Starbuck")]
[assembly: AssemblyProduct("Star Writer Lite")]
[assembly: AssemblyCopyright("Copyright 2026 Billy Starbuck")]
[assembly: AssemblyVersion("0.77.0.0")]
[assembly: AssemblyFileVersion("0.77.0.0")]

namespace StarWriterLiteBetaDownloader
{
    internal sealed class DownloadAsset
    {
        public string FileName;
        public long Size;
        public string Sha256;

        public DownloadAsset(string fileName, long size, string sha256)
        {
            FileName = fileName;
            Size = size;
            Sha256 = sha256;
        }
    }

    internal static class Program
    {
        [STAThread]
        private static void Main()
        {
            ServicePointManager.SecurityProtocol |= (SecurityProtocolType)3072;
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new DownloaderForm());
        }
    }

    internal sealed class DownloaderForm : Form
    {
        private static readonly Color Navy = Color.FromArgb(24, 55, 91);
        private static readonly Color NavyDark = Color.FromArgb(16, 39, 67);
        private static readonly Color Gold = Color.FromArgb(214, 168, 75);
        private static readonly Color PaleGold = Color.FromArgb(247, 237, 211);
        private static readonly Color Canvas = Color.FromArgb(247, 249, 252);
        private static readonly Color Ink = Color.FromArgb(31, 48, 67);
        private static readonly Color Muted = Color.FromArgb(91, 108, 126);

        private const string ReleaseBase =
            "https://github.com/billystarbuck/Star-Writer/releases/download/v0.77-lite-beta/";

        private readonly DownloadAsset[] assets = new DownloadAsset[]
        {
            new DownloadAsset("Star.Writer.Lite.Installer.exe", 64432L,
                "B8258FA5AE365763464D77EF37551C198662419718DA54EB4950A854298155DE"),
            new DownloadAsset("Install-Star-Writer-Lite-0.77.cmd", 310L,
                "88C91F746D42657C33EB95167B4747D70604869E791E91EE3B91D34EFEBE40BE"),
            new DownloadAsset("Install-Star-Writer-Lite-0.77.ps1", 5517L,
                "19198BC45033D2CE2451235E0CF375969B300071E67A55D15702E4AE80F5F40C"),
            new DownloadAsset("SHA256SUMS.txt", 1178L,
                "8E648A19136A58A9D540FDDF671D71BE9C212ACE9F620C3C345448FAD56791A9"),
            new DownloadAsset("Installer.Notes.txt", 2797L,
                "40F88392EC970D360A210A2D2BE72E7E1E7C055DEA05291A178FB5786F4729C1"),
            new DownloadAsset("Star.Writer.Lite.Installer.payload.zip.part01", 1088693400L,
                "EE911456E8086306CD1424EE10D0863750110EC6ADCE3F713ACF43948E0FEF93"),
            new DownloadAsset("Star.Writer.Lite.Installer.payload.zip.part02", 1088693400L,
                "732A35659CFAF139B88A456807FCAF0971AEA846D2F376C95BF89278576A1A40"),
            new DownloadAsset("Star.Writer.Lite.Installer.payload.zip.part03", 1088693400L,
                "8F7218BE696379E182AF618B5A9DA8A10CC36F739D69564C6AD0E96DEAEB04A0"),
            new DownloadAsset("Star.Writer.Lite.Installer.payload.zip.part04", 1088693400L,
                "B7127758A7FE88E19D2B75F1C44E5BB89671EFE50D1096750A2E4584D6290657"),
            new DownloadAsset("Star.Writer.Lite.Installer.payload.zip.part05", 1088693400L,
                "CCD927BF1BE378F0C9A7829A8FC67658D30BC6B2382351C42E50C65D381D62EC"),
            new DownloadAsset("Star.Writer.Lite.Installer.payload.zip.part06", 1088693400L,
                "54B4810D078B3931B0AA0DF83CA86FB1572583A4529144A6696CA77E186194CB"),
            new DownloadAsset("Star.Writer.Lite.Installer.payload.zip.part07", 57502442L,
                "156942839954B7812F271CFE498B0883721A6D2BFD9AFC96C3B0D271BEC7D6ED")
        };

        private readonly Label statusLabel;
        private readonly Label detailLabel;
        private readonly Label percentLabel;
        private readonly TextBox folderBox;
        private readonly Button browseButton;
        private readonly Button downloadButton;
        private readonly Button cancelButton;
        private readonly Button closeButton;
        private readonly Panel progressTrack;
        private readonly Panel progressFill;
        private readonly LinkLabel folderLink;
        private CancellationTokenSource cancellation;
        private bool operationRunning;
        private long totalBytes;

        public DownloaderForm()
        {
            foreach (DownloadAsset asset in assets)
            {
                totalBytes += asset.Size;
            }

            Text = "Star Writer Lite Beta Downloader";
            ClientSize = new Size(680, 470);
            StartPosition = FormStartPosition.CenterScreen;
            FormBorderStyle = FormBorderStyle.FixedSingle;
            MaximizeBox = false;
            MinimizeBox = true;
            BackColor = Canvas;
            Font = new Font("Segoe UI", 10F, FontStyle.Regular, GraphicsUnit.Point);

            Panel header = new Panel();
            header.Dock = DockStyle.Top;
            header.Height = 116;
            header.BackColor = Navy;
            Controls.Add(header);

            Label title = new Label();
            title.AutoSize = true;
            title.Text = "STAR WRITER LITE";
            title.ForeColor = Color.White;
            title.Font = new Font("Segoe UI Semibold", 22F, FontStyle.Bold, GraphicsUnit.Point);
            title.Location = new Point(28, 21);
            header.Controls.Add(title);

            Label subtitle = new Label();
            subtitle.AutoSize = true;
            subtitle.Text = "0.77 Beta Downloader";
            subtitle.ForeColor = Gold;
            subtitle.Font = new Font("Segoe UI Semibold", 12F, FontStyle.Bold, GraphicsUnit.Point);
            subtitle.Location = new Point(31, 69);
            header.Controls.Add(subtitle);

            Label freeBadge = new Label();
            freeBadge.Text = "FREE BETA";
            freeBadge.TextAlign = ContentAlignment.MiddleCenter;
            freeBadge.ForeColor = NavyDark;
            freeBadge.BackColor = Gold;
            freeBadge.Font = new Font("Segoe UI Semibold", 9F, FontStyle.Bold, GraphicsUnit.Point);
            freeBadge.Size = new Size(104, 30);
            freeBadge.Location = new Point(543, 34);
            header.Controls.Add(freeBadge);

            Label intro = new Label();
            intro.Text = "Downloads all required installer files, verifies them, and opens the installer. " +
                         "Interrupted downloads can continue where they stopped.";
            intro.ForeColor = Ink;
            intro.Location = new Point(30, 137);
            intro.Size = new Size(620, 46);
            Controls.Add(intro);

            Label folderTitle = new Label();
            folderTitle.Text = "Download location";
            folderTitle.ForeColor = Ink;
            folderTitle.Font = new Font("Segoe UI Semibold", 9.5F, FontStyle.Bold, GraphicsUnit.Point);
            folderTitle.AutoSize = true;
            folderTitle.Location = new Point(30, 194);
            Controls.Add(folderTitle);

            folderBox = new TextBox();
            folderBox.ReadOnly = true;
            folderBox.BackColor = Color.White;
            folderBox.ForeColor = Ink;
            folderBox.BorderStyle = BorderStyle.FixedSingle;
            folderBox.Location = new Point(30, 219);
            folderBox.Size = new Size(515, 29);
            folderBox.Text = Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.UserProfile),
                "Downloads",
                "Star Writer Lite 0.77 Beta");
            Controls.Add(folderBox);

            browseButton = CreateButton("Change Folder", Navy, Color.White, new Size(105, 31));
            browseButton.Location = new Point(550, 217);
            browseButton.Click += BrowseButton_Click;
            Controls.Add(browseButton);

            statusLabel = new Label();
            statusLabel.Text = "Ready to download approximately 6.6 GB.";
            statusLabel.ForeColor = Ink;
            statusLabel.Font = new Font("Segoe UI Semibold", 10F, FontStyle.Bold, GraphicsUnit.Point);
            statusLabel.Location = new Point(30, 273);
            statusLabel.Size = new Size(520, 24);
            Controls.Add(statusLabel);

            percentLabel = new Label();
            percentLabel.Text = "0%";
            percentLabel.TextAlign = ContentAlignment.MiddleRight;
            percentLabel.ForeColor = Navy;
            percentLabel.Font = new Font("Segoe UI Semibold", 10F, FontStyle.Bold, GraphicsUnit.Point);
            percentLabel.Location = new Point(575, 273);
            percentLabel.Size = new Size(74, 24);
            Controls.Add(percentLabel);

            progressTrack = new Panel();
            progressTrack.BackColor = Color.FromArgb(216, 223, 231);
            progressTrack.Location = new Point(30, 302);
            progressTrack.Size = new Size(620, 16);
            Controls.Add(progressTrack);

            progressFill = new Panel();
            progressFill.BackColor = Gold;
            progressFill.Location = new Point(0, 0);
            progressFill.Size = new Size(0, 16);
            progressTrack.Controls.Add(progressFill);

            detailLabel = new Label();
            detailLabel.Text = "Files are downloaded from the official public GitHub Release.";
            detailLabel.ForeColor = Muted;
            detailLabel.Location = new Point(30, 329);
            detailLabel.Size = new Size(620, 42);
            Controls.Add(detailLabel);

            folderLink = new LinkLabel();
            folderLink.Text = "Open download folder";
            folderLink.AutoSize = true;
            folderLink.LinkColor = Navy;
            folderLink.ActiveLinkColor = Gold;
            folderLink.Location = new Point(30, 384);
            folderLink.LinkClicked += FolderLink_LinkClicked;
            Controls.Add(folderLink);

            downloadButton = CreateButton("Download and Install", Gold, NavyDark, new Size(176, 40));
            downloadButton.Location = new Point(282, 403);
            downloadButton.Click += DownloadButton_Click;
            Controls.Add(downloadButton);

            cancelButton = CreateButton("Cancel", Color.FromArgb(224, 228, 233), Ink, new Size(90, 40));
            cancelButton.Location = new Point(464, 403);
            cancelButton.Enabled = false;
            cancelButton.Click += CancelButton_Click;
            Controls.Add(cancelButton);

            closeButton = CreateButton("Close", Navy, Color.White, new Size(90, 40));
            closeButton.Location = new Point(560, 403);
            closeButton.Click += delegate { Close(); };
            Controls.Add(closeButton);

            FormClosing += DownloaderForm_FormClosing;
        }

        private static Button CreateButton(string text, Color backColor, Color foreColor, Size size)
        {
            Button button = new Button();
            button.Text = text;
            button.Size = size;
            button.BackColor = backColor;
            button.ForeColor = foreColor;
            button.FlatStyle = FlatStyle.Flat;
            button.FlatAppearance.BorderSize = 0;
            button.Cursor = Cursors.Hand;
            button.Font = new Font("Segoe UI Semibold", 9F, FontStyle.Bold, GraphicsUnit.Point);
            return button;
        }

        private void BrowseButton_Click(object sender, EventArgs e)
        {
            using (FolderBrowserDialog dialog = new FolderBrowserDialog())
            {
                dialog.Description = "Choose where Star Writer Lite installation files will be downloaded.";
                dialog.SelectedPath = folderBox.Text;
                if (dialog.ShowDialog(this) == DialogResult.OK)
                {
                    folderBox.Text = Path.Combine(dialog.SelectedPath, "Star Writer Lite 0.77 Beta");
                }
            }
        }

        private void FolderLink_LinkClicked(object sender, LinkLabelLinkClickedEventArgs e)
        {
            Directory.CreateDirectory(folderBox.Text);
            Process.Start(new ProcessStartInfo(folderBox.Text) { UseShellExecute = true });
        }

        private async void DownloadButton_Click(object sender, EventArgs e)
        {
            if (operationRunning)
            {
                return;
            }

            try
            {
                Directory.CreateDirectory(folderBox.Text);
                if (!ConfirmAvailableSpace(folderBox.Text))
                {
                    return;
                }

                operationRunning = true;
                SetRunningState(true);
                cancellation = new CancellationTokenSource();
                await DownloadAllAsync(cancellation.Token);

                UpdateProgress(totalBytes);
                statusLabel.Text = "Complete. Every file passed verification.";
                detailLabel.Text = "Opening the Star Writer Lite installer preparation window...";

                MessageBox.Show(
                    this,
                    "The Star Writer Lite 0.77 Beta download is complete and verified. The installer will now open.",
                    "Star Writer Lite Download Complete",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Information);

                string launcher = Path.Combine(folderBox.Text, "Install-Star-Writer-Lite-0.77.cmd");
                Process.Start(new ProcessStartInfo(launcher)
                {
                    WorkingDirectory = folderBox.Text,
                    UseShellExecute = true
                });
            }
            catch (OperationCanceledException)
            {
                statusLabel.Text = "Download canceled.";
                detailLabel.Text = "Partial files were kept. Click Download and Install to resume later.";
            }
            catch (Exception ex)
            {
                statusLabel.Text = "The download could not be completed.";
                detailLabel.Text = ex.Message;
                MessageBox.Show(
                    this,
                    ex.Message + "\r\n\r\nPartial downloads were kept so you can try again.",
                    "Star Writer Lite Download Error",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Error);
            }
            finally
            {
                operationRunning = false;
                SetRunningState(false);
                if (cancellation != null)
                {
                    cancellation.Dispose();
                    cancellation = null;
                }
            }
        }

        private bool ConfirmAvailableSpace(string folder)
        {
            string root = Path.GetPathRoot(Path.GetFullPath(folder));
            DriveInfo drive = new DriveInfo(root);
            const long recommended = 18L * 1024L * 1024L * 1024L;
            if (drive.AvailableFreeSpace >= recommended)
            {
                return true;
            }

            DialogResult choice = MessageBox.Show(
                this,
                "Star Writer Lite recommends about 18 GB of free space in the download location for the parts and reconstructed payload. " +
                "This drive currently has " + FormatBytes(drive.AvailableFreeSpace) + " available.\r\n\r\n" +
                "Continue anyway?",
                "Limited Free Space",
                MessageBoxButtons.YesNo,
                MessageBoxIcon.Warning);
            return choice == DialogResult.Yes;
        }

        private void CancelButton_Click(object sender, EventArgs e)
        {
            if (cancellation != null)
            {
                cancelButton.Enabled = false;
                statusLabel.Text = "Canceling...";
                cancellation.Cancel();
            }
        }

        private void DownloaderForm_FormClosing(object sender, FormClosingEventArgs e)
        {
            if (!operationRunning)
            {
                return;
            }

            DialogResult choice = MessageBox.Show(
                this,
                "Cancel the current download and close? Partial files will be kept for later.",
                "Close Star Writer Lite Downloader",
                MessageBoxButtons.YesNo,
                MessageBoxIcon.Question);
            if (choice == DialogResult.No)
            {
                e.Cancel = true;
                return;
            }
            if (cancellation != null)
            {
                cancellation.Cancel();
            }
        }

        private void SetRunningState(bool running)
        {
            downloadButton.Enabled = !running;
            browseButton.Enabled = !running;
            cancelButton.Enabled = running;
            closeButton.Enabled = !running;
        }

        private async Task DownloadAllAsync(CancellationToken token)
        {
            long completedBytes = 0;
            using (HttpClientHandler handler = new HttpClientHandler())
            using (HttpClient client = new HttpClient(handler))
            {
                client.Timeout = TimeSpan.FromMilliseconds(Timeout.Infinite);
                client.DefaultRequestHeaders.UserAgent.ParseAdd("Star-Writer-Lite-Beta-Downloader/0.77");

                for (int index = 0; index < assets.Length; index++)
                {
                    token.ThrowIfCancellationRequested();
                    DownloadAsset asset = assets[index];
                    statusLabel.Text = "Preparing file " + (index + 1) + " of " + assets.Length + "...";

                    bool ready = await UseVerifiedExistingFileAsync(asset, token);
                    if (!ready)
                    {
                        await DownloadAndVerifyAssetAsync(client, asset, completedBytes, index, token);
                    }

                    completedBytes += asset.Size;
                    UpdateProgress(completedBytes);
                }
            }
        }

        private async Task<bool> UseVerifiedExistingFileAsync(DownloadAsset asset, CancellationToken token)
        {
            string finalPath = Path.Combine(folderBox.Text, asset.FileName);
            string partialPath = finalPath + ".download";

            if (File.Exists(finalPath))
            {
                FileInfo existing = new FileInfo(finalPath);
                if (existing.Length == asset.Size)
                {
                    statusLabel.Text = "Checking existing " + asset.FileName + "...";
                    detailLabel.Text = "Verifying SHA-256 security checksum.";
                    string hash = await ComputeSha256Async(finalPath, token);
                    if (String.Equals(hash, asset.Sha256, StringComparison.OrdinalIgnoreCase))
                    {
                        return true;
                    }
                }
                File.Delete(finalPath);
            }

            if (File.Exists(partialPath))
            {
                FileInfo partial = new FileInfo(partialPath);
                if (partial.Length > asset.Size)
                {
                    File.Delete(partialPath);
                }
                else if (partial.Length == asset.Size)
                {
                    statusLabel.Text = "Checking completed " + asset.FileName + "...";
                    detailLabel.Text = "Verifying SHA-256 security checksum.";
                    string hash = await ComputeSha256Async(partialPath, token);
                    if (String.Equals(hash, asset.Sha256, StringComparison.OrdinalIgnoreCase))
                    {
                        File.Move(partialPath, finalPath);
                        return true;
                    }
                    File.Delete(partialPath);
                }
            }

            return false;
        }

        private async Task DownloadAndVerifyAssetAsync(
            HttpClient client,
            DownloadAsset asset,
            long completedBytes,
            int assetIndex,
            CancellationToken token)
        {
            string finalPath = Path.Combine(folderBox.Text, asset.FileName);
            string partialPath = finalPath + ".download";

            for (int integrityAttempt = 1; integrityAttempt <= 2; integrityAttempt++)
            {
                await DownloadWithRetriesAsync(
                    client,
                    asset,
                    partialPath,
                    completedBytes,
                    assetIndex,
                    token);

                statusLabel.Text = "Verifying file " + (assetIndex + 1) + " of " + assets.Length + "...";
                detailLabel.Text = asset.FileName + " | SHA-256 security check";
                string hash = await ComputeSha256Async(partialPath, token);
                if (String.Equals(hash, asset.Sha256, StringComparison.OrdinalIgnoreCase))
                {
                    if (File.Exists(finalPath))
                    {
                        File.Delete(finalPath);
                    }
                    File.Move(partialPath, finalPath);
                    return;
                }

                File.Delete(partialPath);
                if (integrityAttempt == 2)
                {
                    throw new InvalidDataException(
                        asset.FileName + " failed its security check twice. Please try again later.");
                }
            }
        }

        private async Task DownloadWithRetriesAsync(
            HttpClient client,
            DownloadAsset asset,
            string partialPath,
            long completedBytes,
            int assetIndex,
            CancellationToken token)
        {
            Exception lastError = null;
            for (int attempt = 1; attempt <= 4; attempt++)
            {
                bool waitBeforeRetry = false;
                token.ThrowIfCancellationRequested();
                try
                {
                    await DownloadFileAsync(
                        client,
                        asset,
                        partialPath,
                        completedBytes,
                        assetIndex,
                        token);
                    return;
                }
                catch (OperationCanceledException)
                {
                    throw;
                }
                catch (Exception ex)
                {
                    lastError = ex;
                    if (attempt == 4)
                    {
                        break;
                    }
                    waitBeforeRetry = true;
                }

                if (waitBeforeRetry)
                {
                    statusLabel.Text = "Connection interrupted. Retrying...";
                    detailLabel.Text = "Attempt " + (attempt + 1) + " of 4. Partial progress was saved.";
                    await Task.Delay(TimeSpan.FromSeconds(attempt * 3), token);
                }
            }

            throw new IOException("Unable to download " + asset.FileName + ". " + lastError.Message, lastError);
        }

        private async Task DownloadFileAsync(
            HttpClient client,
            DownloadAsset asset,
            string partialPath,
            long completedBytes,
            int assetIndex,
            CancellationToken token)
        {
            long existingBytes = File.Exists(partialPath) ? new FileInfo(partialPath).Length : 0L;
            if (existingBytes > asset.Size)
            {
                File.Delete(partialPath);
                existingBytes = 0L;
            }

            string url = ReleaseBase + Uri.EscapeDataString(asset.FileName);
            using (HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, url))
            {
                if (existingBytes > 0L)
                {
                    request.Headers.Range = new RangeHeaderValue(existingBytes, null);
                }

                using (HttpResponseMessage response = await client.SendAsync(
                    request,
                    HttpCompletionOption.ResponseHeadersRead,
                    token))
                {
                    bool append = existingBytes > 0L && response.StatusCode == HttpStatusCode.PartialContent;
                    if (!append && existingBytes > 0L)
                    {
                        existingBytes = 0L;
                    }
                    response.EnsureSuccessStatusCode();

                    FileMode mode = append ? FileMode.OpenOrCreate : FileMode.Create;
                    using (Stream input = await response.Content.ReadAsStreamAsync())
                    using (FileStream output = new FileStream(
                        partialPath,
                        mode,
                        FileAccess.Write,
                        FileShare.None,
                        1024 * 1024,
                        FileOptions.Asynchronous | FileOptions.SequentialScan))
                    {
                        if (append)
                        {
                            output.Position = existingBytes;
                        }

                        byte[] buffer = new byte[1024 * 1024];
                        long fileBytes = existingBytes;
                        long sessionBytes = 0L;
                        Stopwatch timer = Stopwatch.StartNew();
                        int read;
                        while ((read = await input.ReadAsync(buffer, 0, buffer.Length, token)) > 0)
                        {
                            await output.WriteAsync(buffer, 0, read, token);
                            fileBytes += read;
                            sessionBytes += read;
                            UpdateProgress(completedBytes + fileBytes);

                            double seconds = Math.Max(0.1, timer.Elapsed.TotalSeconds);
                            double bytesPerSecond = sessionBytes / seconds;
                            statusLabel.Text = "Downloading file " + (assetIndex + 1) + " of " + assets.Length + "...";
                            detailLabel.Text = asset.FileName + " | " + FormatBytes(fileBytes) + " of " +
                                FormatBytes(asset.Size) + " | " + FormatBytes((long)bytesPerSecond) + "/s";
                        }
                        await output.FlushAsync(token);
                    }
                }
            }

            long finalLength = new FileInfo(partialPath).Length;
            if (finalLength != asset.Size)
            {
                throw new IOException(
                    asset.FileName + " is incomplete. Expected " + asset.Size + " bytes but received " +
                    finalLength + " bytes.");
            }
        }

        private static Task<string> ComputeSha256Async(string path, CancellationToken token)
        {
            return Task.Run(delegate
            {
                token.ThrowIfCancellationRequested();
                using (FileStream stream = new FileStream(
                    path,
                    FileMode.Open,
                    FileAccess.Read,
                    FileShare.Read,
                    1024 * 1024,
                    FileOptions.SequentialScan))
                using (SHA256 sha = SHA256.Create())
                {
                    byte[] hash = sha.ComputeHash(stream);
                    token.ThrowIfCancellationRequested();
                    StringBuilder builder = new StringBuilder(hash.Length * 2);
                    foreach (byte value in hash)
                    {
                        builder.Append(value.ToString("X2"));
                    }
                    return builder.ToString();
                }
            }, token);
        }

        private void UpdateProgress(long bytes)
        {
            long bounded = Math.Max(0L, Math.Min(totalBytes, bytes));
            int percent = totalBytes == 0L ? 100 : (int)((bounded * 100L) / totalBytes);
            percentLabel.Text = percent + "%";
            progressFill.Width = (int)Math.Round(progressTrack.ClientSize.Width * (percent / 100.0));
            progressFill.Height = progressTrack.ClientSize.Height;
        }

        private static string FormatBytes(long bytes)
        {
            string[] units = new string[] { "B", "KB", "MB", "GB", "TB" };
            double value = bytes;
            int unit = 0;
            while (value >= 1024.0 && unit < units.Length - 1)
            {
                value /= 1024.0;
                unit++;
            }
            return value.ToString(unit == 0 ? "0" : "0.00") + " " + units[unit];
        }
    }
}
