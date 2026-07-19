# TRUSTed Digital Architecture

Public Next.js marketing website for TRUSTed Digital Architecture, a founder-led digital architecture and software development firm.

## Local development

This project owns port `3023`.

```bash
npm install
npm run dev
```

Open `http://localhost:3023` or double-click `START_APP.bat`. The launcher verifies dependencies and the responding site before opening the browser. `STOP_APP.bat` stops only a verified server for this project.

## Verification

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Public routes

- `/` — homepage
- `/services` and nine service detail pages
- `/solutions` and eight solution detail pages
- `/products`, `/industries`, `/process`, `/about`, `/contact`
- `/website-audit`, `/privacy`, `/terms`

Contact and website-audit forms are explicitly non-functional previews. No authentication, database, payments, external AI provider, API key, or backend service is included.

## Deployment

Vercel uses the repository root, Next.js framework preset, `npm install`, `npm run build`, and the default `.next` output directory. No environment variables or custom-domain changes are required.

## Repository continuity

- `PROJECT_STATUS.md` records current state and verification evidence.
- `BACKLOG.md` contains one active mission and one next ready mission.
- `DECISIONS.md` records founder-approved product and deployment decisions.
- `docs/TRUSTed_Digital_Architecture_Full_Website_Copy_and_Codex_Mission.md` is the current founder-approved website specification.
