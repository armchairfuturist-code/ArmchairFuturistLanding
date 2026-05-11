---
name: The Armchair Futurist
description: Apple-inspired design discipline for a certified futurist. Photography-first, typography-driven, single-blue-accent — built on SF Pro/Inter typography system with negative tracking at display sizes. Warm off-white parchment canvas, navy night-sky sections, one accent color.
colors:
  primary: "#0d84ff"
  primary-focus: "#1eaedb"
  primary-on-dark: "#53b1ff"
  canvas: "#fafdff"
  canvas-parchment: "#f5f5f7"
  surface-card: "#ffffff"
  surface-pearl: "#fafafc"
  surface-navy: "#00172e"
  surface-black: "#000000"
  ink: "#00172e"
  ink-muted-80: "#1f1f1f"
  ink-muted-48: "#6b6b6b"
  ink-muted-30: "#9ca3af"
  ink-on-dark: "#ffffff"
  ink-muted-on-dark: "#cccccc"
  divider-soft: "rgba(0, 0, 0, 0.06)"
  hairline: "#b2d5ff"
  hairline-dark: "#143d8d"
  error: "#e53e3e"
  success: "#38a169"
typography:
  hero-display:
    fontFamily: '"system-ui", "-apple-system", sans-serif'
    fontSize: clamp(2.8rem, 5vw, 4.5rem)
    fontWeight: 600
    lineHeight: 1.07
    letterSpacing: -0.02em
  display-lg:
    fontFamily: '"system-ui", "-apple-system", sans-serif'
    fontSize: clamp(2.2rem, 4vw, 3.6rem)
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: -0.015em
  display-md:
    fontFamily: '"system-ui", "-apple-system", sans-serif'
    fontSize: clamp(1.5rem, 2.5vw, 2.2rem)
    fontWeight: 600
    lineHeight: 1.2
  lead:
    fontFamily: '"Outfit", "system-ui", sans-serif'
    fontSize: clamp(1.1rem, 1.5vw, 1.3rem)
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: '"Outfit", "system-ui", sans-serif'
    fontSize: clamp(1rem, 1.25vw, 1.1rem)
    fontWeight: 400
    lineHeight: 1.6
  body-strong:
    fontFamily: '"Outfit", "system-ui", sans-serif'
    fontSize: clamp(1rem, 1.25vw, 1.1rem)
    fontWeight: 600
    lineHeight: 1.6
  caption:
    fontFamily: '"Outfit", "system-ui", sans-serif'
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
  caption-strong:
    fontFamily: '"Outfit", "system-ui", sans-serif'
    fontSize: 0.875rem
    fontWeight: 600
    lineHeight: 1.4
  label-caps:
    fontFamily: '"Outfit", "system-ui", sans-serif'
    fontSize: 0.75rem
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0.06em
    textTransform: uppercase
  button:
    fontFamily: '"Outfit", "system-ui", sans-serif'
    fontSize: 0.95rem
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: 0.01em
  nav-link:
    fontFamily: '"Outfit", "system-ui", sans-serif'
    fontSize: 0.9rem
    fontWeight: 400
    lineHeight: 1
  fine-print:
    fontFamily: '"Outfit", "system-ui", sans-serif'
    fontSize: 0.75rem
    fontWeight: 400
    lineHeight: 1.4
rounded:
  none: 0px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 18px
  pill: 9999px
  full: 9999px
spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 80px
  container: 1280px
  container-xl: 1600px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.ink-on-dark}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 11px 22px
  button-primary-active:
    transform: scale(0.95)
  button-primary-focus:
    outline: 2px solid "{colors.primary-focus}"
  button-secondary-pill:
    backgroundColor: transparent
    textColor: "{colors.primary}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    border: 1px solid "{colors.primary}"
    padding: 11px 22px
  button-navy:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ink-on-dark}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: 14px 28px
  button-navy-hover:
    backgroundColor: "{colors.primary}"
  button-ghost:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    border: 1px solid "{colors.hairline}"
    padding: 10px 20px
  tile-light:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "{spacing.section}"
  tile-parchment:
    backgroundColor: "{colors.canvas-parchment}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "{spacing.section}"
  tile-dark:
    backgroundColor: "{colors.surface-navy}"
    textColor: "{colors.ink-on-dark}"
    rounded: "{rounded.none}"
    padding: "{spacing.section}"
  tile-black:
    backgroundColor: "{colors.surface-black}"
    textColor: "{colors.ink-on-dark}"
    rounded: "{rounded.none}"
    padding: "{spacing.section}"
  card-default:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    border: 1px solid "{colors.hairline}"
  card-dark:
    backgroundColor: "{colors.surface-navy}"
    textColor: "{colors.ink-on-dark}"
    rounded: "{rounded.md}"
    border: 1px solid "{colors.hairline-dark}"
  global-nav:
    backgroundColor: "{colors.surface-black}"
    textColor: "{colors.ink-on-dark}"
    typography: "{typography.nav-link}"
    height: 52px
  nav-link-hover:
    textColor: "{colors.primary}"
  side-label:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.primary}"
    typography: "{typography.label-caps}"
    border: 1px solid "{colors.hairline}"
    padding: 24px 5px
  section-divider:
    backgroundColor: "{colors.hairline}"
    height: 1px
    marker-size: 3px
  section-divider-dark:
    backgroundColor: "{colors.hairline-dark}"
    height: 1px
    marker-size: 3px
  text-link:
    color: "{colors.primary}"
    typography: "{typography.body}"
  text-link-on-dark:
    color: "{colors.primary-on-dark}"
    typography: "{typography.body}"
  stat-display:
    textColor: "{colors.primary}"
    typography: "{typography.display-md}"
    fontWeight: 600
---
# Design System — The Armchair Futurist

## Overview

The Armchair Futurist's web presence blends **Apple's design discipline** (photography-first, single accent, generous whitespace, alternating surface rhythm, SF Pro typography) with a **futurist consultant brand** (signal blue accent, warm off-white parchment canvas, deep navy night-sky sections, navy utility rects).

The visual metaphor is **the observatory at the edge** — a warm, well-lit study perched at the frontier of what's next. The canvas (`#fafdff`) feels like fine paper under a desk lamp. The navy sections (`#00172e`) feel like the night sky viewed through glass. The single blue accent (`#0d84ff`) is the signal — intentional, directional, unmistakable.

Every page is a stack of alternating edge-to-edge tiles — light parchment canvas, dark navy, pure black hero — each centered on a headline, a one-line tagline, one or two simple CTAs, and content that breathes. Nothing competes with the message. Typography is confident but quiet. Interactive elements are a single, intentional blue.

Density is deliberately low. Each tile occupies roughly one viewport section. There is no decorative chrome — no gradients, no decorative frames, no shadows on text. The result is a page that feels like a museum gallery for ideas: the chrome disappears and the thinking takes over.

**Key Characteristics:**
- Photography-first presentation; typography carries the voice; UI recedes.
- Alternating edge-to-edge tile sections: parchment ↔ navy ↔ black, with the color change itself acting as the section divider.
- Single blue accent (`#0d84ff`) carries every interactive element. No second accent color exists.
- Two button grammars: pill CTAs for primary actions, compact rectangles for secondary/navy.
- Typography: SF Pro / system-ui for display headlines, Outfit for body text — full Apple typography stack.
- Negative letter-spacing at display sizes for signature "Apple tight" headline feel.
- Generous whitespace — each section gets breathing room (80px vertical padding).
- Tight black global nav (52px) with blue hover signal.
- Motion adds depth without decoration: word-by-word stagger on hero, subtle mouse parallax, letter-spacing reveals on section titles.

## Colors

> The palette is cool and intentional. One blue, one near-ink, two off-whites, two dark surfaces. No warm accent colors exist.

### Brand & Accent
- **Signal Blue** (`#0d84ff`): The single brand-level interactive color. All text links, all blue pill CTAs, and the focus ring. Slightly more vibrant than Apple's Action Blue — clearer in editorial contexts.
- **Focus Cyan** (`#1eaedb`): A brighter sibling of Signal Blue, reserved for hover states, focus rings, and active micro-interactions. Never appears at rest.
- **Sky Link Blue** (`#53b1ff`): Brighter blue used on dark navy tiles for inline links, where Signal Blue would lose contrast.

