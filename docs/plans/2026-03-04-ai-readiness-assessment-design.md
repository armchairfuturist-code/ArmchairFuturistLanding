# AI Readiness Assessment: Design Document

**Date:** 2026-03-04
**Author:** Alex Myers + Claude
**Status:** Approved

## Goals

1. **Reduce friction to first sale.** Shorten the path between curious visitor and $199 purchase or booked strategy call. The quiz qualifies and routes prospects to the right service tier before they ever talk to anyone.
2. **Build authority for AI SEO.** Create crawlable, structured content on permanent URLs that AI systems (GPTBot, ClaudeBot, PerplexityBot) will index and cite when users ask about AI readiness, adoption stalls, or executive AI strategy.

## Approach

Interactive 9-question diagnostic quiz at `/assessment`. No database, no API, no third-party platform. Questions and scoring live in static config files. Results are 4 archetype pages at permanent URLs with JSON-LD structured data. Email capture is a soft gate (optional) between the last question and results.

Maintenance: light touch monthly. Edit a config file and redeploy.

## User Flow

```
Homepage CTA ("Take the AI Readiness Assessment")
  → /assessment (landing + question 1)
    → Q2 → Q3 → ... → Q9
      → Email capture (optional, can skip)
        → /assessment/result/[archetype-slug]
          → Personalized diagnosis + routed CTA
```

Entry points:
- New CTA on homepage (hero or after AboutMe)
- Direct link: thearmchairfuturist.com/assessment
- Shareable result URLs: thearmchairfuturist.com/assessment/result/[slug]

## Scoring Model

3 dimensions, scored silently from answer selections:

| Dimension | What it measures | Service routing |
|-----------|-----------------|-----------------|
| Clarity | How well they understand AI's role in their context | Mentoring ($97-$497) |
| Readiness | Organizational/personal infrastructure to act | $199 Digital Identity or Custom AI ($1K-$5K) |
| Urgency | How much competitive pressure they feel | Strategy Call / AI Infusion Lab |

Each answer adds points to one or more dimensions. Scoring is a pure function: `answers[] -> archetype slug`. Runs client-side, no server calls.

## Questions (9 total)

### Q1: "When someone says 'AI strategy' in a meeting, what's the honest reaction in the room?"
- a) People nod politely and change the subject within five minutes. [Clarity: low, Readiness: low, Urgency: medium]
- b) Two or three people get energized. Everyone else waits it out. [Clarity: medium, Readiness: medium, Urgency: medium]
- c) We've got pilots running, but nobody can explain what they're actually for. [Clarity: low, Readiness: high, Urgency: high]
- d) I'm not in a "meeting" context. I'm figuring this out on my own. [Individual signal]

### Q2: "How do you actually decide which AI tools to use?"
- a) Whoever saw the latest demo gets 20 minutes to make their case. [Clarity: low, Readiness: low]
- b) We have a process on paper. In practice, nobody follows it. [Clarity: medium, Readiness: low]
- c) I try things myself and keep what works. [Individual signal, Clarity: medium]
- d) We evaluate against business outcomes. It's slow but deliberate. [Clarity: high, Readiness: high]

### Q3: "What keeps you up at night about AI?"
- a) I genuinely can't tell what's real from what's hype anymore. [Clarity: low]
- b) I know exactly what we should do, but I can't get anyone to commit. [Clarity: high, Readiness: low, Urgency: high]
- c) We're spending money and I have no way to tell if it's working. [Clarity: medium, Readiness: medium, Urgency: high]
- d) I feel personally behind and I'm not sure how to close the gap. [Individual signal, Clarity: low, Urgency: medium]

### Q4: "How much time per week do you spend trying to keep up with AI?"
- a) Almost none. I stopped trying to track it. [Urgency: low]
- b) An hour or two. Enough to feel informed, not enough to feel confident. [Urgency: medium]
- c) Multiple hours. It's basically a part-time job at this point. [Urgency: high]
- d) It comes in waves. Some weeks I'm obsessive, other weeks I pretend it doesn't exist. [Urgency: medium, Clarity: low]

