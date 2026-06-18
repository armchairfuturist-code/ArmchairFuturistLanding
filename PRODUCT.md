# Product

## Register

brand

## Users

Established professionals (consultants, coaches, freelancers, agency owners) who already have clients and existing revenue. They have a professional identity, are already paying for AI tools or experimenting with them, and feel the gap between what AI outputs and what actually gets done inside their business. They hire AI consultants today out of dependency — they want out of that dependency.

Context: time-poor, skeptical of marketing copy, will abandon a page in under five seconds if it reads like every other AI-consultant funnel. Already pay for at least one SaaS AI tool. Have probably been burned by an "AI workshop" that left them with prompts and no judgment.

## Product Purpose

Sell independence from AI consultants, including us. The Armchair Futurist's product is 1:1 AI mastery that builds vendor-agnostic judgment, custom workflows the client can run themselves, and the confidence to build an AI-powered service or personal brand on top of what they learned. Success is measured by how fast the client stops paying us — most are self-sufficient within 8–10 weeks.

Brand promise (verbatim from `docs/synthesis-recommendation.md`):

> We are the last AI consultant you'll ever hire. One-on-one AI mastery that builds your fluency from first principles — not tool tutorials. You'll leave with the judgment to evaluate any AI tool, the skill to build your own workflows, and the confidence to create a service or personal brand around what you've learned. Most clients are self-sufficient within 8-10 weeks. By the time we're done, our job no longer exists.

Conversion surface lives at `thearmchairfuturist.com`: a marketing landing page with 14 modular sections plus an embedded 9-question AI-readiness assessment that captures qualified leads via Firestore and email follow-up via Resend. Stack: Next.js 16 + React 18.3 + `motion/react` (Framer Motion 12) + Tailwind + Radix UI + Firebase App Hosting.

## Brand Personality

Three words: **direct, warm, expert**.

Voice anchors (do not break):

1. **Clarity over hype.** Plain English about what AI actually does and doesn't do.
2. **Trust as the product.** Every interaction proves you can believe us. No upsell trap, no lock-in.
3. **Exit as the goal.** The measure of success is how fast the client can stop paying us.
4. **Capability, not deliverable.** We don't build for you. We build your ability to build.

Reference sites / vibe: HP's white-paper-era enterprise-consumer system (per `DESIGN.md`). Forma DJR Micro geometric sans throughout, HP Electric Blue as the sole signal CTA, near-black ink for headlines, soft 16px photo frames, dark navy customer-story bands, angular blue-chevron decorations nodding to the HP wordmark's slashes. The visual language is confident, restrained, almost editorial — the opposite of the gradient-blob startup template.

Tone constraints: anti-slop (`SLOP-GUIDE.md` is enforced — em-dashes capped at one per paragraph, kill list for "delve / landscape / tapestry / testament / navigate / it's worth noting / first and foremost / in order to / at the end of the day / journey as business metaphor"). Sentence rhythm varied — long then short, fragments for emphasis, occasional sentence starting with "And" or "But".

## Anti-references

Explicitly NOT this:

1. **Generic AI-consultant sites.** Stock-photo teams, buzzword copy ("unlock AI's potential", "navigate the AI landscape"), hero metrics (glowing cards with "+300% productivity"), gradient text, glassmorphism, AI-tells everywhere.
2. **Course-platform look.** Teachable / Kajabi / Skool template — sticky CTAs, course-grid layouts, "join 10,000 students" social proof, fake testimonial cards. Wrong register for 1:1 high-ticket mentoring.
3. **SaaS dashboard aesthetic.** Startup product UI feel — feature-grid landing, product-screenshot hero, "Trusted by engineers at" logo wall. Wrong register for a single practitioner selling expertise.
4. **AI slop in general.** Per the parent impeccable skill's anti-pattern list: AI color palette, gradient text, generic fonts (Inter for everything), bounce easing, redundant copy, three-tier pricing cards with the middle one highlighted, decorative blobs.

## Design Principles

1. **Practice what we preach.** The site itself uses AI-ready patterns (scroll-aware animations, semantic HTML, GEO-optimized schema per `GEO-IMPROVEMENTS.md` scoring 82/100). It's evidence of the founder's craft, not a sales pitch dressed up in his craft.
2. **Show, don't tell.** Case studies and key stats surface quantified results the prospect can verify. The 9-question assessment produces a real score, not a marketing gimmick. Trust is earned through density of fact, not adjectives.
3. **Expert confidence through restraint.** HP-white-paper visual language: one signal color (HP Electric Blue), geometric sans throughout, generous whitespace, no decorative motion. Confidence reads as quiet, not loud.
4. **Exit as goal — design it in.** No dark patterns, no exit-intent popups, no fake countdown timers. The free assessment requires no email to see results. Every funnel step should make the user feel more capable, not more trapped.
5. **Anti-slop enforced.** `SLOP-GUIDE.md` is canonical copy voice. Voice and visual restraint reinforce each other — if the copy sounds like AI and the design looks like AI, the trust signal collapses.

## Accessibility & Inclusion

- WCAG AA target across all 14 marketing sections and the assessment flow.
- `prefers-reduced-motion` respected in hero (`useReducedMotion()` wired into `HeroSection.tsx`) — continue extending to other sections with motion.
- Keyboard navigation verified for assessment quiz, ROI calculator, and accordion/tabs/dialog primitives (Radix UI gives a baseline).
- Color contrast: HP Electric Blue `#024ad8` on white = 7.18:1 (AAA). White on HP deep `#0e3191` = 9.85:1 (AAA). Primary palette already passes — verify secondary (`graphite` `#636363` on white = 5.74:1, passes AA but not AAA; flag for body text usage).
- Form accessibility: email capture and assessment answers must have visible labels, error states, and required-field indicators.
- No assumptions about English fluency — assessment copy is plain English on purpose, not because we expect non-native speakers.