import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BlurFade } from '@/components/ui/blur-fade';
import Breadcrumbs from '@/components/ui/breadcrumbs';

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
        <nav aria-label="Systems" className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-sans">
          <Link href="/services/data-foundation" className="text-muted-foreground hover:text-primary transition-colors">
            Data Foundation
          </Link>
          <Link href="/services/revenue-operations" className="text-muted-foreground hover:text-primary transition-colors">
            Revenue Operations
          </Link>
          <Link href="/services/visibility" className="text-muted-foreground hover:text-primary transition-colors">
            Visibility
          </Link>
          <Link href="/services/frontline-help" aria-current="page" className="font-semibold text-foreground">
            Front-Line Help
          </Link>
        </nav>
      </div>

      <section className="py-12 md:py-16 bg-secondary">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <BlurFade inView>
            <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
              Agents take the repeat work.
            </h1>
            <p className="text-xl text-foreground/80 font-sans leading-relaxed mb-8">
              Intake, scheduling, and Tier-1 support run on rails. Scope stays
              tight. Handoff to humans stays one tap away.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/audit">Get the ROI Blueprint</Link>
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
            {blocks.map((b) => (
              <article key={b.title} className="p-6 rounded-xl border border-border/60 bg-card">
                <h2 className="font-heading text-xl font-bold text-foreground mb-3">{b.title}</h2>
                <p className="text-foreground/80 leading-relaxed">{b.content}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="p-6 rounded-xl border border-border/60 bg-card mb-10">
            <h2 className="font-heading text-lg font-bold text-foreground mb-2">You keep</h2>
            <p className="text-foreground/80 text-sm leading-relaxed">
              Agent configs, handoff rules, keys, 2-page runbook. Monthly spend report shows cost and output side by side.
            </p>
          </div>
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
            Not for you if
          </h2>
          <div className="p-6 rounded-xl border border-border/60 bg-card mb-10">
            <ul className="space-y-2 text-foreground/80 text-sm leading-relaxed">
              <li>· You want humans out. Agents take the repeat work, humans take the rest.</li>
              <li>· You want a black box. Every answer links its source.</li>
            </ul>
          </div>
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
            Asked before an audit
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <details className="p-5 rounded-xl border border-border/60 bg-card">
              <summary className="font-semibold text-foreground cursor-pointer">What happens when the agent cannot help?</summary>
              <p className="mt-2 text-sm text-foreground/80 leading-relaxed">It hands to a human with full transcript and source links. No dead ends.</p>
            </details>
            <details className="p-5 rounded-xl border border-border/60 bg-card">
              <summary className="font-semibold text-foreground cursor-pointer">Do we lose our data if we cancel a tool?</summary>
              <p className="mt-2 text-sm text-foreground/80 leading-relaxed">No. Exports stay open and the data layer is yours. That is the point of consolidation.</p>
            </details>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
          <div>
            <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Pilot one flow</h2>
            <p className="text-lg text-foreground/80 mb-4">
              One intake or support flow. Measured for two weeks. Then decide.
            </p>
            <p className="text-sm text-foreground/70 mb-8">
              $297 · €247. Ranked actions and wiring order. Fewer than three ranked actions, you do not pay.
            </p>
            <Button asChild size="lg" className="font-bold">
              <Link href="/audit">Get the ROI Blueprint</Link>
            </Button>
          </div>
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
