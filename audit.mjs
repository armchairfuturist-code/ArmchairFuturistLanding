import puppeteer from 'puppeteer-core';
import fs from 'fs';

const ROUTES = [
  '/', '/about', '/blog', '/case-studies', '/concepts',
  '/concepts/accountability-gap', '/concepts/human-architect',
  '/concepts/pilot-itis', '/concepts/psychology-led-adoption',
  '/concepts/results-thinkers', '/privacy-policy', '/terms-of-service',
  '/assessment', '/admin',
  '/assessment/result/ready-builder?c=80&r=65&u=40',
];
const WIDTHS = [320,360,375,390,414,480,768,820,1024,1280,1440,1920];

const CHROME = process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium';
const BASE = process.env.AUDIT_BASE_URL || 'http://localhost:9002';

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox','--disable-setuid-sandbox','--disable-dev-shm-usage']
});

const results = [];
for (const route of ROUTES) {
  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', m => { if (m.type()==='error') consoleErrors.push(m.text()); });
  page.on('pageerror', e => consoleErrors.push('PAGEERR: '+e.message));
  for (const w of WIDTHS) {
    const h = w < 480 ? 800 : 1000;
    await page.setViewport({width:w, height:h, deviceScaleFactor:1});
    await page.goto(BASE+route, {waitUntil:'networkidle2', timeout:30000}).catch(e=>console.log('goto',route,w,e.message));
    // scroll through to trigger lazy/animation content
    await page.evaluate(async () => {
      await new Promise(r=>setTimeout(r,300));
      const step = window.innerHeight*0.8;
      for (let y=0; y<=document.body.scrollHeight; y+=step){ window.scrollTo(0,y); await new Promise(r=>setTimeout(r,40)); }
      window.scrollTo(0,0);
      await new Promise(r=>setTimeout(r,200));
    });
    const data = await page.evaluate(() => {
      const de = document.documentElement;
      const sw = de.scrollWidth, iw = window.innerWidth;
      // find horizontally overflowing elements
      const offenders = [];
      const all = document.querySelectorAll('*');
      for (const el of all) {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.right > iw + 1 && r.left < iw) {
          const tag = el.tagName.toLowerCase();
          const cls = (el.className && typeof el.className==='string') ? el.className.slice(0,80) : '';
          offenders.push({tag, right: Math.round(r.right), w: Math.round(r.width), cls});
        }
      }
      // dedupe by class+tag
      const seen = new Set(); const uniq=[];
      for (const o of offenders){ const k=o.tag+'|'+o.cls+'|'+o.right; if(!seen.has(k)){seen.add(k);uniq.push(o);} }
      return { sw, iw, overflow: sw - iw, offenders: uniq.slice(0,12), bodyH: de.scrollHeight };
    });
    if (data.overflow > 0) {
      const fname = `/tmp/shots/${route.replace(/\//g,'_')||'_root'}_${w}.png`;
      await page.screenshot({path:fname, fullPage:false}).catch(()=>{});
      results.push({route, w, overflow: data.overflow, sw: data.sw, iw: data.iw, offenders: data.offenders, errors: consoleErrors.slice(0,3), shot: fname});
      console.log(`OVERFLOW ${route} @${w}: +${data.overflow}px  offenders=${data.offenders.length} errs=${consoleErrors.length}`);
      for (const o of data.offenders.slice(0,5)) console.log(`   ${o.tag} right=${o.right} w=${o.w} .${o.cls}`);
    }
  }
  await page.close();
}
await browser.close();
fs.writeFileSync('/tmp/audit-results.json', JSON.stringify(results,null,2));
console.log('\nTOTAL ISSUES:', results.length);
