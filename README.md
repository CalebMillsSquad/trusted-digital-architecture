# TRUSTed Digital Architecture

Public marketing website for TRUSTed Digital Architecture, a founder-led digital architecture and software development firm. The site presents website architecture, custom software, AI-system planning, automation, integrations, learning platforms, and connected business systems without claiming unfinished products or integrations are live.

## Maturity

AI Assistant MVP phase. The approved public information architecture and production-readiness foundation are implemented; the current mission adds a grounded site-wide assistant with an honest appointment-request handoff.

## Technology

- Next.js 15 App Router
- React 19
- TypeScript
- CSS visual system with no runtime UI dependency
- ESLint and Next.js Core Web Vitals rules
- Vitest content and route contracts
- OpenAI Responses API through the official server-side Node SDK
- Vercel deployment using standard Next.js output

## Requirements

- Node.js 20 or another Next.js 15-compatible supported Node.js release
- npm
- Port `3023` available for local development

The website itself requires no database. The AI assistant requires `OPENAI_API_KEY` in ignored `.env.local`. Copy `.env.example` to `.env.local` and supply the key securely; never commit or expose it to browser code.

## Install and run

```bash
npm install
npm run dev
```

Open `http://localhost:3023`.

On Windows, double-click `START_APP.bat`. The launcher opens this repository, checks that dependencies exist, refuses to stop a conflicting process, starts the development server on port `3023`, verifies the responding TRUSTed site, and opens the local URL. `STOP_APP.bat` stops only a Next.js process verified to belong to this repository.

## Commands

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm start
```

`npm start` serves the production build on port `3023`.

## Public routes

- `/`
- `/services` plus nine service detail pages
- `/solutions` plus eight solution detail pages
- `/products`
- `/industries`
- `/process`
- `/about`
- `/contact`
- `/website-audit`
- `/privacy`
- `/terms`

Contact and website-audit forms are explicitly non-functional previews. Authentication, databases, payments, uploads, backend services, and live external integrations are outside the current product boundary.

## AI website assistant

The site-wide assistant calls `/api/assistant`, which uses the OpenAI Responses API on the server. It is grounded in approved website content, bounds conversation length, limits response size, uses best-effort instance-local rate limiting, sends a pseudonymous safety identifier, and sets `store: false`.

The website does not write chat transcripts to a database or browser storage. Messages are sent to OpenAI for processing, so visitors are instructed not to submit sensitive or confidential information. Appointment requests use a pre-addressed email handoff; no appointment is confirmed until a human responds, and no calendar integration is currently connected.

For a production deployment, configure `OPENAI_API_KEY` in Vercel through an approved secure workflow. The local `.env.local` file is not deployed.

## Repository structure

- `app/` — App Router layout, homepage, catch-all public route, and styles
- `components/` — shared site shell and editorial page renderer
- `lib/site-content.ts` — centralized typed navigation and page content
- `tests/` — route and content regression tests
- `docs/` — founder-approved specification and living execution plan
- `AGENTS.md` — permanent autonomous operating contract
- `MISSION.md` — one active product-quality mission
- `PROJECT_STATUS.md` — current verified state
- `BACKLOG.md` — ordered roadmap
- `DECISIONS.md` — founder-approved decisions

## Operating workflow

Future sessions begin by reading `AGENTS.md`, `PROJECT_STATUS.md`, `MISSION.md`, `DECISIONS.md`, `BACKLOG.md`, `README.md`, and the relevant specification. `docs/EXECUTION_PLAN.md` tracks substantial work within the active mission. Saying “Continue working” resumes the next incomplete milestone without requiring the founder to select routine implementation tasks.

## Deployment

Vercel uses the repository root, Next.js framework preset, `npm install`, `npm run build`, and the default `.next` output directory. No environment variables or custom-domain changes are configured by this repository.

- GitHub: `https://github.com/CalebMillsSquad/trusted-digital-architecture`
- Production: `https://trusted-digital-architecture.vercel.app`
