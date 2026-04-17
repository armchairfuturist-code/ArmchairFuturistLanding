# Site Cleanup & Fixes Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix validated issues from the site analysis — repo hygiene, dead code removal, motion package consolidation, hardcoded config extraction, SEO schema additions, and email capture UX fix.

**Architecture:** Incremental fixes, each committed independently. No structural refactors (RSC conversion deferred). Changes are safe, reversible, and testable with `npm run build`.

**Tech Stack:** Next.js 15, TypeScript, Tailwind, motion (framer-motion successor)

---

### Task 1: Gitignore cleanup + remove committed artifacts

**Files:**
- Modify: `.gitignore`
- Delete (git rm): `.dev-server.log`, `.dev-server-3001.log` (if exists), `.modified`, `public/README.md`

**Step 1: Update .gitignore**

Add these lines after the existing debug section (after line 31):

```
.dev-server*.log
.modified
```

**Step 2: Remove committed artifacts from tracking**

Run:
```bash
git rm --cached .dev-server.log .modified public/README.md
git rm --cached .dev-server-3001.log 2>/dev/null || true
```

Note: `.dev-server-3001.log` may or may not exist — use `|| true` to skip if missing.

**Step 3: Verify**

Run: `git status`
Expected: `.gitignore` modified, 3-4 files deleted from tracking.

**Step 4: Commit**

```bash
git add .gitignore
git commit -m "chore: gitignore cleanup — remove committed log files, .modified, public/README.md"
```

---

### Task 2: Move GA4 Measurement ID to env var + add og:locale

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `.env.example`

**Step 1: Add GA4 ID to .env.example**

Add this line at the end of `.env.example`:

```
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-18FCVPH408
```

**Step 2: Update layout.tsx — replace hardcoded GA4 ID**

In `src/app/layout.tsx`, replace line 77:
```tsx
src="https://www.googletagmanager.com/gtag/js?id=G-18FCVPH408"
```
with:
```tsx
src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID}`}
```

Replace line 87:
```tsx
gtag('config', 'G-18FCVPH408');
```
with:
```tsx
gtag('config', '${process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID}');
```

**IMPORTANT:** Since the GA4 script block uses template literals inside `{``}`, the full Script block (lines 79-89) should become:

```tsx
<Script
  id="google-analytics"
  strategy="afterInteractive"
>
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID}');
  `}
</Script>
```

**Step 3: Add og:locale to metadata**

In `src/app/layout.tsx`, inside the `openGraph` object (after line 57 `type: 'website',`), add:

```tsx
locale: 'en_US',
```

**Step 4: Verify**

Run: `npm run build` (from project root)
Expected: Build succeeds. The GA4 ID resolves from env at build time since it's prefixed with `NEXT_PUBLIC_`.

**Step 5: Commit**

```bash
git add src/app/layout.tsx .env.example
git commit -m "chore: move GA4 ID to env var, add og:locale to metadata"
```

---

### Task 3: Centralize hardcoded URLs into constants

**Files:**
- Create: `src/lib/constants.ts`
- Modify: `src/components/layout/Header.tsx`
- Modify: `src/components/sections/HeroSection.tsx`
- Modify: `src/components/sections/ConnectSection.tsx`
- Modify: `src/components/sections/AIMentoringSection.tsx`
- Modify: `src/components/sections/WhyWorkWithMeSection.tsx`
- Modify: `src/components/sections/ServicesSection.tsx`

**Step 1: Create constants file**

Create `src/lib/constants.ts`:

```typescript
export const CALENDAR_URL = 'https://calendar.app.google/nAHHwNMfhDvXGv7P7';
export const GOOGLE_FORM_URL = 'https://forms.gle/ASNfu9Wr1qRLBZ8C8';
export const SUBSTACK_URL = 'https://armchairfuturist.substack.com';
export const SPEAKING_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSe36EU0DrDTMYMsGp32-wD_HlF7M_IPH-IsqpU-hrtJTlPZAg/viewform?usp=header';
```

**Step 2: Update Header.tsx**

Add import at top:
```typescript
import { CALENDAR_URL } from '@/lib/constants';
```

Replace both instances of `"https://calendar.app.google/nAHHwNMfhDvXGv7P7"` (lines 56 and 119) with `{CALENDAR_URL}`.

**Step 3: Update HeroSection.tsx**

