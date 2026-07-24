#!/usr/bin/env node
/**
 * Capture both mirrors at 3 viewports, compute per-section fidelity signals,
 * and write a comparison JSON + composite PNG.
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'mirrors', 'out');
const BASE = 'http://localhost:4317';

const targets = [
  { name: 'source', url: 'https://thearmchairfuturist.com' },
  { name: 'pencil', url: `${BASE}/pencil` },
  { name: 'forge',  url: `${BASE}/forge` },
];

const viewports = [
  { name: 'desktop', w: 1440, h: 900 },
  { name: 'tablet',  w: 834,  h: 1112 },
  { name: 'mobile',  w: 390,  h: 844 },
];

fs.mkdirSync(OUT, { recursive: true });

const extract = async (page) => page.evaluate(() => {
  const q = (s, c = document) => c.querySelector(s);
  const qa = (s, c = document) => Array.from(c.querySelectorAll(s));
  const css = (el) => {
    if (!el) return null;
    const cs = getComputedStyle(el);
    return {
      bg: cs.backgroundColor, color: cs.color,
      font: cs.fontFamily, fontSize: cs.fontSize, fontWeight: cs.fontWeight,
      letterSpacing: cs.letterSpacing, textTransform: cs.textTransform,
      borderRadius: cs.borderRadius, padding: cs.padding,
    };
  };
  const sections = qa('section, header, footer').map((s, i) => {
    const cs = getComputedStyle(s);
    const r = s.getBoundingClientRect();
    return {
      i, tag: s.tagName.toLowerCase(), id: s.id,
      h: Math.round(r.h), y: Math.round(r.y),
      bg: cs.backgroundColor, bgImage: cs.backgroundImage,
      text: s.innerText.slice(0, 600),
    };
  });
  const headings = qa('h1,h2,h3,h4').slice(0, 40).map((h) => {
    const cs = getComputedStyle(h);
    return {
      tag: h.tagName.toLowerCase(),
      text: h.innerText.trim().slice(0, 120),
      font: cs.fontFamily, size: cs.fontSize, weight: cs.fontWeight,
      color: cs.color, tt: cs.textTransform, ls: cs.letterSpacing,
    };
  });
  const buttons = qa('button, a[class*="btn"], a[class*="button"]').slice(0, 20).map((b) => {
    const cs = getComputedStyle(b);
    return {
      text: b.innerText.trim().slice(0, 60),
      bg: cs.backgroundColor, color: cs.color,
      borderRadius: cs.borderRadius, padding: cs.padding,
      fontWeight: cs.fontWeight, fontSize: cs.fontSize,
    };
  });
  const anims = qa('*').slice(0, 6000).reduce((acc, el) => {
    const cs = getComputedStyle(el);
    if (cs.animationName && cs.animationName !== 'none') {
      acc.push({ name: cs.animationName, dur: cs.animationDuration, iter: cs.animationIterationCount });
    }
    return acc;
  }, []).slice(0, 30);
  return {
    docHeight: document.documentElement.scrollHeight,
    sections, headings, buttons, anims,
    h1: q('h1')?.innerText || null,
    cssVars: (() => {
      const out = {};
      const r = getComputedStyle(document.documentElement);
      ['--hp-electric', '--hp-deep', '--ink', '--canvas', '--cloud', '--font-body', '--font-display'].forEach((v) => { out[v] = r.getPropertyValue(v).trim(); });
      return out;
    })(),
  };
});

const main = async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();

  const all = {};

  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.w, height: vp.h });
    for (const t of targets) {
      console.log(`→ ${t.name} @ ${vp.name} (${vp.w}x${vp.h})`);
      try {
        await page.goto(t.url, { waitUntil: 'domcontentloaded', timeout: 60000 });
        await page.waitForLoadState('load', { timeout: 30000 }).catch(() => {});
        await page.waitForTimeout(2500);
        // scroll-bottom-up to trigger IO animations
        await page.evaluate(async () => {
          await new Promise((r) => {
            let y = 0;
            const step = () => { window.scrollTo(0, y); y += 600; if (y < document.body.scrollHeight) setTimeout(step, 60); else { window.scrollTo(0, 0); r(); } };
            step();
          });
        });
        await page.waitForTimeout(800);
        const data = await extract(page);
        const file = path.join(OUT, `${t.name}-${vp.name}.png`);
        await page.screenshot({ path: file, fullPage: true });
        all[`${t.name}@${vp.name}`] = { data, file };
      } catch (e) {
        console.log(`  ! ${t.name}@${vp.name}: ${e.message}`);
        all[`${t.name}@${vp.name}`] = { error: e.message };
      }
    }
  }

  fs.writeFileSync(path.join(OUT, 'comparison.json'), JSON.stringify(all, null, 2));
  console.log(`[done] ${path.relative(ROOT, path.join(OUT, 'comparison.json'))}`);
  await browser.close();
};

main().catch((e) => { console.error(e); process.exit(1); });
