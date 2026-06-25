# The Armchair Futurist - Landing Page

## Deploy Configuration (configured by /setup-deploy)
- Platform: Firebase Hosting
- Production URL: https://thearmchairfuturist.com
- Deploy workflow: `firebase deploy` (manual trigger - takes ~3-4 min)
- Deploy status command: curl -sf https://thearmchairfuturist.com
- Merge method: merge
- Project type: web app (Next.js)
- Post-deploy health check: https://thearmchairfuturist.com

### Custom deploy hooks
- Pre-merge: npm run build
- Deploy trigger: firebase deploy --only hosting
- Deploy status: curl -sf https://thearmchairfuturist.com
- Health check: https://thearmchairfuturist.com

### Deploy Notes
- `firebase deploy --only hosting` still deploys the SSR Cloud Function (firebase.json uses frameworksBackend for Next.js). This step takes ~200s because Google Cloud Build builds a container image for the 2nd Gen Cloud Function. The deploy is not stuck — it just takes 3-4 minutes. Do not interrupt it.
- The site URL (thearmchairfuturist.com) uses a custom domain. The Firebase site ID is `armchair-futurist`, not `thearmchairfuturist`.
- Artifact Registry cleanup policy is configured (1-day retention). No `--force` flag needed.

## Project Info
- Framework: Next.js 16 with App Router
- Build command: npm run build
- Dev server: npm run dev (port 9002)
- TypeScript: Enabled
- Styling: Tailwind CSS

## Deploy

- **Platform**: Firebase Hosting with App Hosting (SSR Cloud Function, `us-central1`)
- **Trigger**: Push to `main` (via `.github/workflows/deploy.yml`)
- **Domain**: thearmchairfuturist.com
- **Firebase project**: `armchair-futurist`
- **Secrets**: Firebase service account (`FIREBASE_SERVICE_ACCOUNT_ARMCHAIR_FUTURIST`), `RESEND_API_KEY` (via `apphosting.yaml`)
- **Deploy time**: ~3-4 min (Google Cloud Build builds a container image for the 2nd Gen Cloud Function — do not interrupt)
- **PR previews**: built-in via `FirebaseExtended/action-hosting-deploy@v0`


## Agent skills

### Issue tracker

Issues and PRDs live as GitHub issues, managed via the GitHub MCP server. External PRs are **not** a triage surface — only issues are triaged. See `docs/agents/issue-tracker.md`.

### Triage labels

Uses the five canonical triage roles with default label names. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context layout — one `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.