Add import:
```typescript
import { CALENDAR_URL } from '@/lib/constants';
```

Replace `"https://calendar.app.google/nAHHwNMfhDvXGv7P7"` (line 108) with `{CALENDAR_URL}`.

**Step 4: Update ConnectSection.tsx**

Add import:
```typescript
import { CALENDAR_URL } from '@/lib/constants';
```

Replace `"https://calendar.app.google/nAHHwNMfhDvXGv7P7"` (line 35) with `{CALENDAR_URL}`.

**Step 5: Update AIMentoringSection.tsx**

Add import:
```typescript
import { CALENDAR_URL } from '@/lib/constants';
```

Replace `"https://calendar.app.google/nAHHwNMfhDvXGv7P7"` (line 74) with `{CALENDAR_URL}`.

**Step 6: Update WhyWorkWithMeSection.tsx**

Add import:
```typescript
import { CALENDAR_URL } from '@/lib/constants';
```

Replace `"https://calendar.app.google/nAHHwNMfhDvXGv7P7"` (line 95) with `{CALENDAR_URL}`.

**Step 7: Update ServicesSection.tsx**

Add import:
```typescript
import { CALENDAR_URL, GOOGLE_FORM_URL } from '@/lib/constants';
```

Replace the 7 `ctaLink` values in `entrepreneurServices` and `organizationServices`:
- Line 55: `ctaLink: "https://forms.gle/ASNfu9Wr1qRLBZ8C8"` → `ctaLink: GOOGLE_FORM_URL`
- Lines 76, 97, 117: `ctaLink: "https://calendar.app.google/nAHHwNMfhDvXGv7P7"` → `ctaLink: CALENDAR_URL`
- Lines 139, 158, 178: same replacement to `CALENDAR_URL`

Also replace the bottom CTA link at line 424:
- `href="https://calendar.app.google/nAHHwNMfhDvXGv7P7"` → `href={CALENDAR_URL}`

**Step 8: Update SpeakingSection.tsx**

Add import:
```typescript
import { SPEAKING_FORM_URL } from '@/lib/constants';
```

Replace `"https://docs.google.com/forms/d/e/1FAIpQLSe36EU0DrDTMYMsGp32-wD_HlF7M_IPH-IsqpU-hrtJTlPZAg/viewform?usp=header"` (line 60) with `{SPEAKING_FORM_URL}`.

**Step 9: Verify**

Run: `npm run build`
Expected: Build succeeds.

**Step 10: Commit**

```bash
git add src/lib/constants.ts src/components/layout/Header.tsx src/components/sections/HeroSection.tsx src/components/sections/ConnectSection.tsx src/components/sections/AIMentoringSection.tsx src/components/sections/WhyWorkWithMeSection.tsx src/components/sections/ServicesSection.tsx src/components/sections/SpeakingSection.tsx
git commit -m "refactor: centralize hardcoded URLs into constants file"
```

---

### Task 4: Remove dead Genkit code and dependencies

**Files:**
- Delete: `src/ai/genkit.ts`
- Delete: `src/ai/dev.ts`
- Delete: `src/ai/` directory (if empty after)
- Modify: `package.json` (remove deps + scripts)

**Step 1: Delete Genkit source files**

```bash
rm -rf src/ai/
```

**Step 2: Remove Genkit dependencies and scripts from package.json**

Remove from `dependencies`:
- `"@genkit-ai/googleai": "^1.8.0"`
- `"@genkit-ai/next": "^1.8.0"`
- `"genkit": "^1.8.0"`
- `"dotenv": "^16.5.0"` (only used by genkit dev.ts)

Remove from `devDependencies`:
- `"genkit-cli": "^1.8.0"`

Remove from `scripts`:
- `"genkit:dev": "genkit start -- tsx src/ai/dev.ts"`
- `"genkit:watch": "genkit start -- tsx --watch src/ai/dev.ts"`

**Step 3: Verify**

Run: `npm run build`
Expected: Build succeeds. No imports of genkit exist in the rest of the codebase.

**Step 4: Commit**

```bash
git add -A src/ai/ package.json
git commit -m "chore: remove dead Genkit code, dependencies, and scripts"
```

---

### Task 5: Consolidate motion packages (remove framer-motion, keep motion)

**Files:**
- Modify: `package.json` (remove `framer-motion`)
- Modify: All section files that import from `'framer-motion'` — change to `'motion/react'`
- Modify: `src/components/ui/text-scramble.tsx` (imports `useInView` from `'framer-motion'`)

