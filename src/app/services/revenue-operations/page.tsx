import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BlurFade } from '@/components/ui/blur-fade';
import Breadcrumbs from '@/components/ui/breadcrumbs';

export const metadata: Metadata = {
  title: 'Revenue Operations: Onboarding, Pipeline, Docs, Billing',
  description:
    'Onboarding, pipeline, documents, reporting, and billing that run without copy-paste. Built with you, owned by you.',
  alternates: { canonical: '/services/revenue-operations' },
  openGraph: {
    title: 'Revenue Operations',
    description: 'Deals get touched. Reports build themselves.',
    url: '/services/revenue-operations',
    siteName: 'The Armchair Futurist',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Revenue Operations',
    description: 'Deals get touched. Reports build themselves.',
  },
};

const blocks = [
  {
    title: 'Client Onboarding Automation',
    content:
      'Account setup, kickoff routing, and intake run without a hand on the keyboard. New client in, welcome out, tasks assigned.',
  },
  {
    title: 'Pipeline Automation',
    content:
      'New deals enter, enrich, and flag when they sit too long. Nothing sits untouched.',
  },
  {
    title: 'Document Generation',
    content:
      'Proposals, contracts, and memos draft from structured data. You approve before anything sends.',
  },
  {
    title: 'Automated Reporting',
    content:
      'Dashboards and client reports pull from CRM, ad platforms, and books. No copy-paste at month end.',
  },
  {
    title: 'Billing Reconciliation',
    content:
      'We catch scope creep and invoice errors before they leak. You see what to bill and why.',
  },
];

export default function RevenueOpsPage() {
  return (
    <div className="min-h-[100dvh] bg-background">
      <div className="container mx-auto px-4 md:px-6 py-6">
        <Breadcrumbs
          items={[
            { label: 'Services', href: '/services' },
            { label: 'Revenue Operations', href: '/services/revenue-operations' },
          ]}
        />
        <nav aria-label="Systems" className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-sans">
          <Link href="/services/data-foundation" className="text-muted-foreground hover:text-primary transition-colors">
            Data Foundation
          </Link>
          <Link href="/services/revenue-operations" aria-current="page" className="font-semibold text-foreground">
            Revenue Operations
          </Link>
          <Link href="/services/visibility" className="text-muted-foreground hover:text-primary transition-colors">
            Visibility
          </Link>
          <Link href="/services/frontline-help" className="text-muted-foreground hover:text-primary transition-colors">
            Front-Line Help
          </Link>
        </nav>
      </div>

      <section className="py-12 md:py-16 bg-secondary">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <BlurFade inView>
            <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
              Money in, money out, nothing stuck.
            </h1>
            <p className="text-xl text-foreground/80 font-sans leading-relaxed mb-8">
              Five flows that leak cash when run by hand. We wire them to your
              CRM and books, then hand you the keys.
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
        <span itemProp="name">Revenue Operations Automation</span>
        <span itemProp="provider">Alex Myers, The Armchair Futurist</span>
        <span itemProp="description">
          Onboarding, pipeline, document, reporting, and billing automation
          wired to CRM and books. Owner approves before anything sends.
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
              Repo, workflow configs, field map, keys, 2-page runbook. Running cost mapped in the Blueprint. No seat trap.
            </p>
          </div>
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
            Not for you if
          </h2>
          <div className="p-6 rounded-xl border border-border/60 bg-card mb-10">
            <ul className="space-y-2 text-foreground/80 text-sm leading-relaxed">
              <li>· You want messages sent without review. Drafts build, you approve.</li>
              <li>· You want a new CRM. This wires the one you have.</li>
            </ul>
          </div>
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
            Asked before an audit
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <details className="p-5 rounded-xl border border-border/60 bg-card">
              <summary className="font-semibold text-foreground cursor-pointer">Does automation send to clients without approval?</summary>
              <p className="mt-2 text-sm text-foreground/80 leading-relaxed">No. Drafts build automatically. You approve before anything sends.</p>
            </details>
            <details className="p-5 rounded-xl border border-border/60 bg-card">
              <summary className="font-semibold text-foreground cursor-pointer">Which system does it connect to?</summary>
              <p className="mt-2 text-sm text-foreground/80 leading-relaxed">Your CRM, ad platforms, and books. We map fields in the audit, then wire once.</p>
            </details>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
          <div>
            <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Stop the leak first</h2>
            <p className="text-lg text-foreground/80 mb-4">
              The Blueprint ranks which flow pays back fastest.
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
            name: 'Revenue Operations Automation',
            provider: { '@id': 'https://thearmchairfuturist.com/#person' },
            description:
              'Onboarding, pipeline, document, reporting, and billing automation.',
            mainEntityOfPage: 'https://thearmchairfuturist.com/services/revenue-operations',
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
                name: 'Does automation send to clients without approval?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. Drafts build automatically. You approve before anything sends.',
                },
              },
              {
                '@type': 'Question',
                name: 'Which system does it connect to?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Your CRM, ad platforms, and books. We map fields in the audit, then wire once.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
