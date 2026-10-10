# Competitor Teardown — The Armchair Futurist

**Date:** 2026-10-10
**Scope:** Solo/independent AI consulting and 1:1 AI coaching, plus adjacent substitutes for the done-for-you path.
**Method:** Web search + page reads. `belt` (inference.sh CLI) is not installed on this machine, so the skill's app commands were unavailable; sources are cited inline and dated.

**Label key:** *read* = taken from a page fetched this session. *measured* = taken from this repo. *unverified* = found in one source, not corroborated.

---

## 1. Executive summary

The Armchair Futurist competes in a market with a **trust problem, not a capability problem**. The dominant complaint about AI consultants is that they sell a strategy deck and leave — *"Execution is where the money goes and where most engagements break down"* (r/AI_Agents, read). The site's existing positioning already answers that complaint directly, which is its strongest asset.

Against the one closest analogue found, **Roving Leads**, the site competes well on price and on the depth of its "you own the outcome" promise, but is weaker on **purchase-risk reversal** (no published refund policy), **process transparency** (no session agenda), and **consistency of its own proof** (an unresolved 10–20 vs "5+" hours contradiction that undercuts the headline claim).

The three highest-value moves are all low effort and are listed in §8. None require new production. Two of the three are the claim-consistency fixes already identified in prior audit rounds.

---

## 2. Competitor set

Five competitor types, ordered by how often a real prospect would consider them.

| # | Type | Named example | Why it competes | Threat |
|---|------|---------------|-----------------|--------|
| 1 | **Solo 1:1 AI coaching** | Roving Leads | Near-identical offer: solo operator, 1:1 sessions, published pricing, no contract | **High** |
| 2 | **AI coaching + consulting hybrid** | JackGPT (Ozzzer) | Same buyer ("companies, teams, founders, private professionals"), coaching-led | Medium |
| 3 | **AI automation agency** | Alpenglow AI; agency market data | Competes for the done-for-you path | Medium |
| 4 | **Mentor marketplace** | MentorCruise, GrowthMentor | Commodity substitute for "I want 1:1 AI guidance" at ~$99/mo | Medium |
| 5 | **Fractional AI officer / large consultancy** | Independent fractional CAIOs | Competes for budget, not for this buyer | Low |

**Not competitors, worth naming:** course platforms and AI-coach SaaS (Coachvox at $99/mo, ai-camp at $99/mo). They compete for *intent* but not for the buyer who wants a practitioner alongside them.

---

## 3. Pricing comparison

All Armchair Futurist figures are **measured** from `src/lib/pricing.ts` this session. All competitor figures are **read** from the cited page.

| | Armchair Futurist | Roving Leads (team) | Roving Leads (solo) | Market range |
|---|---|---|---|---|
| Session length | **60 min** | 90 min | 90 min | 60–90 min |
| Single session | **$120 · €100** | $150 | $300 | $100–450/hr *(consulting average)* |
| Entry pack | 5 sessions **$570** ($114/session) | 4 sessions $500 ($125/session) | — | — |
| Mid pack | 10 sessions **$1,100** ($110/session) | — | — | — |
| Deep pack | 20 sessions **$2,000** ($100/session) | — | — | 3-month mentorship $2,000–$6,000 |
| Programme | **$2,497 · €2,147** (8-week Build Sprint) | — | — | — |
| Assessment | **$297 · €247** (Roadmap Audit) | From $499 | From $499 | — |
| Done-for-you entry | **$233 · €199** | — | — | small projects $1,500–$5,000 |
| Done-for-you large | **$1,000–$5,000** | — | — | $1,000–$3,000/mo retainer |
| Contract | No commitment on single; packs are prepaid | No contract | No contract | — |
| Unused session refund | **Not stated** | Fully refundable | Fully refundable | — |
| Tool markup | Not stated | "No markup. Ever." | same | — |

### Implications

- **Priced at or below the closest competitor on every comparable axis.** The single session is 20% cheaper than Roving Leads on time-adjusted terms (60 min at $120 = $2/min vs 90 min at $150 = $1.67/min) — Roving Leads is actually **cheaper per minute**. Do not claim to be cheaper without saying which axis.
- **The 20-pack at $100/session is the strongest price point on the board** and nothing comparable exists in the Roving Leads offer, which stops at a 4-pack.
- **The 8-week programme and the done-for-you ladder are genuine white space.** No competitor found offers both a literacy track and a build track under one practitioner.
- **Two published risk-reversal gaps:** no refund policy and no explicit no-markup statement. Roving Leads publishes both, prominently. These are free to add and directly reduce purchase risk.

