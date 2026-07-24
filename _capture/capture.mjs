import { chromium } from 'playwright';

const URL = 'https://thearmchairfuturist.com';
const OUT = './_capture';

const viewports = [
  { name: 'desktop', w: 1440, h: 900 },
  { name: 'tablet', w: 834, h: 1112 },
  { name: 'mobile', w: 390, h: 844 },
];

const main = async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
  });
  const page = await ctx.newPage();
  const allData = {};

  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.w, height: vp.h });
    await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 90000 }); await page.waitForLoadState('load', { timeout: 60000 }).catch(() => {}); await page.waitForTimeout(5000);
    await page.waitForTimeout(2500);
    // Scroll to bottom and back so any IntersectionObserver-triggered animations attach
    await page.evaluate(async () => {
      await new Promise((res) => {
        let y = 0;
        const step = () => {
          window.scrollTo(0, y);
          y += 800;
          if (y < document.body.scrollHeight) setTimeout(step, 80);
          else { window.scrollTo(0, 0); res(); }
        };
        step();
      });
    });
    await page.waitForTimeout(1500);

    const data = await page.evaluate(() => {
      const q = (s, c = document) => c.querySelector(s);
      const qa = (s, c = document) => Array.from(c.querySelectorAll(s));
      const css = (el) => {
        if (!el) return null;
        const cs = getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return {
          rect: { x: rect.x, y: rect.y, w: rect.width, h: rect.height },
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
          flexDirection: cs.flexDirection,
          gridTemplateColumns: cs.gridTemplateColumns,
        };
      };
      const sections = qa('section').map((s, i) => {
        const cs = getComputedStyle(s);
        const r = s.getBoundingClientRect();
        return {
          i,
          id: s.id,
          cls: s.className,
          rect: { x: r.x, y: r.y, w: r.width, h: r.height },
          bg: cs.backgroundColor,
          bgImage: cs.backgroundImage,
          text: s.innerText.slice(0, 1000),
          ariaLabel: s.getAttribute('aria-label'),
        };
      });
      const headings = qa('h1,h2,h3,h4').map((h) => {
        const cs = getComputedStyle(h);
        const r = h.getBoundingClientRect();
        return {
          tag: h.tagName.toLowerCase(),
          text: h.innerText.trim().slice(0, 200),
          rect: { x: r.x, y: r.y, w: r.width, h: r.height },
          css: {
            font: cs.fontFamily,
            size: cs.fontSize,
            weight: cs.fontWeight,
            color: cs.color,
            lh: cs.lineHeight,
            ls: cs.letterSpacing,
            tt: cs.textTransform,
          },
        };
      });
      const links = qa('a').map((a) => ({
        text: a.innerText.trim().slice(0, 80),
        href: a.getAttribute('href'),
      })).filter((a) => a.text || a.href);
      const imgs = qa('img').map((i) => ({
        src: i.getAttribute('src'),
        alt: i.getAttribute('alt'),
        w: i.getBoundingClientRect().width,
        h: i.getBoundingClientRect().height,
        objectFit: getComputedStyle(i).objectFit,
        borderRadius: getComputedStyle(i).borderRadius,
      }));
      const videos = qa('video').map((v) => ({ src: v.currentSrc || v.src, poster: v.poster }));
      const buttons = qa('button, [role="button"], a[class*="button"], a[class*="Button"]').map((b) => {
        const cs = getComputedStyle(b);
        return {
          text: b.innerText.trim().slice(0, 80),
          css: {
            bg: cs.backgroundColor,
            color: cs.color,
            font: cs.fontFamily,
            fontSize: cs.fontSize,
            fontWeight: cs.fontWeight,
            padding: cs.padding,
            borderRadius: cs.borderRadius,
            border: cs.border,
            display: cs.display,
          },
        };
      });
      // Animation detection
      const animations = [];
      const all = qa('*');
      for (const el of all.slice(0, 5000)) {
        const cs = getComputedStyle(el);
        if (cs.animationName && cs.animationName !== 'none') {
          animations.push({
            tag: el.tagName.toLowerCase(),
            cls: typeof el.className === 'string' ? el.className.slice(0, 100) : '',
            name: cs.animationName,
            duration: cs.animationDuration,
            timing: cs.animationTimingFunction,
            delay: cs.animationDelay,
            iteration: cs.animationIterationCount,
            direction: cs.animationDirection,
          });
        }
        if (cs.transitionProperty && cs.transitionProperty !== 'all' && cs.transitionProperty !== 'none' && cs.transitionDuration !== '0s') {
          // just track presence
        }
      }
      // Marquee / scroller detection
      const scrollers = qa('[class*="marquee"], [class*="scroll"], [class*="ticker"], [data-marquee], [style*="translateX"], [style*="animation"]').slice(0, 50).map((el) => ({
        tag: el.tagName.toLowerCase(),
        cls: typeof el.className === 'string' ? el.className.slice(0, 120) : '',
        text: el.innerText.slice(0, 200),
      }));
      // Computed layout of header / nav
      const header = q('header') || q('nav') || q('[class*="Header"]');
      const nav = q('nav');
      // Body bg-shell elements
      const bgShell = qa('[class*="bg-"]').map((el) => el.className).slice(0, 30);
      // Specific element probes for fidelity
      const probes = {};
      const probeSelectors = [
        'main > section:nth-of-type(1)', // hero
        'main > section:nth-of-type(2)', // logo ticker
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
      for (const sel of probeSelectors) {
        const el = q(sel);
        if (el) probes[sel] = { rect: el.getBoundingClientRect(), text: el.innerText.slice(0, 600), cls: el.className };
      }
      // Hero h1 specific styling
      const heroH1 = q('main > section:nth-of-type(1) h1');
      // Style of the heading letters (data-text used in some designs)
      const headingLetters = qa('h1 span, [data-text]').map((el) => ({
        text: el.innerText || el.getAttribute('data-text') || '',
        cls: el.className,
        css: css(el),
      })).slice(0, 60);
      // CSS custom properties
      const cssVars = {};
      const root = getComputedStyle(document.documentElement);
      ['--hp-electric', '--hp-bright', '--hp-deep', '--hp-soft', '--ink', '--canvas', '--cloud', '--fog',
       '--background', '--foreground', '--primary', '--secondary', '--border', '--radius', '--font-body', '--font-display'].forEach((v) => {
        cssVars[v] = root.getPropertyValue(v).trim();
      });
      return {
        docHeight: document.documentElement.scrollHeight,
        viewport: { w: window.innerWidth, h: window.innerHeight, dpr: window.devicePixelRatio },
        sections,
        headings,
        links,
        imgs,
        videos,
        buttons,
        animations: animations.slice(0, 100),
        scrollers,
        bgShell,
        probes,
        heroH1: heroH1 ? { text: heroH1.innerText, css: css(heroH1), rect: heroH1.getBoundingClientRect() } : null,
        headingLetters,
        cssVars,
        headerCss: header ? css(header) : null,
        navLinks: qa('header a, nav a').map((a) => ({ text: a.innerText.trim(), href: a.getAttribute('href') })),
      };
    });

    // Take full-page screenshot
    const path = `${OUT}/${vp.name}-full.png`;
    await page.screenshot({ path, fullPage: true });

    // Take above-the-fold screenshot
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    const pathFold = `${OUT}/${vp.name}-fold.png`;
    await page.screenshot({ path: pathFold, fullPage: false });

    // Hover-to-pause detection for testimonials scroller
    const hover = await page.evaluate(async () => {
      const test = document.querySelector('#testimonials');
      if (!test) return null;
      test.scrollIntoView({ block: 'center' });
      await new Promise((r) => setTimeout(r, 600));
      const tracks = test.querySelectorAll('[class*="marquee"], [class*="ticker"], [class*="track"], [style*="translateX"]');
      return Array.from(tracks).slice(0, 8).map((t) => ({
        cls: t.className,
        style: t.getAttribute('style'),
        rect: t.getBoundingClientRect(),
        childCount: t.children.length,
      }));
    });

    allData[vp.name] = { data, hover, paths: { full: path, fold: pathFold } };
  }

  // Also collect viewport transition snapshots at 1024 (lg breakpoint) and 768 (md)
  for (const vp of [{ name: 'lg-1024', w: 1024, h: 768 }, { name: 'md-768', w: 768, h: 1024 }]) {
    await page.setViewportSize({ width: vp.w, height: vp.h });
    await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 }); await page.waitForTimeout(3500);
    await page.waitForTimeout(2000);
    const path = `${OUT}/${vp.name}-fold.png`;
    await page.screenshot({ path });
    allData[vp.name] = { paths: { fold: path } };
  }

  const fs = await import('fs');
  fs.writeFileSync(`${OUT}/source.json`, JSON.stringify(allData, null, 2));
  console.log(JSON.stringify({ sizes: Object.keys(allData), ok: true }, null, 2));

  await browser.close();
};

main().catch((e) => { console.error(e); process.exit(1); });
