import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BlurFade } from '@/components/ui/blur-fade';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Systems That Pay Off | The Armchair Futurist',
  description:
    'Work I build with you, systems you own. ROI Blueprint, data groundwork, revenue ops, reporting, and front-line agents. Starts with a $297 · €247 audit.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'AI Systems That Pay Off | The Armchair Futurist',
    description:
      'Work I build with you, systems you own. Four build groups, one starting audit, full ownership on handoff.',
    url: '/services',
    siteName: 'The Armchair Futurist',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Systems That Pay Off | The Armchair Futurist',
    description:
      'Work I build with you, systems you own. Starts with the ROI Blueprint.',
  },
};

const groups = [
  {
    href: '/services/data-foundation',
    title: 'Data Foundation',
    description:
      'One place for data, SOPs, and workflows. Pipelines pull scattered sheets and inbox threads into one system you can query. AI answers from your SOPs and cites the source.',
    covers: 'Context Layer · Data Consolidation · Internal Knowledge Base',
  },
  {
    href: '/services/revenue-operations',
    title: 'Revenue Operations',
    description:
      'Onboarding, pipeline, documents, reporting, and billing that run without copy-paste. Deals get touched. Reports build themselves. Invoices match the work.',
    covers: 'Onboarding · Pipeline · Documents · Reporting · Billing',
  },
  {
    href: '/services/visibility',
    title: 'Visibility',
    description:
      'Dashboards and capacity views pull from CRM, ad platforms, and books. You see who holds too much and what pays before month end.',
    covers: 'Automated Reporting · Capacity Tracking',
  },
  {
    href: '/services/frontline-help',
    title: 'Front-Line Help',
    description:
      'Agents take scheduling, intake, and repeat support questions. Overlapping seats go. Model spend drops while output holds.',
    covers: 'Tier-1 Agents · SaaS Consolidation · Cost Reduction',
  },
];

export default function ServicesHubPage() {
  return (
    <div className="min-h-[100dvh] bg-background">
      <div className="container mx-auto px-4 md:px-6 py-6">
        <Breadcrumbs items={[{ label: 'Services', href: '/services' }]} />
      </div>

      <section className="py-12 md:py-16 bg-secondary">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <BlurFade inView>
            <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
              Work I build with you. Systems you own.
            </h1>
            <p className="text-xl text-foreground/80 font-sans leading-relaxed mb-4">
              I install the system with you. You run it after. Every build
              starts with the ROI Blueprint. You keep the code, the docs, and
              the keys.
            </p>
            <p className="text-base text-foreground/70 font-sans leading-relaxed mb-8">
              Four build groups. One starting audit. Team training closes every
              handoff, so logins turn into daily use.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/audit">Get the ROI Blueprint</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/assessment">Take Free Assessment</Link>
              </Button>
            </div>
          </BlurFade>
        </div>
      </section>

      <div className="sr-only" aria-hidden="true" itemScope itemType="https://schema.org/CollectionPage">
        <span itemProp="name">AI Systems That Pay Off</span>
        <span itemProp="description">
          The Armchair Futurist builds AI systems with clients who keep full
          ownership. Groups: data groundwork, revenue operations, visibility,
          front-line help. Every build starts with the ROI Blueprint audit.
          Team adoption training closes each handoff.
        </span>
      </div>

      <section className="py-10 border-y border-border/60 bg-card">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          <p className="text-sm text-foreground/80 font-sans leading-relaxed">
            <strong className="text-foreground">40+ AI systems deployed.</strong> 10–20 hours a week handed back. Rated 4.9/5 across 40+ engagements.
          </p>
          <Link href="/case-studies" className="text-sm font-semibold text-primary hover:underline shrink-0">
            See the cases
          </Link>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="grid gap-6 md:grid-cols-2">
            {groups.map((g) => (
              <div key={g.href}>
                <Link
                  href={g.href}
                  className="group block p-6 rounded-xl border border-border/60 bg-card hover:border-primary/30 hover:shadow-lg transition-[border-color,box-shadow] h-full"
                >
                  <h2 className="font-heading text-xl font-bold text-foreground group-hover:underline mb-2">
                    {g.title}
                  </h2>
                  <p className="text-foreground/80 mb-4 text-sm leading-relaxed">
                    {g.description}
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">{g.covers}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Open <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 rounded-xl border border-border/60 bg-card">
            <h2 className="font-heading text-xl font-bold text-foreground mb-2">
              Team Adoption Training
            </h2>
            <p className="text-foreground/80 text-sm leading-relaxed mb-3">
              Staff use the system in live work, not in a slide deck. Logins
              mean nothing until the work moves. Training runs inside every
              build until it moves.
            </p>
            <Link href="/how-i-work" className="text-sm font-semibold text-primary hover:underline">
              How I work
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
            How we start
          </h2>
          <ol className="grid gap-4 md:grid-cols-3">
            {[
              { t: 'ROI Blueprint', d: 'We map your workflows and rank each fix by hours back and cash protected.' },
              { t: 'One system live', d: 'One group ships in 1-2 weeks. You watch each connection go in.' },
              { t: 'Handoff', d: 'Runbook, keys, and training. You run it without me.' },
            ].map((s) => (
              <li key={s.t} className="p-5 rounded-xl border border-border/60 bg-card">
                <h3 className="font-heading font-bold text-foreground mb-1">{s.t}</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
          <div>
            <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
              Map it before you build it
            </h2>
            <p className="text-lg text-foreground/80 mb-8">
              The Blueprint costs $297 · €247 while the format is new. If it
              names fewer than three ranked actions, you do not pay.
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
            '@type': 'CollectionPage',
            name: 'AI Systems That Pay Off | The Armchair Futurist',
            description:
              'Work built with you, systems you own. Four build groups plus ROI Blueprint and adoption training.',
            author: { '@id': 'https://thearmchairfuturist.com/#person' },
            publisher: { '@id': 'https://thearmchairfuturist.com/#organization' },
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
                name: 'Where does a build start?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'With the ROI Blueprint. We map your workflows, rank each fix by hours back and cash protected, and hand you the plan in writing.',
                },
              },
              {
                '@type': 'Question',
                name: 'Who owns the system after?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'You do. Repo, configs, keys, and a 2-page runbook transfer at handoff. No lock-in.',
                },
              },
              {
                '@type': 'Question',
                name: 'What does it cost to run?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Typically $20-80 per month in infra plus model use. Builds reuse your data layer to cut seat spend.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
