# Cloudflare Workers migration

Status: spike branch `migration/cloudflare-workers`. Verified locally on workerd,
not deployed. The site is untouched on Firebase.

## Why

Cloudflare serves prerendered pages from Workers Static Assets, so a page view
costs no Worker invocation and no egress. At 3-4 visitors a day the site fits
the Workers free plan, and the CDN answers `s-maxage` where Firebase App
Hosting answers `no-store`.

## Verified locally

`npx opennextjs-cloudflare build` then `npx wrangler dev --port 8801 --local`
served every static route, `/sitemap.xml`, `/robots.txt`, `/llms.txt`,
`/llms-full.txt`, `/opengraph-image`, `/assessment/result/[slug]` and
`/api/substack` with 200s. Security headers from `next.config.ts` reach the
static HTML through the generated `_headers` file.

Worker bundle: 2.58 MiB gzipped against the free plan's 3 MiB limit.

## Blockers

`firebase-admin` cannot run on workerd. Loading it fails with
`EvalError: Code generation from strings disallowed for this context`. The
bundle inlines `@google-cloud/firestore`, which pulls in gRPC and protobufjs
code generation, and `preferRest` cannot avoid a load-time import. Six routes
plus the cron endpoint depend on it: the Firestore surface is `get`, `set`,
`update`, `delete`, `add`, `where`, `orderBy`, `limit`, and one
`runTransaction`.

The image optimizer needs the Cloudflare Images binding, a paid add-on, so
`next.config.ts` sets `images.unoptimized`. Originals are served instead of
width variants.

## Deployment gates

1. Cloudflare account auth (`wrangler login` or `CLOUDFLARE_API_TOKEN`).
2. Worker secrets: `RESEND_API_KEY`, `CRON_SECRET`, `ADMIN_PASSWORD`,
   `FIREBASE_SERVICE_ACCOUNT_KEY` (or the REST client's credentials).
3. A Cron Trigger for `/api/cron/nudge` to replace the external pinger.
4. DNS: the domain sits on Namecheap nameservers. Moving to Cloudflare is
   the step that also buys the caching.
5. `.github/workflows/deploy.yml` deploys with `wrangler deploy` instead of
   the Firebase action.

## Fork to settle

A. Replace `firebase-admin` with a Firestore REST client built on `fetch` and
   a WebCrypto-signed service-account JWT. Removes the dependency, shrinks the
   bundle, and lets the Worker own every route.

B. Keep the API routes on Firebase and move only the front door to
   Cloudflare. No data layer rewrite, keeps the Cloud Run bill.
