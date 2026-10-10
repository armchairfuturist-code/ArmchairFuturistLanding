# Organic + Agent Lead Gen Plan

**Date:** 2026-10-10
**Question it answers:** how to get more organic and AI-agent traffic by automating site updates from Substack/LinkedIn, and by publishing an AI-news bulletin.

---

## 1. The asset you are not using

**Measured this session** by fetching `https://armchairfuturist.substack.com/feed`:

| Property | Value |
|---|---|
| Items in feed | 20 |
| Feed size | 473 KB |
| `content:encoded` per post | **19,154 – 36,670 chars (full text)** |
| `description` per post | 32 – 103 chars (excerpt only) |
| Publish cadence | **daily** ("AI Digest: October 9th / 8th / 7th 2026") |

So you are producing **roughly 20–36 KB of original analysis per day**, and it is already in a clean machine-readable feed.

**What your site does with it today** (*read*): `src/app/api/substack/route.ts` fetches that feed server-side and `SubstackSection.tsx` renders the latest few titles client-side. Nothing more.

**The consequence:** that content is indexed on **Substack's** domain, not yours. Your domain gets no new indexable text, no freshness signal, and no per-post structured data from your most prolific output. AI crawlers cite the domain they read — right now that is Substack.

---

## 2. What "agent traffic" actually rewards

Crawlers used by LLM products (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) do not rank pages the way Google does. What gets a page **cited**:

1. **Self-contained, factual, dated answers** — a claim plus its reasoning on one page.
2. **Authorship and date** — who said it, when. Structured data helps.
3. **Freshness** — frequently updated surfaces get re-read more often.
4. **A named concept** — LLMs quote terms that have a stable definition.

You already do #1 and #4 well. Your concept pages (`/concepts/the-install-trap`, `/concepts/accountability-gap`) are exactly the shape that gets cited, and you own two named terms. What you lack is #3: a surface that changes daily.

**Your daily digest is that surface. It is simply not on your domain.**

---

## 3. The plan

### Step 1 — Mirror the digest onto your own domain (highest value)

Publish a `/digest` index plus one page per entry, server-rendered from the feed you already pull.

Each entry page carries:
- Your full commentary (the feed has it)
- `<Article>` or `<BlogPosting>` JSON-LD with `datePublished`, `author`, `image`, `mainEntityOfPage`
- Its own `<title>` and meta description
- A stable URL: `/digest/2026-10-09`

**Why this is the whole ballgame:** it converts ~30 KB/day of your writing from Substack's index into yours, and gives every entry a citable, dated URL.

### Step 2 — Publish your own feed

You have no feed on your own domain (*measured*: no `rss`/`atom` route under `src/app`).

- `/feed.xml` — RSS 2.0, latest 20 digest entries with full text
- `/feed.json` — JSON Feed, same content
- Advertise both in `<head>`: `<link rel="alternate" type="application/rss+xml" href="/feed.xml">`
- Add a "Recent writing" section to the existing `llms.txt` pointing at `/digest`

Aggregators, newsletters and agents can then subscribe to **you** rather than Substack.

### Step 3 — Keep freshness moving without daily commits

You already have git-derived `lastmod` for the sitemap. Two options:

- **Preferred:** fetch the feed at build time with ISR (`revalidate`), so `/digest` refreshes daily with **no commit** and no repo growth.
- **Avoid:** a cron that commits 30 KB of mirrored text daily. It bloats history permanently and triggers a deploy every day for content that already exists upstream.

Either way, `/digest` must appear in `sitemap.ts` with a moving `lastmod`.

### Step 4 — Topic hubs for keyword capture

One hub page per recurring theme in your digests, e.g. `/digest/topic/agents`, `/digest/topic/adoption`. Each hub is a dated, curated list with your framing. This is where keyword targeting actually lives — not in tags sprinkled on posts.

Targets worth owning, based on what buyers ask (*read*, from search results this session):
- "AI consultant for small business" / "for founders"
- "how to become self-sufficient with AI"
- "fractional AI officer vs AI consultant"
- "why AI pilots fail" — **you already rank-shaped for this with `/concepts/pilot-itis`**
- "AI accountability gap" — **your own term; defend it**

---

## 4. Caveats that decide whether this works

| Risk | Why it matters | Mitigation |
|---|---|---|
| **Duplicate content** | Same text on Substack and your domain can split ranking | Set `canonical` to the Substack URL on mirrored entries, **or** publish excerpt + your own framing. LLM crawlers largely ignore canonical and will cite your domain either way, so full text still helps agent traffic |
| **Thin content** | An auto-generated headline list is worthless to Google *and* LLMs | Ship your commentary, never just links. If the automation cannot carry the analysis, do not ship the page |
| **Repo bloat** | 30 KB/day committed forever | Build-time/ISR fetch instead of commit-per-post (Step 3) |
| **Cannibalising Substack** | You want subscribers, not just traffic | Always link back to the Substack post; make the site a discovery surface, not the destination |
| **Daily deploys** | Cost and noise | ISR, not a commit |

---

## 5. What to do first

**One thing:** Step 1 + Step 2 together — a `/digest` route that server-renders the feed you already fetch, plus your own `/feed.xml`.

That single change:
- puts your most prolific content on your own domain
- creates a daily-moving freshness signal
- adds a citable, dated URL per entry
- lets aggregators subscribe to you

Everything else in this plan is a refinement of that.

---

## 6. Limits of this plan

- **No traffic data was consulted.** There is no analytics read in this session, so the keyword targets are reasoned from search results and buyer language, not from your actual search console.
- **`belt` (inference.sh) was unavailable**, so no SERP-rank scraping or competitor screenshotting was done.
- **Substack feed pagination is unverified.** The feed returned 20 items; whether older posts are reachable from it was not tested.
- **LinkedIn was not automated in this plan** because it has no public feed and its API requires app review. Cross-posting LinkedIn notes automatically is a separate, harder problem.