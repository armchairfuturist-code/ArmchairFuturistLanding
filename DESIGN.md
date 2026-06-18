---
name: The Armchair Futurist
description: HP-inspired white-paper enterprise-consumer system. Geometric Space Grotesk for display, Manrope for body/UI, HP Electric Blue as the lone signal CTA, near-black ink for headlines, 8-16px rounded corners, soft 16px photo frames, dark navy customer-story and closing bands. Angular blue-chevron decorations nod to the HP wordmark's slashes.
colors:
  primary: "#024ad8"
  primary-bright: "#296ef9"
  primary-deep: "#0e3191"
  primary-soft: "#c9e0fc"
  on-primary: "#ffffff"
  ink: "#1a1a1a"
  ink-deep: "#000000"
  ink-soft: "#292929"
  on-ink: "#ffffff"
  canvas: "#ffffff"
  paper: "#ffffff"
  cloud: "#f7f7f7"
  fog: "#e8e8e8"
  steel: "#c2c2c2"
  graphite: "#636363"
  charcoal: "#3d3d3d"
  hairline: "#e8e8e8"
  hairline-strong: "#c2c2c2"
  link: "#024ad8"
  link-pressed: "#0e3191"
  bloom-coral: "#ff5050"
  bloom-rose: "#f9d4d2"
  bloom-deep: "#b3262b"
  bloom-wine: "#5a1313"
  storm-mist: "#8ebdce"
  storm-sea: "#7fadbe"
  storm-deep: "#356373"
  error: "#b3262b"
typography:
  display-xxl:
    fontFamily: Space Grotesk
    fontSize: 72px
    fontWeight: 500
    lineHeight: 1.0
    letterSpacing: 0
  display-xl:
    fontFamily: Space Grotesk
    fontSize: 56px
    fontWeight: 500
    lineHeight: 1.0
    letterSpacing: 0
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 44px
    fontWeight: 500
    lineHeight: 1.0
    letterSpacing: 0
  display-md:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: 500
    lineHeight: 1.0
    letterSpacing: 0
  display-sm:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: 500
    lineHeight: 1.17
    letterSpacing: 0
  display-xs:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: 500
    lineHeight: 1.0
    letterSpacing: 0
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.33
    letterSpacing: 0
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.38
    letterSpacing: 0
  body-emphasis:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.38
    letterSpacing: 0
  caption-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  caption-sm:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.33
    letterSpacing: 0
  caption-bold:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: 0
  link-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.38
    letterSpacing: 0
  button-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0.7px
    textTransform: uppercase
  button-sm:
    fontFamily: Manrope
    fontSize: 12.6px
    fontWeight: 700
    lineHeight: 1.0
    letterSpacing: 0.126px
  price-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: 500
    lineHeight: 1.17
    letterSpacing: 0
rounded:
  none: 0px
  xs: 2px
  sm: 3px
  md: 4px
  lg: 8px
  xl: 16px
  pill: 9999px
  full: 9999px
spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 20px
  xl: 24px
  xxl: 32px
  section: 80px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
    padding: 12px 24px
    height: 44px
  button-primary-pressed:
    backgroundColor: "{colors.primary-deep}"
    textColor: "{colors.on-primary}"
  button-primary-disabled:
    backgroundColor: "{colors.steel}"
    textColor: "{colors.on-primary}"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
    padding: 12px 24px
    height: 44px
  button-outline:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
    padding: 12px 24px
    height: 44px
  button-outline-ink:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
    padding: 12px 24px
    height: 44px
  button-text-link:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.primary}"
    typography: "{typography.link-md}"
    padding: 4px 0
  badge-pill-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 6px 12px
  badge-pill-outline:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 6px 12px
  badge-sale-coral:
    backgroundColor: "{colors.bloom-coral}"
    textColor: "{colors.on-primary}"
    typography: "{typography.caption-bold}"
    rounded: "{rounded.sm}"
    padding: 4px 8px
  text-input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 12px 16px
    height: 44px
  text-input-focused:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
  text-input-search:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 12px 16px
    height: 40px
  card-product:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: 24px
  card-product-feature:
    backgroundColor: "{colors.cloud}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: 32px
  card-pricing-tier:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: 24px
  card-pricing-tier-featured:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: 24px
  card-customer-story:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: 16px
  card-article-tile:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: 16px
  card-category-icon:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-emphasis}"
    rounded: "{rounded.lg}"
    padding: 16px
  promo-strip-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xl}"
    padding: 48px
  hero-promo-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: 32px
  utility-strip:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-primary}"
    typography: "{typography.caption-md}"
    height: 36px
    padding: 0 24px
  nav-bar-top:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    height: 64px
    padding: 0 32px
  nav-link:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    padding: 8px 16px
  category-tab:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-emphasis}"
    rounded: "{rounded.pill}"
    padding: 8px 20px
  category-tab-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-emphasis}"
    rounded: "{rounded.pill}"
    padding: 8px 20px
  promo-banner-coral:
    backgroundColor: "{colors.bloom-coral}"
    textColor: "{colors.on-primary}"
    typography: "{typography.caption-bold}"
    rounded: "{rounded.sm}"
    padding: 8px 16px
  chevron-decoration:
    color: "{colors.primary}"
    size: 12px
    rotation: 0deg
  hairline-divider:
    backgroundColor: "{colors.hairline}"
    height: 1px
---
# Design System — The Armchair Futurist (HP Edition)

## Overview

The Armchair Futurist's web presence adopts HP's **white-paper enterprise-consumer design language**: a system anchored by **HP Electric Blue (`#024ad8`)** as the lone signal CTA, **near-black ink (`#1a1a1a`)** for headlines, **Space Grotesk** geometric sans for display with **Manrope** for body/UI, and angular blue-chevron decorations that nod to the HP wordmark's slashes. Cards round at 8–16px, photos sit in soft 16px frames, and dark navy slabs anchor the customer-story and "how can we help" closing bands.

The aesthetic is **enterprise-credible, consumer-friendly**: a white-paper technical document feel, with one strong signal color, geometric typography, and soft 16px radii. Every interactive element is one of three buttons: solid HP blue (primary), outlined HP blue (secondary), or solid ink (utility). There's no warm accent, no decorative gradient, no chrome that doesn't carry meaning.

**Key Characteristics:**
- **Space Grotesk** geometric sans for display (weights 300/400/500/600/700), **Manrope** for body and UI (weights 400/500/600/700).
- **HP Electric Blue** (`#024ad8`) as the sole signal color — every CTA, every link, every focus ring.
- **Ink** (`#1a1a1a`) for all headlines and primary text on light surfaces.
- **White-paper canvas** — pure white surfaces with subtle cloud (`#f7f7f7`) for cards and fog (`#e8e8e8`) for dividers.
- **Soft 16px radii** on cards and photos; tight 4px radii on buttons and inputs.
- **Dark navy customer-story band** — a contrasting `#1a1a1a` slab for testimonials and closing CTA.
- **Blue chevron decorations** — angular slashes that nod to the HP wordmark, used sparingly as section dividers.
- **Uppercase tracked buttons** — every button is 14px Manrope weight 600, uppercase, +0.7px tracking. No exceptions.
- **No gradients, no shadows on text, no decorative frames.** Form carries weight; chrome disappears.

## Colors

> The palette is anchored on Electric Blue, Ink, and White-paper canvas. One strong blue, one near-black, four neutrals, and a small accent library reserved for specific cases (coral for promo urgency, storm blues for cool photo frames). No warm accent colors live in the primary system.

