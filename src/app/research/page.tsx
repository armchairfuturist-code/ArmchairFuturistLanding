export const revalidate = 3600;
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import LastUpdated from '@/components/ui/last-updated';
import { CALENDAR_URL } from '@/lib/constants';
import { ExternalLink, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Adoption Research & Benchmarks (2022–2026) | The Armchair Futurist',
  description:
    'Original data from 40+ AI deployments: 67% pilot-only failure rate, 72% cite workflow redesign as top barrier, and 14 weeks average time to 80% adoption.',
  alternates: {
    canonical: '/research',
  },
  openGraph: {
    title: 'AI Adoption Research & Benchmarks (2022–2026)',
    description:
      'Empirical benchmarks from 40+ organizational AI deployments by Alex Myers (The Armchair Futurist).',
    url: '/research',
    siteName: 'The Armchair Futurist',
    images: ['/og-card.png'],
    type: 'article',
  },
};

const benchmarks = [
  {
    metric: '40+ AI systems deployed',
    finding: 'Verified production systems shipped across consulting, SaaS, healthcare, e-commerce, and higher ed (2022–2026).',
    source: '/case-studies',
  },
  {
    metric: '67% pilot-only failure rate',
    finding: 'Two-thirds of AI pilots succeed in isolation but never reach production because no single owner holds authority.',
    source: '/concepts/pilot-itis',
  },
  {
    metric: '72% cite workflow redesign as top barrier',
    finding: 'Stalled AI projects fail on process, incentives, and messy data—not model intelligence.',
    source: '/concepts/accountability-gap',
  },
  {
    metric: '14 weeks to 80% team adoption',
    finding: 'Organizations that identify and support their top 5% Results Thinkers reach 80% voluntary adoption 3x faster.',
    source: '/concepts/psychology-led-adoption',
  },
  {
    metric: '10–20 hours/week reclaimed',
    finding: 'Average weekly time saved per operator when workflows are redesigned before automation.',
    source: '/services',
  },
];

export default function ResearchPage() {
  return (
    <main id="main-content" className="min-h-screen bg-canvas pt-20 pb-16">
      <article className="max-w-3xl mx-auto px-4 md:px-6">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Research & Benchmarks', href: '/research' },
          ]}
        />

        <header className="mt-6 mb-10">
          <p className="font-mono text-[12px] uppercase tracking-[0.35em] text-hp-electric mb-3">
            Original Research · 2022–2026
          </p>
          <h1 className="font-heading text-display font-medium text-ink mb-4">
            AI Adoption Benchmarks: Why 67% of Pilots Stall and How Teams Reach 80% Adoption
          </h1>
          <LastUpdated date="2026-11-18" />
        </header>

        <section
          aria-label="Quick answer"
          className="mb-10 rounded-xl border border-hp-electric/30 bg-surface p-6"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-hp-electric mb-2">
            Quick Summary
          </p>
          <p className="text-ink text-base md:text-lg leading-relaxed">
            Across 40+ AI deployments (2022–2026), <strong>67% of AI pilots never reach production</strong>{' '}
            and <strong>72% of stalled projects</strong> lack a clear outcome owner. Teams that pair
            workflow redesign with internal Results Thinkers reach <strong>80% adoption in 14 weeks</strong>{' '}
            and reclaim <strong>10–20 hours per week</strong>.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-heading text-2xl font-medium text-ink mb-4">
            Key Benchmarks (2022–2026)
          </h2>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface text-ink">
                <tr>
                  <th className="p-3 font-medium">Benchmark</th>
                  <th className="p-3 font-medium">Observed Pattern</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-charcoal">
                {benchmarks.map((b) => (
                  <tr key={b.metric}>
                    <td className="p-3 font-medium text-ink whitespace-nowrap">
                      <Link href={b.source} className="hover:underline text-hp-electric">
                        {b.metric}
                      </Link>
                    </td>
                    <td className="p-3">{b.finding}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-6 text-charcoal leading-relaxed mb-12">
          <h2 className="font-heading text-2xl font-medium text-ink">
            Methodology &amp; Field Observations
          </h2>
          <p>
            These figures come from 40+ hands-on consulting and implementation engagements led by
            Alex Myers (The Armchair Futurist) between 2022 and 2026 across North America and Europe,
            including management consulting, B2B SaaS, healthcare, e-commerce, and higher education.
          </p>
          <p>
            Just as early factories bolted electric motors onto steam-era floor plans for decades
            before redesigning the factory floor, most teams bolt frontier LLMs onto broken
            approval chains and messy folders. The limiting factor for enterprise AI is rarely model
            intelligence—it is authority, clean data, and outcome ownership.
          </p>
        </section>

        <section className="rounded-xl border border-border bg-surface p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-heading text-xl font-medium text-ink mb-1">
              Benchmark your team&apos;s readiness
            </h2>
            <p className="text-sm text-charcoal">
              Take the 3-minute AI readiness diagnostic or book a strategy call.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/assessment">
                Take the Free Assessment <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer">
                Book Free Strategy Call <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </section>
      </article>
    </main>
  );
}