The `motion` package (^12.34.3) is the official rebrand of `framer-motion`. The UI components already use `motion/react`. Section components still use `framer-motion`.

**Step 1: Update all imports**

Files to update (change `from 'framer-motion'` to `from 'motion/react'`):

1. `src/components/sections/AIMentoringSection.tsx` line 7
2. `src/components/sections/AboutMeSection.tsx` line 7
3. `src/components/sections/ConnectSection.tsx` line 6
4. `src/components/sections/FAQSection.tsx` line 10
5. `src/components/sections/ChallengeSection.tsx` line 4
6. `src/components/sections/EmailCaptureSection.tsx` line 7
7. `src/components/sections/SpeakingSection.tsx` line 7
8. `src/components/sections/ServicesSection.tsx` line 32 — `import { motion, useSpring, useTransform, useMotionValue, AnimatePresence } from 'framer-motion'` → `from 'motion/react'`
9. `src/components/sections/HeroSection.tsx` line 10
10. `src/components/sections/InsightsSection.tsx` line 12
11. `src/components/ui/text-scramble.tsx` line 4 — `import { useInView } from 'framer-motion'` → `from 'motion/react'`

**Step 2: Remove framer-motion from package.json**

Remove from `dependencies`:
- `"framer-motion": "^12.23.26"`

**Step 3: Reinstall dependencies**

Run: `npm install`
Expected: Clean install with no framer-motion.

**Step 4: Verify**

Run: `npm run build`
Expected: Build succeeds. All motion imports resolve from `motion/react`.

**Step 5: Commit**

```bash
git add package.json package-lock.json src/components/sections/ src/components/ui/text-scramble.tsx
git commit -m "refactor: consolidate motion packages — remove framer-motion, use motion/react"
```

---

### Task 6: Add testimonial schema.org markup

**Files:**
- Modify: `src/components/sections/TestimonialsSection.tsx`

**Step 1: Add Review JSON-LD schema**

Add this block just before the closing `</section>` tag (before line 131):

```tsx
{/* Testimonial Reviews JSON-LD Schema */}
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://thearmchairfuturist.com/#org",
      "name": "The Armchair Futurist - Alex Myers",
      "review": testimonialsData.map((t) => ({
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": t.name,
        },
        "reviewBody": t.text,
      })),
    }),
  }}
/>
```

**Step 2: Verify**

Run: `npm run build`
Expected: Build succeeds.

**Step 3: Commit**

```bash
git add src/components/sections/TestimonialsSection.tsx
git commit -m "feat: add Review schema.org markup to testimonials section"
```

---

### Task 7: Remove unused UI components and their Radix dependencies

**Files:**
- Delete: 22 unused UI component files from `src/components/ui/`
- Modify: `package.json` (remove unused Radix deps)

**Unused UI components to delete** (22 files):
```
src/components/ui/alert.tsx
src/components/ui/alert-dialog.tsx
src/components/ui/avatar.tsx
src/components/ui/badge.tsx
src/components/ui/calendar.tsx
src/components/ui/chart.tsx
src/components/ui/checkbox.tsx
src/components/ui/dialog.tsx
src/components/ui/dropdown-menu.tsx
src/components/ui/form.tsx
src/components/ui/input.tsx
src/components/ui/label.tsx
src/components/ui/menubar.tsx
src/components/ui/popover.tsx
src/components/ui/progress.tsx
src/components/ui/radio-group.tsx
src/components/ui/scroll-area.tsx
src/components/ui/select.tsx
src/components/ui/separator.tsx
src/components/ui/sidebar.tsx
src/components/ui/slider.tsx
src/components/ui/switch.tsx
src/components/ui/table.tsx
src/components/ui/textarea.tsx
```

**IMPORTANT pre-check:** Before deleting, verify no section/page/layout files import these. The validation found these are imported ONLY by other unused UI components (form.tsx imports label, sidebar.tsx imports input/separator/skeleton). Sidebar itself is unused.

**WAIT — skeleton.tsx**: skeleton is imported by sidebar.tsx (unused). But verify it's not used elsewhere before deleting.

**Step 1: Verify no imports of these components exist in non-ui source files**

