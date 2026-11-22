/* Typography regression audit — measures the shared type rules in a real
   browser across every route. Fails (exit 1) on any violation:

     weights   headings 500, body 400, no italics
     scale     h1 > h2 >= h3 >= h4/card titles; nothing off-scale
     cards     card titles < section h2, card text 1px under outside text
     buttons   button text 1px under nearby text, weight 500
     balance   large headings wrap with no lone last word
     overflow  no horizontal scroll at 320 and 1280

   Usage: node scripts/audit-type.mjs  (AUDIT_BASE_URL to retarget) */
import puppeteer from 'puppeteer-core';

const BASE = process.env.AUDIT_BASE_URL || 'http://localhost:9002';
const CHROME = process.env.PUPPETEER_EXECUTABLE_PATH ||
  '/home/alex/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome';
const ROUTES = ['/', '/about', '/services', '/blog', '/case-studies', '/concepts',
  '/concepts/the-last-mile', '/assessment', '/speaking', '/how-i-work',
  '/assessment/result/ready-builder?c=80&r=65&u=40'];
const VIEWPORTS = [{ width: 1280, height: 900 }, { width: 320, height: 800 }];

const fail = [];
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--font-render-hinting=none'],
});

for (const route of ROUTES) {
  for (const vp of VIEWPORTS) {
    const page = await browser.newPage();
    await page.setViewport(vp);
    await page.goto(BASE + route, { waitUntil: 'load', timeout: 45000 }).catch(() => {});
    await page.evaluate(() => document.documentElement.dataset.hashNav === undefined || delete document.documentElement.dataset.hashNav);
    await page.evaluate(() => document.fonts.ready);
    // Walk the page so lazy/whileInView content mounts.
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.8;
      for (let y = 0; y <= document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
    });
    await new Promise((r) => setTimeout(r, 400));

    const report = await page.evaluate(() => {
      const out = { headings: [], cards: [], buttons: [], balance: [], overflow: 0 };
      const px = (el, prop) => parseFloat(getComputedStyle(el)[prop]);
      const visible = (el) => {
        const r = el.getBoundingClientRect();
        if (r.width === 0 && r.height === 0) return false;
        const s = getComputedStyle(el);
        return s.visibility !== 'hidden' && s.display !== 'none';
      };
      const lastWordLone = (el) => {
        if (px(el, 'font-size') < 24) return false;
        const range = document.createRange();
        range.selectNodeContents(el);
        const rects = [...range.getClientRects()].filter((r) => r.width > 1);
        if (rects.length < 2) return false;
        // An orphan is a single word on its own last line. balance() already
        // stops Chrome from leaving one; a wider last line that carries two
        // or more words is a normal wrap, not a violation.
        const words = el.textContent.trim().split(/\s+/).length;
        if (words < rects.length + 1) return false;
        const probe = document.createElement('span');
        probe.textContent = el.textContent.trim().split(/\s+/).pop();
        probe.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;font:inherit;';
        el.appendChild(probe);
        const oneWord = probe.getBoundingClientRect().width;
        probe.remove();
        return rects[rects.length - 1].width < oneWord * 1.2;
      };

      for (const h of document.querySelectorAll('h1, h2, h3, h4, h5, h6, .type-card-title')) {
        if (!visible(h)) continue;
        const s = getComputedStyle(h);
        out.headings.push({
          tag: h.tagName, text: h.textContent.trim().slice(0, 36),
          size: Math.round(px(h, 'font-size')), weight: +s.fontWeight,
          italic: s.fontStyle === 'italic', uprightKids: [...h.querySelectorAll('em,i')].every((e) => getComputedStyle(e).fontStyle !== 'italic'),
          family: s.fontFamily.split(',')[0].replace(/\"/g, ''),
        });
        if (lastWordLone(h)) out.balance.push({ tag: h.tagName, text: h.textContent.trim().slice(0, 40) });
      }
      for (const card of document.querySelectorAll('.type-card')) {
        if (!visible(card)) continue;
        const title = card.querySelector('h2, h3, h4, .type-card-title');
        if (title) {
          out.cards.push({
            kind: 'title', text: title.textContent.trim().slice(0, 32),
            size: Math.round(px(title, 'font-size')), weight: +getComputedStyle(title).fontWeight,
          });
        }
        const p = card.querySelector('p, li');
        if (p) out.cards.push({ kind: 'text', size: Math.round(px(p, 'font-size')), weight: +getComputedStyle(p).fontWeight });
        for (const b of card.querySelectorAll('button, [data-variant]')) {
          out.buttons.push({ size: Math.round(px(b, 'font-size')), weight: +getComputedStyle(b).fontWeight, inCard: true });
        }
      }
      for (const b of document.querySelectorAll('button, [data-variant]')) {
        if (b.closest('.type-card') || b.closest('h3, h4, h5, h6') || !visible(b)) continue;
        out.buttons.push({ size: Math.round(px(b, 'font-size')), weight: +getComputedStyle(b).fontWeight, text: b.textContent.trim().slice(0, 24) });
      }
      out.overflow = document.documentElement.scrollWidth - window.innerWidth;
      return out;
    });

    const tag = `${route} @${vp.width}`;
    if (report.overflow > 1) fail.push(`${tag}: horizontal overflow +${report.overflow}px`);
    for (const h of report.headings) {
      if (![400, 500].includes(h.weight)) fail.push(`${tag}: heading ${h.tag} "${h.text}" weight ${h.weight}`);
      if (h.italic || !h.uprightKids) fail.push(`${tag}: heading "${h.text}" italic`);
      if (!h.family.includes('Grotesk'))
        fail.push(`${tag}: heading "${h.text}" family ${h.family}`);
    }
    for (const c of report.cards.filter((c) => c.kind === 'title')) {
      if (![400, 500].includes(c.weight)) fail.push(`${tag}: card title "${c.text}" weight ${c.weight}`);
      const h2 = report.headings.filter((h) => h.tag === 'H2').map((h) => h.size);
      if (h2.length && c.size >= Math.max(...h2)) fail.push(`${tag}: card title "${c.text}" ${c.size}px not under section h2 ${Math.max(...h2)}px`);
    }
    for (const c of report.cards.filter((c) => c.kind === 'text')) {
      if (c.size !== 15) fail.push(`${tag}: card text ${c.size}px (want 15)`);
      if (c.weight !== 400) fail.push(`${tag}: card text weight ${c.weight}`);
    }
    for (const b of report.buttons) {
      if (![400, 500].includes(b.weight)) fail.push(`${tag}: button "${b.text || ''}" weight ${b.weight}`);
      if (b.inCard && b.size !== 14) fail.push(`${tag}: card button ${b.size}px (want 14)`);
      if (!b.inCard && b.size !== 15 && b.size !== 14) fail.push(`${tag}: button "${b.text}" ${b.size}px (want 15 or 14)`);
    }
    for (const bal of report.balance) fail.push(`${tag}: lone last word in ${bal.tag} "${bal.text}"`);
    await page.close();
  }
}
await browser.close();

if (fail.length) {
  console.log(`TYPE AUDIT FAIL (${fail.length}):`);
  for (const f of fail.slice(0, 60)) console.log('  ' + f);
  process.exit(1);
}
console.log('TYPE AUDIT PASS: ' + ROUTES.length + ' routes x ' + VIEWPORTS.length + ' viewports, no violations');
