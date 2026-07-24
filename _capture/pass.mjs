#!/usr/bin/env node
/**
 * Pass capture for thearmchairfuturist.com
 * - Fresh incognito context per pass (no cookies, no storage)
 * - Viewports: mobile 375x812, tablet 768x1024, desktop 1440x900
 * - Modes: light + dark (dark only when site supports it)
 * - Pages: homepage, one representative article, one conversion/landing
 *
 * Usage:
 *   node _capture/pass.mjs <passN> [pages...]   # default: homepage only
 *
 * Examples:
 *   node _capture/pass.mjs 1
 *   node _capture/pass.mjs 1 homepage article
 */
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const BASE = process.env.SITE || 'https://thearmchairfuturist.com';
const OUT = process.env.OUT || './_capture';
const PASS = process.argv[2] || `pass${Date.now()}`;
const PAGES = (process.argv.slice(3).length ? process.argv.slice(3) : ['homepage'])
  .map((p) => p.toLowerCase());

const VIEWPORTS = [
  { name: 'mobile', w: 375, h: 812 },
  { name: 'tablet', w: 768, h: 1024 },
  { name: 'desktop', w: 1440, h: 900 },
];

const MODES = ['light', 'dark'];

// Default URL plan per page slug
const PAGE_URLS = {
  homepage: '/',
  article: '/blog',
  landing: '/assessment',
};

const UA =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';

function cssOf(el) {
  if (!el) return null;
  const cs = getComputedStyle(el);
  const r = el.getBoundingClientRect();
  return {
    rect: { x: r.x, y: r.y, w: r.width, h: r.height },
    bg: cs.backgroundColor,
    bgImage: cs.backgroundImage,
    color: cs.color,
    font: cs.fontFamily,
    fontSize: cs.fontSize,
    fontWeight: cs.fontWeight,
    lineHeight: cs.lineHeight,
    letterSpacing: cs.letterSpacing,
    textTransform: cs.textTransform,
    borderRadius: cs.borderRadius,
    boxShadow: cs.boxShadow,
    opacity: cs.opacity,
    transform: cs.transform,
    padding: cs.padding,
    margin: cs.margin,
    display: cs.display,
    position: cs.position,
    zIndex: cs.zIndex,
    gap: cs.gap,
  };
}

const PROBE_SELECTORS = [
  'main > section:nth-of-type(1)',
  'header',
  'footer',
  '#case-studies',
  '#testimonials',
  '#stats',
  '#what-this-is-not',
  '#services',
  '#about-me',
  '#ai-guidance',
  '#roi-calculator',
  '#latest-insights',
  '#faq',
  '#connect',
];