### Q5: "What have you already tried?"
- a) Bought a few tool subscriptions. Used them for a week. Forgot about them. [Readiness: low, Clarity: low]
- b) Hired a consultant or took a course. Helped in the moment, but the momentum died. [Readiness: medium, Clarity: medium]
- c) Built some internal processes around AI. They work, but they're fragile. [Readiness: high, Clarity: medium]
- d) Not much yet. I've been watching and waiting for the right moment. [Readiness: low, Urgency: low]

### Q6: "If you could fix one thing about how AI gets handled in your world, what would it be?"
- a) People would stop treating it as the IT department's problem. [Readiness: low, Urgency: high]
- b) Leadership would commit real resources instead of running yet another pilot. [Readiness: low, Urgency: high]
- c) We'd have a framework for evaluating opportunities instead of chasing every shiny thing that drops. [Clarity: low, Readiness: medium]
- d) I'd have a clear path for my own professional development with AI. [Individual signal, Readiness: medium]

### Q7: "When it comes to getting outside help with AI, what's your honest take?"
- a) I'd invest real money if I trusted the person and the outcome was specific. [Readiness: high, Urgency: high]
- b) I've been burned by consultants who sold slide decks and disappeared. [Readiness: medium, Clarity: medium]
- c) I'm open to it, but I need to see proof before I write a check. [Readiness: medium, Urgency: medium]
- d) I mostly figure things out myself. I don't love paying for advice. [Individual signal, Readiness: low]

### Q8: "Forget the org chart for a second. How do you personally feel about AI?"
- a) Fascinated but overwhelmed. There's too much coming too fast. [Clarity: low, Urgency: medium]
- b) Cautiously optimistic. I see the potential, but I've been around long enough to know better than to believe the hype. [Clarity: high, Urgency: low]
- c) Frustrated. The gap between knowing it matters and actually doing something about it is wearing me out. [Clarity: high, Readiness: low, Urgency: high]
- d) Honestly? A little threatened. I'm not sure where I fit in five years. [Urgency: high, Clarity: low]

### Q9: "What would make the next 90 days feel like a win?"
- a) A clear AI strategy my team actually follows through on. [Executive, Readiness: medium, Urgency: high]
- b) One AI initiative delivering results I can point to and measure. [Executive, Readiness: high, Urgency: high]
- c) I'd stop feeling like I'm falling behind everyone else. [Individual, Clarity: low, Urgency: medium]
- d) A professional identity that reflects where the world is heading, not where it was. [Individual, routes to $199]

## Archetypes (Result Pages)

### 1. The Stalled Executive (`/assessment/result/stalled-executive`)
- **Profile:** High urgency, low clarity, low readiness
- **Headline:** "You know AI matters. Your organization doesn't move."
- **Diagnosis:** Reflects their answers back. Names the pattern: leadership sees the wave coming, middle management is frozen, pilots die in committee. The problem isn't technology. It's organizational inertia disguised as due diligence.
- **Primary CTA:** Book a Strategy Call (calendar)
- **Secondary CTA:** Read how I work with executive teams (services anchor)

### 2. The Curious Professional (`/assessment/result/curious-professional`)
- **Profile:** Low urgency, low-medium clarity, exploring
- **Headline:** "You're interested but you haven't committed to a direction yet."
- **Diagnosis:** The most common profile. Reading newsletters, watching demos, trying a few tools. No framework connecting the dots. The overwhelm comes from consuming without a filter.
- **Primary CTA:** Start with AI Mentoring ($97-$497)
- **Secondary CTA:** Get the weekly newsletter (Substack)

### 3. The Ready Builder (`/assessment/result/ready-builder`)
- **Profile:** Medium urgency, high clarity, high readiness
- **Headline:** "You know what you need. You need someone to build it."
- **Diagnosis:** They've done the thinking. They have a vision. What's missing is execution capacity or a specific deliverable to crystallize it. They don't need more strategy; they need a thing in their hands.
- **Primary CTA:** Claim Your $199 Digital Identity Page (Google Form)
- **Secondary CTA:** Explore Custom AI Solutions ($1K-$5K)

