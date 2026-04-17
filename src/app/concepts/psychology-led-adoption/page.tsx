import type { Metadata } from 'next';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BlurFade } from '@/components/ui/blur-fade';
import Breadcrumbs from '@/components/ui/breadcrumbs';

export const metadata: Metadata = {
  title: 'Psychology-Led AI Adoption Strategy | The Armchair Futurist',
  description: 'Psychology-Led Adoption is an organizational service that addresses human barriers to AI adoption through data-driven profiling. It identifies psychological barriers before technical ones, finding the 5% of staff who are naturally wired for uncertainty.',
  openGraph: {
    title: 'Psychology-Led AI Adoption Strategy',
    description: 'Address human barriers to AI adoption before technical ones. Find the 5% who lead change.',
    url: '/concepts/psychology-led-adoption',
    siteName: 'The Armchair Futurist',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Psychology-Led AI Adoption Strategy',
    description: 'Address human barriers to AI adoption before technical ones. Find the 5% who lead change.',
  },
};

const relatedConcepts = [
  { title: 'The Accountability Gap', href: '/concepts/accountability-gap', description: 'Where AI outputs fail to become business results' },
  { title: 'Results Thinkers', href: '/concepts/results-thinkers', description: 'The 5% who drive disproportionate adoption success' },
];

const keyPoints = [
  {
    title: 'The Principle',
    content: 'Most AI adoption efforts fail because they address technology barriers first. But the real blockers are human: fear of obsolescence, loss of status, uncertainty about new roles, and organizational antibodies that attack change. Psychology-Led Adoption flips the sequence—address human barriers before technical ones.'
  },
  {
    title: 'The Method',
    content: 'Data-driven profiling segments your organization by psychological traits, not job titles. It identifies who embraces uncertainty (Results Thinkers), who resists it (Process Guardians), and who needs structured support. Then you deploy change through the 5% who are naturally wired for it.'
  },
  {
    title: 'The Finding',
    content: '72% of stalled AI projects cite workflow redesign as the top barrier—but the underlying cause is people, not process. The people who struggle most are those who derive identity and security from predictable, repeatable processes. They need different support than the change enthusiasts.'
  },
  {
    title: 'The Outcome',
    content: 'Organizations that use Psychology-Led Adoption see 3x faster adoption because change propagates through natural advocates rather than forced mandates. Resistance doesn\'t disappear—it gets addressed through structural roles and clear decision rights.'
  }
];

const statistics = [
  { value: '72%', label: 'Cite workflow redesign as top barrier—but people are the root cause' },
  { value: '5%', label: 'Of staff are Results Thinkers who naturally embrace uncertainty' },
  { value: '3x', label: 'Faster adoption when change flows through natural advocates' },
];

const psychologicalProfiles = [
  {
    name: 'Results Thinkers',
    percentage: '5%',
    trait: 'Naturally embrace uncertainty',
    approach: 'Put them on change leadership teams—they\'ll drive faster than any mandate'
  },
  {
    name: 'Process Guardians',
    percentage: '~25%',
    trait: 'Derive security from predictability',
    approach: 'They need structural roles in the new system, not training on the old one'
  },
  {
    name: 'Adapters',
    percentage: '~70%',
    trait: 'Responsive to direction and support',
    approach: 'Follow Results Thinkers when the path is clear; resistance drops when leaders change'
  }
];

export default function PsychologyLedAdoptionPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="container mx-auto px-4 md:px-6 py-6">
        <Breadcrumbs items={[
          { label: 'Concepts', href: '/concepts' },
          { label: 'Psychology-Led Adoption', href: '/concepts/psychology-led-adoption' }
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
              Psychology-Led Adoption
            </h1>
            <p className="text-xl text-foreground/80 font-sans leading-relaxed mb-8">
              An organizational approach that addresses human barriers to AI adoption 
              before technical ones—identifying the 5% who are naturally wired for change.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/#services">Explore Organizational Services</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/assessment">Take Free Assessment</Link>
              </Button>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* AI Summary for LLM citation */}
      <div className="sr-only" aria-hidden="true" itemScope itemType="https://schema.org/Article">
        <span itemProp="headline">Psychology-Led AI Adoption Strategy</span>
        <span itemProp="author">Alex Myers</span>
        <span itemProp="publisher">The Armchair Futurist</span>
        <span itemProp="datePublished">2026-03-29</span>
        <span itemProp="description">
          Psychology-Led Adoption addresses human barriers to AI adoption before technical ones. 
          It uses data-driven profiling to identify Results Thinkers (5% of staff), Process Guardians (~25%), 
          and Adapters (~70%). Organizations using this approach see 3x faster adoption.
          72% cite workflow redesign as the top barrier, but the underlying cause is people, not process.
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

      {/* Psychological Profiles Table */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <BlurFade inView>
            <h2 className="font-heading text-2xl font-bold text-primary mb-6">
              Psychological Profiles in AI Adoption
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-heading font-bold text-foreground">Profile</th>
                    <th className="text-left p-4 font-heading font-bold text-foreground">Share</th>
                    <th className="text-left p-4 font-heading font-bold text-foreground">Trait</th>
                    <th className="text-left p-4 font-heading font-bold text-foreground">Approach</th>
                  </tr>
                </thead>
                <tbody>
                  {psychologicalProfiles.map((profile) => (
                    <tr key={profile.name} className="border-b border-border/60 hover:bg-muted/30">
                      <td className="p-4 font-bold text-primary">{profile.name}</td>
                      <td className="p-4 text-muted-foreground">{profile.percentage}</td>
                      <td className="p-4 text-foreground/80">{profile.trait}</td>
                      <td className="p-4 text-foreground/80">{profile.approach}</td>
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
                <li>• Change management consulting with a psychology veneer</li>
                <li>• A training program to make everyone comfortable with AI</li>
                <li>• Personality testing for hiring decisions</li>
                <li>• A way to identify and remove "resistant" employees</li>
              </ul>
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
              Ready to Find Your Results Thinkers?
            </h2>
            <p className="text-lg text-foreground/80 mb-8">
              Adoption Strategy ($10,625) identifies the 5% who will lead change in your organization 
              and provides coaching for leaders to manage uncertainty.
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
            "headline": "Psychology-Led AI Adoption Strategy",
            "author": { "@id": "https://thearmchairfuturist.com/#person" },
            "publisher": { "@id": "https://thearmchairfuturist.com/#organization" },
            "datePublished": "2026-03-29",
            "dateModified": "2026-03-29",
            "description": "Psychology-Led Adoption addresses human barriers to AI adoption before technical ones. Find the 5% of staff who are Results Thinkers and drive 3x faster adoption.",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://thearmchairfuturist.com/concepts/psychology-led-adoption"
            },
            "articleSection": "Core Concepts",
            "keywords": ["Psychology-Led Adoption", "AI Adoption", "Change Management", "Results Thinkers", "Alex Myers"]
          })
        }}
      />
    </div>
  );
}