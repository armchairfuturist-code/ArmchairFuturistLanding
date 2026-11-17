# Cloudflare Workers migration

Status: spike branch `migration/cloudflare-workers`. Verified locally on workerd,
not deployed. The site is untouched on Firebase.

## Why

Cloudflare serves site pages while Firebase continues to handle every `/api`
request. `cloudflare/api-proxy.mjs` forwards the path, query, method, headers,
and body to the direct Firebase App Hosting origin. This avoids a loop when
the public domain moves. The existing Firebase deployment must stay active.

Static assets can bypass the Worker; dynamic requests and API proxy requests
use Worker invocations. Check actual usage and caching after deployment.

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

## Hybrid deployment gates

1. Authenticate Wrangler to the intended Cloudflare account and verify its plan.
2. Deploy a preview with `npm run cf:build` and `npx wrangler deploy`; check
   pages, security headers, cache behavior and API responses on its Worker URL.
3. Keep Firebase App Hosting, its secrets, deployment workflow, and existing
   cron caller active. The Cloudflare proxy does not need Firebase secrets.
4. Set up a Cloudflare deployment workflow alongside Firebase. Confirm both
   deploy the same commit before changing production traffic.
5. Plan and verify the domain and DNS cutover; retain Firebase for rollback.

Local hybrid checks: `/` returned 200, an invalid contact POST returned 400,
unauthorized cron returned 401, and `/api/substack` returned 200. These do not
prove authenticated writes, email delivery, cron execution, or production DNS.

## Later: migrate APIs

Replace Firebase Admin with a workerd-compatible data layer, then move API
routes incrementally. Update the proxy routing and tests for each route.
Migrate secrets and cron only when their routes move. Verify writes and email
delivery before retiring Firebase.
