# Armchair Futurist Landing Page

A modern Next.js 16 landing page for **Armchair Futurist** (thearmchairfuturist.com) featuring an interactive AI readiness assessment flow with email capture, AI readiness scoring, and personalized results.

## 🎯 Overview

This is a high-conversion marketing platform that:
- Captures qualified leads through a self-service AI readiness diagnostic
- Delivers personalized AI readiness scores and archetypes
- Automated email capture and follow-up system
- SEO-optimized with server-side rendering
- Performance-focused with fast load times and smooth animations

## 🛠️ Tech Stack

### Core Framework
- **Next.js 16** with App Router - Modern React framework with server components and API routes
- **React 18.3** - Latest React with hooks and concurrent features
- **TypeScript** - Type safety and better developer experience

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Radix UI** - Accessible, unstyled component primitives (accordion, dialog, tabs, toast)
- **Motion (Framer Motion)** - Smooth animations and transitions
- **Lucide React** - Modern icon library
- **class-variance-authority** - Conditional styling utilities

### Backend & Infrastructure
- **Firebase Hosting** - Global CDN deployment platform
- **Firebase Firestore** - NoSQL database for storing assessment leads
- **Firebase Analytics** - Built-in analytics for conversion tracking
- **Resend** - Transactional email service API
- **OpenTelemetry** - Observability framework for advanced analytics

### Development Tools
- **Vitest** - Fast unit testing framework
- **@testing-library/react** - React component testing
- **@testing-library/jest-dom** - DOM matchers for testing
- **@testing-library/user-event** - User simulation utilities
- **jsdom** - DOM environment for testing

## 📐 Architecture

### Landing Page Structure
The main landing page is composed of modular section components:
- `HeroSection` - Main headline, subheadline, and primary CTA
- `KeyStatsSection` - Trust indicators and social proof
- `AboutMeSection` - Personal introduction and credibility
- `ServicesSection` - Service offerings and benefits
- `CaseStudiesSection` - Success stories with quantified results
- `TestimonialsSection` - Client testimonials
- `MentoringSection` - 1-on-1 mentoring offering
- `SpeakingSection` - Speaking engagement offerings
- `PackageComparisonSection` - Tiered package comparison
- `ROICalculatorSection` - Interactive ROI calculator
- `FAQSection` - Frequently asked questions
- `ConnectSection` - Contact and social links
- `WhatThisIsNotSection` - Clarification and differentiation
- `WhyWorkWithMeSection` - Personal value proposition
- `FeaturedInSection` - Additional value propositions

### Assessment Flow Architecture
The assessment flow follows a multi-phase architecture:

```
Landing Phase → Quiz Phase → Email Capture → Redirecting → Results Page
```

**User Flow States:**
1. **Landing** - Initial page showing assessment intro and "Start" button
2. **Quiz** - Interactive 9-question diagnostic with progress tracking
3. **Email Capture** - Form collecting prospect email before results
4. **Redirecting** - Loading state while processing results
5. **Results Page** - Dynamic page showing personalized archetype, scores, and diagnosis

**Backend Processing:**
- Assessment Submission API (`/api/assessment/submit`)
- Lead storage in Firestore (`assessment_leads` collection)
- Email automation via Resend API (prospect and owner notifications)

**Client-Side State Management:**
- React hooks for phase, answers, scores, and archetype
- OpenTelemetry events at each stage (start, question answered, conversion)
- URL parameters (`c`, `r`, `u`) for scores passed to results page

### Key Features

#### AI Readiness Scoring
- **Clarity Score** (0-100%) - Understanding of AI's potential and limitations
- **Readiness Score** (0-100%) - Practical preparation for AI adoption
- **Urgency Score** (0-100%) - Perceived time-sensitive need to act
- **Archetype Classification** - Behavioral pattern based on assessment results

#### Email Capture System
- Prospects receive personalized assessment results via email
- Site owner receives notifications of new qualified leads
- Custom branded email templates with header, body, and footer
- Graceful degradation if email delivery fails

#### Analytics & Optimization
- OpenTelemetry event tracking at each user action
- Firebase Analytics integration for conversion tracking
- A/B testing framework for continuous optimization
- Performance monitoring and error tracking

