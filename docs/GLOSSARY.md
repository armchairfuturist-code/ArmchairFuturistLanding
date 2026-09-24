# Domain Glossary

## AI & Technology

| Term | Definition |
|------|------------|
| **AI Readiness** | The degree to which an individual or organization is prepared to adopt and integrate artificial intelligence technologies effectively. Measured by three dimensions: clarity, readiness, and urgency. |
| **Archetype** | A personality or behavioral pattern classification derived from the assessment, representing a specific stage in AI adoption (e.g., "The Silent Sceptic", "The Early Adopter"). |
| **Clarity Score** | A metric (0-100%) indicating how clearly an individual understands AI's potential and limitations. Low scores indicate confusion or skepticism. |
| **Readiness Score** | A metric (0-100%) indicating practical preparation for AI adoption, including skills, resources, and strategic alignment. |
| **Urgency Score** | A metric (0-100%) indicating the perceived time-sensitive need to act on AI opportunities. Higher scores indicate immediate action required. |

## Assessment & Evaluation

| Term | Definition |
|------|------------|
| **Diagnosis** | Personalized insights derived from assessment scores, explaining what the results mean for the individual's AI journey. |
| **Quiz Question** | One of nine questions used to evaluate AI readiness, each designed to probe specific aspects of clarity, readiness, and urgency. |
| **Lead Capture** | The process of collecting a visitor's contact information through a form for follow-up communication; assessment email delivery is one Lead Capture path. |
| **Score Calculation** | The algorithm that converts assessment answers into three score metrics (clarity, readiness, urgency) and assigns an archetype. |

## Email & Communication

| Term | Definition |
|------|------------|
| **Prospect Result Email** | Automated email sent to assessment participants containing their profile, scores, diagnosis, and CTA to book a strategy call. |
| **Alex Notification Email** | Automated email sent to the site owner (Alex Myers) notifying of new assessment leads with key context. |
| **Archetype CTA** | The recommended call-to-action specific to an archetype's stage in AI adoption (e.g., "Book a Free Strategy Call" for early stages). |
| **Email Wrapper** | The standard HTML template structure for branded emails, including header, body, and footer. |

## Business & Services

| Term | Definition |
|------|------------|
| **1-on-1 Mentoring** | Personalized coaching sessions for overwhelmed professionals needing hands-on AI implementation guidance. |
| **Strategy Call** | A 30-minute consultation between Alex and prospects to discuss their specific AI situation based on assessment results. |
| **Tiered Package** | Service offerings with different price points and features (e.g., foundational, intensive, comprehensive). |
| **Service Path** | A coherent route from a visitor's starting point to a useful AI outcome, such as Guidance & Education or Done-For-You Implementation. |
| **Service System** | One of the four build groups shown on the Services hub: Data Foundation, Revenue Operations, Visibility, or Front-Line Help. Each system is delivered with the client and handed over for ownership. |
| **Paid Case** | A submitted Audit Case or Digital Identity case awaiting confirmation, payment, or delivery. |
| **ROI Calculator** | An interactive tool estimating time savings from AI adoption based on user inputs. |
| **Speaking** | Keynote speeches, roundtables, and workshops on AI adoption topics for organizations and events. |

## Technical & Architecture

| Term | Definition |
|------|------------|
| **Firebase App Hosting** | The serverless, Cloud Run-based hosting platform for the Next.js application, deployed at `thearmchairfuturist.com`. Auto-deploys on push to `main` via the Firebase App Hosting GitHub App. **Not** the same as legacy Firebase Hosting. |
| **Firebase Firestore** | NoSQL database for storing assessment leads and contact information. |
| **Resend** | Email service API used for sending automated emails. |
| **Next.js App Router** | The modern routing system used in Next.js 16 for building the application. |
| **Tailwind CSS** | Utility-first CSS framework for styling. |
| **Motion** | Animation library (Framer Motion) used for smooth UI transitions. |
| **OpenTelemetry** | Observability framework for tracking analytics events. |
| **BlurFade** | Custom UI component providing fade-in animation effects. |

## Conversion & Marketing

| Term | Definition |
|------|------------|
| **Social Proof** | Evidence of others' positive experiences (testimonials, case studies, statistics) that builds trust. |
| **Lead Magnet** | The free assessment itself, offered without purchase to capture qualified leads. |
| **A/B Testing** | The experiment framework used to optimize page elements using Firebase Analytics. |
| **Conversion** | The action taken by a visitor that indicates positive engagement (e.g., completing the assessment, booking a call). |
| **Call-to-Action (CTA)** | Clear instructions to encourage visitors to take a specific action (e.g., "Start the Assessment"). |

## Domain-Specific Concepts

| Term | Definition |
|------|------------|
| **Accountability Gap** | The disconnect between awareness of AI's potential and actual implementation. |
| **Psychology-Led Adoption** | An approach to AI implementation that prioritizes human psychology and behavioral change over technical tools. |
| **Thinking Styles** | Cognitive approaches to problem-solving (e.g., "The Thinker", "The Executor") that influence AI adoption patterns. |
| **Case Study** | Documented examples of how clients achieved specific outcomes using AI (quantified results). |

| **Assessment Flow** | Domain module owning assessment phase transitions (`landing` → `quiz` → `email` → `redirecting`), a single answer representation (option indices), scoring derivation, and Result Session helpers. UI pages are adapters. |
| **Answer Index** | Zero-based option index for a quiz question; the Assessment Flow source of truth for answers (not dual-stored with AnswerOption objects). |
