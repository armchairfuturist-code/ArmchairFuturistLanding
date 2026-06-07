# ADR 001: Tech Stack Choices

## Status
Proposed

## Context
The Armchair Futurist landing page is a Next.js web application serving as a marketing and lead capture platform. The team needed to select a modern, scalable stack that supports:
- Rapid development and iteration
- Excellent performance for SEO and user experience
- Built-in testing capabilities
- Easy deployment to Firebase App Hosting (Cloud Run)

## Decision
We selected the following technology stack:

### Core Framework
- **Next.js 16 with App Router**: Provides server-side rendering, static site generation, and API routes in a single framework. The App Router enables modern file-based routing and improved performance.

### UI Components
- **React 18.3**: Modern React with hooks and concurrent features.
- **Radix UI**: Accessible, unstyled component primitives (accordion, dialog, tabs, toast).
- **Tailwind CSS**: Utility-first CSS framework for rapid styling.
- **Motion (Framer Motion)**: Smooth animations and transitions.
- **Lucide React**: Icon library.

### Backend & Infrastructure
- **Firebase App Hosting** (Cloud Run): Serverless deployment platform for production. Auto-deploys on push to `main` via the Firebase App Hosting GitHub App.
- **Firebase Firestore**: NoSQL database for storing assessment leads.
- **Firebase Analytics**: Built-in analytics for conversion tracking.
- **Resend**: Email service API for automated communications.
- **OpenTelemetry**: Observability framework for advanced analytics.

### Development Tools
- **TypeScript**: Type safety and better developer experience.
- **Vitest** (to be added): Fast unit testing framework.
- **@testing-library/react** (to be added): React component testing.

## Rationale

### Why Next.js 16?
- **Server Components**: Improved performance and SEO.
- **API Routes**: Built-in backend functionality (e.g., assessment submission).
- **TypeScript Support**: First-class TypeScript integration.
- **Firebase Integration**: Native support for Firebase App Hosting (Cloud Run) deployment.

### Why Firebase?
- **Global CDN**: Fast content delivery worldwide.
- **Zero Config**: Simple deployment without complex infrastructure management.
- **Scalability**: Automatic scaling as traffic grows.
- **Cost-Effective**: Generous free tier for small to medium traffic.

### Why Radix UI?
- **Accessibility**: Built-in ARIA support and keyboard navigation.
- **Unstyled**: Full styling control via Tailwind.
- **Consistency**: Standardized component patterns.

### Why Resend?
- **Easy Integration**: Simple REST API.
- **Transaction Emails**: Perfect for automated lead responses.
- **Cost**: Competitive pricing with generous free tier.

## Consequences

### Positive
- **Fast Development**: Modern tooling and component libraries accelerate development.
- **Excellent Performance**: Next.js SSR and App Hosting's container runtime ensure fast load times.
- **Scalability**: Firebase handles traffic spikes automatically.
- **Maintainability**: TypeScript and modular architecture reduce bugs.
- **SEO**: Server-side rendering improves search engine rankings.

### Negative
- **Firebase Lock-in**: Vendor lock-in with Firebase ecosystem.
- **Firebase Costs**: Firestore and App Hosting costs increase with scale.
- **Email Service**: Resend dependency for critical communications.
- **Learning Curve**: Team needs familiarity with Next.js and Firebase patterns.

### Mitigations
- Maintain documentation and knowledge sharing on Firebase patterns.
- Monitor Firebase usage and costs closely.
- Keep Resend integration well-tested and backed up.
- Consider maintaining multi-cloud strategy for critical services if needed.

## Alternatives Considered

### Alternative 1: Vercel + PostgreSQL
- **Pros**: More control over database and hosting.
- **Cons**: Higher operational overhead, higher costs for PostgreSQL.

### Alternative 2: Traditional Server (Express + PostgreSQL)
- **Pros**: Full control over database and stack.
- **Cons**: Requires infrastructure management, slower development.

### Alternative 3: WordPress + Custom Plugin
- **Pros**: Familiar CMS, easy content management.
- **Cons**: Limited scalability, less flexible for complex features.

**Decision**: Rejected due to slower development, less control over performance, and higher operational overhead compared to Next.js + Firebase.

## References
- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase App Hosting](https://firebase.google.com/docs/app-hosting)
- [Radix UI](https://www.radix-ui.com/)