## 🧪 Test Infrastructure

The project includes a comprehensive test suite using Vitest and React Testing Library:

### Test Structure
```
src/
├── components/
│   ├── sections/
│   │   └── __tests__/
│   │       └── HeroSection.test.tsx  (3 tests)
│   └── assessment/
├── app/
│   └── assessment/
│       └── __tests__/
│           └── AssessmentPage.test.tsx  (5 tests)
└── test/
    └── setup.ts  (Test environment configuration)
```

### Test Scripts
```bash
npm test              # Run all tests
npm run test:ui       # Run tests with UI (Vitest UI)
npm run test:coverage # Run tests with coverage report
```

### Current Test Coverage
- **8 tests** covering both UI components and page flows
- Tests verify component rendering, user interactions, and state transitions
- Mocked dependencies for external services (Firebase, Resend, Analytics)

### Test Configuration
- **Environment**: jsdom for DOM simulation
- **Setup**: Custom test setup with polyfills (IntersectionObserver, matchMedia, HTMLMediaElement)
- **CSS**: Enabled for component styling tests
- **UI Mode**: Vitest UI for interactive test exploration

## 📚 Documentation

### Key Documentation Files
- **[docs/GLOSSARY.md](docs/GLOSSARY.md)** - Domain glossary with AI terminology, assessment concepts, and business terms
- **[docs/adr/001-tech-stack.md](docs/adr/001-tech-stack.md)** - Architecture Decision Record: Tech Stack Choices
- **[docs/adr/002-assessment-flow.md](docs/adr/002-assessment-flow.md)** - Architecture Decision Record: Assessment Flow Architecture
- **[docs/adr/003-email-handling.md](docs/adr/003-email-handling.md)** - Architecture Decision Record: Email Handling Strategy

### Additional Documentation
- [docs/IMPLEMENTATION-COMPLETE.md](docs/IMPLEMENTATION-COMPLETE.md) - Implementation completion status
- [docs/INTEGRATION-GUIDE.md](docs/INTEGRATION-GUIDE.md) - Integration and deployment guide
- [docs/FIREBASE_ANALYTICS_SETUP.md](docs/FIREBASE_ANALYTICS_SETUP.md) - Firebase Analytics configuration
- [docs/blueprint.md](docs/blueprint.md) - System blueprint and architecture overview

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Firebase CLI installed (`npm install -g firebase-tools`)
- Firebase project configured

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/armchairfuturist-code/ArmchairFuturistLanding.git
   cd ArmchairFuturistLanding
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Firebase and Resend API keys
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```
   The application will be available at [http://localhost:9002](http://localhost:9002)

### Testing

Run the test suite with:
```bash
npm test              # Run all tests
npm run test:ui       # Interactive test UI
npm run test:coverage # Generate coverage report
```

### Build

Create a production build:
```bash
npm run build
```

The build output will be in the `.next` directory.

## 🚢 Deployment

### Firebase Deployment

1. **Authenticate with Firebase**
   ```bash
   firebase login
   ```

2. **Deploy to Firebase Hosting**
   ```bash
   firebase deploy --only hosting
   ```

**Deployment Details:**
- **Production URL**: https://thearmchairfuturist.com
- **Site ID**: `armchair-futurist`
- **Cloud Function**: SSR Cloud Function (2nd Gen) built in Google Cloud Build
- **Estimated Deployment Time**: 3-4 minutes
  - Firebase Hosting: ~2 minutes
  - SSR Cloud Function build: ~200 seconds (container image creation)

3. **Post-Deploy Health Check**
   ```bash
   curl -sf https://thearmchairfuturist.com
   ```

### Custom Domain Configuration

The production URL uses a custom domain (thearmchairfuturist.com). The Firebase site ID is `armchair-futurist` (not `thearmchairfuturist`).

### Environment Variables

Required `.env.local` variables:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

RESEND_API_KEY=your_resend_api_key

# Optional: OpenTelemetry configuration
NEXT_PUBLIC_OTEL_EXPORTER_OTLP_ENDPOINT=
```

## 📊 Project Structure

