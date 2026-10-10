import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next';
import Link from 'next/link';
import { BlurFade } from '@/components/ui/blur-fade';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import { CONCEPTS } from '@/content/concepts';

export const metadata: Metadata = {
  title: 'Core Concepts | The Armchair Futurist',
  description: 'Key concepts in AI adoption and organizational change: The Accountability Gap, Psychology-Led Adoption, and Results Thinkers. Understand the frameworks that drive successful AI implementation.',
  alternates: {
    canonical: '/concepts',
  },
  openGraph: {
  images: ['/opengraph-image'],
  title: 'Core Concepts',
    description: 'Key concepts in AI adoption and organizational change. Understand the frameworks that drive successful AI implementation.',
    url: '/concepts',
    siteName: 'The Armchair Futurist',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Core Concepts | The Armchair Futurist',
    description: 'Key concepts in AI adoption and organizational change: The Accountability Gap, Psychology-Led Adoption, and Results Thinkers.',
  },
};

const concepts = CONCEPTS;

export default function ConceptsIndexPage() {
  return (
    <div className="min-h-[100dvh] bg-background">
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
                    className="group block p-6 rounded-xl border border-border/60 bg-card hover:border-primary/30 hover:shadow-lg transition-[border-color,box-shadow] h-full"
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