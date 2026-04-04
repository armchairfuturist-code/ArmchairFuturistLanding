# The Armchair Futurist - Landing Page

## Deploy Configuration (configured by /setup-deploy)
- Platform: Firebase Hosting
- Production URL: https://thearmchairfuturist.com
- Deploy workflow: `firebase deploy` (manual trigger)
- Deploy status command: firebase hosting:sites:get thearmchairfuturist
- Merge method: merge
- Project type: web app (Next.js)
- Post-deploy health check: https://thearmchairfuturist.com

### Custom deploy hooks
- Pre-merge: npm run build
- Deploy trigger: firebase deploy --only hosting
- Deploy status: curl -sf https://thearmchairfuturist.com
- Health check: https://thearmchairfuturist.com

## Project Info
- Framework: Next.js 16 with App Router
- Build command: npm run build
- Dev server: npm run dev (port 9002)
- TypeScript: Enabled
- Styling: Tailwind CSS