Run:
```bash
grep -r "from.*@/components/ui/\(alert\|avatar\|badge\|calendar\|chart\|checkbox\|dialog\|dropdown\|form\|input\|label\|menubar\|popover\|progress\|radio\|scroll-area\|select\|separator\|sidebar\|slider\|switch\|table\|textarea\)" src/app/ src/components/sections/ src/components/layout/ src/components/analytics/
```

Expected: No matches. If any match, do NOT delete that component.

**Step 2: Delete unused components**

```bash
rm src/components/ui/{alert,alert-dialog,avatar,badge,calendar,chart,checkbox,dialog,dropdown-menu,form,input,label,menubar,popover,progress,radio-group,scroll-area,select,separator,sidebar,slider,switch,table,textarea}.tsx
```

**Step 3: Remove unused Radix dependencies from package.json**

Remove from `dependencies`:
- `"@radix-ui/react-alert-dialog": "^1.1.6"`
- `"@radix-ui/react-avatar": "^1.1.3"`
- `"@radix-ui/react-checkbox": "^1.1.4"`
- `"@radix-ui/react-dialog": "^1.1.6"` — **WAIT: check if sheet.tsx depends on dialog**
- `"@radix-ui/react-dropdown-menu": "^2.1.6"`
- `"@radix-ui/react-label": "^2.1.2"`
- `"@radix-ui/react-menubar": "^1.1.6"`
- `"@radix-ui/react-popover": "^1.1.6"`
- `"@radix-ui/react-progress": "^1.1.2"`
- `"@radix-ui/react-radio-group": "^1.2.3"`
- `"@radix-ui/react-scroll-area": "^1.2.3"`
- `"@radix-ui/react-select": "^2.1.6"`
- `"@radix-ui/react-separator": "^1.1.2"`
- `"@radix-ui/react-slider": "^1.2.3"`
- `"@radix-ui/react-switch": "^1.1.3"`
- `"react-day-picker": "^8.10.1"` (used only by calendar.tsx)
- `"@hookform/resolvers": "^4.1.3"` (used only by form.tsx)
- `"react-hook-form": "^7.54.2"` (used only by form.tsx)
- `"zod": "^3.24.2"` (used only by form resolvers)

**IMPORTANT:** Before removing `@radix-ui/react-dialog`, read `src/components/ui/sheet.tsx` — shadcn's Sheet is built on Dialog. If sheet imports from dialog primitives, keep `@radix-ui/react-dialog`.

**Step 4: Reinstall**

Run: `npm install`

**Step 5: Verify**

Run: `npm run build`
Expected: Build succeeds.

**Step 6: Commit**

```bash
git add -A src/components/ui/ package.json package-lock.json
git commit -m "chore: remove 22 unused UI components and their Radix dependencies"
```

---

### Task 8: Fix email capture — replace fake-async with Substack iframe embed

**Files:**
- Modify: `src/components/sections/EmailCaptureSection.tsx`

**Context:** Currently the form does a fake 800ms setTimeout then opens Substack in a new tab. This loses visitors who don't complete signup in the new tab. Replace with an embedded Substack subscribe iframe that captures email directly.

**Step 1: Rewrite EmailCaptureSection.tsx**

Replace the form portion (the right side) with a Substack embed iframe. Keep the left-side value proposition unchanged.

The new right-side content replaces the form with:

```tsx
<div className="relative bg-card rounded-2xl border border-border p-8 shadow-lg overflow-hidden">
  <BorderBeam size={150} duration={10} colorFrom="hsl(208, 100%, 50%)" colorTo="hsl(120, 60%, 50%)" borderWidth={2} />
  <div className="flex items-center gap-2 mb-2">
    <Mail className="h-5 w-5 text-primary" />
    <h3 className="font-heading text-lg font-bold text-foreground">Get it free, instantly</h3>
  </div>
  <p className="text-xs text-muted-foreground mb-4 font-sans">
    Subscribe on Substack — join 500+ leaders getting weekly high-signal AI insights.
  </p>
  <iframe
    src="https://armchairfuturist.substack.com/embed"
    width="100%"
    height="150"
    style={{ border: 'none', background: 'transparent' }}
    frameBorder="0"
    scrolling="no"
    title="Substack subscribe"
  />
  <p className="text-[10px] text-muted-foreground/50 text-center font-mono mt-2">
    No spam. No fluff. Unsubscribe in one click.
  </p>
</div>
```

