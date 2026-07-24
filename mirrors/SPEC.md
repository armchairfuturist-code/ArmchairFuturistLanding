# Mirror Spec — Armchair Futurist Landing

## 1. Target
- **URL**: https://thearmchairfuturist.com
- **Framework under test**: Next.js 16 + App Router + Tailwind CSS
- **Viewport set**: Desktop 1440×900 · Tablet 834×1112 · Mobile 390×844

## 2. Captured tokens (from production)
| Token | Value |
| --- | --- |
| `--hp-electric` | `220 96% 43%` → `#024ad8` |
| `--hp-bright`   | `217 95% 57%` → `#296ef9` |
| `--hp-deep`     | `222 80% 31%` → `#0e3191` |
| `--hp-soft`     | `213 90% 90%` → `#c9e0fc` |
| `--ink`         | `0 0% 10%` → `#1a1a1a` |
| `--canvas`      | `0 0% 100%` |
| `--cloud`       | `0 0% 97%` → `#f7f7f7` |
| `--fog`         | `0 0% 91%` → `#e8e8e8` |
| `--graphite`    | `0 0% 39%` → `#636363` |
| `--font-display`| `Space Grotesk` |
| `--font-body`   | `Manrope, Inter, system-ui` |
| `--font-mono`   | `JetBrains Mono` |
| Radius | `4px` · Letter-spacing H2 `-0.025em` · Buttons `0.7px` |

## 3. Section inventory (15 sections)
| # | Section | Anchor | Surface |
| --- | --- | --- | --- |
| 0 | Hero | — | white + grid |
| 1 | Logo banner | — | `cloud/50` |
| 2 | Case studies | `#case-studies` | white |
| 3 | Testimonials | `#testimonials` | `cloud` |
| 4 | Track record | `#stats` | white |
| 5 | What this is NOT | `#what-this-is-not` | white |
| 6 | Services | `#services` | white |
| 7 | About me | `#about-me` | `hp-deep` |
| 8 | Guidance | `#ai-guidance` | `cloud` |
| 9 | ROI calc | `#roi-calculator` | `cloud` |
| 10 | Speaking | — | `cloud` |
| 11 | Assessment CTA | — | `hp-deep` |
| 12 | Insights | `#latest-insights` | white |
| 13 | FAQ | `#faq` | `cloud` |
| 14 | Connect | `#connect` | `hp-electric` |

## 4. Motion inventory
- Hero pulse dot — `pulse 2s` infinite
- Logo banner marquee — `marquee 50s linear infinite` (hover pauses)
- Testimonials row marquee — `marquee 50s linear infinite` (hover pauses)
- FAQ accordion — `accordion-up 0.2s ease-out`

## 5. Mirrors

### 5.1 Pencil — static hand-written mirror
- File: `mirrors/pencil/index.html`
- 64 KB single file. No JS framework. 14 inline `<script>` lines for ROI calculator.
- Real Google Fonts (`Manrope`, `Space Grotesk`, `JetBrains Mono`).
- Pure CSS animations (no JS).
- H1 stacks words via `<span class="word">` so the source's no-space token renders as `AIWon'tReplaceYou.`.

### 5.2 Forge — data-driven generator
- Data: `mirrors/data/content.json` (319 lines).
- Templates: `mirrors/forge/templates/` (head + shared CSS + 15 partials).
- Generator: `mirrors/forge/build.mjs` (no external deps).
- Output: `mirrors/forge/dist/index.html`.
- Watch mode: `node mirrors/forge/build.mjs --watch` rebuilds on content/template change.
- Result: identical render to Pencil from the same data model.

## 6. Reproduction
```sh
# Capture source (one-time, ~1 min)
node _capture/capture.mjs

# Build Forge from data
node mirrors/forge/build.mjs

# Serve both mirrors + source.json
node mirrors/serve.mjs            # http://localhost:4317

# Capture mirrors + source at all 3 viewports
node mirrors/compare.mjs

# Score fidelity
node mirrors/score.mjs

# Composite render
node mirrors/composite.mjs
```
