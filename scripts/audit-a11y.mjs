import puppeteer from 'puppeteer-core';

/**
 * Accessibility audit: text contrast and touch-target size, across pages.
 *
 * Run against a production build:  npm run build && npx next start -p 9055
 *                                   npm run a11y:check
 * Point it elsewhere with A11Y_BASE.
 *
 * Colour strings must be resolved by painting them, not by regex. Tailwind's
 * oklch tokens compute to `lab(...)` — `bg-ink` is `lab(4.8411 0 0)` — so a
 * regex looking for rgb() silently skips the dark ancestor background and
 * reports white-on-white for the header. An earlier version of this probe did
 * exactly that and produced 212 false findings.
 *
 * Backgrounds are composited outermost-first so partial alpha is handled, and
 * the text colour is composited over that background before the ratio is taken
 * (70% white on near-black is not the same as pure white).
 *
 * KNOWN LIMIT: a <canvas> can paint over an opaque CSS background. The hero is
 * exactly that — an opaque white ancestor sits under a canvas backdrop — so any
 * control overlapping a canvas is skipped and counted separately rather than
 * reported. To check those, screenshot and read the pixels back through a
 * canvas: that method put the hero's quiet buttons at 13.6:1 where this walk
 * reported 1.16:1. Do not "fix" a control this script skips without sampling
 * its real pixels first.
 *
 * WCAG 2.2 SC 2.5.8 sets the target minimum at 24x24 CSS px. Targets inside a
 * sentence or block of text are exempt, which is why inline prose links are
 * expected here and only standalone controls are worth acting on.
 */
const CHROME = '/home/alex/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome';
const BASE = process.env.A11Y_BASE ?? 'http://localhost:9055';
const PAGES = [
  '/', '/services', '/about', '/concepts', '/concepts/the-last-mile',
  '/case-studies', '/assessment', '/audit', '/how-i-work', '/speaking',
];

const launch = () =>
  puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

const setup = () => {
  window.__resolve = (str) => {
    const cv = document.createElement('canvas');
    cv.width = cv.height = 1;
    const ctx = cv.getContext('2d');
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = str;
    ctx.fillRect(0, 0, 1, 1);
    const d = ctx.getImageData(0, 0, 1, 1).data;
    return { r: d[0], g: d[1], b: d[2], a: d[3] / 255 };
  };
  window.__over = (top, bot) => ({
    r: top.r * top.a + bot.r * (1 - top.a),
    g: top.g * top.a + bot.g * (1 - top.a),
    b: top.b * top.a + bot.b * (1 - top.a),
    a: 1,
  });
  window.__lum = (c) => {
    const f = (v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
  };
  window.__ratio = (a, c) => {
    const L1 = window.__lum(a), L2 = window.__lum(c);
    return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
  };
};

const probe = async (browser, width, height) => {
  const p = await browser.newPage();
  await p.setViewport({ width, height, isMobile: width < 500, hasTouch: width < 500 });

  const results = {};
  for (const path of PAGES) {
    await p.goto(BASE + path, { waitUntil: 'domcontentloaded', timeout: 120000 });
    await new Promise((r) => setTimeout(r, 2200));
    await p.evaluate(setup);
    await p.evaluate(async () => {
      const s = window.innerHeight * 0.7;
      for (let y = 0; y <= document.body.scrollHeight; y += s) {
        window.scrollTo(0, y);
        await new Promise((z) => setTimeout(z, 55));
      }
      window.scrollTo(0, 0);
    });
    await new Promise((r) => setTimeout(r, 400));

    results[path] = await p.evaluate(() => {
      const out = [];
      for (const el of document.querySelectorAll('a,button')) {
        const rect = el.getBoundingClientRect();
        if (rect.width < 8 || rect.height < 8) continue;
        const cs = getComputedStyle(el);
        if (cs.visibility === 'hidden' || cs.display === 'none') continue;
        if (parseFloat(cs.opacity) < 0.1) continue;

        const text = (el.innerText || el.getAttribute('aria-label') || '')
          .replace(/\s+/g, ' ')
          .trim()
          .slice(0, 30);
        if (!text) continue;

        const chain = [];
        let n = el;
        while (n && n !== document.documentElement) {
          chain.push(getComputedStyle(n).backgroundColor);
          n = n.parentElement;
        }
        let bg = { r: 255, g: 255, b: 255, a: 1 };
        for (const c of chain.reverse()) {
          const parsed = window.__resolve(c);
          if (parsed.a > 0) bg = window.__over(parsed, bg);
        }

        // An opaque ancestor is not enough: a <canvas> can paint over it. The
        // hero has an opaque white ancestor and a canvas backdrop, so the walk
        // reports its dark surface as light grey. Treat any canvas overlapping
        // the control as the real surface and refuse to trust the reading.
        let canvasBacked = false;
        for (const cv of document.querySelectorAll('canvas')) {
          const cr = cv.getBoundingClientRect();
          if (cr.width < 2 || cr.height < 2) continue;
          const overlaps =
            cr.left < rect.right && cr.right > rect.left &&
            cr.top < rect.bottom && cr.bottom > rect.top;
          if (overlaps) { canvasBacked = true; break; }
        }

        const fgRaw = window.__resolve(cs.color);
        const fg = fgRaw.a < 1 ? window.__over(fgRaw, bg) : fgRaw;

        out.push({
          text,
          cr: +window.__ratio(fg, bg).toFixed(2),
          fg: cs.color,
          bg: `rgb(${Math.round(bg.r)}, ${Math.round(bg.g)}, ${Math.round(bg.b)})`,
          h: Math.round(rect.height),
          w: Math.round(rect.width),
          // WCAG 2.2 SC 2.5.8 asks for 24x24 CSS px.
          small: rect.height < 24 || rect.width < 24,
          canvasBacked,
        });
      }
      return out;
    });
  }
  await p.close();
  return results;
};

const b = await launch();
const desktop = await probe(b, 1440, 900);
const mobile = await probe(b, 390, 844);
await b.close();

const lowText = [];
const canvasBacked = [];
for (const [path, items] of Object.entries(desktop)) {
  for (const it of items) {
    if (it.cr >= 4.5) continue;
    if (it.canvasBacked) canvasBacked.push({ path, ...it });
    else lowText.push({ path, ...it });
  }
}
lowText.sort((a, c) => a.cr - c.cr);

const smallTargets = [];
for (const [path, items] of Object.entries(mobile)) {
  for (const it of items) if (it.small) smallTargets.push({ path, ...it });
}

console.log(`=== text contrast below 4.5:1 on a CSS background (desktop): ${lowText.length} ===`);
for (const x of lowText.slice(0, 25)) {
  console.log(`  ${String(x.cr).padStart(5)}  ${x.path.padEnd(24)} "${x.text}"  fg=${x.fg} bg=${x.bg}`);
}
console.log(
  `\n=== skipped, canvas-backed surface (needs pixel sampling): ${canvasBacked.length} ===`,
);
const cb = new Set();
for (const x of canvasBacked) cb.add(`${x.path} "${x.text}"`);

console.log(`\n=== controls under 24x24 on mobile (WCAG 2.2 AA): ${smallTargets.length} ===`);
const seen = new Set();
for (const x of smallTargets) {
  const k = x.text + x.h + x.w;
  if (seen.has(k)) continue;
  seen.add(k);
  console.log(`  ${x.w}x${x.h}  ${x.path.padEnd(24)} "${x.text}"`);
}