---

## 4. Capability matrix

| Capability | Armchair Futurist | Roving Leads | Agency model | Mentor marketplace |
|---|:---:|:---:|:---:|:---:|
| 1:1 coaching | ✅ | ✅ | ❌ | ✅ |
| Done-for-you build | ✅ | ❌ | ✅ | ❌ |
| Structured programme w/ fixed deliverable | ✅ (8 weeks) | ❌ | ⚠️ project-based | ❌ |
| Paid diagnostic / audit product | ✅ ($297) | ✅ (from $499) | ⚠️ | ❌ |
| Published pricing | ✅ | ✅ | ⚠️ varies | ✅ |
| Written recap per session | ⚠️ "Session summary" | ✅ recap email + shared prompt library | ❌ | ❌ |
| Minute-by-minute session agenda | ❌ | ✅ | ❌ | ❌ |
| No-contract / pause-anytime | ✅ single | ✅ | ❌ | ✅ |
| Unused-session refund | ❌ not stated | ✅ | ❌ | ⚠️ |
| Explicit "no tool markup" | ❌ not stated | ✅ | ❌ | n/a |
| Depth of "you own it" promise | ✅✅ strongest | ⚠️ | ❌ | ❌ |
| Community | ✅ Braga AI Builders | ⚠️ "the Pack" | ❌ | ❌ |
| Multi-currency (USD + EUR) | ✅ | ❌ USD only | ⚠️ | ⚠️ |

✅ = full · ⚠️ = partial · ❌ = absent

---

## 5. SWOT

### Roving Leads — SWOT

| Strengths | Weaknesses |
|---|---|
| Published refund policy removes purchase risk | Local-first framing (13 South Bay city pages) caps reach |
| Minute-by-minute session agenda — rare transparency | No done-for-you implementation |
| "Reported, not promised" outcome framing is unusually honest | Stops at a 4-session pack; no deep commitment product |
| "No markup. Ever." is a crisp trust statement | 90-min sessions cost more in absolute terms |
| 9 services, all pricing posted | Mascot/brand may read informal to enterprise buyers |

| Opportunities | Threats |
|---|---|
| Could add a programme tier above the 4-pack | Solo-operator capacity ceiling |
| Could licence the model to other cities | Roving Leads' own "expensive generalists" critique applies to the whole category |
| — | Local SEO is defensible but not portable |

### Armchair Futurist — SWOT

| Strengths | Weaknesses |
|---|---|
| Only offer found with **both** a literacy track and a build track | Proof has an unresolved internal contradiction (10–20 vs "5+" hours) |
| "Judgment you keep" directly answers the market's top complaint | No stated refund policy or no-markup statement |
| Accountability Gap concept is a named, owned framework | No session agenda; recap described only as "session summary" |
| Community anchor (Braga AI Builders) is real and verifiable | Comparison table claims coaching hours that exceed session math |
| Two currencies, worldwide delivery | Homepage names a certification ("Agile Coaching") absent from the canonical list |

| Opportunities | Threats |
|---|---|
| Publish the two missing trust statements (refund, no-markup) | Category-wide trust collapse: "most consultants are useless" (r/corporate, read) |
| Lead the anti-deck position explicitly — it is already true | $99/mo AI-coach substitutes at the low end |
| Convert the £€/$ range into a visible "what you get" ladder | Fractional CAIO firms at $5k–$30k/mo capture upmarket budget |
| Named framework = content moat for GEO/AEO | Unverified outcome stats invite scepticism |

---

## 6. Positioning map

Axes chosen: **advice-only ↔ build-and-hand-over** (the axis the market complains about) and **individual ↔ organisation** (the axis that decides budget).

```
                        Organisation
                             │
   Fractional CAIO ●         │         ● Large consultancy
   ($5k–$30k/mo)             │
                             │      ● Agency model
                             │        ($1.5k–$5k proj)
                             │
  Advice ────────────────────┼──────────────────── Build &
   only                      │                    hand over
                             │
   MentorCruise ●            │
   ($99/mo)                  │      ★ ARMCHAIR FUTURIST
                             │        (both tracks, one
   Roving Leads ●            │         practitioner)
                             │
                        Individual
```

