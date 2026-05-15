# Codebase Map

Generated: 2026-05-15T14:10:34Z | Files: 242 | Described: 0/242
<!-- gsd:codebase-meta {"generatedAt":"2026-05-15T14:10:34Z","fingerprint":"11c4a4beca68a3a57446b8e8e15dcab4ebaa60ea","fileCount":242,"truncated":false} -->

### (root)/
- `.env.example`
- `.firebaserc`
- `.gitignore`
- `apphosting.yaml`
- `CLAUDE.md`
- `components.json`
- `DESIGN.md`
- `Dockerfile`
- `firebase.json`
- `GEO-IMPROVEMENTS.md`
- `next.config.ts`
- `package-lock.json`
- `package.json`
- `postcss.config.mjs`
- `SLOP-GUIDE.md`
- `tailwind.config.ts`
- `tsconfig.json`

### .idx/
- `.idx/dev.nix`

### .qwen/
- `.qwen/PROJECT_SUMMARY.md`

### docs/
- `docs/ADDITIONAL-IMPROVEMENTS.md`
- `docs/blueprint.md`
- `docs/CONVERSION-ANALYSIS.md`
- `docs/FIREBASE_ANALYTICS_SETUP.md`
- `docs/IMPLEMENTATION-COMPLETE.md`
- `docs/INTEGRATION-GUIDE.md`
- `docs/SEO-GEO-AUDIT-2026-03-29.md`
- `docs/STOP-SLOP-ANALYSIS.md`

### docs/plans/
- `docs/plans/2026-02-24-ux-conversion-implementation.md`
- `docs/plans/2026-02-24-ux-conversion-redesign.md`
- `docs/plans/2026-03-02-site-cleanup-fixes.md`
- `docs/plans/2026-03-04-ai-readiness-assessment-design.md`

### graphify-out/
- `graphify-out/graph.html`
- `graphify-out/graph.json`

### graphify-out/cache/
- *(115 files: 115 .json)*

### public/
- `public/header.mp4`
- `public/header.webp`
- `public/Lia-Savillo.webp`
- `public/llms-full.txt`
- `public/llms.txt`
- `public/README.md`
- `public/robots.txt`
- `public/sitemap-ai.xml`

### src/app/
- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/robots.ts`
- `src/app/sitemap.ts`

### src/app/about/
- `src/app/about/page.tsx`

### src/app/admin/experiments/
- `src/app/admin/experiments/page.tsx`

### src/app/api/assessment/submit/
- `src/app/api/assessment/submit/route.ts`

### src/app/api/contact/
- `src/app/api/contact/route.ts`

### src/app/api/lead-capture/
- `src/app/api/lead-capture/route.ts`

### src/app/api/substack/
- `src/app/api/substack/route.ts`

### src/app/assessment/
- `src/app/assessment/layout.tsx`
- `src/app/assessment/page.tsx`

### src/app/assessment/result/[slug]/
- `src/app/assessment/result/[slug]/layout.tsx`
- `src/app/assessment/result/[slug]/page.tsx`

### src/app/blog/
- `src/app/blog/page.tsx`

### src/app/case-studies/
- `src/app/case-studies/page.tsx`

### src/app/concepts/
- `src/app/concepts/page.tsx`

### src/app/concepts/accountability-gap/
- `src/app/concepts/accountability-gap/page.tsx`

### src/app/concepts/psychology-led-adoption/
- `src/app/concepts/psychology-led-adoption/page.tsx`

### src/app/concepts/results-thinkers/
- `src/app/concepts/results-thinkers/page.tsx`

### src/app/llms-full.txt/
- `src/app/llms-full.txt/route.ts`

### src/app/llms.txt/
- `src/app/llms.txt/route.ts`

### src/app/privacy-policy/
- `src/app/privacy-policy/page.tsx`

### src/app/terms-of-service/
- `src/app/terms-of-service/page.tsx`

### src/components/analytics/
- `src/components/analytics/FirebaseAnalytics.tsx`

### src/components/assessment/
- `src/components/assessment/EmailCapture.tsx`
- `src/components/assessment/QuizProgress.tsx`
- `src/components/assessment/QuizQuestion.tsx`
- `src/components/assessment/ResultPage.tsx`
- `src/components/assessment/ScoreChart.tsx`

### src/components/layout/
- `src/components/layout/Footer.tsx`
- `src/components/layout/Header.tsx`

### src/components/lead-capture/
- `src/components/lead-capture/LeadCaptureInline.tsx`

### src/components/sections/
- `src/components/sections/AboutMeSection.tsx`
- `src/components/sections/AssessmentCtaSection.tsx`
- `src/components/sections/CaseStudiesSection.tsx`
- `src/components/sections/ConnectSection.tsx`
- `src/components/sections/FAQSection.tsx`
- `src/components/sections/FeaturedInSection.tsx`
- `src/components/sections/HeroSection.tsx`
- `src/components/sections/InsightsSection.tsx`
- `src/components/sections/KeyStatsSection.tsx`
- `src/components/sections/MentoringSection.tsx`
- `src/components/sections/PackageComparisonSection.tsx`
- `src/components/sections/ROICalculatorSection.tsx`
- `src/components/sections/ServicesSection.tsx`
- `src/components/sections/SpeakingSection.tsx`
- `src/components/sections/TestimonialsSection.tsx`
- `src/components/sections/WhatThisIsNotSection.tsx`
- `src/components/sections/WhyWorkWithMeSection.tsx`

### src/components/seo/
- `src/components/seo/AISummaryNugget.tsx`

### src/components/ui/
- `src/components/ui/accordion.tsx`
- `src/components/ui/badge.tsx`
- `src/components/ui/blur-fade.tsx`
- `src/components/ui/border-beam.tsx`
- `src/components/ui/breadcrumbs.tsx`
- `src/components/ui/button.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/input.tsx`
- `src/components/ui/last-updated.tsx`
- `src/components/ui/marquee.tsx`
- `src/components/ui/number-ticker.tsx`
- `src/components/ui/ScrollToTop.tsx`
- `src/components/ui/SectionNavigator.tsx`
- `src/components/ui/sheet.tsx`
- `src/components/ui/tabs.tsx`
- `src/components/ui/textarea.tsx`
- `src/components/ui/toast.tsx`
- `src/components/ui/toaster.tsx`
- `src/components/ui/word-pull-up.tsx`

### src/hooks/
- `src/hooks/use-mobile.tsx`
- `src/hooks/use-toast.ts`
- `src/hooks/useExperiment.ts`

### src/lib/
- `src/lib/ab-testing.ts`
- `src/lib/analytics.ts`
- `src/lib/constants.ts`
- `src/lib/firebase-admin.ts`
- `src/lib/firebase.ts`
- `src/lib/resend.ts`
- `src/lib/utils.ts`

### src/lib/assessment/
- `src/lib/assessment/archetypes.ts`
- `src/lib/assessment/config.ts`
- `src/lib/assessment/email-templates.ts`
- `src/lib/assessment/scoring.ts`

### src/types/
- `src/types/index.ts`
