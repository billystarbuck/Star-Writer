@echo off
setlocal
title Star Writer 0.74 Setup
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0Install-Star-Writer-0.74.ps1"
if errorlevel 1 (
  echo.
  echo Star Writer could not be prepared. Read the error above, then press any key to close this window.
  pause >nul
)
endlocal
