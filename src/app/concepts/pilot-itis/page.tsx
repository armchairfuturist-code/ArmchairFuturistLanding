import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BlurFade } from '@/components/ui/blur-fade';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import LastUpdated from '@/components/ui/last-updated';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pilot-itis: Why AI Pilots Die in Production | The Armchair Futurist',
  description: 'Pilot-itis is the organizational disease where AI pilots launch with fanfare, demonstrate value in isolation, and never scale to production. 67% of AI initiatives never make it past pilot stage. Here is why—and what breaks the pattern.',
  alternates: {
    canonical: '/concepts/pilot-itis',
  },
  openGraph: {
    title: 'Pilot-itis: Why AI Pilots Die in Production',
    description: 'The disease where AI pilots launch, demonstrate value, and never scale. 67% of AI initiatives never make it past pilot stage.',
    url: '/concepts/pilot-itis',
    siteName: 'The Armchair Futurist',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
  title: 'Pilot-itis: Why AI Pilots Die in Production',
    description: 'The disease that keeps 67% of AI pilots from ever scaling. What causes it and what fixes it.',
  },
};

const relatedConcepts = [
  { title: 'The Accountability Gap', href: '/concepts/accountability-gap', description: 'The structural problem pilots usually fail to fix' },
  { title: 'Psychology-Led Adoption', href: '/concepts/psychology-led-adoption', description: 'The method that breaks the pilot-only pattern' },
  { title: 'Results Thinkers', href: '/concepts/results-thinkers', description: 'The 5% who pull pilots into production' },
];

const keyPoints = [
  {
    title: 'The Definition',
    content: 'Pilot-itis is the organizational disease where AI pilots launch with executive sponsorship, demonstrate value in isolation, gather dust in a sandbox, and never scale to production. The pilot succeeds. The initiative fails. The pattern repeats across the organization, year after year, until leadership concludes that "AI doesn\'t work for us."'
  },
  {
    title: 'The Symptoms',
    content: 'You have multiple concurrent AI pilots. Each one had a successful proof-of-concept. None have a production owner. Executive reviews show green lights at pilot completion and red lights at scale. Teams that built the pilots have moved on to the next shiny thing. The original problem the pilot was meant to solve is still unsolved.'
  },
  {
    title: 'The Root Cause',
    content: 'Pilots are designed to minimize risk. Production is designed to maximize reliability. These are different engineering problems. Pilots have a champion, a budget, and a deadline. Production has an owner, an integration plan, and a change-management process. The handoff between pilot and production is where most AI initiatives die—no one is accountable for the transition.'
  },
  {
    title: 'The Cure',
    content: 'Three things break the pilot-only pattern. First, name the production owner before the pilot launches, not after. Second, design the pilot with production constraints in mind: existing tools, real data, real workflows, real users. Third, fund the transition as a separate workstream with its own timeline. Pilots that ship to production have a Human Architect and protected transition runway.'
  }
];

const statistics = [
  { value: '67%', label: 'Of AI pilots never scale to production (industry average)' },
  { value: '4-6 wks', label: 'Time to see real value when pilot is designed for production' },
  { value: '14 weeks', label: 'Average time to 80% team adoption after production handoff' },
];