### Surface
- **Warm Parchment** (`#fafdff`): The dominant canvas. All light tiles, content sections, and the page background. Slightly warmer than Apple's parchment.
- **Cool Parchment** (`#f5f5f7`): Alternating light tile variant. Creates rhythm between consecutive light sections.
- **Pearl Button** (`#fafafc`): Near-white fill for ghost/secondary buttons.
- **Deep Navy** (`#00172e`): The primary dark surface. Used for callout sections, dark tiles, and the footer.
- **Pure Black** (`#000000`): Reserved for the hero section and the global nav bar.

### Text
- **Display Ink** (`#00172e`): Headlines and primary text on light surfaces.
- **Ink Muted 80** (`#1f1f1f`): Body text on light surfaces.
- **Ink Muted 48** (`#6b6b6b`): Secondary body text, metadata, fine-print.
- **Ink Muted 30** (`#9ca3af`): Tertiary labels, disabled states, placeholder text.
- **On Dark** (`#ffffff`): All text on dark navy and black tiles.
- **On Dark Muted** (`#cccccc`): Secondary copy on dark surfaces.

### Hairlines & Borders
- **Divider Soft** (`rgba(0, 0, 0, 0.06)`): Subtle ring shadow for button borders.
- **Hairline Blue** (`#b2d5ff`): The 1px border on cards, dividers, and structural lines.
- **Hairline Dark** (`#143d8d`): Border color on dark navy surfaces.

### Brand Gradient
**No decorative gradients.** Atmospheric depth comes from content imagery, not CSS overlays.

## Typography

The typography system follows **Apple's SF Pro** model: system-ui for display headlines (SF Pro Display on Apple devices), Inter for body and UI (the recommended open-source substitute for SF Pro Text).

### Font Family
- **Display**: `system-ui, -apple-system, sans-serif` — resolves to SF Pro Display on macOS/iOS/Safari. For non-Apple platforms, system-ui resolves to the platform's native sans-serif.
- **Body / UI**: `Inter, system-ui, sans-serif` — Inter is the closest open-source equivalent to SF Pro Text. Loaded via Google Fonts with weights 300–700.
- **Mono**: `"JetBrains Mono", "Courier New", Courier, monospace`.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `hero-display` | clamp(2.8rem, 5vw, 4.5rem) | 600 | 1.07 | -0.02em | Hero headline (Apple-tight tracking) |
| `display-lg` | clamp(2.2rem, 4vw, 3.6rem) | 600 | 1.1 | -0.015em | Section titles |
| `display-md` | clamp(1.5rem, 2.5vw, 2.2rem) | 600 | 1.2 | — | Module titles |
| `lead` | clamp(1.1rem, 1.5vw, 1.3rem) | 400 | 1.5 | — | Sub-headline / deck text |
| `body` | clamp(1rem, 1.25vw, 1.1rem) | 400 | 1.6 | — | Default paragraph |
| `body-strong` | clamp(1rem, 1.25vw, 1.1rem) | 600 | 1.6 | — | Inline emphasis |
| `caption` | 0.875rem | 400 | 1.5 | — | Secondary text |
| `caption-strong` | 0.875rem | 600 | 1.4 | — | Emphasized captions |
| `label-caps` | 0.75rem | 500 | 1.4 | 0.06em | Uppercase labels, section markers |
| `button` | 0.95rem | 500 | 1.25 | 0.01em | Button / CTA labels |
| `nav-link` | 0.9rem | 400 | 1 | — | Navigation |
| `fine-print` | 0.75rem | 400 | 1.4 | — | Legal, footnotes |

### Apple Typography Principles

