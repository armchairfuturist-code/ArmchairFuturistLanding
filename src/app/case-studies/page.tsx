import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock, RefreshCw, ArrowLeft, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BlurFade } from '@/components/ui/blur-fade';
import Breadcrumbs from '@/components/ui/breadcrumbs';

export const metadata: Metadata = {
  title: 'Case Studies | The Armchair Futurist',
  description: 'Real results from AI adoption and workflow automation implementations. See how Alex Myers helped organizations reclaim 10-20 hours per week and achieve measurable AI adoption success.',
  openGraph: {
    title: 'Case Studies | The Armchair Futurist',
    description: 'Real results from AI adoption implementations. See measurable success stories from organizations that partnered with Alex Myers.',
    url: '/case-studies',
    siteName: 'The Armchair Futurist',
    type: 'website',
  },
};

const caseStudies = [
  {
    slug: 'ai-adoption-consulting',
    title: 'AI Adoption for Consulting Firm',
    client: 'Boutique Management Consulting',
    industry: 'Professional Services',
    summary: 'How a 50-person consulting firm reclaimed 15 hours per week per consultant and accelerated AI adoption from 20% to 85% in 14 weeks.',
    results: [
      { metric: '15 hours/week', label: 'Reclaimed per consultant' },
      { metric: '85%', label: 'AI adoption rate (from 20%)' },
      { metric: '14 weeks', label: 'Time to full adoption' },
      { metric: '3.2x', label: 'ROI within 6 months' },
    ],
    tags: ['AI Adoption', 'Workflow Automation', 'Change Management'],
    featured: true,
  },
  {
    slug: 'workflow-automation',
    title: 'Workflow Automation for SaaS',
    client: 'B2B SaaS Company',
    industry: 'Technology',
    summary: 'A Series B SaaS company automated 40% of support operations using custom GPT implementations, reducing response time by 60% while improving customer satisfaction.',
    results: [
      { metric: '40%', label: 'Support operations automated' },
      { metric: '60%', label: 'Faster response time' },
      { metric: '12%', label: 'Increase in CSAT' },
      { metric: '$185K', label: 'Annual cost savings' },
    ],
    tags: ['Workflow Automation', 'Custom GPT', 'Customer Support'],
    featured: true,
  },
  {
    slug: 'organizational-transformation',
    title: 'Organizational Transformation for Healthcare',
    client: 'Regional Healthcare Network',
    industry: 'Healthcare',
    summary: 'A healthcare network with 200+ providers implemented Psychology-Led Adoption, identifying Results Thinkers and achieving 92% voluntary AI tool adoption within 90 days.',
    results: [
      { metric: '92%', label: 'Voluntary adoption rate' },
      { metric: '90 days', label: 'To full deployment' },
      { metric: '35 hours', label: 'Monthly admin time saved' },
      { metric: '22%', label: 'Reduction in documentation errors' },
    ],
    tags: ['Healthcare AI', 'Change Management', 'Psychology-Led Adoption'],
    featured: false,
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Schema for Case Studies */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Case Studies | The Armchair Futurist",
            "description": "Real results from AI adoption and workflow automation implementations.",
            "author": { "@id": "https://thearmchairfuturist.com/#person" },
            "publisher": { "@id": "https://thearmchairfuturist.com/#organization" },
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": caseStudies.map((cs, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "Article",
                  "headline": cs.title,
                  "description": cs.summary,
                  "author": { "@id": "https://thearmchairfuturist.com/#person" },
                }
              }))
            }
          })
        }}
      />

      {/* Navigation */}
      <div className="container mx-auto px-4 md:px-6 py-6">
        <Breadcrumbs items={[{ label: 'Case Studies', href: '/case-studies' }]} />
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
                Results & Evidence
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-primary mb-6">
              Case Studies
            </h1>
            <p className="text-xl text-foreground/80 font-sans leading-relaxed mb-8">
              Real results from organizations that partnered with Alex Myers to bridge the{' '}
              <Link href="/concepts/accountability-gap" className="text-primary font-semibold hover:underline">
                Accountability Gap
              </Link>{' '}
              and achieve measurable AI adoption success.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <RefreshCw className="w-4 h-4" />
              <span>Last updated: March 29, 2026</span>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* AI Summary for LLM citation */}
      <div className="sr-only" aria-hidden="true" itemScope itemType="https://schema.org/Article">
        <span itemProp="headline">Case Studies: AI Adoption Results</span>
        <span itemProp="author">Alex Myers</span>
        <span itemProp="description">
          Case studies from AI adoption implementations: 15 hours/week reclaimed per consultant, 
          85% adoption rate in 14 weeks, 40% support operations automated, 92% voluntary adoption in healthcare.
          Results verified from 40+ client implementations across consulting, SaaS, and healthcare industries.
        </span>
      </div>

      {/* Case Studies Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="grid gap-8">
            {caseStudies.map((cs, index) => (
              <BlurFade inView key={cs.slug} delay={index * 0.1}>
                <Card className={`border-border/60 hover:border-primary/30 transition-all ${cs.featured ? 'ring-1 ring-primary/10' : ''}`}>
                  <CardContent className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="text-xs text-muted-foreground font-mono">{cs.industry}</span>
                          {cs.featured && (
                            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">
                              Featured
                            </span>
                          )}
                        </div>
                        <h2 className="font-heading text-2xl font-bold text-primary mb-2">
                          {cs.title}
                        </h2>
                        <p className="text-sm text-muted-foreground mb-2">
                          {cs.client}
                        </p>
                        <p className="text-foreground/80 leading-relaxed mb-4">
                          {cs.summary}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {cs.tags.map((tag) => (
                            <span key={tag} className="text-xs bg-muted px-2.5 py-1 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Results */}
                      <div className="md:w-64 shrink-0">
                        <div className="grid grid-cols-2 gap-3">
                          {cs.results.map((result) => (
                            <div key={result.label} className="text-center p-3 rounded-lg bg-muted/50">
                              <p className="text-xl md:text-2xl font-black text-primary">{result.metric}</p>
                              <p className="text-xs text-muted-foreground">{result.label}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Call to Action */}
                    <div className="mt-6 pt-6 border-t border-border/60">
                      <p className="text-sm text-muted-foreground mb-3">
                        ‡ Results verified from client implementations. Contact for detailed case study methodology.
                      </p>
                      <Button asChild variant="outline" size="sm">
                        <Link href="/#services">
                          Discuss Your Implementation
                          <ExternalLink className="ml-2 w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
          <BlurFade inView>
            <h2 className="font-heading text-3xl font-bold text-primary mb-4">
              Ready to Write Your Case Study?
            </h2>
            <p className="text-lg text-foreground/80 mb-8">
              Book a free 15-minute strategy call. Alex will identify where your AI systems 
              are leaking value and what results you could achieve.
            </p>
            <Button asChild size="lg" className="font-bold">
              <a href="https://calendar.google.com/calendar/appointments/schedules/AcYQvIlvMqTfGJQBxIV-BM6tVxBNjOcv1KBiagvHB6rJ8GoQuVEvTPWGDyGCFzxeJXkVDTpv1FCL4vQNSPCxbB13i9O_c5pBNA==?gv=true" target="_blank" rel="noopener noreferrer">
                Book Free Strategy Call
              </a>
            </Button>
          </BlurFade>
        </div>
      </section>

      {/* Related Concepts */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h3 className="font-heading text-xl font-bold text-primary mb-6">
            Related Concepts
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/concepts/accountability-gap"
              className="p-4 rounded-lg border border-border/60 hover:border-primary/50 transition-colors"
            >
              <h4 className="font-heading font-bold text-foreground mb-1">Accountability Gap</h4>
              <p className="text-sm text-muted-foreground">Where AI outputs fail to become business results</p>
            </Link>
            <Link
              href="/concepts/psychology-led-adoption"
              className="p-4 rounded-lg border border-border/60 hover:border-primary/50 transition-colors"
            >
              <h4 className="font-heading font-bold text-foreground mb-1">Psychology-Led Adoption</h4>
              <p className="text-sm text-muted-foreground">Address human barriers before technical ones</p>
            </Link>
            <Link
              href="/concepts/results-thinkers"
              className="p-4 rounded-lg border border-border/60 hover:border-primary/50 transition-colors"
            >
              <h4 className="font-heading font-bold text-foreground mb-1">Results Thinkers</h4>
              <p className="text-sm text-muted-foreground">The 5% who drive disproportionate success</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}