import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BlurFade } from '@/components/ui/blur-fade';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import LastUpdated from '@/components/ui/last-updated';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'The Human Architect Role: Who Closes the AI Accountability Gap | The Armchair Futurist',
  description: 'The Human Architect is the person who translates AI output into business outcome. Without this role, AI investments stall in the Accountability Gap. Here is what the role does, who should fill it, and how to set them up for success.',
  openGraph: {
    title: 'The Human Architect: Closing the AI Accountability Gap',
    description: 'The role that bridges AI output and business outcome—without it, AI investments stall.',
    url: '/concepts/human-architect',
    siteName: 'The Armchair Futurist',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Human Architect Role | The Armchair Futurist',
    description: 'Who closes the AI Accountability Gap? The Human Architect. What the role does and how to set it up.',
  },
};

const relatedConcepts = [
  { title: 'The Accountability Gap', href: '/concepts/accountability-gap', description: 'Why AI investments stall in the first place' },
  { title: 'Psychology-Led Adoption', href: '/concepts/psychology-led-adoption', description: 'The method that finds and equips Human Architects' },
];

const keyPoints = [
  {
    title: 'The Definition',
    content: 'A Human Architect is the person assigned to translate AI output into business outcome. They are not the AI user, the AI builder, or the AI buyer. Their job is to ensure that what the AI produces actually gets used—reaches a decision, drives an action, and connects to a measurable result. Without this role, the Accountability Gap stays open.'
  },
  {
    title: 'Why the Role Exists',
    content: 'Most companies deploy AI tools and assume usage equals value. It does not. AI output arrives in a dashboard, a Slack thread, or an email. Someone must own what happens next: review, route, decide, action, and close the loop. When no one owns that path, the output decays into noise. The Human Architect owns the path.'
  },
  {
    title: 'Where to Find Them',
    content: 'The best Human Architects are usually existing operators who already sit between teams, tools, and decisions. They are not the most senior leader and not the most junior. They are the people who already translate between functions—product to sales, ops to finance, customer to engineering. Psychology-Led Adoption profiles identify them through behavior, not job title.'
  },
  {
    title: 'How to Set Them Up',
    content: 'Three conditions make a Human Architect effective: clear ownership over a business outcome (not just an AI tool), protected time (typically 15-25% of their role for the first six months), and executive air cover (someone senior who defends the work when teams push back). Skip any one of these and the role becomes ceremonial.'
  }
];

const statistics = [
  { value: '1 role', label: 'Required to close the Accountability Gap per AI investment' },
  { value: '15-25%', label: 'Of one operator\'s time needed to make AI stick' },
  { value: '6 months', label: 'Typical runway to embed the role before scaling' },
];

export default function HumanArchitectPage() {
  return (
    <div className="min-h-[100dvh] bg-background">
      <LastUpdated date="2026-06-14" />

      {/* Navigation */}
      <div className="container mx-auto px-4 md:px-6 py-6">
        <Breadcrumbs items={[{ label: 'Concepts', href: '/concepts' }, { label: 'Human Architect', href: '/concepts/human-architect' }]} />
        <Link
          href="/concepts"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          All Concepts
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
              The Human Architect
            </h1>
            <p className="text-xl text-foreground/80 font-sans leading-relaxed mb-8">
              The person who translates AI output into business outcome.
              Without this role, every AI investment stalls in the Accountability Gap.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/#services">See How Alex Builds This Role</Link>
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
        <span itemProp="headline">The Human Architect Role: Who Closes the AI Accountability Gap</span>
        <span itemProp="author">Alex Myers</span>
        <span itemProp="publisher">The Armchair Futurist</span>
        <span itemProp="datePublished">2026-06-14</span>
        <span itemProp="description">
          The Human Architect is the role that bridges AI output and business outcome. Without it, AI investments stall in the Accountability Gap. Found through Psychology-Led Adoption profiling, set up with clear ownership, 15-25% protected time, and executive air cover. Six months is typical runway before scaling.
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

          {/* What It's NOT */}
          <BlurFade inView className="mt-8">
            <div className="p-6 rounded-xl border border-primary/20 bg-primary/5">
              <h3 className="font-heading text-lg font-bold text-primary mb-3">
                What It&apos;s NOT
              </h3>
              <ul className="space-y-2 text-foreground/80">
                <li>• A new VP or C-suite hire—best done by an existing operator with cross-functional reach</li>
                <li>• A part-time AI champion with no outcome ownership—it becomes ceremonial fast</li>
                <li>• The person who built the AI workflow—builders tend to defend the tool, not close the loop</li>
                <li>• A consultant or vendor role—ownership must live inside the organization to stick</li>
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
              Need a Human Architect on Your Team?
            </h2>
            <p className="text-lg text-foreground/80 mb-8">
              Book a free 15-minute strategy call. Alex will help you identify who on your team already plays this role—and how to set them up to succeed.
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
            "headline": "The Human Architect Role: Who Closes the AI Accountability Gap",
            "author": { "@id": "https://thearmchairfuturist.com/#person" },
            "publisher": { "@id": "https://thearmchairfuturist.com/#organization" },
            "datePublished": "2026-06-14",
            "dateModified": "2026-06-14",
            "description": "The Human Architect is the role that bridges AI output and business outcome. Without it, AI investments stall in the Accountability Gap. Found through Psychology-Led Adoption profiling, set up with clear ownership, 15-25% protected time, and executive air cover.",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://thearmchairfuturist.com/concepts/human-architect"
            },
            "articleSection": "Core Concepts",
            "keywords": ["Human Architect", "AI Accountability", "Change Management", "AI Implementation", "Alex Myers"]
          })
        }}
      />
    </div>
  );
}
