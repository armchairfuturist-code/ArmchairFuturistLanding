# The Armchair Futurist - Landing Page

## Deploy Configuration (configured by /setup-deploy)
- Platform: Firebase App Hosting (Cloud Run)
- Production URL: https://thearmchairfuturist.com
- Deploy workflow: push to `main` triggers the Firebase App Hosting GitHub App (auto-deploy, no manual command)
- Deploy status command: curl -sf https://thearmchairfuturist.com
- Merge method: merge
- Project type: web app (Next.js)
- Post-deploy health check: https://thearmchairfuturist.com

### Custom deploy hooks
- Pre-merge: npm run build (run locally; the App Hosting backend rebuilds in its own pipeline)
- Deploy trigger: git push to `main`
- Deploy status: curl -sf https://thearmchairfuturist.com
- Health check: https://thearmchairfuturist.com

### Deploy Notes
- Firebase App Hosting is **not** regular Firebase Hosting. It is Firebase's Cloud Run-based, next-generation hosting product — it builds a container from `Dockerfile` (Next.js standalone output) and deploys to an App Hosting backend in `us-central1`. The GitHub App listens for pushes to `main` and triggers the build/deploy automatically; no `firebase deploy` is required.
- A build typically takes 2-3 minutes. The `event: dynamic` "Push on main" workflow run that appears in the Actions tab on every push IS the App Hosting build — it is not stuck.
- Do not add a `firebase-hosting-merge.yml` workflow — that action (`FirebaseExtended/action-hosting-deploy`) deploys to the legacy Firebase Hosting product, not App Hosting, and would conflict with the App Hosting pipeline. (See prior cleanup commit `8574a3d` which removed a redundant version of this workflow.)
- The site URL (thearmchairfuturist.com) is a custom domain mapped to the App Hosting backend.
- App Hosting config: `apphosting.yaml` (env vars) and `firebase.json` (the `hosting` block with `frameworksBackend` for the Next.js runtime).

## Project Info
- Framework: Next.js 16 with App Router
- Build command: npm run build
- Dev server: npm run dev (port 9002)
- TypeScript: Enabled
- Styling: Tailwind CSS


## Agent skills

### Issue tracker

Issues and PRDs live as GitHub issues, managed via the GitHub MCP server. See `docs/agents/issue-tracker.md`.

### Triage labels

Uses the five canonical triage roles with default label names. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context layout — one `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.
