@echo off
setlocal
title TRUSTed Digital Architecture
cd /d "%~dp0"
set "APP_URL=http://localhost:3023"

echo TRUSTed Digital Architecture
echo Local URL: %APP_URL%

if not exist "node_modules\next\dist\bin\next" (
  echo.
  echo Dependencies are not installed. Run npm install, then try again.
  pause
  exit /b 1
)

powershell -NoProfile -Command "try { $r=Invoke-WebRequest -UseBasicParsing -Uri '%APP_URL%' -TimeoutSec 3; if($r.StatusCode -eq 200 -and $r.Content -match 'TRUSTed') { exit 0 } } catch {}; exit 1"
if %errorlevel% equ 0 (
  echo The correct app is already running.
  start "" "%APP_URL%"
  exit /b 0
)

powershell -NoProfile -Command "if (Get-NetTCPConnection -LocalPort 3023 -State Listen -ErrorAction SilentlyContinue) { exit 0 } else { exit 1 }"
if %errorlevel% equ 0 (
  echo Port 3023 is occupied by another process. No process was stopped.
  echo Close the conflicting app or inspect the port before retrying.
  pause
  exit /b 1
)

echo Starting the development server...
start "TRUSTed Digital Architecture Server" /min cmd /c "cd /d "%~dp0" && npm run dev"

for /l %%i in (1,1,30) do (
  powershell -NoProfile -Command "try { $r=Invoke-WebRequest -UseBasicParsing -Uri '%APP_URL%' -TimeoutSec 2; if($r.StatusCode -eq 200 -and $r.Content -match 'TRUSTed') { exit 0 } } catch {}; exit 1"
  if not errorlevel 1 goto ready
  timeout /t 1 /nobreak >nul
)

echo The app did not respond within 30 seconds.
echo Review the server window for the exact startup error.
pause
exit /b 1

:ready
echo The app is ready at %APP_URL%
start "" "%APP_URL%"
exit /b 0
