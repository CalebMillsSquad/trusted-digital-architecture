@echo off
setlocal
title Stop TRUSTed Digital Architecture
cd /d "%~dp0"

powershell -NoProfile -Command "$root=[regex]::Escape((Resolve-Path '.').Path); $connections=Get-NetTCPConnection -LocalPort 3023 -State Listen -ErrorAction SilentlyContinue; if(-not $connections){Write-Host 'TRUSTed Digital Architecture is not running on port 3023.'; exit 0}; foreach($connection in $connections){$process=Get-CimInstance Win32_Process -Filter ('ProcessId=' + $connection.OwningProcess); if($process.CommandLine -match $root -and $process.CommandLine -match 'next'){Stop-Process -Id $connection.OwningProcess; Write-Host 'Stopped the verified TRUSTed Digital Architecture server.'} else {Write-Host 'Port 3023 belongs to another process. Nothing was stopped.'; exit 1}}"
if errorlevel 1 pause