This removes: `useState`, `FormState` type, `handleSubmit`, `setTimeout`, `window.open`, the custom input/button form.

The component becomes simpler — remove unused imports: `useState`, `Download`, `CheckCircle2`, `Loader2`, `Button`.

Keep: `Mail` (used in heading), `BlurFade`, `BorderBeam`, `motion`.

The full rewritten component:

```tsx
"use client";
import { Mail, Download, CheckCircle2 } from 'lucide-react';
import { BlurFade } from '@/components/ui/blur-fade';
import { BorderBeam } from '@/components/ui/border-beam';
import { motion } from 'motion/react';

const benefits = [
    "10 diagnostic questions to expose your AI accountability gaps",
    "The 3-pillar Trust Quotient framework explained",
    "A prioritized action list to reclaim 10-20 hours a week",
];

export default function EmailCaptureSection() {
    return (
        <section
            id="free-audit"
            className="py-16 md:py-20 bg-gradient-to-br from-primary/5 via-background to-primary/5 border-y border-border/40 scroll-mt-20"
        >
            <motion.div
                className="container mx-auto px-4 md:px-6 max-w-4xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
            >
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    {/* Left - value proposition */}
                    <BlurFade inView>
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono mb-5">
                                <Download className="w-3 h-3" />
                                <span>Free Checklist</span>
                            </div>
                            <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-primary mb-4">
                                The AI Trust Audit Checklist
                            </h2>
                            <p className="text-foreground/70 font-sans leading-relaxed mb-6">
                                Not ready to book a call yet? Get my free diagnostic - 10 questions that expose where your AI stack is creating risk instead of results.
                            </p>
                            <ul className="space-y-3">
                                {benefits.map((benefit) => (
                                    <li key={benefit} className="flex items-start gap-3 text-sm text-foreground/80">
                                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                        <span>{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </BlurFade>

                    {/* Right - Substack embed */}
                    <BlurFade inView delay={0.15}>
                        <div className="relative bg-card rounded-2xl border border-border p-8 shadow-lg overflow-hidden">
                            <BorderBeam size={150} duration={10} colorFrom="hsl(208, 100%, 50%)" colorTo="hsl(120, 60%, 50%)" borderWidth={2} />
                            <div className="flex items-center gap-2 mb-2">
                                <Mail className="h-5 w-5 text-primary" />
                                <h3 className="font-heading text-lg font-bold text-foreground">Get it free, instantly</h3>
                            </div>
                            <p className="text-xs text-muted-foreground mb-4 font-sans">
                                Subscribe on Substack — join 500+ leaders getting weekly high-signal AI insights. Unsubscribe any time.
                            </p>
                            <iframe
                                src="https://armchairfuturist.substack.com/embed"
                                width="100%"
                                height="150"
                                style={{ border: 'none', background: 'transparent' }}
                                frameBorder="0"
                                scrolling="no"
                                title="Subscribe to The Armchair Futurist on Substack"
                            />
                            <p className="text-[10px] text-muted-foreground/50 text-center font-mono mt-2">
                                No spam. No fluff. Unsubscribe in one click.
                            </p>
                        </div>
                    </BlurFade>
                </div>
            </motion.div>
        </section>
    );
}
```

**Step 2: Verify**

Run: `npm run build`
Expected: Build succeeds.

**Step 3: Commit**

```bash
git add src/components/sections/EmailCaptureSection.tsx
git commit -m "fix: replace fake-async email form with Substack embed for direct capture"
```

---

## Deferred Items (not in this plan)

These were validated but require external work or design decisions:

| Item | Reason deferred |
|------|----------------|
| CDN for header.mp4 | Requires external CDN setup (Cloudflare/Bunny/Firebase Hosting) |
| Replace OG image `/floop.jpg` | Requires design work — not a code task |
| RSC conversion (sections) | Moderate risk, modest benefit — separate effort |
| Deployment config / CI | Requires knowing where it deploys — ask user |
| Enable TypeScript strict mode | Would surface unknown number of type errors — separate effort |
| Wire Genkit AI features | Feature work, not a fix |

---

## Execution Order

Tasks 1-6 are independent and can be parallelized. Task 7 (unused UI cleanup) should run after Task 5 (motion consolidation) since package.json changes overlap. Task 8 (email capture) is independent.

Recommended: Run Tasks 1, 2, 3, 4, 5, 6, 8 in parallel, then Task 7 last.
