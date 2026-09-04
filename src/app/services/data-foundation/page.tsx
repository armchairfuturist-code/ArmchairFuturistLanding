import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BlurFade } from '@/components/ui/blur-fade';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Data Foundation: Context Layer, Pipelines, Knowledge Base',
  description:
    'One queryable system for SOPs, sheets, and inbox. AI answers from your source, not memory. Built with you, owned by you.',
  alternates: { canonical: '/services/data-foundation' },
  openGraph: {
    title: 'Data Foundation',
    description: 'One place your AI tells the truth from.',
    url: '/services/data-foundation',
    siteName: 'The Armchair Futurist',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Data Foundation',
    description: 'One place your AI tells the truth from.',
  },
};

const blocks = [
  {
    title: 'Context Layer',
    content:
      'One place for data, SOPs, and workflows. It replaces 20 disconnected tools as the reference point. Staff checks here first.',
  },
  {
    title: 'Data Consolidation',
    content:
      'Pipelines pull scattered sheets and inbox threads into one system you can query. Nightly sync. Dedupe rules you can read.',
  },
  {
    title: 'Internal Knowledge Base',
    content:
      'AI answers from your SOPs and cites the source per answer. The team stops asking the same questions twice.',
  },
];

export default function DataFoundationPage() {
  return (
    <div className="min-h-[100dvh] bg-background">
      <div className="container mx-auto px-4 md:px-6 py-6">
        <Breadcrumbs
          items={[
            { label: 'Services', href: '/services' },
            { label: 'Data Foundation', href: '/services/data-foundation' },
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
              One place your AI tells the truth from.
            </h1>
            <p className="text-xl text-foreground/80 font-sans leading-relaxed mb-8">
              Sheets, inbox threads, and SOPs join into one queryable system.
              AI answers from that system, not from memory. Audits pass faster.
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
        <span itemProp="name">Data Foundation</span>
        <span itemProp="provider">Alex Myers, The Armchair Futurist</span>
        <span itemProp="description">
          Context Layer, consolidation pipelines, and SOP knowledge base in one
          queryable system. You keep repo, configs, store, keys, and runbook.
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

          <BlurFade inView className="mt-8">
            <div className="p-6 rounded-xl border border-border/60 bg-card">
              <h2 className="font-heading text-lg font-bold text-primary mb-2">You keep</h2>
              <p className="text-foreground/80 text-sm leading-relaxed">
                Repo, pipeline configs, vector store, access keys, 2-page
                runbook. Running cost is typically $20-80 per month plus model
                use. One named owner and one hour per week keeps it clean.
              </p>
            </div>
          </BlurFade>
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
          <BlurFade inView>
            <h2 className="font-heading text-3xl font-bold text-primary mb-4">Start with the Blueprint</h2>
            <p className="text-lg text-foreground/80 mb-8">
              We pick the top 20 SOPs first, then wire the rest.
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
            name: 'Data Foundation',
            provider: { '@id': 'https://thearmchairfuturist.com/#person' },
            description:
              'Context Layer, consolidation pipelines, and SOP knowledge base in one queryable system.',
            mainEntityOfPage: 'https://thearmchairfuturist.com/services/data-foundation',
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
                name: 'How long does a Data Foundation take?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'One to two weeks after the audit. Top 20 SOPs first, then the rest.',
                },
              },
              {
                '@type': 'Question',
                name: 'What do you need from us?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Access to Sheets, Drive, and inbox, plus one operator interview. No migration project.',
                },
              },
              {
                '@type': 'Question',
                name: 'What if our SOPs are messy?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'We structure the top 20 first. The rest follows the same template.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
