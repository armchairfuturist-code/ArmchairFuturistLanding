# Open Graph card

`public/og-card.png` is the link preview for every page. It is a designed card,
not a generated one: ink wash, the hero's orbital mark, Space Grotesk at the
hero's size, and the hero's status line.

## Regenerate

```sh
npm run og:card        # fonts from src/app/fonts/*.woff2, then render
```

The renderer needs a Chromium binary: it uses `OG_CHROME` if set, else the
Playwright cache, else `chrome`/`chromium` on PATH. The output is committed, so
CI never renders it.

## Files

- `card.html` — the layout. Sizes and spacing match the hero's own tokens.
- `organism.js` — the mark, seeded so every render is identical.
- `render.mjs` — 2x screenshot, downsampled to 1200x630.
- `fonts.py` — pins the variable faces to the weights the card uses.

`src/app/layout.tsx` names `/og-card.png` in `openGraph` and `twitter` metadata;
`next.config.ts` redirects the retired `/opengraph-image` route to it.
