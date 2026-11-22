#!/usr/bin/env node
// Renders the Open Graph card (1200x630) from card.html with headless Chromium.
//
//   node scripts/og-card/render.mjs            # writes public/og-card.png
//
// Chromium: set OG_CHROME, else the Playwright cache is searched, else a
// system chrome/chromium on PATH. Fonts: fonts/*.ttf beside this script,
// produced once from src/app/fonts/*.woff2 by `npm run og:card:fonts`.
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readdirSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, "../..");
const out = path.join(repo, "public", "og-card.png");

function findChrome() {
  if (process.env.OG_CHROME) return process.env.OG_CHROME;
  const cache = path.join(process.env.HOME ?? "", ".cache", "ms-playwright");
  if (existsSync(cache)) {
    for (const dir of readdirSync(cache).filter((d) => d.startsWith("chromium-")).sort().reverse()) {
      for (const sub of ["chrome-linux64/chrome", "chrome-linux/chrome"]) {
        const p = path.join(cache, dir, sub);
        if (existsSync(p)) return p;
      }
    }
  }
  for (const p of ["google-chrome", "chromium", "chromium-browser"]) {
    try { execFileSync("which", [p], { stdio: "ignore" }); return p; } catch { /* next */ }
  }
  throw new Error("No Chromium found. Set OG_CHROME=/path/to/chrome.");
}

const chrome = findChrome();
const shot2x = path.join(mkdtempSync(path.join(tmpdir(), "og-card-")), "card@2x.png");
const url = "file://" + path.join(here, "card.html");

// Render at 2x, then downsample, so type edges stay clean at 1x.
execFileSync(chrome, [
  "--headless=new", "--disable-gpu", "--hide-scrollbars",
  "--allow-file-access-from-files", "--force-device-scale-factor=2",
  "--window-size=1200,630", "--virtual-time-budget=4000",
  `--screenshot=${shot2x}`, url,
], { stdio: "inherit" });

execFileSync("magick", [shot2x, "-resize", "1200x630!", "-strip", "-define", "png:compression-level=9", out], { stdio: "inherit" });
console.log(`wrote ${out}`);
