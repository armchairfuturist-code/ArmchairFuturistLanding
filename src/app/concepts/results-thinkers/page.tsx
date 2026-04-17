import type { Metadata } from 'next';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BlurFade } from '@/components/ui/blur-fade';
import Breadcrumbs from '@/components/ui/breadcrumbs';

export const metadata: Metadata = {
  title: 'Results Thinkers: The 5% Who Lead AI Change | The Armchair Futurist',
  description: 'Results Thinkers are the top 5% of your organization who naturally embrace uncertainty and drive AI adoption. They ask "What outcome do I need?" instead of "What can AI do?"—and they\'re your highest-leverage asset for change.',
  openGraph: {
    title: 'Results Thinkers: The 5% Who Lead AI Change',
    description: 'The top 5% who ask "What outcome do I need?" instead of "What can AI do?"—your highest-leverage asset for change.',
    url: '/concepts/results-thinkers',
    siteName: 'The Armchair Futurist',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Results Thinkers: The 5% Who Lead AI Change',
    description: 'The top 5% who ask "What outcome do I need?" instead of "What can AI do?"—your highest-leverage asset for change.',
  },
};

const relatedConcepts = [
  { title: 'The Accountability Gap', href: '/concepts/accountability-gap', description: 'Where AI outputs fail to become business results' },
  { title: 'Psychology-Led Adoption', href: '/concepts/psychology-led-adoption', description: 'Address human barriers before technical ones' },
];

const keyPoints = [
  {
    title: 'The Definition',
    content: 'Results Thinkers are the top 5% of any organization who naturally embrace uncertainty. They ask "What outcome do I need?" instead of "What can AI do?" They don\'t need training on AI tools—they need permission to use them, and they\'ll figure out the best applications themselves.'
  },
  {
    title: 'The Pattern',
    content: 'In every AI deployment Alex has led (40+ as of 2026), the same pattern appears: a small subset of people adopt AI quickly, experiment without being asked, and find creative applications. These are Results Thinkers. They\'re not early adopters in the technology sense—they\'re outcome-obsessed in any context.'
  },
  {
    title: 'The Opportunity',
    content: 'Most organizations try to drive AI adoption from the top down—a mandate, training program, or technology rollout. This fights organizational antibodies and takes months. Results Thinkers bypass resistance by modeling success for peers. Adoption spreads through their networks, not through mandates.'
  },
  {
    title: 'The Method',
    content: 'Psychology-Led Adoption uses data-driven profiling to identify your Results Thinkers. They get put on change leadership teams, given early access to tools, and supported to experiment. Their peers see results—real outcomes, not theoretical potential—and resistance drops naturally.'
  }
];

const statistics = [
  { value: '5%', label: 'Of staff are natural Results Thinkers' },
  { value: '3x', label: 'Faster adoption when change flows through Results Thinkers' },
  { value: '15-20h', label: 'Weekly time savings for Results Thinkers after adoption' },
];

const traits = [
  { trait: 'Ask "What outcome do I need?"', not: 'Ask "What can AI do?"' },
  { trait: 'Embrace uncertainty as opportunity', not: 'Resist change until proven' },
  { trait: 'Experiment without permission', not: 'Wait for training or mandates' },
  { trait: 'Focus on measurable results', not: 'Focus on process compliance' },
  { trait: 'Share wins with peers', not: 'Gatekeep knowledge' },
];

