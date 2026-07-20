# Project Status

Last updated: 2026-07-20

## Product

TRUSTed Digital Architecture is a founder-led public website for premium website architecture, custom software, AI-system planning, automation, integrations, learning platforms, and connected business systems. A grounded AI website assistant is now being added as a public guidance experience.

## Current Phase

AI Assistant MVP

## Active Mission

Founder-Approved Public AI Website Assistant MVP

## Current Milestone

Founder review and OpenAI API quota activation.

## Overall Mission Progress

The local assistant MVP is implemented and verified. A successful live model reply remains blocked by insufficient quota on the selected OpenAI API project.

## Verified Working

- Existing 28-route public website and production-readiness foundation
- `OPENAI_API_KEY` detected in ignored `.env.local` without exposing its value
- Server-only Responses API route with bounded messages, best-effort rate limiting, safe errors, `store: false`, and a pseudonymous safety identifier
- Grounded assistant instructions covering approved services, solutions, products, process, claim limits, and human escalation
- Site-wide accessible assistant widget with appointment-request email handoff
- Assistant privacy, sensitive-data, professional-advice, and appointment disclosures
- Request parsing and guardrail regression tests
- Lint, strict typecheck, 9 tests, production build, all 28 public-route HTTP checks, and desktop/mobile browser checks
- Safe `400` invalid-request and `503` provider-quota responses without key or provider-detail exposure
- Local development server running at `http://localhost:3023`

## In Progress

- Founder review of assistant tone, placement, disclosures, and handoff experience

## Remaining

- Add API billing or quota to the selected OpenAI Platform project, then verify a real assistant response
- Qualified privacy/legal review before production activation
- Founder decision on a calendar provider and booking workflow before appointment confirmation can be automated
- Founder approval before pushing the existing local commits to `main`, configuring the production secret in Vercel, and deploying

## Known Issues

- **Blocking live AI:** OpenAI returns `429 insufficient_quota` for the selected project. The key is recognized, but the project needs available API quota or credits.
- **Expected limitation:** Appointment requests use email; no calendar is connected and no appointment is automatically confirmed.
- **Low:** Contact and website-audit forms remain intentionally non-functional previews.
- **Low:** Two moderate PostCSS advisories remain inherited through Next.js; the suggested forced fix would install an incompatible Next.js version.
- **Review required:** Assistant privacy and terms wording require qualified review before public activation.

## Blockers

The selected OpenAI API project needs available quota or credits before a real assistant reply can be verified. Production activation also requires founder approval, Vercel secret configuration, and privacy review.

## Verification Status

- Lint: pass
- Typecheck: pass
- Tests: pass — 2 files, 9 tests
- Production build: pass — 31 static pages plus dynamic `/api/assistant`
- API validation: safe `insufficient_quota` path verified; successful model reply blocked
- Route smoke: pass — 28/28 public routes returned HTTP 200 with correct branding
- Browser smoke: pass — desktop and 390 x 844 mobile layouts, disclosures, safe error state, no horizontal overflow, and no console warnings/errors

## Local Development

- Run command: `npm run dev`
- Assigned port: `3023`
- Local URL: `http://localhost:3023`
- Required assistant secret: `OPENAI_API_KEY` in ignored `.env.local`
- Launcher: `START_APP.bat` is present; `STOP_APP.bat` stops only a verified project process

## Next Internal Milestone

Add OpenAI API quota or credits, verify a successful grounded reply, complete founder and privacy review, then request production activation approval.