### Brand & Accent
- **HP Electric Blue** (`#024ad8`): The single brand-level signal color. All primary CTAs, all text links, every focus ring. The default "go" color.
- **HP Bright Blue** (`#296ef9`): Lighter sibling, used for hover state on primary blue buttons. Provides a one-step lift on interactive feedback.
- **HP Deep Blue** (`#0e3191`): Pressed/active state of Electric Blue, plus strong borders on dark navy slabs. Never used at rest.
- **HP Soft Blue** (`#c9e0fc`): Tinted backgrounds for blue alert strips, low-emphasis blue surfaces, photo frame fills behind blue imagery.

### Ink (Text)
- **Ink** (`#1a1a1a`): The display headline color. All primary headlines, all body text on light surfaces.
- **Ink Deep** (`#000000`): Reserved for absolute contrast (the global nav, hero video overlay).
- **Ink Soft** (`#292929`): Secondary body text, table cells, dense data displays.
- **On Ink** (`#ffffff`): All text on dark navy and black slabs.

### Surface
- **White-paper Canvas** (`#ffffff`): The dominant canvas. All light tiles, content sections, and the page background.
- **Cloud** (`#f7f7f7`): The single secondary surface. Used for feature cards, photo frames, soft section dividers.
- **Fog** (`#e8e8e8`): Hairline dividers, low-contrast borders on light surfaces.

### Neutral Grays
- **Steel** (`#c2c2c2`): Disabled state, placeholder text on light surfaces.
- **Graphite** (`#636363`): Secondary metadata, captions, fine print.
- **Charcoal** (`#3d3d3d`): Strong secondary text — denser captions, dense table content.
- **Hairline Strong** (`#c2c2c2`): Strong 1px borders, structural dividers on white.

### Accent Library (Reserved)
- **Bloom Coral** (`#ff5050`): Sale/promo urgency, time-sensitive commerce alerts only.
- **Bloom Rose** (`#f9d4d2`): Soft coral background, low-emphasis urgency states.
- **Bloom Deep** (`#b3262b`): Error state, destructive actions.
- **Bloom Wine** (`#5a1313`): Error text on light, dense error states.
- **Storm Mist** (`#8ebdce`): Cool photo frame fills behind neutral imagery.
- **Storm Sea** (`#7fadbe`): Cool secondary photo frame.
- **Storm Deep** (`#356373`): Cool deepest photo frame, cool-toned section dividers.

### Functional
- **Error** (`#b3262b`): Form errors, validation states (alias of Bloom Deep).
- **Link** (`#024ad8`): All text link colors (alias of Electric Blue).
- **Link Pressed** (`#0e3191`): All text link pressed states (alias of Deep Blue).

### Brand Gradient
**No decorative gradients.** Atmospheric depth comes from photo content, not CSS overlays.

## Typography

The typography system uses two geometric sans faces — **Space Grotesk** for display and **Manrope** for body/UI. Space Grotesk carries HP-inspired engineering precision with single-story 'a' and tight apertures; Manrope is its high-readability counterpart for paragraphs, UI chrome, and button labels.

> **Display:** Space Grotesk (weights 300/400/500/600/700). **Body/UI:** Manrope (weights 400/500/600/700). Both loaded via `next/font/google` in `src/app/layout.tsx` and exposed as CSS variables (`--font-display`, `--font-body`).

### Font Family
- **Primary**: `"Space Grotesk", "Manrope", "Inter", system-ui, sans-serif` — geometric, modern, neutral. Display tokens resolve to Space Grotesk; body/UI/button tokens resolve to Manrope via the `fontFamily.display` / `fontFamily.body` Tailwind keys.
- **Mono**: `"JetBrains Mono", "Courier New", Courier, monospace` — for code blocks, technical labels.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `display-xxl` | 72px | 500 | 1.0 | 0 | Hero headline (extra-large) |
| `display-xl` | 56px | 500 | 1.0 | 0 | Hero headline |
| `display-lg` | 44px | 500 | 1.0 | 0 | Section titles |
| `display-md` | 32px | 500 | 1.0 | 0 | Module titles |
| `display-sm` | 24px | 500 | 1.17 | 0 | Card titles |
| `display-xs` | 20px | 500 | 1.0 | 0 | Subsection titles |
| `body-lg` | 18px | 400 | 1.33 | 0 | Large body, hero subheadline |
| `body-md` | 16px | 400 | 1.38 | 0 | Default paragraph |
| `body-emphasis` | 16px | 500 | 1.38 | 0 | Inline emphasis, link text |
| `caption-md` | 14px | 400 | 1.5 | 0 | Secondary text, metadata |
| `caption-sm` | 12px | 400 | 1.33 | 0 | Fine print, micro-labels |
| `caption-bold` | 14px | 700 | 1.3 | 0 | Bold captions, badge text |
| `link-md` | 16px | 500 | 1.38 | 0 | Inline text link |
| `button-md` | 14px | 600 | 1.4 | 0.7px (uppercase) | All button labels |
| `button-sm` | 12.6px | 700 | 1.0 | 0.126px | Compact button labels |
| `price-md` | 24px | 500 | 1.17 | 0 | Pricing tier prices |

