// CRO pass harness: walks / -> /assessment -> quiz -> result in a FRESH browser
// (no persisted cookies/storage — puppeteer launches an ephemeral profile),
// captures screenshots, scores a fixed checklist per viewport.
// Usage: node scripts/cro-pass.mjs <pass-name> [base-url]
import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const PASS = process.argv[2] || "baseline";
const BASE = process.argv[3] || "http://localhost:9002";
const CHROME =
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  `${process.env.HOME}/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome`;
const OUT = path.resolve(`_capture/cro/${PASS}`);
fs.mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function scrollThrough(page) {
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y <= document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
  });
  await sleep(200);
}

async function overflowPx(page) {
  return page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
}

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
});

const report = { pass: PASS, base: BASE, viewports: {} };

for (const vp of VIEWPORTS) {
  const page = await browser.newPage();
  await page.setViewport({ width: vp.width, height: vp.height });
  const consoleErrors = [];
  page.on(
    "console",
    (m) => m.type() === "error" && consoleErrors.push(m.text()),
  );
  page.on("pageerror", (e) => consoleErrors.push(`PAGEERR: ${e.message}`));

  const r = { checks: {}, metrics: {} };

  // --- Step 1: homepage ---
  await page.goto(`${BASE}/`, { waitUntil: "load", timeout: 60000 });
  await scrollThrough(page);
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(400);
  await page.screenshot({ path: `${OUT}/${vp.name}-01-home.png` });

  // C1: booking/assessment CTA visible above the fold on load
  r.checks.heroCtaAboveFold = await page.evaluate(() => {
    const links = [...document.querySelectorAll("a")].filter((a) =>
      /calendar\.app\.google|\/assessment/.test(a.href),
    );
    const ih = window.innerHeight;
    return links.some((a) => {
      const b = a.getBoundingClientRect();
      return b.top >= 0 && b.top < ih && b.width > 0;
    });
  });

  // C2: assessment reachable via one visible click
  const assessLink = await page.evaluateHandle(() => {
    const links = [...document.querySelectorAll('a[href="/assessment"]')];
    return (
      links.find((a) => {
        const b = a.getBoundingClientRect();
        return (
          b.width > 0 &&
          b.height > 0 &&
          getComputedStyle(a).visibility !== "hidden"
        );
      }) || null
    );
  });
  const visibleLink = assessLink.asElement();
  r.metrics.assessmentLinkOnHome = !!visibleLink;

  // --- Step 2: assessment landing ---
  if (visibleLink) await visibleLink.click();
  await sleep(1500);
  if (!page.url().includes("/assessment"))
    await page.goto(`${BASE}/assessment`, { waitUntil: "networkidle2" });
  r.metrics.overflowAssessmentLanding = await overflowPx(page);
  await sleep(600);
  await page.screenshot({ path: `${OUT}/${vp.name}-02-assessment.png` });

  // start quiz
  const starter =
    (await page.$("button::-p-text(See My AI Readiness)")) ??
    (await page.$("button::-p-text(Start)"));
  if (starter) {
    await starter.click();
    await sleep(800);
    await page.screenshot({ path: `${OUT}/${vp.name}-03-quiz-q1.png` });

    // --- Step 3: answer through quiz ---
    let answered = 0;
    let reachedEmailOrResult = false;
    while (answered < 30) {
      const skip = await page.$("button::-p-text(Skip)");
      const answers = await page.$$("div.space-y-3 > button:not([aria-label])");
      if (!skip && answers.length > 0) {
        await answers[0].click();
        answered++;
        await sleep(650);
      } else if (skip) {
        reachedEmailOrResult = true;
        await page.screenshot({ path: `${OUT}/${vp.name}-04-email.png` });
        await skip.click();
        await sleep(1200);
        break;
      } else break; // likely already on result page
    }
    r.metrics.questionsAnswered = answered;
    r.checks.quizCompletable =
      reachedEmailOrResult || answered === 0
        ? answered > 0 || reachedEmailOrResult
        : true;
    r.metrics.overflowQuiz = await overflowPx(page);

    // --- Step 4: result page ---
    r.metrics.resultArchetype = await page.evaluate(
      () => document.querySelector("h1")?.textContent?.trim() ?? null,
    );
    await page.screenshot({ path: `${OUT}/${vp.name}-05-result-top.png` });
    const cta = await page.evaluate(() => {
      const anchors = [...document.querySelectorAll("a")].filter(
        (a) => a.offsetWidth > 0,
      );
      const bookish =
        anchors.find((a) =>
          /calendar\.app\.google|book/i.test(`${a.href} ${a.textContent}`),
        ) || anchors.find((a) => a.getBoundingClientRect().top > 100); // first CTA-ish link below header
      if (!bookish) return null;
      const b = bookish.getBoundingClientRect();
      return {
        text: bookish.textContent.trim().slice(0, 60),
        href: bookish.href,
        top: Math.round(b.top + window.scrollY),
        height: Math.round(b.height),
        width: Math.round(b.width),
      };
    });
    r.metrics.resultCta = cta;
    if (cta) {
      // scroll so CTA top is at viewport top, capture it
      await page.evaluate(
        (top) => window.scrollTo(0, Math.max(0, top - 80)),
        cta.top,
      );
      await sleep(400);
      await page.screenshot({ path: `${OUT}/${vp.name}-06-cta.png` });
      r.checks.ctaExists = true;
      r.checks.ctaNearTopOfResult = cta.top <= vp.height * 1.5;
      r.checks.ctaTouchTarget = cta.height >= (vp.name === "mobile" ? 44 : 40);
      r.checks.ctaIsBookingLink = /calendar\.app\.google/.test(cta.href);
    } else {
      r.checks.ctaExists = false;
    }
  } else {
    r.checks.quizCompletable = false;
    r.metrics.error = "start button not found";
  }

  r.metrics.overflowResult = await overflowPx(page);
  const realErrors = consoleErrors.filter(
    (e) => !/eval\(\) is not supported/.test(e),
  );
  r.metrics.consoleErrors = realErrors.slice(0, 5);
  r.checks.noConsoleErrors = realErrors.length === 0;
  r.checks.noHorizontalOverflow =
    (r.metrics.overflowAssessmentLanding ?? 0) <= 0 &&
    (r.metrics.overflowQuiz ?? 0) <= 0 &&
    (r.metrics.overflowResult ?? 0) <= 0;

  const scoreVals = Object.values(r.checks).filter(
    (v) => typeof v === "boolean",
  );
  r.score = `${scoreVals.filter(Boolean).length}/${scoreVals.length}`;
  report.viewports[vp.name] = r;
  await page.close();
}

await browser.close();
fs.writeFileSync(`${OUT}/report.json`, JSON.stringify(report, null, 2));
for (const [k, v] of Object.entries(report.viewports)) {
  console.log(`\n=== ${k}: score ${v.score} ===`);
  for (const [c, val] of Object.entries(v.checks)) {
    const mark = val === true ? "PASS" : val === false ? "FAIL" : "?";
    console.log(
      `  ${mark} ${c}${val !== true && val !== false ? ` (${JSON.stringify(val)})` : ""}`,
    );
  }
  console.log(
    "  metrics:",
    JSON.stringify(v.metrics.resultCta),
    `overflow: land=${v.metrics.overflowAssessmentLanding} quiz=${v.metrics.overflowQuiz} result=${v.metrics.overflowResult}`,
  );
}
