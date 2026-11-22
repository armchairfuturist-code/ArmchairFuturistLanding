export const revalidate = 3600;
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import LastUpdated from '@/components/ui/last-updated';
import { CALENDAR_URL } from '@/lib/constants';
import { ExternalLink, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Consultant vs AI Agency: Which Should a Small Business Hire? (2026)',
  description:
    'Quick answer: Hire an AI consultant when you need workflow clarity, team literacy, and systems you own without a retainer. Hire an AI agency when you want outsourced software engineering.',
  alternates: {
    canonical: '/blog/ai-consultant-vs-ai-agency',
  },
  openGraph: {
    title: 'AI Consultant vs AI Agency: Which Should a Small Business Hire?',
    description:
      'A practical 2026 comparison of cost, ownership, retainers, and outcomes for founders and small teams.',
    url: '/blog/ai-consultant-vs-ai-agency',
    siteName: 'The Armchair Futurist',
    images: ['/opengraph-image'],
    type: 'article',
  },
};

export default function AiConsultantVsAgencyPage() {
  return (
    <main id="main-content" className="min-h-screen bg-canvas pt-20 pb-16">
      <article className="max-w-3xl mx-auto px-4 md:px-6">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: 'AI Consultant vs AI Agency', href: '/blog/ai-consultant-vs-ai-agency' },
          ]}
        />

        <header className="mt-6 mb-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-hp-electric mb-3">
            Buyer Guide · 2026
          </p>
          <h1 className="font-heading text-display font-medium text-ink mb-4">
            AI Consultant vs AI Agency: Which Should a Small Business Hire?
          </h1>
          <LastUpdated date="2026-11-18" />
        </header>

        <section
          aria-label="Quick answer"
          className="mb-10 rounded-xl border border-hp-electric/30 bg-surface p-6"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-hp-electric mb-2">
            Quick Answer
          </p>
          <p className="text-ink text-base md:text-lg leading-relaxed">
            <strong>Hire an AI consultant</strong> if you want your team to own the workflows, cut
            software and token waste, and build systems without an ongoing retainer.{' '}
            <strong>Hire an AI agency</strong> if you already know the exact software spec and want
            external engineers to build and maintain a custom product on a monthly contract.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-heading text-2xl font-medium text-ink mb-4">
            The 10-Second Comparison
          </h2>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface text-ink">
                <tr>
                  <th className="p-3 font-medium">Factor</th>
                  <th className="p-3 font-medium">AI Consultant (The Armchair Futurist)</th>
                  <th className="p-3 font-medium">Traditional AI Agency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-charcoal">
                <tr>
                  <td className="p-3 font-medium text-ink">Ownership</td>
                  <td className="p-3">You keep the repo, prompts, configs, and runbooks.</td>
                  <td className="p-3">Often hosted in agency infrastructure or proprietary glue.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-ink">Retainer</td>
                  <td className="p-3">No retainer required. Fixed-scope sprints or coaching.</td>
                  <td className="p-3">Monthly retainers ($3,000–$15,000+/mo) are standard.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-ink">Primary Focus</td>
                  <td className="p-3">Workflow design, mental models, and model-routing ROI.</td>
                  <td className="p-3">Custom software development and ticketed feature delivery.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-ink">Best For</td>
                  <td className="p-3">Founders and teams (5–200 people) reclaiming 10–20 hrs/wk.</td>
                  <td className="p-3">Funded companies outsourcing a dedicated engineering pod.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-6 text-charcoal leading-relaxed mb-12">
          <h2 className="font-heading text-2xl font-medium text-ink">
            Why Execution Is Cheap, and Premise Is Expensive
          </h2>
          <p>
            Code and automation scripts are cheap to generate now. What stays expensive is attacking
            the premise of a workflow before you automate it. Agencies profit from complexity and
            ongoing maintenance hours; an independent consultant profits from making you
            self-sufficient.
          </p>
          <p>
            Across 40+ deployments, most small teams carry 30%+ wasted AI spend—paying frontier
            model prices for unfinished thoughts or running automations on messy folders. Fixing
            the foundation first—planning on a strong model and routing execution to fast,
            inexpensive models—delivers results in 4–6 weeks without a permanent vendor bill.
          </p>
        </section>

        <section className="rounded-xl border border-border bg-surface p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-heading text-xl font-medium text-ink mb-1">
              Want systems you own without a retainer?
            </h2>
            <p className="text-sm text-charcoal">
              Start with a 15-minute strategy call or explore fixed-scope build sprints.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer">
                Book 15-min Call <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/services">
                View Services <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </article>
    </main>
  );
}
