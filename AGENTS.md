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
- D1 database `armchair-futurist` (b029b47e-c4e3-4f3d-acd0-57a45ecf8e3b), binding `DB`. Migrations in `cloudflare/migrations/`; CI applies them before every deploy (idempotent, recorded in `d1_migrations`).
- GitHub secret `CLOUDFLARE_API_TOKEN` = the "Armchair Futurist CI deploy" Cloudflare token: Zone.Workers Routes:Edit, Account.Workers Scripts:Edit, Account.D1:Edit (on All accounts).
- PR previews: ci.yml builds and runs `wrangler versions upload --env preview`, then comments a per-PR preview URL. The preview env uses its own D1 (`armchair-futurist-preview`, bea9545f-cc2b-49d7-8e36-3dff68f5248a) and its own Worker `armchair-futurist-preview` on workers.dev. Fork PRs get checks only (no secrets).
- Worker secrets (RESEND_API_KEY, CRON_SECRET, ADMIN_PASSWORD) are set via `wrangler secret put`.
- Cron Trigger `0 9 * * *` calls /api/cron/nudge via the WORKER_SELF_REFERENCE service binding.
- Cloudflare env types are gitignored (`cloudflare-env.d.ts`) because `wrangler types` pollutes globals; `src/lib/d1.ts` carries the local decl instead.
- Firebase is fully gone (2026-11-17): hosting disabled, App Hosting backend deleted, `firebase.json`/`apphosting.yaml`/`.npmrc`/esbuild-devDep removed, `firebase` npm dep dropped (analytics pushes to the GA4 dataLayer only; no gtag/GTM script loads it yet). armchair-futurist.web.app returns 404 by design.
- Google Cloud leftovers (measured 2026-11-17, project `armchair-futurist`, no gcloud installed; read via the firebase-tools OAuth token on `run.googleapis.com`, `cloudfunctions.googleapis.com`, `firestore.googleapis.com`, `storage.googleapis.com`): Cloud Run `ssrarmchairfuturist` + Cloud Function v2 of the same name, the `(default)` Firestore database, three buckets (`gcf-v2-sources-*`, `gcf-v2-uploads-*`, `run-sources-armchair-futurist-us-west1`), the Firebase Hosting site record, one Firebase web app record. Nothing on the live site reads any of them.
- The same GCP project also runs `nervous-system-quiz` (Cloud Run, us-west1, image `us-west1-docker.pkg.dev/armchair-futurist/cloud-run-source-deploy/nervous-system-quiz`). An unrelated app. Do not delete the project without moving or accepting the loss of it.
- Leftover App Hosting rollout trigger deleted 2026-11-17: it was a **global** Cloud Build trigger (`projects/armchair-futurist/triggers/79081717-8d6d-493b-b501-76440e8d40ec`, "Build and deploy to Cloud Run service studio on push to ^main$"). Every push to `main` fired a failing build. Region-scoped trigger lists report none; list at `.../v1/projects/PROJECT/triggers`. Confirmed gone: the next push produced no build. The GitHub secret `FIREBASE_SERVICE_ACCOUNT_ARMCHAIR_FUTURIST` was deleted; no workflow referenced it.
- Billing: zone plan is `Free Website`; Workers + D1 sit on the free tier (100k req/day, 10 ms CPU, D1 500 MB/db). Measured SSR CPU is p50 6.5 ms, p99 284 ms, so the free 10 ms cap is the binding constraint. Workers Paid is $5/month and needs a payment method at dash.cloudflare.com -> Manage Account -> Billing.
- Migration pitfalls and the exact fixes live in `~/.agents/skills/cloudflare-workers-deploy/SKILL.md`; reuse it for rooted-leader-site.


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
- **Secrets**: wrangler secrets (RESEND_API_KEY, CRON_SECRET, ADMIN_PASSWORD); GitHub secret CLOUDFLARE_API_TOKEN (Workers Routes, Workers Scripts, D1)
- **Deploy time**: ~3 min
- **PR previews**: ci.yml uploads a preview Worker version per PR and comments the URL (preview D1, never prod D1)


## Agent skills

### Issue tracker

Issues and PRDs live as GitHub issues, managed via the GitHub MCP server. External PRs are **not** a triage surface — only issues are triaged. See `docs/agents/issue-tracker.md`.

### Triage labels

Uses the five canonical triage roles with default label names. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context layout — one `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.

## Global behavior

> Output style: see `~/.agents/CODING_STANDARDS.md` — zero preamble, fragments over sentences.
