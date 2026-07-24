#!/usr/bin/env node
/**
 * Forge — data-driven page generator for the Armchair Futurist mirror.
 *
 * Reads: mirrors/data/content.json + mirrors/forge/templates/*.html
 * Writes: mirrors/forge/dist/index.html
 *
 * "Moving" = rebuilds on every invocation and supports a `--watch` flag
 * that re-emits the artifact whenever content.json changes.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');
const DATA = JSON.parse(fs.readFileSync(path.join(ROOT, 'mirrors/data/content.json'), 'utf8'));
const TPL_DIR = path.join(__dirname, 'templates');
const DIST = path.join(__dirname, 'dist');
const OUT = path.join(DIST, 'index.html');

const escape = (s = '') => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const tpl = (name) => fs.readFileSync(path.join(TPL_DIR, name), 'utf8');

const render = (data) => {
  const tokens = data.site;
  const head = tpl('head.html').replaceAll('{{SITE_TITLE}}', escape(tokens.title)).replaceAll('{{SITE_DESC}}', escape(tokens.title));
  const css = tpl('styles.css');
  const header = tpl('partials/header.html')
    .replace('{{BRAND}}', escape(data.header.brand))
    .replace('{{NAV}}', data.header.nav.map((n) => `      <a href="${escape(n.href)}">${escape(n.label)}</a>`).join('\n'))
    .replace('{{HEADER_CTAS}}', data.header.cta.map((c) => {
      const cls = c.variant === 'primary' ? 'btn btn--primary' : 'btn btn--ghost';
      return `<a class="${cls}" href="${escape(c.href)}" rel="noopener" target="_blank">${escape(c.label)}</a>`;
    }).join('\n      '));

  const rows = data.hero.headline_rows || [];
  const rowsHTML = rows.map((r) => `<span class="row row--${r.style}">${r.words.map((w) => `<span class="word">${escape(w)}</span>`).join('')}</span>`).join('');
  const hero = tpl('partials/hero.html')
    .replace('{{HERO_TAG}}', escape(data.hero.tag))
    .replace('{{HERO_HEADLINE_RAW}}', escape((rows.map((r) => r.words.join(' ')).join(' '))))
    .replace('{{HERO_END}}', escape(data.hero.endMessage))
    .replace('{{HERO_HEADLINE_ROWS}}', rowsHTML)
    .replace('{{HERO_CTAS}}', data.hero.ctas.map((c) => {
      const cls = c.variant === 'primary' ? 'btn btn--primary btn--lg' : 'btn btn--ghost btn--lg';
      return `<a class="${cls}" href="${escape(c.href)}" rel="noopener" target="_blank">${escape(c.label)}</a>`;
    }).join('\n        '))
    .replace('{{HERO_REASSURE}}', escape(data.hero.reassurance))
    .replace('{{HERO_BADGES}}', data.hero.badges.map((b) => `<span>${escape(b)}</span>`).join('\n          '));

  const logoBanner = tpl('partials/logo-banner.html')
    .replace('{{LABEL}}', escape(data.logoBanner.label))
    .replace('{{LOGO_TRACK}}', data.logoBanner.logos.map((l) => `<span class="marquee-item">${escape(l)}</span>`).join('\n        '));

  const caseStudies = tpl('partials/case-studies.html')
    .replace('{{EYEBROW}}', escape(data.caseStudies.eyebrow))
    .replace('{{TITLE}}', escape(data.caseStudies.title))
    .replace('{{LEDE}}', escape(data.caseStudies.lede))
    .replace('{{DISCLAIMER}}', escape(data.caseStudies.disclaimer))
    .replace('{{CARDS}}', data.caseStudies.studies.map((s) => `
      <article class="case-card">
        <span class="built">${escape(s.built)}</span>
        <h3>${escape(s.title)}</h3>
        <p class="sector">${escape(s.sector)}</p>
        <div><p class="label">The Problem</p><p>${escape(s.problem)}</p></div>
        <div><p class="label">What I Built</p><p>${escape(s.built2)}</p></div>
        <div>
          <p class="label">What I Worked On</p>
          <ul>${s.worked.map((w) => `<li>${escape(w)}</li>`).join('')}</ul>
        </div>
      </article>`).join(''));

  const testimonials = tpl('partials/testimonials.html')
    .replace('{{TITLE}}', escape(data.testimonials.title))
    .replace('{{LEDE}}', escape(data.testimonials.lede))
    .replace('{{PAUSE}}', escape(data.testimonials.pauseHint))
    .replace('{{TRACK_A}}', data.testimonials.items.slice(0, 5).map((t) => `
        <article class="testimonial">
          <blockquote>${escape(t.quote)}</blockquote>
          <div class="testimonial-head">
            <span class="avatar">${escape((t.name.match(/\b\w/g) || []).slice(0,2).join(''))}</span>
            <div><cite>${escape(t.name)}</cite><div class="role">${escape(t.role)}</div></div>
          </div>
        </article>`).join(''))
    .replace('{{TRACK_B}}', data.testimonials.items.slice(5).map((t) => `
        <article class="testimonial">
          <blockquote>${escape(t.quote)}</blockquote>
          <div class="testimonial-head">
            <span class="avatar">${escape((t.name.match(/\b\w/g) || []).slice(0,2).join(''))}</span>
            <div><cite>${escape(t.name)}</cite><div class="role">${escape(t.role)}</div></div>
          </div>
        </article>`).join(''));

  const stats = tpl('partials/stats.html')
    .replace('{{EYEBROW}}', escape(data.stats.eyebrow))
    .replace('{{TITLE}}', escape(data.stats.title))
    .replace('{{STATS}}', data.stats.items.map((s) => `
        <div class="stat"><div class="value">${escape(s.value)}</div><div class="label">${escape(s.label)}</div><div class="detail">${escape(s.detail)}</div></div>`).join(''))
    .replace('{{SELECTED}}', escape(data.stats.selectedEngagements))
    .replace('{{ABOUT_LABEL}}', escape(data.stats.aboutAlex))
    .replace('{{ABOUT_BIO}}', escape(data.stats.alexBio));

  const notFor = tpl('partials/what-this-is-not.html')
    .replace('{{EYEBROW}}', escape(data.whatThisIsNot.eyebrow))
    .replace('{{TITLE}}', escape(data.whatThisIsNot.title))
    .replace('{{LEDE}}', escape(data.whatThisIsNot.lede))
    .replace('{{ITEMS}}', data.whatThisIsNot.items.map((i) => `
        <div class="notfor"><h3>${escape(i.title)}</h3><p>${escape(i.body)}</p></div>`).join(''))
    .replace('{{BETTER_LABEL}}', escape(data.whatThisIsNot.betterOptions))
    .replace('{{BETTER_LIST}}', data.whatThisIsNot.betterList.map((l) => `<li>${escape(l)}</li>`).join(''));

  const services = tpl('partials/services.html')
    .replace('{{EYEBROW}}', escape(data.services.eyebrow))
    .replace('{{TITLE}}', escape(data.services.title))
    .replace('{{LEDE}}', escape(data.services.lede))
    .replace('{{TRACKS}}', data.services.tracks.map((tr) => `
      <div class="track">
        <span class="track-tag">${escape(tr.tag)}</span>
        <h3>${escape(tr.title)}</h3>
        <p class="subtitle">${escape(tr.subtitle)}</p>
        <p class="body">${escape(tr.body)}</p>
        ${tr.offers.map((o) => `
        <div class="offer">
          <span class="offer-duration">${escape(o.duration)}</span>
          <h4>${escape(o.title)}</h4>
          <p class="price">${escape(o.price)}</p>
          <p class="blurb">${escape(o.blurb)}</p>
          <ul>${o.features.map((f) => `<li>${escape(f)}</li>`).join('')}</ul>
          <a class="btn btn--primary" href="#connect">${escape(o.cta)}</a>
        </div>`).join('')}
      </div>`).join(''));

  const about = tpl('partials/about.html')
    .replace('{{VERIFY}}', escape(data.aboutMe.verify))
    .replace('{{TITLE}}', escape(data.aboutMe.title))
    .replace('{{TAG}}', escape(data.aboutMe.tag))
    .replace('{{LEDE}}', escape(data.aboutMe.lede))
    .replace('{{PARAS}}', data.aboutMe.paragraphs.map((p) => `<p>${escape(p)}</p>`).join(''))
    .replace('{{FORKS}}', data.aboutMe.forks.map((f) => `<div><h3>${escape(f.label)}</h3><p>${escape(f.body)}</p></div>`).join(''))
    .replace('{{BADGES}}', data.aboutMe.badges.map((b) => `<img alt="${escape(b.alt)}" />`).join(''));

  const mentoring = tpl('partials/mentoring.html')
    .replace('{{UPDATED}}', escape(data.mentoring.updated))
    .replace('{{EYEBROW}}', escape(data.mentoring.eyebrow))
    .replace('{{TITLE}}', escape(data.mentoring.title))
    .replace('{{LEDE}}', escape(data.mentoring.lede))
    .replace('{{STEPS}}', data.mentoring.steps.map((s) => `<div class="step"><div class="n">${escape(s.n)}</div><h3>${escape(s.title)}</h3><p>${escape(s.body)}</p></div>`).join(''))
    .replace('{{PATH_TITLE}}', escape(data.mentoring.pathTitle))
    .replace('{{PATH_SUB}}', escape(data.mentoring.pathSub));

  const roi = tpl('partials/roi.html')
    .replace('{{EYEBROW}}', escape(data.roi.eyebrow))
    .replace('{{TITLE}}', escape(data.roi.title))
    .replace('{{LEDE}}', escape(data.roi.lede))
    .replace('{{SELECT_LABEL}}', escape(data.roi.selectLabel))
    .replace('{{ESTIMATE_LABEL}}', escape(data.roi.estimateLabel))
    .replace('{{TASKS}}', data.roi.tasks.map((tk) => `<label class="roi-task"><input type="checkbox" data-hours="${tk.hours}" /><div><div class="title">${escape(tk.title)}</div><div class="detail">${escape(tk.detail)}</div></div><span class="hours">~${tk.hours}h/wk</span></label>`).join(''));

  const speaking = tpl('partials/speaking.html')
    .replace('{{EYEBROW}}', escape(data.speaking.eyebrow))
    .replace('{{TITLE}}', escape(data.speaking.title))
    .replace('{{LEDE}}', escape(data.speaking.lede))
    .replace('{{FORMATS}}', data.speaking.formats.map((f) => `<div class="speak"><h3>${escape(f.title)}</h3><p>${escape(f.body)}</p></div>`).join(''))
    .replace('{{TOPICS_LABEL}}', escape(data.speaking.topicsLabel))
    .replace('{{TOPICS}}', data.speaking.topics.map((t) => `<li>${escape(t)}</li>`).join(''))
    .replace('{{CTA}}', escape(data.speaking.cta))
    .replace('{{CLOSING}}', escape(data.speaking.closing));

  const assessmentCta = tpl('partials/assessment-cta.html')
    .replace('{{LABEL}}', escape(data.assessmentCta.label))
    .replace('{{TITLE}}', escape(data.assessmentCta.title))
    .replace('{{BODY}}', escape(data.assessmentCta.body))
    .replace('{{CTA}}', escape(data.assessmentCta.cta));

  const insights = tpl('partials/insights.html')
    .replace('{{TITLE}}', escape(data.insights.title))
    .replace('{{LEDE}}', escape(data.insights.lede))
    .replace('{{ARTICLES_LABEL}}', escape(data.insights.articlesLabel))
    .replace('{{ARTICLES}}', data.insights.articles.map((a) => `<a class="article" href="#"><img alt="${escape(a.title)}" /><div><div class="date">${escape(a.date)}</div><div class="title">${escape(a.title)}</div></div></a>`).join(''))
    .replace('{{VIEW_ALL}}', escape(data.insights.viewAll))
    .replace('{{PODCASTS_LABEL}}', escape(data.insights.podcastsLabel))
    .replace('{{PODCASTS}}', data.insights.podcasts.map((p) => `<div class="podcast"><h4>${escape(p.title)}</h4><p>${escape(p.body)}</p></div>`).join(''))
    .replace('{{SHOW_MORE}}', escape(data.insights.showMore));

  const faq = tpl('partials/faq.html')
    .replace('{{TITLE}}', escape(data.faq.title))
    .replace('{{LEDE}}', escape(data.faq.lede))
    .replace('{{ITEMS}}', data.faq.items.map((i) => `<details><summary>${escape(i.q)}</summary><p>${escape(i.a)}</p></details>`).join(''));

  const connect = tpl('partials/connect.html')
    .replace('{{TITLE}}', escape(data.connect.title))
    .replace('{{LEDE}}', escape(data.connect.lede))
    .replace('{{PRIMARY}}', `<a class="btn btn--on-blue btn--lg" href="${escape(data.connect.primary.href)}" rel="noopener" target="_blank">${escape(data.connect.primary.label)}</a>`)
    .replace('{{SECONDARY}}', `<a class="btn btn--ghost btn--lg" style="color:#fff;border-color:rgba(255,255,255,0.4);" href="${escape(data.connect.secondary.href)}" rel="noopener" target="_blank">${escape(data.connect.secondary.label)}</a>`)
    .replace('{{MICRO}}', escape(data.connect.microcopy))
    .replace('{{ALT_PATH}}', escape(data.connect.altPath))
    .replace('{{FORM_INTRO}}', escape(data.connect.formIntro))
    .replace('{{FORM_FIELDS}}', data.connect.form.map((f) => {
      if (f.type === 'submit') return `<button type="submit" class="btn btn--on-blue">${escape(f.label)}</button>`;
      const input = f.type === 'textarea' ? `<textarea name="${escape(f.name)}"></textarea>` : `<input type="${escape(f.type)}" name="${escape(f.name)}" />`;
      return `<label>${escape(f.label)}${input}</label>`;
    }).join(''));

  const footer = tpl('partials/footer.html')
    .replace('{{BRAND}}', escape(data.footer.brand))
    .replace('{{TAGLINE}}', escape(data.footer.tagline))
    .replace('{{COLUMNS}}', data.footer.columns.map((c) => `
      <div>
        <h4>${escape(c.label)}</h4>
        <ul>${c.links.map((l) => `<li><a href="${escape(l.href)}">${escape(l.label)}</a></li>`).join('')}</ul>
      </div>`).join(''))
    .replace('{{LEGAL}}', escape(data.footer.legal))
    .replace('{{LINKS}}', data.footer.links.map((l) => `<a href="${escape(l.href)}">${escape(l.label)}</a>`).join(' · '));

  return [
    '<!doctype html>',
    '<html lang="en" class="scroll-smooth"><head>',
    head,
    '<style>', css, '</style>',
    '</head><body>',
    '<a href="#main-content" class="visually-hidden">Skip to content</a>',
    header,
    '<main id="main-content">',
    hero,
    logoBanner,
    caseStudies,
    testimonials,
    stats,
    notFor,
    services,
    about,
    mentoring,
    roi,
    speaking,
    assessmentCta,
    insights,
    faq,
    connect,
    '</main>',
    footer,
    tpl('partials/script.html'),
    '</body></html>',
  ].join('\n');
};

const build = () => {
  const html = render(DATA);
  fs.mkdirSync(DIST, { recursive: true });
  fs.writeFileSync(OUT, html);
  const size = (html.length / 1024).toFixed(1);
  console.log(`[forge] rebuilt ${path.relative(ROOT, OUT)} (${size} KB) at ${new Date().toISOString()}`);
};

build();

// Watch mode
if (process.argv.includes('--watch')) {
  let timer;
  const debounced = () => { clearTimeout(timer); timer = setTimeout(build, 80); };
  fs.watch(path.join(ROOT, 'mirrors/data/content.json'), debounced);
  fs.watch(TPL_DIR, { recursive: true }, debounced);
  console.log('[forge] watching for changes…');
}