```
ArmchairFuturistLanding/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── assessment/         # Assessment flow pages
│   │   │   └── page.tsx
│   │   ├── api/                # API routes
│   │   │   └── assessment/
│   │   │       └── submit/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── assessment/         # Assessment-specific components
│   │   │   ├── QuizQuestion.tsx
│   │   │   ├── QuizProgress.tsx
│   │   │   ├── EmailCapture.tsx
│   │   │   ├── ScoreChart.tsx
│   │   │   └── ResultPage.tsx
│   │   ├── sections/           # Page section components
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AboutMeSection.tsx
│   │   │   ├── ServicesSection.tsx
│   │   │   ├── CaseStudiesSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   └── ... (other sections)
│   │   ├── layout/             # Layout components
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   └── ui/                 # Reusable UI components
│   │       ├── accordion.tsx
│   │       ├── badge.tsx
│   │       ├── sheet.tsx
│   │       └── ...
│   ├── hooks/                  # Custom React hooks
│   │   ├── useExperiment.ts
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── lib/
│   │   ├── assessment/         # Assessment logic
│   │   │   ├── config.ts
│   │   │   ├── scoring.ts
│   │   │   ├── archetypes.ts
│   │   │   └── email-templates.ts
│   │   ├── firebase.ts         # Firebase client config
│   │   ├── firebase-admin.ts   # Firebase admin config
│   │   ├── resend.ts           # Resend API integration
│   │   ├── analytics.ts        # OpenTelemetry analytics
│   │   ├── ab-testing.ts       # A/B testing utilities
│   │   ├── email-utils.ts      # Email utilities
│   │   └── utils.ts            # Utility functions
│   ├── types/                  # TypeScript types
│   │   └── index.ts
│   └── test/                   # Test configuration
│       └── setup.ts
├── docs/
│   ├── adr/                    # Architecture Decision Records
│   │   ├── 001-tech-stack.md
│   │   ├── 002-assessment-flow.md
│   │   └── 003-email-handling.md
│   ├── GLOSSARY.md             # Domain glossary
│   ├── IMPLEMENTATION-COMPLETE.md
│   ├── INTEGRATION-GUIDE.md
│   ├── FIREBASE_ANALYTICS_SETUP.md
│   └── blueprint.md
├── public/                     # Static assets
├── firebase.json               # Firebase configuration
├── apphosting.yaml             # Firebase App Hosting configuration
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── vitest.config.ts            # Vitest configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Project dependencies and scripts
└── README.md                   # This file
```

## 🎨 Design Principles

### Performance
- Server-side rendering for SEO and fast initial loads
- Code splitting and lazy loading for optimized bundle sizes
- Image optimization with Next.js Image component
- Critical CSS inlining

### Accessibility
- WCAG 2.1 AA compliance
- ARIA labels and semantic HTML
- Keyboard navigation support
- Screen reader friendly

### User Experience
- Progressive disclosure for complex forms
- Clear visual hierarchy and CTAs
- Smooth animations and transitions
- Mobile-responsive design

### Developer Experience
- TypeScript for type safety
- Modular component architecture
- Comprehensive testing
- Clear documentation

## 📈 Analytics & Monitoring

### Event Tracking
The application tracks the following events:
- `assessment_start` - User begins the assessment
- `question_answered` - User answers a question
- `email_submitted` - User submits email for results
- `conversion` - User completes assessment and captures lead
- `page_view` - Page navigation events
- `click` - Button and link interactions

### Performance Monitoring
- OpenTelemetry for distributed tracing
- Firebase Performance Monitoring
- Custom metrics and user flows

## 🔧 Development Tools

### IDE Setup
- **VS Code** recommended with extensions:
  - ESLint
  - Prettier
  - TypeScript
  - GitLens

### Code Quality
```bash
npm run lint           # TypeScript type checking
npm run typecheck      # ESLint analysis
```

### Git Workflow
```bash
git checkout -b feature/your-feature
git add .
git commit -m "Add your feature"
git push origin feature/your-feature
# Create pull request and merge
```

## 🤝 Contributing

This is a private repository managed by the Armchair Futurist team.

## 📄 License

Private - All rights reserved

---

**Built with ❤️ for the Armchair Futurist community**