async function capturePage(page, url, vp, mode, dir) {
  // Force color scheme
  await page.emulateMedia({ colorScheme: mode });
  await page.setViewportSize({ width: vp.w, height: vp.h });
  const t0 = Date.now();
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.waitForLoadState('load', { timeout: 60000 }).catch(() => {});
  const tLoad = Date.now() - t0;
  await page.waitForTimeout(2500);

  // Scroll-to-bottom-and-back to attach IntersectionObserver-triggered work
  await page.evaluate(async () => {
    await new Promise((res) => {
      let y = 0;
      const step = () => {
        window.scrollTo(0, y);
        y += 700;
        if (y < document.body.scrollHeight) setTimeout(step, 60);
        else {
          window.scrollTo(0, 0);
          res();
        }
      };
      step();
    });
  });
  await page.waitForTimeout(1200);

  // Lighthouse-style web vitals
  const webVitals = await page.evaluate(() => {
    return new Promise((resolve) => {
      const result = { lcp: null, cls: 0, inbSamples: [] };
      try {
        new PerformanceObserver((list) => {
          for (const e of list.getEntries()) {
            result.lcp = e.startTime;
          }
        }).observe({ type: 'largest-contentful-paint', buffered: true });
      } catch {}
      try {
        new PerformanceObserver((list) => {
          for (const e of list.getEntries()) {
            if (!e.hadRecentInput) result.cls += e.value;
          }
        }).observe({ type: 'layout-shift', buffered: true });
      } catch {}
      const nav = performance.getEntriesByType('navigation')[0];
      result.fcp = nav
        ? performance.getEntriesByName('first-contentful-paint')[0]?.startTime
        : null;
      result.domContentLoaded = nav?.domContentLoadedEventEnd || null;
      result.load = nav?.loadEventEnd || null;
      result.ttfb = nav?.responseStart || null;
      result.transferSize = nav?.transferSize || null;
      result.encodedBodySize = nav?.encodedBodySize || null;
      setTimeout(() => resolve(result), 1500);
    });
  });

  const data = await page.evaluate((probes) => {
    const q = (s, c = document) => c.querySelector(s);
    const qa = (s, c = document) => Array.from(c.querySelectorAll(s));

    const sections = qa('section').map((s, i) => {
      const cs = getComputedStyle(s);
      const r = s.getBoundingClientRect();
      return {
        i,
        id: s.id,
        cls: (typeof s.className === 'string' ? s.className : '').slice(0, 200),
        rect: { y: r.y, h: r.height, w: r.width },
        bg: cs.backgroundColor,
        text: (s.innerText || '').slice(0, 600),
        ariaLabel: s.getAttribute('aria-label'),
      };
    });

    const headings = qa('h1,h2,h3').slice(0, 30).map((h) => ({
      tag: h.tagName.toLowerCase(),
      text: (h.innerText || '').trim().slice(0, 180),
      size: getComputedStyle(h).fontSize,
      weight: getComputedStyle(h).fontWeight,
      color: getComputedStyle(h).color,
      lh: getComputedStyle(h).lineHeight,
    }));

    const imgs = qa('img').slice(0, 30).map((i) => ({
      src: i.getAttribute('src'),
      alt: i.getAttribute('alt'),
      w: i.getBoundingClientRect().width,
      h: i.getBoundingClientRect().height,
      loading: i.loading,
      decoding: i.decoding,
    }));

    const links = qa('a').slice(0, 60).map((a) => ({
      text: (a.innerText || '').trim().slice(0, 60),
      href: a.getAttribute('href'),
    }));

    const buttons = qa('button, [role="button"]').slice(0, 30).map((b) => ({
      text: (b.innerText || '').trim().slice(0, 60),
      bg: getComputedStyle(b).backgroundColor,
      color: getComputedStyle(b).color,
      borderRadius: getComputedStyle(b).borderRadius,
      padding: getComputedStyle(b).padding,
    }));

    const forms = qa('form').map((f) => ({
      action: f.getAttribute('action'),
      method: f.getAttribute('method'),
      inputs: qa('input,textarea,select', f).map((i) => ({
        type: i.getAttribute('type') || i.tagName.toLowerCase(),
        name: i.getAttribute('name'),
        placeholder: i.getAttribute('placeholder'),
      })),
    }));

    const meta = {
      title: document.title,
      desc: q('meta[name="description"]')?.getAttribute('content'),
      canonical: q('link[rel="canonical"]')?.getAttribute('href'),
      ogTitle: q('meta[property="og:title"]')?.getAttribute('content'),
      ogDesc: q('meta[property="og:description"]')?.getAttribute('content'),
      ogImage: q('meta[property="og:image"]')?.getAttribute('content'),
      twitterCard: q('meta[name="twitter:card"]')?.getAttribute('content'),
      hasLdJson: !!q('script[type="application/ld+json"]'),
    };

    const probeResults = {};
    for (const sel of probes) {
      const el = q(sel);
      if (el)
        probeResults[sel] = {
          rect: el.getBoundingClientRect(),
          text: (el.innerText || '').slice(0, 400),
        };
    }

    const root = getComputedStyle(document.documentElement);
    const cssVars = {};
    [
      '--background',
      '--foreground',
      '--primary',
      '--secondary',
      '--border',
      '--radius',
      '--font-body',
      '--font-display',
      '--hp-electric',
      '--hp-bright',
      '--hp-deep',
      '--hp-soft',
      '--ink',
      '--canvas',
      '--cloud',
      '--fog',
    ].forEach((v) => {
      cssVars[v] = root.getPropertyValue(v).trim();
    });

    return {
      docHeight: document.documentElement.scrollHeight,
      viewport: { w: window.innerWidth, h: window.innerHeight, dpr: window.devicePixelRatio },
      meta,
      cssVars,
      sections,
      headings,
      imgs,
      links,
      buttons,
      forms,
      probes: probeResults,
    };
  }, PROBE_SELECTORS);

  // Screenshots
  const fold = `${dir}/${vp.name}-${mode}-fold.png`;
  const full = `${dir}/${vp.name}-${mode}-full.png`;
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.screenshot({ path: fold, fullPage: false });
  await page.screenshot({ path: full, fullPage: true });

  return { url, vp, mode, tLoad, webVitals, data, paths: { fold, full } };
}

async function main() {
  const dir = join(OUT, PASS);
  mkdirSync(dir, { recursive: true });

  // Fresh, isolated browser context per pass — no cookies / storage (incognito-like)
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    userAgent: UA,
    bypassCSP: true,
  });

  // Block any ambient cookies / storage by clearing on first nav (defensive)
  const page = await ctx.newPage();

  const all = [];
  for (const pageSlug of PAGES) {
    const url = BASE + (PAGE_URLS[pageSlug] || `/${pageSlug}`);
    for (const vp of VIEWPORTS) {
      for (const mode of MODES) {
        try {
          const cap = await capturePage(page, url, vp, mode, dir);
          all.push(cap);
          console.log(
            `${PASS} ${pageSlug} ${vp.name} ${mode} ok | lcp=${cap.webVitals.lcp?.toFixed(0)} cls=${cap.webVitals.cls.toFixed(3)} ttfb=${cap.webVitals.ttfb?.toFixed(0)}`,
          );
        } catch (e) {
          console.error(`${PASS} ${pageSlug} ${vp.name} ${mode} FAILED`, e.message);
          all.push({ pageSlug, url, vp, mode, error: e.message });
        }
      }
    }
  }

  writeFileSync(`${dir}/data.json`, JSON.stringify(all, null, 2));
  console.log(`saved ${dir}/data.json (${all.length} captures)`);
  await ctx.close();
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
