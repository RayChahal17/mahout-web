@echo off
setlocal

cd /d "%~dp0"

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0make_share_zip.ps1"
if errorlevel 1 (
  echo.
  echo ERROR: Zip creation failed. Scroll up for the PowerShell error.
  pause
  exit /b 1
)

if not exist "%~dp0mahout-web-src.zip" (
  echo.
  echo ERROR: Script ran but zip was not created.
  pause
  exit /b 1
)

echo.
echo SUCCESS: Upload "mahout-web-src.zip" to ChatGPT.
pause