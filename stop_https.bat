@echo off
cd /d "%~dp0"

echo Reset Tailscale Serve config...
tailscale serve reset

echo Done.
pause
