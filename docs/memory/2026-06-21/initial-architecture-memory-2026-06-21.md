# Initial Architecture Memory — Armchair Futurist Landing Page

**Date:** 2026-06-21
**Author:** Hermes Agent (initial inspection)

---

## Session Summary

Inspected the ArmchairFuturistLanding repository to capture the initial architecture baseline. This memory entry records tech stack, key decisions, Firebase setup, assessment scoring logic, deployment pipeline, and known gotchas — serving as the single source of truth for future agent sessions.

---

## Tech Stack

| Layer | Technology | Version/Notes |
|---|---|---|
| **Framework** | Next.js 16 (App Router) | `^16.1.6`, Turbopack dev server on port 9002 |
| **UI Renderer** | React 18.3 | `^18.3.1` |
| **Language** | TypeScript | `5.9.3`, strict mode, `@/*` path alias to `./src/*` |
| **Styling** | Tailwind CSS 3 | `^3.4.1`, custom HP color system (electric blue, ink, canvas, cloud, fog, steel) |
| **Component Primitives** | Radix UI | Accordion, Dialog, Slot, Tabs, Toast |
| **Animation** | Motion (Framer Motion fork) | `^12.34.3` |
| **Icons** | Lucide React | `^0.475.0` |
| **CSS Utilities** | class-variance-authority, clsx, tailwind-merge, tailwindcss-animate | |
| **Database** | Firebase Firestore | Collection: `assessment_leads` |
| **Email** | Resend | Transactional emails via REST API |
| **Analytics** | Firebase Analytics + OpenTelemetry | Client-side page view + custom event tracking |
| **Testing** | Vitest 4 + React Testing Library | jsdom env, 8 tests (2 test files) |

---

## Key Architectural Decisions

### 1. Multi-Phase Assessment Flow
The assessment is the core lead-capture mechanism. It implements a 5-phase state machine:

```
Landing → Quiz (9 questions) → Email Capture → Redirecting → Results Page (/assessment/result/[slug])
```

- **State managed client-side** via React `useState` hooks (no Redux/Zustand).
- **Scores passed via URL query params** (`c`, `r`, `u`) for SEO-friendly, shareable results URLs.
- **Answers stored as indices** (not full objects) during the quiz; resolved server-side via `resolve-answers.ts`.
- **Email capture before results** maximizes conversion rates.

### 2. Firebase Auth = Admin Panel Only
- Firebase **Client SDK** (`firebase/app`, `firebase/analytics`) — used only for Firebase Analytics (no auth on the client side).
- Firebase **Admin SDK** (`firebase-admin/app`, `firebase-admin/firestore`) — used server-side in API routes to write to Firestore.
- **Admin panel auth** is a simple password-based session cookie (not Firebase Auth). See `src/lib/admin-session.ts` and `src/app/api/admin/verify/route.ts`.
- Admin password stored in `ADMIN_PASSWORD` env var (server-side only, never `NEXT_PUBLIC_`).

### 3. AI Readiness Scoring
- 3 dimensions scored per answer (0–3 each): **Clarity**, **Readiness**, **Urgency**.
- Normalized to 0–100% per dimension.
- A 4th signal — `individualSignals` (boolean per answer) — biases the archetype toward individual/personal-development profiles.
- Archetypes: `stalled-executive`, `curious-professional`, `ready-builder`, `overwhelmed-leader`.
- Archetype logic in `src/lib/assessment/archetypes.ts` (4 archetypes with diagnosis text, CTAs, FAQs, SEO metadata).

### 4. Email Architecture
- **Two emails per assessment**: prospect result email + Alex notification email.
- HTML templates centralized in `src/lib/email/templates.ts` (previously `src/lib/assessment/email-templates.ts` — **check both locations**).
- Branded email wrapper (colors, header, footer, unsubscribe) via shared utilities.
- **Graceful degradation**: Firestore write failure is logged but does not block email sending; email failure returns error but does not crash the request.

### 5. Deployment: Firebase App Hosting (Cloud Run)
- **Not** legacy Firebase Hosting. Uses `firebase.json` `frameworksBackend` config for Next.js SSR Cloud Function (2nd Gen).
- Auto-deploys on push to `main` via Firebase App Hosting GitHub App — **no manual `firebase deploy` needed in CI**.
- Deploy takes ~3–4 min (Google Cloud Build builds a container image).
- Site URL: `thearmchairfuturist.com` (custom domain). Firebase project ID: `armchair-futurist`.
- **Dockerfile**: Node 20 Alpine, `next build` with `output: "standalone"`, non-root `nextjs` user.
- Secret: `RESEND_API_KEY` via `apphosting.yaml`.

### 6. SEO/Geo Optimizations (recent)
- Last two commits (Jun 19) addressed 16 SEO/GEO gaps: SSR improvements, structured data schemas, metadata, internal linking, sitemap, robots.txt.

---

## Firebase Setup Details

### Client-Side (`src/lib/firebase.ts`)
```ts
const firebaseConfig = {
  apiKey: NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};
```
- Guarded by `isFirebaseConfigured` (checks apiKey + projectId + appId).
- Analytics only initializes in browser (`typeof window !== 'undefined'`).
- Singleton pattern prevents duplicate instances.

### Server-Side (`src/lib/firebase-admin.ts`)
- Lazy-init `Firestore` instance.
- Supports two credential paths:
  1. `FIREBASE_SERVICE_ACCOUNT_KEY` env var (JSON string) — primary.
  2. `applicationDefault()` — fallback for local dev / App Hosting runtime.
- If the JSON env var is malformed, logs a warning and falls back gracefully (does NOT crash).

