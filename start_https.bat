@echo off
setlocal EnableExtensions EnableDelayedExpansion
cd /d "%~dp0"

set "PORT=8000"

echo [1/4] Start Python server on port %PORT% ...
start "bookshelf-server" /min cmd /c "python server.py %PORT%"

echo [2/4] Wait for localhost:%PORT% to be ready ...
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$p=%PORT%; for($i=0;$i -lt 40;$i++){try{if((Test-NetConnection 127.0.0.1 -Port $p -WarningAction SilentlyContinue).TcpTestSucceeded){exit 0}}catch{}; Start-Sleep -Milliseconds 300}; exit 1"
if errorlevel 1 (
  echo [ERROR] Server did not start or port %PORT% is not open.
  echo        Close this window and check Python errors.
  pause
  exit /b 1
)

echo [3/4] Check Tailscale login ...
tailscale status >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Tailscale CLI not available or not logged in.
  echo        Please open Tailscale app and login, then run again.
  pause
  exit /b 1
)

echo [4/4] Configure HTTPS (Tailscale Serve) for port %PORT% ...
REM New simple syntax: expose localhost:%PORT% to tailnet over HTTPS
tailscale serve --bg %PORT%

echo.
echo ===========================
echo Done.
echo Run:  tailscale serve status
echo and open the shown URL (https://<host>.<tailnet>.ts.net)
echo ===========================
echo.
pause
endlocal