### HP Typography Principles

- **Geometric neutrality.** Space Grotesk (display) and Manrope (body/UI) are geometric, modern, and unornamented. No decorative flourishes, no contrasts that distract.
- **Weight 500 for display.** Headlines sit at 500. Body is 400. Buttons are 600. The 500 weight gives display text a confident-but-not-bold presence.
- **Line-height 1.0 at display sizes.** Tight, dense, engineered. Display lines pack together with no extra air.
- **Tight letter-spacing.** The system uses 0 letter-spacing everywhere; uppercase buttons add +0.7px to give each letter breathing room.
- **Buttons are uppercase + tracked.** Every button is 14px Manrope weight 600, uppercase, +0.7px letter-spacing. This is a non-negotiable brand signature.
- **Tracking calibration.** Manrope tracks slightly tighter than Space Grotesk's defaults; the 0 letter-spacing baseline applies to both faces consistently.
- **Uppercase is reserved for buttons + section labels.** Only buttons and section markers get `text-transform: uppercase`. Never for body text.

## Layout & Spacing

- **Base unit:** 8px. Section vertical padding: 80px. Cards: 24px (compact) or 32px (feature).
- **Container max-width:** 1280px (standard), 1600px (large screens).
- **12-column responsive grid.** Hero full-width. Internal sections: 2/3/4-column layouts.
- **Photo frames at 16px.** All photography sits in 16px-rounded frames with optional 1px hairline border.
- **Whitespace as engineering precision.** Each section is 80px of air on desktop. Content is never crowded. The page feels like a technical document.

## Rounded Corners

| Token | Value | Use |
|---|---|---|
| `none` | 0px | Default — most surfaces are square |
| `xs` | 2px | Micro UI, tiny chips |
| `sm` | 3px | Sale badges, status chips |
| `md` | 4px | **All buttons and inputs** |
| `lg` | 8px | Pill badges, category icons |
| `xl` | 16px | **All cards, photo frames, hero promos** |
| `pill` | 9999px | Category tab pills |
| `full` | 9999px | Circle avatars |

**The radius system has two anchors:** buttons and inputs are tight (4px) — controlled, engineering-precision. Cards and photos are soft (16px) — welcoming, photo-friendly. Never mix.

## Components

### Buttons (Three Grammars Only)

**1. Button Primary** — Electric Blue, white text
- Background: `#024ad8`
- Text: `#ffffff`
- Typography: 14px Manrope, 600, uppercase, +0.7px tracking
- Radius: 4px
- Padding: 12px 24px
- Height: 44px
- Hover: bright blue (`#296ef9`)
- Pressed: deep blue (`#0e3191`)
- Disabled: steel (`#c2c2c2`)

**2. Button Outline** — White background, blue border and text
- Background: `#ffffff`
- Text: `#024ad8`
- Border: 1px `#024ad8`
- Same dimensions as primary

**3. Button Ink** — Solid ink, white text (for dark slabs)
- Background: `#1a1a1a`
- Text: `#ffffff`
- Same dimensions

