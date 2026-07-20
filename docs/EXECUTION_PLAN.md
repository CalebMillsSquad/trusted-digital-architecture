# Execution Plan

Last updated: 2026-07-20

## Active Mission

Founder-Approved Public AI Website Assistant MVP

## Repository Observations

- The website is a statically generated Next.js public site with a shared root layout, making a site-wide assistant widget straightforward without route duplication.
- The founder approved reuse of an existing key in ignored `.env.local`; no secret value was read or displayed.
- Approved public content is already centralized and can ground the assistant without a database or retrieval provider.
- No calendar, CRM, intake storage, or authentication system exists.
- The selected OpenAI API project currently returns `insufficient_quota`, so successful live-response validation requires an account-side quota change.

## Implementation Sequence

1. Verify secret presence and Git exclusion without displaying the value.
2. Add the official OpenAI Node SDK and current Responses API integration.
3. Add bounded request validation, grounded instructions, claim guardrails, rate limiting, no-store behavior, safe identifiers, and safe errors.
4. Add the accessible responsive widget, suggestions, loading/errors, disclosure, and appointment email handoff.
5. Update privacy/terms content and durable repository documentation.
6. Add contract and prompt-guardrail tests.
7. Run lint, strict typecheck, tests, build, API tests, route smoke checks, and responsive browser checks.
8. Leave the local site running and report the exact account and founder decisions needed for production activation.

## Dependencies

- Existing Next.js/React/TypeScript application
- OpenAI Node SDK
- Ignored local `OPENAI_API_KEY`
- OpenAI API quota for successful live-response validation
- Port `3023`

## Risks

- A public endpoint can create unbounded cost; bounded history, output limits, and best-effort rate limiting reduce but do not eliminate abuse risk.
- Serverless in-memory rate limiting is instance-local and is not sufficient for high-volume production protection.
- Assistant messages leave the website for OpenAI processing; clear notice and qualified privacy review are required.
- Model output may be wrong despite grounding, so unsupported claims, high-impact advice, and appointment confirmation must be explicitly prohibited.
- Production needs a separately configured Vercel secret; `.env.local` is local only.

## Validation Plan

- Secret presence and `git check-ignore` without value output
- Request parser and prompt-guardrail unit tests
- Invalid-request and quota-error API tests
- Successful live API response after quota is available
- Lint, strict typecheck, tests, and production build
- Public-route HTTP smoke checks
- Widget open/close, suggestion, submit, error, appointment disclosure, mobile/tablet/desktop reflow, and console checks

## Progress Checklist

- [x] Verify key presence and Git exclusion
- [x] Confirm current OpenAI model and Responses API guidance
- [x] Add server-side assistant route and grounded instructions
- [x] Add responsive accessible assistant widget
- [x] Add privacy/terms and appointment limitations
- [x] Add assistant regression tests
- [x] Complete final automated and production build validation
- [x] Complete route and responsive browser verification
- [ ] Verify a successful model reply after quota is available
- [x] Reconcile final status and founder handoff

## Discovered Issues

- Resolved: Vitest 3.2.4 carried a critical advisory; upgraded to a compatible patched release.
- Blocking live response: the selected OpenAI project returns `429 insufficient_quota`.
- Known: Next.js transitively includes two moderate PostCSS advisories with no safe compatible automated fix.

## Decisions Needed

- Add API quota or credits to the selected OpenAI Platform project.
- Approve privacy/legal wording before production activation.
- Select a real calendar provider and booking rules before automated appointment confirmation.
- Approve Vercel secret configuration and production deployment after review.