### Firestore Schema (`assessment_leads`)
```ts
{
  email: string,
  archetypeSlug: string,
  archetypeName: string,
  scores: { clarity: number, readiness: number, urgency: number },
  individualSignals: number,
  createdAt: string (ISO),
  source: "assessment",
}
```

---

## Project Structure (abridged)

```
ArmchairFuturistLanding/
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── assessment/             # Quiz + results pages
│   │   ├── api/                    # API routes
│   │   │   ├── assessment/submit/  # POST — submit quiz, store lead, send emails
│   │   │   └── admin/verify/       # POST/GET/DELETE — admin session auth
│   │   ├── layout.tsx              # Root layout (FirebaseAnalytics included)
│   │   └── page.tsx                # Landing page
│   ├── components/
│   │   ├── assessment/             # QuizQuestion, QuizProgress, EmailCapture, ResultPage, ScoreChart
│   │   ├── sections/               # HeroSection, ServicesSection, etc. (~15 sections)
│   │   ├── layout/                 # Header, Footer
│   │   ├── ui/                     # Button, Card, Accordion, Badge, Tabs, Toast, etc.
│   │   ├── seo/                    # StructuredData
│   │   └── analytics/              # FirebaseAnalytics, TrackingPixels
│   ├── hooks/                      # use-mobile, useFormSubmission, use-toast
│   ├── lib/
│   │   ├── assessment/             # config.ts (questions), scoring.ts, archetypes.ts, resolve-answers.ts
│   │   ├── email/                  # config.ts, templates.ts (formerly assessment/email-templates.ts)
│   │   ├── firebase.ts             # Client Firebase init
│   │   ├── firebase-admin.ts       # Server Firebase init (Firestore)
│   │   ├── resend.ts               # Resend client init
│   │   ├── analytics.ts            # OpenTelemetry + Firebase Analytics events
│   │   ├── email-utils.ts          # Rate limiting, email validation, email wrapper
│   │   └── constants.ts            # Shared constants (CALENDAR_URL, SUBSTACK_URL, etc.)
│   └── test/                       # Vitest setup + polyfills
├── docs/
│   ├── adr/                        # ADR 001 (tech stack), 002 (assessment flow), 003 (email handling)
│   ├── agents/                     # Agent workflow docs
│   └── memory/                     # ← This file
├── public/                         # Static assets
├── firebase.json                   # frameworksBackend config
├── apphosting.yaml                 # Env var secrets
├── Dockerfile                      # Production container
├── next.config.ts                  # standalone output, CSP headers, image remote patterns
└── tailwind.config.ts              # Custom HP color/font/radius system
```

---

## Known Gotchas & Notes

### Deployment
1. **Deploy takes 3–4 minutes** — this is normal. Firebase App Hosting builds a container via Google Cloud Build; do not interrupt.
2. **Firebase site ID is `armchair-futurist`** (not `thearmchairfuturist.com`). Custom domain mapped in Firebase console.
3. **Do NOT add a `firebase-hosting-merge.yml` workflow** — that targets legacy Firebase Hosting and conflicts with App Hosting auto-deploy.
4. **Artifact Registry cleanup** is configured (1-day retention). No `--force` flag needed.

### Firebase & Auth
5. The project does **NOT** use Firebase Authentication for user auth. Admin auth is a cookie-based password check.
6. The `useFormSubmission` hook was recently extracted (commit `230343e`) from 4 duplicated form components — standardize on this hook.
7. **Tracked events**: `assessment_start`, `assessment_question_N`, `email_submitted`, `conversion` — via OpenTelemetry + Firebase Analytics.

### Scoring
8. Max possible score per dimension = `totalQuestions * 3` (27 for 9 questions). Percentages computed as `raw / maxPossible * 100`.
9. Archetype determination first checks `individualSignals >= 4` (individual-focused respondents), then falls through to team/organizational logic.
10. The `resolve-answers.ts` file maps answer indices back to `AnswerOption` objects — used in the API endpoint. Has its own test file.

### Email
11. Sends **TWO** parallel Resend emails per submission. If Resend is down, the API returns a 500 error.
12. From address: `Alex Myers <alex@thearmchairfuturist.com>` (env configurable).
13. `FIREBASE_SERVICE_ACCOUNT_KEY` JSON parsing failures are **non-blocking** — falls back to `applicationDefault()`. This is by design.

### Code & Dependencies
14. React 18.3 is used (not React 19) — Next.js 16 seems compatible with both, but this project pins 18.3.
15. Animation library is `motion` (the Framer Motion v12 successor), not `framer-motion` directly.
16. TypeScript strict mode is enabled — good.
17. The `components.json` file suggests shadcn/ui was used to scaffold some UI components.

---

## Source-of-Truth Documents

| Doc | Path | Covers |
|---|---|---|
| **README.md** | `/README.md` | Full project overview, tech stack, architecture, deployment, env vars |
| **AGENTS.md** | `/AGENTS.md` | Agent workflow, deploy config, project info |
| **ADR 001** | `docs/adr/001-tech-stack.md` | Tech stack rationale (Next.js, Firebase, Radix, Resend) |
| **ADR 002** | `docs/adr/002-assessment-flow.md` | Assessment flow architecture (5-phase state machine) |
| **ADR 003** | `docs/adr/003-email-handling.md` | Email templates, Resend integration, branding |
| **next.config.ts** | `/next.config.ts` | Headers (CSP, HSTS), image remote patterns, standalone output |
| **firebase.json** | `/firebase.json` | Firebase App Hosting framework backend config |
| **Dockerfile** | `/Dockerfile` | Production container build (Node 20, standalone) |
| **tailwind.config.ts** | `/tailwind.config.ts` | Custom design system (HP colors, fonts, radii, animations) |
| **.env.example** | `/.env.example` | Required env vars (Firebase config, Resend key, admin password) |