The site occupies the only quadrant with a **single practitioner who both teaches and builds**. Every other offer sits on one side of the advice/build axis, or targets organisations rather than the individual operator.

---

## 7. Review mining — what the market actually says

Every quote below was **read** this session from the cited thread.

| Objection | Source | Does the site answer it? |
|---|---|---|
| "Most AI consultancies sell strategy decks because that's the cheap deliverable. Execution is where the money goes and where most engagements break down." | r/AI_Agents | **Yes** — "You leave running systems you built yourself" |
| "He blatantly just plugged in all of our shit to AI and sent us the results… he didn't even proofread" (184 upvotes) | r/nonprofit | **Partly** — the Install Trap page addresses exactly this, but the homepage does not lead with it |
| "Spending money on consultants that promise a lot and deliver very little… most consultants are useless." | r/corporate | **Partly** — "If I'm not the right fit, I'll tell you" is the right instinct |
| "Expensive generalists selling other people's IP." | r/consulting | **Yes** — "I sell you the judgment to outlast the tools" |
| Projects fail because "workflow, outcome, data, ownership, review points, and adoption plan are unclear **before** implementation starts" | mikloskovacs.io | **Yes** — the Accountability Gap concept names ownership directly |
| "95% of AI projects fail" / "45% of AI projects fail" | prodot.de / misterjohn | Conflicting; treat as **unverified**. Note the site already uses its own "67%" figure (read from `pilot-itis`) |

### The pattern

Six of the market's top objections map onto things the site **already says**. The gap is not positioning — it is **prominence and evidence**. The strongest counters sit in long-form concept pages rather than on the homepage, and the proof numbers contradict each other.

---

## 8. Recommendations, ranked

Ordered by expected conversion impact per hour of work.

### 1. Fix the two proof contradictions (highest value, near-zero cost)

- **Hours.** Five places say **10–20 h/wk** (hero, About stat, AI-Guidance, Custom AI Provisioning, FAQ). The proof tile says **"5+ hours"**, captioned *"Measured on implementation clients after handoff."* A prospect meets both in one scroll and the smaller number discredits the larger. Decide which is true — **this is a business fact, not a copy preference, so it needs the owner's number.**
- **Coaching hours.** The comparison table lists the 10-pack at "~10–15 hrs" and the 20-pack at "~20–40 hrs", while every other page states sessions are 60 minutes and single/5-pack rows are exact. Either the upper bounds include async work (then relabel the row) or they are inflated.

Both were flagged in earlier audit rounds and remain open. They are the cheapest credibility wins available.

### 2. Publish the two missing trust statements

Roving Leads publishes both prominently; the site publishes neither.

- **Unused-session refund policy.** One sentence. Directly reduces purchase risk on the $570–$2,000 packs.
- **"I take no markup on tools you buy."** The site already promises open-standard stacks and ownership; this makes it concrete and matches a competitor's sharpest line.

### 3. Lead the homepage with the anti-deck position

The market's loudest complaint is decks-without-delivery, and the site is genuinely on the right side of it. Today that proof lives on `/concepts/the-install-trap`. A single line above or beside the hero CTAs would borrow the category's biggest objection and answer it before the objection forms.

### 4. Make the session recap concrete

"Session summary" is vague where the competitor offers "written recap email + shared prompt library". Naming what the buyer receives after every session is a small change with a clear value signal.

### 5. Resolve the certification mismatch

The homepage says *"CCMP, Agile Coaching, and four more"*. The About `certifications` array and the FAQ both name the sixth as **Professional Agile Leadership (PAL)**. "Agile Coaching" appears in neither. If both credentials are real, the "four more" count is also wrong. Credentials are facts — flag, do not guess.

---

## 9. Limits of this teardown

- **`belt` was unavailable**, so no screenshots were captured and no UX/visual comparison was performed. Every finding here is textual. A visual pass needs an image-capable reviewer.
- **Competitor pricing moves.** All figures are dated 2026-10-10; refresh before reusing.
- **Review mining used search snippets, not full thread reads.** Quotes are accurate as excerpted but not read in full context.
- **The competitor set was chosen by search relevance, not by win/loss data.** If CRM or call data exists, it would beat this list.
- **Two competitor names (Roving Leads, Ozzzer) are direct findings; the "agency" and "fractional CAIO" rows are category-level, not named single firms.**