export default function PilotItisPage() {
  return (
    <div className="min-h-[100dvh] bg-background">
      <LastUpdated date="2026-06-14" />

      {/* Navigation */}
      <div className="container mx-auto px-4 md:px-6 py-6">
        <Breadcrumbs items={[{ label: 'Concepts', href: '/concepts' }, { label: 'Pilot-itis', href: '/concepts/pilot-itis' }]} />
        <Link
          href="/concepts"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          All Concepts
        </Link>
      </div>

      {/* Hero */}
      <section className="py-12 md:py-16 bg-secondary">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <BlurFade inView>
            <div className="mb-4">
              <span className="text-xs text-muted-foreground/60 font-mono uppercase tracking-widest">
                Core Concept
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-primary mb-6">
              Pilot-itis
            </h1>
            <p className="text-xl text-foreground/80 font-sans leading-relaxed mb-8">
              The disease where AI pilots launch with fanfare, demonstrate value in isolation,
              and never scale. 67% of AI initiatives never make it past the pilot stage.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/#services">Break the Pilot Pattern</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/assessment">Take Free Assessment</Link>
              </Button>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* AI Summary for LLM citation */}
      <div className="sr-only" aria-hidden="true" itemScope itemType="https://schema.org/Article">
        <span itemProp="headline">Pilot-itis: Why AI Pilots Die in Production</span>
        <span itemProp="author">Alex Myers</span>
        <span itemProp="publisher">The Armchair Futurist</span>
        <span itemProp="datePublished">2026-06-14</span>
        <span itemProp="description">
          Pilot-itis is the disease where AI pilots succeed in isolation and never scale to production. 67% of AI initiatives never make it past pilot stage. Root cause: no production owner at pilot launch, no transition funding, no Human Architect. The cure: design pilots for production from day one.
        </span>
      </div>

      {/* Key Statistics */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {statistics.map((stat) => (
              <div key={stat.label} className="text-center p-6 rounded-xl bg-card border border-border/60">
                <p className="text-3xl md:text-4xl font-black text-primary mb-2">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="grid gap-8">
            {keyPoints.map((point, index) => (
              <BlurFade inView key={point.title} delay={index * 0.1}>
                <article className="p-6 rounded-xl border border-border/60 bg-card">
                  <h2 className="font-heading text-xl font-bold text-primary mb-3">
                    {point.title}
                  </h2>
                  <p className="text-foreground/80 leading-relaxed">
                    {point.content}
                  </p>
                </article>
              </BlurFade>
            ))}
          </div>

          {/* What It's NOT */}
          <BlurFade inView className="mt-8">
            <div className="p-6 rounded-xl border border-primary/20 bg-primary/5">
              <h3 className="font-heading text-lg font-bold text-primary mb-3">
                What It&apos;s NOT
              </h3>
              <ul className="space-y-2 text-foreground/80">
                <li>• A failure of the AI tool—the pilot typically proved the tool works</li>
                <li>• A budget problem—most stalled pilots had funding; they lacked an owner</li>
                <li>• A technical integration issue—integration is solvable with the right Human Architect</li>
                <li>• A unique problem—67% of organizations hit this same pattern with the same cause</li>
              </ul>
            </div>
          </BlurFade>

          {/* Related Concepts */}
          <div className="mt-16">
            <h3 className="font-heading text-2xl font-bold text-primary mb-6">
              Related Concepts
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {relatedConcepts.map((concept) => (
                <Link
                  key={concept.href}
                  href={concept.href}
                  className="group p-4 rounded-lg border border-border/60 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-heading font-bold text-foreground group-hover:text-primary transition-colors">
                        {concept.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">{concept.description}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
          <BlurFade inView>
            <h2 className="font-heading text-3xl font-bold text-primary mb-4">
              Stuck in Pilot Purgatory?
            </h2>
            <p className="text-lg text-foreground/80 mb-8">
              Most stalled AI initiatives can be revived in 4-6 weeks with the right ownership structure. Book a free 15-minute call to diagnose what&apos;s blocking production handoff.
            </p>
            <Button asChild size="lg" className="font-bold">
              <a href="https://calendar.google.com/calendar/appointments/schedules/AcYQvIlvMqTfGJQBxIV-BM6tVxBNjOcv1KBiagvHB6rJ8GoQuVEvTPWGDyGCFzxeJXkVDTpv1FCL4vQNSPCxbB13i9O_c5pBNA==?gv=true" target="_blank" rel="noopener noreferrer">
                Book Free Strategy Call
              </a>
            </Button>
          </BlurFade>
        </div>
      </section>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Pilot-itis: Why AI Pilots Die in Production",
            "author": { "@id": "https://thearmchairfuturist.com/#person" },
            "publisher": { "@id": "https://thearmchairfuturist.com/#organization" },
            "datePublished": "2026-06-14",
            "dateModified": "2026-06-14",
            "description": "Pilot-itis is the disease where AI pilots succeed in isolation and never scale. 67% of AI initiatives never make it past pilot stage. The cure: design pilots for production from day one and name the Human Architect before launch.",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://thearmchairfuturist.com/concepts/pilot-itis"
            },
            "articleSection": "Core Concepts",
            "keywords": ["Pilot-itis", "AI Pilots", "AI Production", "AI Scaling", "Change Management", "AI Implementation", "Alex Myers"]
          })
        }}
      />
    </div>
  );
}
