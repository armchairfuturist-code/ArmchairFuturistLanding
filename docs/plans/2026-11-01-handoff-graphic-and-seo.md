# Handoff — 2026-11-01

State: `main` at `2f8eb84`, pushed, CI and Firebase deploy green, https://thearmchairfuturist.com health 200.
Not committed: this file.

## Waiting on the operator

Feedback on the new graphic in the Last Mile section. Nothing is blocked; the
graphic is live and the operator intends to refine it.

## The graphic

`src/components/sections/SameAgentTwice.tsx`, 109 lines, rendered by
`LastMileSection.tsx` in place of the author photograph.

Inline SVG, `viewBox="0 0 760 352"`, one `<style>` block inside the component,
no dependency, no asset file. All colour is `currentColor` plus a class
(`text-ink`, `text-charcoal`, `text-muted-foreground`, `text-hp-electric`), so
it follows the site tokens. Surfaces are `fillOpacity` tone changes; there are
no outlines, per the design rules.

Structure, top to bottom:

| Region | Coords | Content |
|---|---|---|
| Lane one request | x8 y16 210x96 | "Summarise the sales data and flag risks." + mono "request one" |
| Lane one arrows | M226 64 H300, M428 64 H500 | class `d1` |
| Lane one agent | x308 y34 112x60 | "the same agent" + mono "same data" |
| Lane one output | x508 y10 244x112 | three summary lines + class `g1` strip "two quiet accounts: absent" |
| Lane two request | x8 y168 210x124 | five lines, the added constraint |
| Lane two arrows | M226 230 H300, M428 230 H500 | class `d2` |
| Lane two agent | x308 y200 112x60 | identical to lane one |
| Lane two output | x508 y162 244x112 | two summary lines + class `h2` strips "1. Meridian Foods, down 38%" / "2. Halcyon Retail, down 31%" |
| Closing line | x8 y338 | class `nt`, "Same model. Same data. The difference is what the request knew." |
| Caption | figcaption | "The exchange is real… Account names changed." |

Animation: one 9s loop, five keyframe sets, all `infinite`.

| Class | Keyframes | Beat |
|---|---|---|
| `d1` | `sat-draw` | lane one arrows draw, 0-14% |
| `g1` | `sat-gap` | miss strip fades in 18-26%, holds to 48%, dims to .5 |
| `d2` | `sat-draw2` | lane two arrows draw, 50-58% |
| `h2` | `sat-hit` | two hits rise and fade in, 62-70% |
| `nt` | `sat-note` | closing line fades in 76-84% |

Arrows draw by `stroke-dasharray="74"` with `stroke-dashoffset` animating 74 to 0.

Reduced motion: `animation: none` on all five, `.g1` opacity pinned to .5, so
the base state is the full comparison with both lanes readable. Every card also
holds readable text at every frame, so any still capture is complete.

Likely feedback and where to make it:

- Pacing — the five percentage stops in the `@keyframes` block; the 9s appears
  in five `.sat .x` rules and must stay in sync.
- Copy — the `<text>` nodes; lane two's request is five lines at y198-280
  inside a 124px box, so adding a line needs the box height and the y values.
- Emphasis colour — `text-hp-electric` on the `g1` and `h2` groups.
- Density or size — the `viewBox` and `max-w-3xl` on the `<figure>`.
- A third lane or a different story — the two lanes are independent groups;
  a third needs ~160px more height and its own keyframe offsets.

Verified: build clean, `npx vitest run` 225 tests / 35 files pass, base state
and mid-loop computed styles checked in Chrome. The mid-loop frames have not
been looked at as images.

## Also live this session

- `StaticOrganismFallback.tsx` returns `null` unless `permanent`, so the hero's
  placeholder SVG — the stray curved line before WebGL starts — no longer
  renders. It still renders as real artwork when WebGL fails or reduced motion
  is set. The dead `.is-placeholder` rule is gone from `globals.css`.
- SEO: H1 added to `/blog`, `/speaking`, `/privacy-policy`,
  `/terms-of-service`; `noindex` stripped from the two legal pages; logo alt
  set; `/intake/digital-identity` added to `sitemap.ts` and `sitemap-ai.xml`;
  the four archetype result pages linked from `/assessment`, so no orphans.

## Open queue

1. Search Console: the property was never added. Account `techadvisor2k8@gmail.com`
   holds only `mindscapeinstitute.org`. Operator adds URL prefix
   `https://thearmchairfuturist.com/`, verifies, submits `sitemap.xml`.
   Chrome automation of that dialog failed — Angular ignores synthetic input.
2. Twelve pages score 0.58-1.00 on the AI detector: six concepts, five
   services, `how-i-work`, `audit`, `assessment`. `/concepts/the-last-mile` is
   done at 0.63. Research is in `/tmp/research-2026/tables/*.txt` (temporary —
   copy out if it matters).
3. Backlinks: outreach, not code.
4. CLS never measured; no Lighthouse in the image.
5. Three shared-component audit FAILs: header hairline, FAQ accordion borders,
   breadcrumb misread as an eyebrow.
6. `few-pictures` FAIL wants a real photograph or interface fragment. An actual
   agent-session screenshot would satisfy it and is not the operator's face.
7. `public/header.mp4`, 3MB, is a stock blue particle wave and is referenced by
   no code. Delete candidate.

## Gotchas

- `git add -A ':!.taste-skill'` exits non-zero because of the ignore hint. Never
  chain it with `&&`; it silently skips the commit. Use `git add -A` plus a
  `.gitignore` entry (`.taste-skill/` is already ignored).
- Confirm a deploy with `gh run list --commit $SHA`. A `--limit 1` query can
  return the previous run's success while the new CI is failing.
- CI has a GEO drift gate, `scripts/check-geo-maps.mjs`: every route added to
  `src/app/sitemap.ts` must also be added to `public/sitemap-ai.xml`, or CI
  fails after the deploy already succeeded.
- Archify was ruled out for the homepage: the viewer chrome is off-brand and
  SVG export loses the motion. It fits an explorable diagram on
  `/concepts/the-last-mile` or a shareable explainer.

## Commands

```bash
setsid nohup npm run dev -- -p 9002 > /tmp/next-dev.log 2>&1 < /dev/null & disown
npm run build && npx vitest run
CHROME_PATH=/opt/helium-browser-bin/chrome node ~/.dsh/skills/design-taste-frontend/scripts/inspect.mjs URL --out DIR
python3 /tmp/art.py && python3 /tmp/longtail/skills/longtail/scripts/stylo.py check /tmp/corpus/PAGE.txt
```
