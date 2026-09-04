import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BlurFade } from '@/components/ui/blur-fade';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Front-Line Help: Agents, SaaS Cuts, Model Costs',
  description:
    'Tier-1 agents for intake and support, fewer SaaS seats, lower model spend. Scoped pilots, human handoff, you own the stack.',
  alternates: { canonical: '/services/frontline-help' },
  openGraph: {
    title: 'Front-Line Help',
    description: 'Agents take the repeat work. Humans take the rest.',
    url: '/services/frontline-help',
    siteName: 'The Armchair Futurist',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Front-Line Help',
    description: 'Agents take the repeat work. Humans take the rest.',
  },
};

const blocks = [
  {
    title: 'Tier-1 AI Agents',
    content:
      'Agents take scheduling, intake, and repeat support questions. Scoped pilots handle 60-70% of inbound volume. Humans take the rest. Every answer links its source.',
  },
  {
    title: 'SaaS Consolidation',
    content:
      'We replace overlapping subscriptions with one app on your data layer. Fewer seats. One bill you control. Exports stay open.',
  },
  {
    title: 'AI Cost Reduction',
    content:
      'Calls route to the cheapest model that clears your bar. Spend drops. Output holds. Monthly report shows both.',
  },
];

export default function FrontlineHelpPage() {
  return (
    <div className="min-h-[100dvh] bg-background">
      <div className="container mx-auto px-4 md:px-6 py-6">
        <Breadcrumbs
          items={[
            { label: 'Services', href: '/services' },
            { label: 'Front-Line Help', href: '/services/frontline-help' },
          ]}
        />
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          All systems
        </Link>
      </div>

      <section className="py-12 md:py-16 bg-secondary">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <BlurFade inView>
            <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-primary mb-6">
              Agents take the repeat work.
            </h1>
            <p className="text-xl text-foreground/80 font-sans leading-relaxed mb-8">
              Intake, scheduling, and Tier-1 support run on rails. Scope stays
              tight. Handoff to humans stays one tap away.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/audit">Map it first</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/services">All systems</Link>
              </Button>
            </div>
          </BlurFade>
        </div>
      </section>

      <div className="sr-only" aria-hidden="true" itemScope itemType="https://schema.org/Service">
        <span itemProp="name">Front-Line AI Help</span>
        <span itemProp="provider">Alex Myers, The Armchair Futurist</span>
        <span itemProp="description">
          Tier-1 agents, SaaS consolidation, and model routing. Scoped pilots
          with human handoff. Client owns the stack.
        </span>
      </div>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="grid grid-cols-1 gap-6">
            {blocks.map((b, i) => (
              <BlurFade inView key={b.title} delay={i * 0.05}>
                <article className="p-6 rounded-xl border border-border/60 bg-card">
                  <h2 className="font-heading text-xl font-bold text-primary mb-3">{b.title}</h2>
                  <p className="text-foreground/80 leading-relaxed">{b.content}</p>
                </article>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
          <BlurFade inView>
            <h2 className="font-heading text-3xl font-bold text-primary mb-4">Pilot one flow</h2>
            <p className="text-lg text-foreground/80 mb-8">
              One intake or support flow. Measured for two weeks. Then decide.
            </p>
            <Button asChild size="lg" className="font-bold">
              <Link href="/audit">Get the Blueprint</Link>
            </Button>
          </BlurFade>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Front-Line AI Help',
            provider: { '@id': 'https://thearmchairfuturist.com/#person' },
            description: 'Tier-1 agents, SaaS consolidation, and model routing.',
            mainEntityOfPage: 'https://thearmchairfuturist.com/services/frontline-help',
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What happens when the agent cannot help?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'It hands to a human with full transcript and source links. No dead ends.',
                },
              },
              {
                '@type': 'Question',
                name: 'Do we lose our data if we cancel a tool?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. Exports stay open and the data layer is yours. That is the point of consolidation.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
