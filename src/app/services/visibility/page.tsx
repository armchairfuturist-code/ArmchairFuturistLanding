import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BlurFade } from '@/components/ui/blur-fade';
import Breadcrumbs from '@/components/ui/breadcrumbs';

export const metadata: Metadata = {
  title: 'Visibility: Reporting and Capacity Tracking',
  description:
    'Dashboards and capacity views from CRM, ads, and books. See overload and margin before month end.',
  alternates: { canonical: '/services/visibility' },
  openGraph: {
    title: 'Visibility',
    description: 'See overload and margin before month end.',
    url: '/services/visibility',
    siteName: 'The Armchair Futurist',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visibility',
    description: 'See overload and margin before month end.',
  },
};

export default function VisibilityPage() {
  return (
    <div className="min-h-[100dvh] bg-background">
      <div className="container mx-auto px-4 md:px-6 py-6">
        <Breadcrumbs
          items={[
            { label: 'Services', href: '/services' },
            { label: 'Visibility', href: '/services/visibility' },
          ]}
        />
        <nav aria-label="Systems" className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-sans">
          <Link href="/services/data-foundation" className="text-muted-foreground hover:text-primary transition-colors">
            Data Foundation
          </Link>
          <Link href="/services/revenue-operations" className="text-muted-foreground hover:text-primary transition-colors">
            Revenue Operations
          </Link>
          <Link href="/services/visibility" aria-current="page" className="font-semibold text-foreground">
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
              See the week as it is.
            </h1>
            <p className="text-xl text-foreground/80 font-sans leading-relaxed mb-8">
              Reports and capacity pull from live sources. No month-end
              scramble. No silent overload.
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
        <span itemProp="name">Reporting and Capacity Visibility</span>
        <span itemProp="provider">Alex Myers, The Armchair Futurist</span>
        <span itemProp="description">
          Automated reporting and capacity tracking from CRM, ad platforms, and
          financials. Client-ready reports with zero manual input.
        </span>
      </div>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="grid grid-cols-1 gap-6">
              <article className="p-6 rounded-xl border border-border/60 bg-card">
                <h2 className="font-heading text-xl font-bold text-foreground mb-3">Automated Reporting</h2>
                <p className="text-foreground/80 leading-relaxed">
                  Dashboards and client-ready reports pull from CRM, ad
                  platforms, and financials. Sources listed on each page. Refresh
                  times stamped.
                </p>
              </article>
              <article className="p-6 rounded-xl border border-border/60 bg-card">
                <h2 className="font-heading text-xl font-bold text-foreground mb-3">Capacity Tracking</h2>
                <p className="text-foreground/80 leading-relaxed">
                  Live view of who holds too much and who has room. Assignments
                  move before burnout. History stays for planning.
                </p>
              </article>
          </div>
          <div className="mt-8 p-6 rounded-xl border border-border/60 bg-card">
            <h2 className="font-heading text-lg font-bold text-foreground mb-2">You keep</h2>
            <p className="text-foreground/80 text-sm leading-relaxed">
              Sources, refresh times, and field map, plus keys and a 2-page runbook. You see where every number comes from.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
            Not for you if
          </h2>
          <div className="p-6 rounded-xl border border-border/60 bg-card mb-10">
            <ul className="space-y-2 text-foreground/80 text-sm leading-relaxed">
              <li>· You want a warehouse rebuild. Sources stay where they are.</li>
              <li>· You want vanity charts. Every number lists its source.</li>
            </ul>
          </div>
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
            Asked before an audit
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <details className="p-5 rounded-xl border border-border/60 bg-card">
              <summary className="font-semibold text-foreground cursor-pointer">Where does the data come from?</summary>
              <p className="mt-2 text-sm text-foreground/80 leading-relaxed">Your CRM, ad platforms, and books. Each report lists its sources and refresh time.</p>
            </details>
            <details className="p-5 rounded-xl border border-border/60 bg-card">
              <summary className="font-semibold text-foreground cursor-pointer">How fresh is the data?</summary>
              <p className="mt-2 text-sm text-foreground/80 leading-relaxed">Each report stamps its refresh time next to its sources. Stale numbers show their age.</p>
            </details>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
          <div>
            <h2 className="font-heading text-3xl font-bold text-foreground mb-4">One true page</h2>
            <p className="text-lg text-foreground/80 mb-4">
              We wire your three sources first. The rest follows.
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
            name: 'Reporting and Capacity Visibility',
            provider: { '@id': 'https://thearmchairfuturist.com/#person' },
            description: 'Automated reporting and capacity tracking.',
            mainEntityOfPage: 'https://thearmchairfuturist.com/services/visibility',
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
                name: 'Where does the data come from?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Your CRM, ad platforms, and books. Each report lists its sources and refresh time.',
                },
              },
              {
                '@type': 'Question',
                name: 'How fresh is the data?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Each report stamps its refresh time next to its sources. Stale numbers show their age.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
