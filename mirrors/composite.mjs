#!/usr/bin/env node
/**
 * Build a 3x3 composite image: source / pencil / forge across desktop/tablet/mobile.
 * Uses the page DOM-screenshot approach — fullPage captures get rendered,
 * then stitched via Playwright.
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'mirrors', 'out');

const rows = ['source', 'pencil', 'forge'];
const cols = [
  { name: 'desktop', w: 1440, label: 'Desktop 1440×900' },
  { name: 'tablet',  w: 834,  label: 'Tablet 834×1112' },
  { name: 'mobile',  w: 390,  label: 'Mobile 390×844' },
];

const html = `<!doctype html>
<html><head><meta charset="utf-8"/>
<title>Mirror composite</title>
<style>
  body { margin: 0; padding: 16px; background: #111; color: #eee; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
  h1 { font-size: 18px; margin: 0 0 12px; color: #9ad; font-weight: 600; }
  .grid { display: grid; grid-template-columns: 80px repeat(3, 1fr); gap: 8px; }
  .col-head { font-size: 12px; padding: 6px 8px; color: #888; }
  .row-head { display: flex; align-items: center; font-size: 12px; color: #aaa; padding: 0 8px; }
  .frame { background: #222; border: 1px solid #333; border-radius: 4px; overflow: hidden; aspect-ratio: 4/3; }
  .frame img { width: 100%; height: 100%; object-fit: cover; object-position: top; display: block; }
  .label { font-size: 11px; padding: 4px 8px; color: #bbb; background: #1a1a1a; border-bottom: 1px solid #333; }
  .stack { display: flex; flex-direction: column; height: 100%; }
  .stack img { flex: 1; width: 100%; height: auto; min-height: 0; object-fit: cover; object-position: top; }
</style></head>
<body>
<h1>Source · Pencil · Forge — desktop / tablet / mobile</h1>
<div class="grid">
  <div></div>
  ${cols.map((c) => `<div class="col-head">${c.label}</div>`).join('')}
  ${rows.map((r) => `
    <div class="row-head">${r.toUpperCase()}</div>
    ${cols.map((c) => `<div class="frame"><div class="label">${r} · ${c.name}</div><div class="stack"><img src="file://${path.join(OUT, `${r}-${c.name}.png`)}" alt="${r}-${c.name}" /></div></div>`).join('')}
  `).join('')}
</div>
</body></html>`;

const main = async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1600, height: 2400 } });
  const page = await ctx.newPage();
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(OUT, 'composite.png'), fullPage: true });
  console.log('[composite] wrote', path.join(OUT, 'composite.png'));
  await browser.close();
};

main().catch((e) => { console.error(e); process.exit(1); });
