import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: process.env.HOME + '/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome', headless: 'new', args: ['--no-sandbox','--disable-dev-shm-usage'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:9002/', { waitUntil: 'load', timeout: 60000 });
await new Promise(r => setTimeout(r, 2500));
const r = await page.evaluate(() => {
  const p = [...document.querySelectorAll('p')].find(el => el.className.includes('line-clamp-7'));
  if (!p) return 'no element';
  const cs = getComputedStyle(p);
  return { display: cs.display, webkitBoxOrient: cs.webkitBoxOrient, webkitLineClamp: cs.webkitLineClamp, overflow: cs.overflow, height: Math.round(p.getBoundingClientRect().height) };
});
console.log(JSON.stringify(r));
await browser.close();