### 4. The Overwhelmed Leader (`/assessment/result/overwhelmed-leader`)
- **Profile:** High urgency, high clarity, low readiness
- **Headline:** "You see it clearly. Your organization is frozen."
- **Diagnosis:** They're not confused about AI. They're stuck in an organization that can't metabolize change. The bottleneck is cultural, not technical. This is transformation work, not tool selection.
- **Primary CTA:** Book a Strategy Call (calendar, framed as "Let's talk about unfreezing your org")
- **Secondary CTA:** Learn about the AI Infusion Lab ($38K-$55K)

## SEO Architecture

### Per result page:
- Unique meta title: "AI Readiness: [Archetype Name] | The Armchair Futurist"
- Unique meta description matching the archetype
- OG image (shareable, shows archetype + score visual)
- JSON-LD FAQPage schema with 3 Q&A pairs per archetype:
  - "What does it mean if my AI readiness score shows [archetype]?"
  - "How can [persona] improve their AI strategy?"
  - "What services help with [core problem]?"

### Assessment landing page:
- JSON-LD Quiz schema
- Meta: "AI Readiness Assessment | The Armchair Futurist"

### Sitemap additions:
- /assessment (priority: 0.8, weekly)
- /assessment/result/stalled-executive (priority: 0.7, monthly)
- /assessment/result/curious-professional (priority: 0.7, monthly)
- /assessment/result/ready-builder (priority: 0.7, monthly)
- /assessment/result/overwhelmed-leader (priority: 0.7, monthly)

### robots.txt:
No changes needed. All AI crawlers already allowed.

## Technical Architecture

### File Structure
```
src/lib/assessment/
  config.ts          -- Questions, answers, scoring weights
  archetypes.ts      -- Archetype definitions, thresholds, copy
  scoring.ts         -- Pure function: answers[] -> archetype slug

src/components/assessment/
  QuizLanding.tsx     -- Hero + "Start Assessment" CTA
  QuizQuestion.tsx    -- Single question card with animated transitions
  QuizProgress.tsx    -- Progress bar (question X of 9)
  EmailCapture.tsx    -- Optional email gate before results
  ResultPage.tsx      -- Archetype result layout (score viz, diagnosis, CTAs)
  ScoreChart.tsx      -- Horizontal bar chart (Clarity / Readiness / Urgency)

src/app/assessment/
  page.tsx            -- Quiz flow (landing -> questions -> email -> redirect)
  result/[slug]/
    page.tsx          -- Result page with generateStaticParams for 4 archetypes
```

### Key decisions:
- Static generation (SSG) via generateStaticParams for result pages
- Client-side scoring, no API routes
- Same Substack redirect pattern for email capture
- Same analytics utilities (trackConversion, trackEvent)
- Same design tokens and component patterns as rest of site

### Analytics events:
- `assessment_start` -- first question viewed
- `assessment_question_N` -- each question answered (for drop-off analysis)
- `assessment_email_capture` -- email provided
- `assessment_email_skip` -- email skipped
- `assessment_complete` with `{ archetype }` -- result page viewed (conversion event)

### What we're NOT building:
- No database or user accounts
- No saving progress (3-4 min quiz, no need)
- No admin panel (edit config files, redeploy)
- No API routes
- No third-party quiz platform
- No PDF generation

## Homepage Integration

Add a CTA linking to `/assessment`. Placement options (in order of recommendation):
1. After AboutMeSection (visitor has context on who Alex is, natural next step is "assess yourself")
2. In HeroSection as a tertiary CTA
3. Both

## Not In Scope

- Blog/content pages (separate initiative)
- A/B testing framework
- Multi-language support
- Mobile app

---

*Prepared by Claude during brainstorming session, 2026-03-04*