- **Negative letter-spacing at display sizes.** Every headline at 1rem and up carries slight tight tracking (`-0.02em` to `-0.015em`). This produces the iconic "Apple tight" headline cadence. Never used below 1rem.
- **Weight 600 for headlines, 400 for body.** Headlines sit at weight 600. Body is 400. Captions/labels use 500. Weight 500 is deliberately absent from the display ladder (following Apple's convention: the ladder is 300/400/600/700).
- **Weight 300 is rare.** Used only for fine-print moments where content should feel airy.
- **Line-height is context-specific.** Display sizes use 1.07–1.2 (tight). Body uses 1.6 (generous, editorial).
- **Inter substitute adjustments.** When using Inter (non-Apple platforms), display tracking is nudged slightly tighter by -0.01em vs. native SF Pro to account for Inter's wider default tracking.
- **Uppercase is reserved for labels.** Only captions and section labels get `text-transform: uppercase`. Never for body text.

## Layout & Spacing

- **Base unit:** 8px. Section vertical padding: 80px. Cards: 24px.
- **Container max-width:** 1280px (standard), 1600px (large screens).
- **12-column responsive grid.** Hero full-width. Internal sections: 2/3-column layouts.
- **Whitespace as premium signal.** Every tile begins with 80px of air. Content is never crowded.

### Responsive Behavior
- **Mobile (<768px):** Single column, hamburger nav, 48px section padding.
- **Tablet (768–1023px):** 2-column layouts, condensed nav.
- **Desktop (1024–1439px):** Full layout, 12-column grid.
- **Large (≥1440px):** Content caps at 1280px/1600px.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| Flat | No shadow, no border | Full-bleed tiles, global nav, footer |
| Soft hairline | 1px hairline border | Cards, dividers |
| Card lift | `rgba(0,0,0,0.04) 0 2px 8px` | Subtle card elevation |
| Emphasized | `rgba(0,0,0,0.08) 0 4px 12px` | Interactive card hover |
| Hero overlay | `rgba(0,0,0,0.6)` | Hero overlay |

**Shadow philosophy.** Like Apple, elevation comes from surface-color change, not drop shadows. Cards at rest have no shadow — only the hairline border.

## Shapes

| Token | Value | Use |
|---|---|---|
| `none` | 0px | Full-bleed tiles |
| `xs` | 4px | Compact UI elements |
| `sm` | 8px | Navy buttons, standard cards |
| `md` | 12px | Feature cards |
| `lg` | 18px | Hero cards |
| `pill` | 9999px | Primary blue CTAs (Apple signature) |

Two grammars: **pills for primary actions**, **rectangles for everything else**.

## Components

### Global Navigation
52px black nav bar. Logo left, links center, "Book Call" pill right. Collapses to hamburger on mobile.

### Buttons
- **`button-primary`**: Blue pill (`#0d84ff`), white text, full pill radius, 11×22px padding. Active: scale(0.95).
- **`button-secondary-pill`**: Transparent, blue text + border, full pill radius. Ghost pill.
- **`button-navy`**: Navy rect (`#00172e`), white text, 8px radius, 14×28px. Hover: fills blue.
- **`button-ghost`**: Transparent, navy text, hairline border, 8px radius.

### Tiles
Full-bleed edge-to-edge section containers (light/parchment/navy/black), 80px vertical padding, no corner rounding. The color change IS the section divider.

### Cards
12px radius, 1px hairline border, 24–32px padding. No shadow at rest.

### Section Dividers
1px hairline (`#b2d5ff` light / `#143d8d` dark) with 3px square markers.

## Do's and Don'ts

### Do
- Use `#0d84ff` for every interactive element — the single accent is non-negotiable.
- Use system-ui / Inter for all typography — SF Pro system on Apple, Inter substitute on other platforms.
- Set headlines with negative letter-spacing (`-0.02em` to `-0.015em`) for the signature tight cadence.
- Alternate light and dark tiles for section rhythm — the color change IS the divider.
- Reserve pill radius (`rounded-full`) for the primary blue CTA only.
- Keep the global nav true black — it's the only place pure black appears.
- Use 80px vertical padding inside every section tile.

### Don't
- Don't introduce a second accent color — every "click me" is Signal Blue.
- Don't use serif fonts — this is an SF Pro / Inter system.
- Don't add shadows to cards at rest — elevation is for interactive states only.
- Don't use decorative gradients — atmosphere comes from content.
- Don't round full-bleed tiles — they are edge-to-edge rectangles.
- Don't mix radii grammars — pills for CTAs, rectangles for everything else.
- Don't use all-caps for body text — labels and captions only.
