# Active Mission

Status: Blocked — local implementation and verification are complete; live OpenAI response validation awaits API quota

## Mission Title

Founder-Approved Public AI Website Assistant MVP

## Mission Objective

Add a secure, accessible website assistant that answers questions from approved TRUSTed Digital Architecture content, guides visitors to the right service or solution, and provides an honest appointment-request handoff without claiming calendar booking exists.

## Product Context

Visitors may arrive without knowing which capability fits their needs. A grounded assistant can explain TRUSTed services, solutions, process, product statuses, and next steps while preserving the premium public-site experience and directing uncertain or sensitive questions to a human.

## Approved Scope

- Reuse the founder-approved `OPENAI_API_KEY` from ignored `.env.local`.
- Add a server-only OpenAI Responses API route with input validation, bounded history, best-effort rate limiting, safe errors, and no website database.
- Ground responses in approved public website content and claim guardrails.
- Add an accessible, responsive assistant widget to every public page.
- Provide an appointment-request email handoff and state that appointments remain unconfirmed until a human responds.
- Add assistant-specific privacy and terms disclosures.
- Add regression tests and complete local build, API, route, and browser validation.

## Out of Scope

- A live calendar connection or automated appointment confirmation
- Database-backed conversation storage, CRM writes, uploads, authentication, payments, or private-app workflows
- Autonomous external actions or tool execution
- Sensitive-data intake or professional legal, medical, financial, safety, or compliance advice
- Production deployment, Vercel environment configuration, or public activation without founder approval

## Milestones

1. **Credential and provider foundation — Complete**
   - Verify the key exists without displaying it.
   - Verify `.env.local` is excluded from Git.
   - Confirm the current supported Responses API and model guidance.
2. **Grounded server-side assistant — Complete**
   - Validate and bound requests.
   - Keep the API key server-only and disable OpenAI response storage.
   - Add approved knowledge, safety boundaries, rate limiting, and safe provider-error handling.
3. **Accessible website experience — Complete**
   - Add the site-wide assistant launcher, conversation panel, suggestions, loading state, errors, and appointment email handoff.
   - Preserve responsive reflow, keyboard semantics, visible focus, and reduced motion.
4. **Privacy, reliability, and regression coverage — Complete**
   - Add clear in-product data and appointment limitations.
   - Update privacy and terms disclosures.
   - Add request-contract and assistant-guardrail tests.
5. **Validation and founder review — Blocked by API quota**
   - Lint, strict typecheck, tests, production build, route smoke checks, and desktop/mobile browser checks pass.
   - Invalid requests and the provider-quota path fail safely without exposing secrets or provider details.
   - A real model response must still be confirmed after API quota is available.

## Acceptance Criteria

- The API key is never exposed to client code, logs, Git, or user-visible errors.
- `.env.local` is ignored and `.env.example` contains only a blank variable placeholder.
- The assistant is available across public pages and is usable at mobile, tablet, and desktop widths.
- Responses are grounded in approved TRUSTed content and refuse unsupported claims.
- Conversation history is bounded and is not written to a website database or browser storage.
- Visitors receive transparent OpenAI-processing and sensitive-data notices.
- Appointment requests use a human email handoff and are never described as confirmed.
- Invalid, oversized, rate-limited, missing-configuration, provider-quota, and provider-failure paths return safe errors.
- Lint, strict typecheck, tests, production build, HTTP smoke checks, and browser console checks pass.
- A real OpenAI response is verified after the selected API project has available quota.
- The local site is running at `http://localhost:3023`.

## Validation Requirements

- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm run build`
- API validation and live-response smoke tests
- Public-route HTTP smoke checks
- Mobile, tablet, and desktop assistant browser checks
- Browser console error review
- Secret-exclusion and Git worktree review

## Stop Conditions

Codex may stop only when all acceptance criteria are satisfied, a genuine technical or account blocker prevents progress, a founder decision is required, or continuing would create an unapproved privacy, legal, cost, calendar-integration, or deployment risk.

## Completion Report

Report only:

1. Completed
2. Verification
3. Founder Review
4. Remaining Limitations
5. Next Mission Recommendation