**Pill category tab** is the only other button shape — used for category filters and section navigation.

### Cards

**Card Product / Pricing Tier / Article Tile** — 16px radius, 24px padding, white background, 1px hairline border (`#e8e8e8`).
**Card Product Feature** — 16px radius, 32px padding, cloud (`#f7f7f7`) background.
**Card Customer Story** — 16px radius, 16px padding, white background with 16px photo frame.
**Card Category Icon** — 8px radius, 16px padding, white background, used for icon-driven content categories.

### Badges

- **Badge Pill Ink**: 8px radius, 6px 12px padding, ink background, white text. Default "section" badge.
- **Badge Pill Outline**: 8px radius, white background, ink border, ink text.
- **Badge Sale Coral**: 3px radius, 4px 8px padding, coral background, white bold text. **Reserved for commerce urgency.**

### Forms

- **Text Input**: White background, ink text, 4px radius, 12px 16px padding, 44px height, 1px fog border. Focus state: 1px Electric Blue border, 2px Electric Blue focus ring.
- **Text Input Search**: Same as text input but 40px height, no border by default.

### Navigation

- **Nav Bar Top**: 64px height, white background, ink text, 32px horizontal padding.
- **Nav Link**: 8px 16px padding, ink text, hover to Electric Blue.
- **Utility Strip**: 36px height, ink background, white text, used for top-bar announcements.

### Customer Story Slab

- **Promo Strip Dark**: 16px radius, 48px padding, ink (`#1a1a1a`) background, white text. Used for testimonials band, "how can we help" closing, and any dark contrast section.
- **Hero Promo Card**: 16px radius, 32px padding, white background, sits in hero region with optional 16px photo frame.

### Decorative Chevrons

- Angular blue slashes (`#024ad8`) that nod to the HP wordmark. 12px size. Used sparingly as section dividers, before section titles, or as bullet markers in lists. Never as primary decoration.

## Motion & Interaction

- **Hover state:** One-step lift on color (primary → bright blue). Subtle, never bouncy.
- **Pressed state:** One-step darken (primary → deep blue). Confirms action.
- **Page transitions:** Fade-in on route change. 200ms ease-out. No slide.
- **Scroll reveals:** Subtle fade-up on section entry. 400ms ease-out. No parallax.
- **Reduced motion:** All animations disabled when `prefers-reduced-motion: reduce` is set. Instant transitions only.
- **Stagger:** Word-by-word stagger on hero headlines. 60ms between words.

## Engineering Notes

- **CSS variables** in `src/app/globals.css` expose the full color system. Tokens are HSL triplets for shadcn/ui compatibility.
- **Tailwind config** extends the system with `fontFamily.display`, `fontFamily.body`, `fontFamily.mono`, color aliases (e.g. `text-ink`, `bg-canvas`, `border-hairline`), and `borderRadius.hp-md` / `borderRadius.hp-xl`.
- **Font loading:** Space Grotesk (display) and Manrope (body/UI) are loaded via `next/font/google` in `src/app/layout.tsx` and exposed as `--font-display` and `--font-body` CSS variables. Weights match the token table above.
- **Button shape is non-negotiable.** 14px, 600 weight, uppercase, +0.7px tracking, 4px radius. All buttons in the system follow this signature.
- **Color discipline:** Electric Blue is the ONLY signal color. Bloom Coral is reserved for commerce urgency. Storm blues are reserved for photo frames. No other accents exist.

## Anti-Patterns (Things We Don't Do)

- No gradients. Anywhere.
- No drop shadows on text.
- No decorative borders that don't carry semantic meaning.
- No warm accent colors. The system is cool.
- No text-transform: uppercase on body copy.
- No letter-spacing overrides below 0 (no negative tracking).
- No `rounded-full` on anything except avatars and pill tabs.
- No mixing button shapes — primary and outline are both 4px radius; pill is 9999px and reserved for category tabs.
- No card without a 16px radius. Ever.
- No input without a 4px radius. Ever.