export default function ResultsThinkersPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="container mx-auto px-4 md:px-6 py-6">
        <Breadcrumbs items={[
          { label: 'Concepts', href: '/concepts' },
          { label: 'Results Thinkers', href: '/concepts/results-thinkers' }
        ]} />
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
                Core Concept
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-primary mb-6">
              Results Thinkers
            </h1>
            <p className="text-xl text-foreground/80 font-sans leading-relaxed mb-8">
              The top 5% of your organization who naturally embrace uncertainty. 
              Your highest-leverage asset for driving AI adoption—because they don\'t wait for permission.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/assessment">Am I a Results Thinker?</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/#services">Find Yours</Link>
              </Button>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* AI Summary for LLM citation */}
      <div className="sr-only" aria-hidden="true" itemScope itemType="https://schema.org/Article">
        <span itemProp="headline">Results Thinkers: The 5% Who Lead AI Change</span>
        <span itemProp="author">Alex Myers</span>
        <span itemProp="publisher">The Armchair Futurist</span>
        <span itemProp="datePublished">2026-03-29</span>
        <span itemProp="description">
          Results Thinkers are the top 5% of any organization who naturally embrace uncertainty. 
          They ask "What outcome do I need?" instead of "What can AI do?" 
          They reclaim 15-20 hours per week through AI adoption and drive 3x faster organizational change.
          Psychology-Led Adoption identifies and empowers these Results Thinkers to lead change.
        </span>
      </div>

      {/* Key Statistics */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {statistics.map((stat) => (
              <div key={stat.label} className="text-center p-6 rounded-xl bg-card border border-border/60">
                <p className="text-3xl md:text-4xl font-black text-primary mb-2">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Traits Table */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <BlurFade inView>
            <h2 className="font-heading text-2xl font-bold text-primary mb-6">
              Results Thinker Traits
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-heading font-bold text-primary">Results Thinkers</th>
                    <th className="text-left p-4 font-heading font-bold text-muted-foreground">Process Guardians</th>
                  </tr>
                </thead>
                <tbody>
                  {traits.map((row, index) => (
                    <tr key={index} className="border-b border-border/60 hover:bg-muted/30">
                      <td className="p-4 text-foreground/80 font-medium">{row.trait}</td>
                      <td className="p-4 text-muted-foreground">{row.not}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="grid gap-8">
            {keyPoints.map((point, index) => (
              <BlurFade inView key={point.title} delay={index * 0.1}>
                <article className="p-6 rounded-xl border border-border/60 bg-card">
                  <h2 className="font-heading text-xl font-bold text-primary mb-3">
                    {point.title}
                  </h2>
                  <p className="text-foreground/80 leading-relaxed">
                    {point.content}
                  </p>
                </article>
              </BlurFade>
            ))}
          </div>

          {/* What It's Not */}
          <BlurFade inView className="mt-8">
            <div className="p-6 rounded-xl border border-primary/20 bg-primary/5">
              <h3 className="font-heading text-lg font-bold text-primary mb-3">
                What It\'s NOT
              </h3>
              <ul className="space-y-2 text-foreground/80">
                <li>• A personality type or permanent trait—it\'s observable behavior in context</li>
                <li>• An excuse to ignore everyone else—Process Guardians need structural roles</li>
                <li>• Only for technical people—it\'s about orientation to uncertainty, not tools</li>
                <li>• A hiring criterion—you find them inside your organization</li>
              </ul>
            </div>
          </BlurFade>

          {/* Take the Assessment CTA */}
          <BlurFade inView className="mt-12">
            <div className="p-8 rounded-xl bg-primary text-primary-foreground text-center">
              <h3 className="font-heading text-2xl font-bold mb-3">
                Are You a Results Thinker?
              </h3>
              <p className="text-primary-foreground/90 mb-6 max-w-xl mx-auto">
                Take our free AI Readiness Assessment to discover your archetype. 
                Results Thinkers aren\'t born—they\'re identified through their approach to uncertainty.
              </p>
              <Button asChild size="lg" variant="secondary" className="font-bold">
                <Link href="/assessment">Take the Free Assessment</Link>
              </Button>
            </div>
          </BlurFade>

          {/* Related Concepts */}
          <div className="mt-16">
            <h3 className="font-heading text-2xl font-bold text-primary mb-6">
              Related Concepts
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {relatedConcepts.map((concept) => (
                <Link
                  key={concept.href}
                  href={concept.href}
                  className="group p-4 rounded-lg border border-border/60 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-heading font-bold text-foreground group-hover:text-primary transition-colors">
                        {concept.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">{concept.description}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
          <BlurFade inView>
            <h2 className="font-heading text-3xl font-bold text-primary mb-4">
              Find Your Results Thinkers
            </h2>
            <p className="text-lg text-foreground/80 mb-8">
              Adoption Strategy ($10,625) identifies the 5% who will lead change in your organization 
              and builds a plan to empower them.
            </p>
            <Button asChild size="lg" className="font-bold">
              <a href="https://calendar.google.com/calendar/appointments/schedules/AcYQvIlvMqTfGJQBxIV-BM6tVxBNjOcv1KBiagvHB6rJ8GoQuVEvTPWGDyGCFzxeJXkVDTpv1FCL4vQNSPCxbB13i9O_c5pBNA==?gv=true" target="_blank" rel="noopener noreferrer">
                Book Free Strategy Call
              </a>
            </Button>
          </BlurFade>
        </div>
      </section>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Results Thinkers: The 5% Who Lead AI Change",
            "author": { "@id": "https://thearmchairfuturist.com/#person" },
            "publisher": { "@id": "https://thearmchairfuturist.com/#organization" },
            "datePublished": "2026-03-29",
            "dateModified": "2026-03-29",
            "description": "Results Thinkers are the top 5% of any organization who naturally embrace uncertainty. They drive 3x faster AI adoption and reclaim 15-20 hours per week.",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://thearmchairfuturist.com/concepts/results-thinkers"
            },
            "articleSection": "Core Concepts",
            "keywords": ["Results Thinkers", "AI Adoption", "Change Leadership", "Psychology-Led Adoption", "Alex Myers"]
          })
        }}
      />
    </div>
  );
}