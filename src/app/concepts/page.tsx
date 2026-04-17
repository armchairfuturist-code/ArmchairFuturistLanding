import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Brain, Users } from 'lucide-react';
import { BlurFade } from '@/components/ui/blur-fade';
import Breadcrumbs from '@/components/ui/breadcrumbs';

export const metadata: Metadata = {
  title: 'Core Concepts | The Armchair Futurist',
  description: 'Key concepts in AI adoption and organizational change: The Accountability Gap, Psychology-Led Adoption, and Results Thinkers. Understand the frameworks that drive successful AI implementation.',
  openGraph: {
    title: 'Core Concepts | The Armchair Futurist',
    description: 'Key concepts in AI adoption and organizational change. Understand the frameworks that drive successful AI implementation.',
    url: '/concepts',
    siteName: 'The Armchair Futurist',
    type: 'website',
  },
};

const concepts = [
  {
    href: '/concepts/accountability-gap',
    title: 'The Accountability Gap',
    description: 'The space between AI outputs and business results. Where AI adoption stalls because no one owns the outcome.',
    icon: Brain,
    stats: [
      '72% cite workflow redesign as top barrier',
      '67% pilot-only failure rate',
      '14 weeks avg. to 80% adoption'
    ]
  },
  {
    href: '/concepts/psychology-led-adoption',
    title: 'Psychology-Led Adoption',
    description: 'Address human barriers to AI adoption before technical ones. Uses data-driven profiling to identify the 5% who naturally embrace uncertainty.',
    icon: Users,
    stats: [
      '5% are Results Thinkers',
      '3x faster adoption',
      '72% cite people, not tech'
    ]
  },
  {
    href: '/concepts/results-thinkers',
    title: 'Results Thinkers',
    description: 'The top 5% who ask "What outcome do I need?" instead of "What can AI do?" Your highest-leverage asset for driving organizational change.',
    icon: BookOpen,
    stats: [
      '5% drive disproportionate success',
      '15-20 hours/week reclaimed',
      'Model behavior for peers'
    ]
  }
];

export default function ConceptsIndexPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Core Concepts | The Armchair Futurist",
            "description": "Key concepts in AI adoption and organizational change.",
            "author": { "@id": "https://thearmchairfuturist.com/#person" },
            "publisher": { "@id": "https://thearmchairfuturist.com/#organization" }
          })
        }}
      />

      {/* Navigation */}
      <div className="container mx-auto px-4 md:px-6 py-6">
        <Breadcrumbs items={[{ label: 'Concepts', href: '/concepts' }]} />
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
                Knowledge Base
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-primary mb-6">
              Core Concepts
            </h1>
            <p className="text-xl text-foreground/80 font-sans leading-relaxed mb-8">
              Key frameworks and mental models for understanding AI adoption in organizations. 
              These concepts form the foundation of Alex Myers' advisory approach.
            </p>
          </BlurFade>
        </div>
      </section>

      {/* Concepts Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {concepts.map((concept, index) => {
              const Icon = concept.icon;
              return (
                <BlurFade inView key={concept.href} delay={index * 0.1}>
                  <Link
                    href={concept.href}
                    className="group block p-6 rounded-xl border border-border/60 bg-card hover:border-primary/30 hover:shadow-lg transition-all h-full"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h2 className="font-heading text-lg font-bold text-primary group-hover:underline">
                          {concept.title}
                        </h2>
                      </div>
                    </div>
                    <p className="text-foreground/80 mb-4 text-sm leading-relaxed">
                      {concept.description}
                    </p>
                    <div className="space-y-1">
                      {concept.stats.map((stat) => (
                        <p key={stat} className="text-xs text-muted-foreground">
                          • {stat}
                        </p>
                      ))}
                    </div>
                  </Link>
                </BlurFade>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
          <BlurFade inView>
            <h2 className="font-heading text-3xl font-bold text-primary mb-4">
              Ready to Apply These Concepts?
            </h2>
            <p className="text-lg text-foreground/80 mb-8">
              Book a free strategy call to discuss how these frameworks apply to your organization.
            </p>
            <Link
              href="/#services"
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Explore Services
            </Link>
          </BlurFade>
        </div>
      </section>
    </div>
  );
}