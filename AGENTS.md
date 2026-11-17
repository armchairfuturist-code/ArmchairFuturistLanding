# The Armchair Futurist - Landing Page

## Deploy Configuration
- Platform: Cloudflare Workers (OpenNext), D1 (SQLite) for data
- Production URL: https://thearmchairfuturist.com
- Deploy workflow: push to `main` (`.github/workflows/deploy-cloudflare.yml`) — auto-deploy, ~3 min
- Deploy status command: curl -sf https://thearmchairfuturist.com
- Merge method: merge
- Project type: web app (Next.js)
- Post-deploy health check: https://thearmchairfuturist.com

### Deploy Notes (Cloudflare, migrated 2026-11-17)
- `npm run cf:build` (OpenNext) then `wrangler deploy`; routes on thearmchairfuturist.com and www via the zone's Worker routes.
- Worker: `armchair-futurist`, account `86a92d3f5ed4b3313381515ca4208ae7` (wrangler needs `CLOUDFLARE_ACCOUNT_ID` set — the login has two accounts).
- D1 database `armchair-futurist` (b029b47e-c4e3-4f3d-acd0-57a45ecf8e3b), binding `DB`. Migrations in `cloudflare/migrations/`.
- D1 migrations are NOT in the deploy workflow: the CI token (CLOUDFLARE_API_TOKEN) has only Workers Scripts + Routes. Apply manually after schema changes: `npx wrangler d1 migrations apply armchair-futurist --remote` (or the `d1-migrations.yml` workflow, which needs a CLOUDFLARE_D1_TOKEN secret with Workers D1:Edit — not yet created).
- Worker secrets (RESEND_API_KEY, CRON_SECRET, ADMIN_PASSWORD) are set via `wrangler secret put`.
- Cron Trigger `0 9 * * *` calls /api/cron/nudge via the WORKER_SELF_REFERENCE service binding.
- Cloudflare env types are gitignored (`cloudflare-env.d.ts`) because `wrangler types` pollutes globals; `src/lib/d1.ts` carries the local decl instead.
- The `firebase` npm dep remains only for client analytics (FirebaseAnalytics); firebase-admin is gone. armchair-futurist.web.app still serves a stale Firebase copy — ignore it.
- History: the site ran on Firebase Hosting/App Hosting until 2026-11-17. esbuild-devDep and .npmrc legacy-peer-deps were Firebase-deploy workarounds; keep them until firebase is dropped from deps.

## Project Info
- Framework: Next.js 16 with App Router
- Build command: npm run build
- Dev server: npm run dev (port 9002)
- TypeScript: Enabled
- Styling: Tailwind CSS

## Deploy

- **Platform**: Cloudflare Workers (OpenNext) + D1
- **Trigger**: Push to `main` (via `.github/workflows/deploy-cloudflare.yml`)
- **Domain**: thearmchairfuturist.com
- **Secrets**: wrangler secrets (RESEND_API_KEY, CRON_SECRET, ADMIN_PASSWORD); GitHub secret CLOUDFLARE_API_TOKEN (Workers Scripts + Routes only)
- **Deploy time**: ~3 min
- **PR previews**: none (CI runs lint/test/build only)


## Agent skills

### Issue tracker

Issues and PRDs live as GitHub issues, managed via the GitHub MCP server. External PRs are **not** a triage surface — only issues are triaged. See `docs/agents/issue-tracker.md`.

### Triage labels

Uses the five canonical triage roles with default label names. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context layout — one `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.

## Global behavior

> Output style: see `~/.agents/CODING_STANDARDS.md` — zero preamble, fragments over sentences.
