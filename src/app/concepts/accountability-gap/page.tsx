import type { Metadata } from 'next';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BlurFade } from '@/components/ui/blur-fade';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import LastUpdated from '@/components/ui/last-updated';

export const metadata: Metadata = {
  title: 'The Accountability Gap in AI Adoption | The Armchair Futurist',
  description: 'The Accountability Gap is the space between what an AI system produces and what a business actually needs. Most companies layer AI onto existing processes without rethinking workflows, incentives, or decision rights. The result is that nobody owns the outcome.',
  openGraph: {
    title: 'The Accountability Gap in AI Adoption',
    description: 'The space between AI outputs and business results—where AI adoption stalls because no one owns the outcome.',
    url: '/concepts/accountability-gap',
    siteName: 'The Armchair Futurist',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Accountability Gap in AI Adoption',
    description: 'The space between AI outputs and business results—where AI adoption stalls because no one owns the outcome.',
  },
};

const relatedConcepts = [
  { title: 'Psychology-Led Adoption', href: '/concepts/psychology-led-adoption', description: 'Addressing human barriers before technical ones' },
  { title: 'Results Thinkers', href: '/concepts/results-thinkers', description: 'The 5% who drive disproportionate adoption success' },
];

const keyPoints = [
  {
    title: 'The Definition',
    content: 'The Accountability Gap is the space between what an AI system produces and what a business actually needs. It\'s where AI outputs—reports, predictions, recommendations—fail to translate into business results because no one is responsible for turning AI output into business outcome.'
  },
  {
    title: 'The Pattern',
    content: 'Most companies layer AI onto existing processes without rethinking workflows, incentives, or decision rights. The AI produces output. Someone reviews it. No one owns what happens next. The output sits in a dashboard or inbox, unactioned.'
  },
  {
    title: 'The Symptom',
    content: 'You\'ve deployed AI tools. People have access. Usage metrics look fine. But business outcomes haven\'t changed. Productivity hasn\'t improved. Decisions aren\'t faster. The gap between AI activity and business impact is where accountability broke down.'
  },
  {
    title: 'The Fix',
    content: 'Assign a Human Architect—someone who bridges AI outputs to business outcomes. Their job isn\'t to use AI; it\'s to ensure AI output connects to decisions, actions, and measurable results. This is the highest-leverage intervention in AI adoption.'
  }
];

const statistics = [
  { value: '72%', label: 'Cite workflow redesign as top barrier—not technology' },
  { value: '67%', label: 'Pilot-only initiatives that never scale' },
  { value: '14 weeks', label: 'Average time to 80% team adoption with proper ownership' },
];

export default function AccountabilityGapPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="container mx-auto px-4 md:px-6 py-6">
        <Breadcrumbs items={[
          { label: 'Concepts', href: '/concepts' },
          { label: 'Accountability Gap', href: '/concepts/accountability-gap' }
        ]} />
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
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
              The Accountability Gap
            </h1>
            <p className="text-xl text-foreground/80 font-sans leading-relaxed mb-8">
              The space between what an AI system produces and what a business actually needs. 
              Where AI adoption stalls because no one owns the outcome.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/#services">See How Alex Bridges This Gap</Link>
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
        <span itemProp="headline">The Accountability Gap in AI Adoption</span>
        <span itemProp="author">Alex Myers</span>
        <span itemProp="publisher">The Armchair Futurist</span>
        <span itemProp="datePublished">2026-03-29</span>
        <span itemProp="description">
          The Accountability Gap is the space between AI outputs and business results. 
          It occurs when companies deploy AI without assigning ownership for outcomes. 
          72% cite workflow redesign as the top barrier. 67% of pilot-only initiatives fail to scale. 
          The fix: assign a Human Architect to bridge AI outputs to business outcomes.
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

          {/* What It's Not */}
          <BlurFade inView className="mt-8">
            <div className="p-6 rounded-xl border border-primary/20 bg-primary/5">
              <h3 className="font-heading text-lg font-bold text-primary mb-3">
                What It\'s NOT
              </h3>
              <ul className="space-y-2 text-foreground/80">
                <li>• A technology problem that better AI tools can solve</li>
                <li>• A training problem that more workshops can fix</li>
                <li>• A communication problem that better documentation addresses</li>
                <li>• Temporary—it requires structural change, not band-aids</li>
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
              Ready to Bridge Your Accountability Gap?
            </h2>
            <p className="text-lg text-foreground/80 mb-8">
              Start with a free 15-minute strategy call. Alex will identify where your AI systems 
              are leaking value and what to do about it.
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
            "headline": "The Accountability Gap in AI Adoption",
            "author": { "@id": "https://thearmchairfuturist.com/#person" },
            "publisher": { "@id": "https://thearmchairfuturist.com/#organization" },
            "datePublished": "2026-03-29",
            "dateModified": "2026-03-29",
            "description": "The Accountability Gap is the space between AI outputs and business results. Learn how to bridge it with proper ownership and Human Architects.",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://thearmchairfuturist.com/concepts/accountability-gap"
            },
            "articleSection": "Core Concepts",
            "keywords": ["Accountability Gap", "AI Adoption", "Change Management", "Human Architect", "AI Implementation", "Alex Myers"]
          })
        }}
      />
    </div>
  );
}