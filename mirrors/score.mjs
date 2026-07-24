#!/usr/bin/env node
/**
 * Score both mirrors against the source at each viewport.
 * Score dimensions:
 *  - structure: section count + ID coverage
 *  - type: H1/H2/H3 count parity
 *  - palette: per-section background color match (tolerance for trivial diff)
 *  - typography: H2 font family + size parity
 *  - motion: animation count + names
 *  - buttons: button style signature match
 * Returns JSON for the build summary.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const COMP = JSON.parse(fs.readFileSync(path.join(ROOT, 'mirrors/out/comparison.json'), 'utf8'));

const viewports = ['desktop', 'tablet', 'mobile'];

const score = (src, tgt) => {
  const out = {};
  if (!src || !tgt) return { available: false };

  // structure
  const srcIds = new Set(src.sections.map((s) => s.id).filter(Boolean));
  const tgtIds = new Set(tgt.sections.map((s) => s.id).filter(Boolean));
  const idOverlap = [...srcIds].filter((id) => tgtIds.has(id)).length;
  out.structure = { srcSections: src.sections.length, tgtSections: tgt.sections.length, srcIds: [...srcIds], tgtIds: [...tgtIds], idOverlap };

  // type
  const countBy = (arr, key) => arr.filter((h) => h.tag === key).length;
  out.type = {
    src: { h1: countBy(src.headings, 'h1'), h2: countBy(src.headings, 'h2'), h3: countBy(src.headings, 'h3'), h4: countBy(src.headings, 'h4') },
    tgt: { h1: countBy(tgt.headings, 'h1'), h2: countBy(tgt.headings, 'h2'), h3: countBy(tgt.headings, 'h3'), h4: countBy(tgt.headings, 'h4') },
  };

  // palette
  const normBg = (bg) => bg.replace(/\s+/g, '').replace(/rgba?\(([^)]+)\)/g, (_, p) => {
    const parts = p.split(',').map((x) => x.trim());
    if (parts.length === 4 && +parts[3] === 0) return 'transparent';
    return parts.slice(0, 3).join(',');
  });
  const srcBgs = src.sections.map((s) => normBg(s.bg));
  const tgtBgs = tgt.sections.map((s) => normBg(s.bg));
  const bgMatches = srcBgs.filter((b) => tgtBgs.includes(b)).length;
  out.palette = { srcBgs: [...new Set(srcBgs)], tgtBgs: [...new Set(tgtBgs)], overlap: bgMatches };

  // typography — H2
  const srcH2 = src.headings.find((h) => h.tag === 'h2');
  const tgtH2 = tgt.headings.find((h) => h.tag === 'h2');
  out.typography = {
    srcH2: srcH2 && { font: srcH2.font, size: srcH2.size, weight: srcH2.weight, color: srcH2.color },
    tgtH2: tgtH2 && { font: tgtH2.font, size: tgtH2.size, weight: tgtH2.weight, color: tgtH2.color },
  };

  // motion
  const srcAnims = src.anims.map((a) => `${a.name}:${a.dur}`).sort();
  const tgtAnims = tgt.anims.map((a) => `${a.name}:${a.dur}`).sort();
  const motionOverlap = srcAnims.filter((a) => tgtAnims.includes(a)).length;
  out.motion = { srcAnims: srcAnims.slice(0, 10), tgtAnims: tgtAnims.slice(0, 10), overlap: motionOverlap };

  // buttons — distinct visual signature
  const sigBtn = (b) => [
    (b.bg || '').replace(/\s+/g, ''),
    (b.color || '').replace(/\s+/g, ''),
    b.borderRadius || '',
  ].join('|');
  const srcBtns = src.buttons.map(sigBtn);
  const tgtBtns = tgt.buttons.map(sigBtn);
  // Family bucketing: how many distinct button families appear in each
  const famBtn = (b) => {
    const bg = (b.bg || '').replace(/\s+/g, '');
    const color = (b.color || '').replace(/\s+/g, '');
    if (bg === 'rgba(0,0,0,0)' || bg === 'transparent') return 'ghost';
    if (bg === 'rgb(4,75,215)' || bg === 'rgb(2,74,216)' || bg.includes('hp-electric') || bg.includes('hp-bright')) return 'primary';
    if (bg === 'rgb(255,255,255)' || bg.includes('rgb(255,255,255')) return 'on-blue';
    if (bg.startsWith('rgb(') && bg !== 'rgb(255,255,255)') return 'tinted';
    return 'other';
  };
  const srcFams = new Set(src.buttons.map(famBtn));
  const tgtFams = new Set(tgt.buttons.map(famBtn));
  const famOverlap = [...srcFams].filter((f) => tgtFams.has(f)).length;
  const btnOverlap = srcBtns.filter((s) => tgtBtns.includes(s)).length;
  out.buttons = { srcCount: src.buttons.length, tgtCount: tgt.buttons.length, overlap: btnOverlap, srcFamilies: [...srcFams], tgtFamilies: [...tgtFams], familyOverlap: famOverlap };

  // doc height ratio
  out.docHeight = { src: src.docHeight, tgt: tgt.docHeight, ratio: tgt.docHeight / Math.max(1, src.docHeight) };

  // h1 headline parity
  out.h1 = { src: src.h1, tgt: tgt.h1 };

  // CSS variables
  out.cssVars = { src: src.cssVars, tgt: tgt.cssVars };

  return out;
};

const out = { perViewport: {}, aggregates: {} };
for (const vp of viewports) {
  const src = COMP[`source@${vp}`]?.data;
  out.perViewport[vp] = {};
  for (const target of ['pencil', 'forge']) {
    const tgt = COMP[`${target}@${vp}`]?.data;
    out.perViewport[vp][target] = score(src, tgt);
  }
}

const scoreMirror = (s) => {
  if (!s.available && s.available === false) return 0;
  let score = 0;
  // structure 25
  score += Math.min(1, s.structure.tgtSections / Math.max(1, s.structure.srcSections)) * 25;
  // id overlap 10
  const idScore = s.structure.srcIds.length ? s.structure.idOverlap / s.structure.srcIds.length : 1;
  score += idScore * 10;
  // palette 15
  const palScore = s.palette.overlap / Math.max(1, s.palette.srcBgs.length);
  score += palScore * 15;
  // motion 20
  const motScore = Math.min(1, s.motion.overlap / Math.max(1, s.motion.srcAnims.length));
  score += motScore * 20;
  // buttons 10
  const btnScore = Math.min(1, s.buttons.overlap / Math.max(1, s.buttons.srcCount));
  score += btnScore * 10;
  // typography 10 (H2 font + size present)
  const t = s.typography;
  let typo = 0;
  if (t.srcH2 && t.tgtH2) {
    if ((t.srcH2.font || '').includes('Space Grotesk') && (t.tgtH2.font || '').includes('Space Grotesk')) typo += 5;
    const sizeDelta = Math.abs(parseFloat(t.srcH2.size) - parseFloat(t.tgtH2.size));
    typo += Math.max(0, 5 - sizeDelta);
  }
  score += typo;
  // h1 parity 10
  if (s.h1.src && s.h1.tgt && s.h1.src.trim() === s.h1.tgt.trim()) score += 10;
  else if (s.h1.src && s.h1.tgt && s.h1.src.toLowerCase().includes(s.h1.tgt.toLowerCase().slice(0, 20))) score += 6;
  return Math.round(score);
};

const summary = {};
for (const target of ['pencil', 'forge']) {
  const scores = viewports.map((vp) => scoreMirror(out.perViewport[vp][target]));
  summary[target] = { scores, mean: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) };
}
out.aggregates = summary;

fs.writeFileSync(path.join(ROOT, 'mirrors/out/scores.json'), JSON.stringify(out, null, 2));
console.log(JSON.stringify(summary, null, 2));
