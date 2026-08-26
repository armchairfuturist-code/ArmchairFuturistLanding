import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BlurFade } from '@/components/ui/blur-fade';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import LastUpdated from '@/components/ui/last-updated';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'The Install Trap: Why Running an Agent Is Not the Win | The Armchair Futurist',
  description:
    'The Install Trap is the belief that value arrives when an agent runs. Hermes, Grok, and OpenClaw made installation a weekend task — deciding what the agent owns, how it is structured, and whether it pays off is still the work.',
  alternates: {
    canonical: '/concepts/the-install-trap',
  },
  openGraph: {
    title: 'The Install Trap: Why Running an Agent Is Not the Win',
    description:
      'Work-automation agents made installation a weekend task. Deciding what they own, how they are structured, and whether they pay off is still the work.',
    url: '/concepts/the-install-trap',
    siteName: 'The Armchair Futurist',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Install Trap: Why Running an Agent Is Not the Win',
    description:
      'Installing a work agent is easy now. Value comes from what it owns, how it is structured, and how you measure it.',
  },
};

const relatedConcepts = [
  { title: 'Pilot-itis', href: '/concepts/pilot-itis', description: 'The same disease at organizational scale' },
  { title: 'The Accountability Gap', href: '/concepts/accountability-gap', description: 'The structural frame behind the trap' },
  { title: 'The Human Architect', href: '/concepts/human-architect', description: 'The role that gets an agent past installation' },
];

const keyPoints = [
  {
    title: 'The Definition',
    content:
      "The Install Trap is the belief that value arrives when an agent runs. Work-automation agents like Hermes, Grok, and OpenClaw made installation a weekend task: connect your accounts, write a system prompt, schedule a cron job. The agent runs on Monday. The trap closes quietly after that, because running was never the hard part. Value is a property of the workflow around the agent, not a feature of the agent.",
  },
  {
    title: 'The Symptoms',
    content:
      "You installed an agent, and it produces output nobody asked for. Its tasks duplicate work a human already owns, or chase work no one values. You check its logs more often than its results. The time it saves is smaller than the time you spend supervising it. Weeks later you cannot name one decision it improved. The agent works. Nothing changes.",
  },
  {
    title: 'The Root Cause',
    content:
      "Installation answers a tooling question: how do I get this running? Adoption answers three different questions: what should this agent own, what workflow does it live inside, and who measures whether it returns time worth having. Skip those three and you have automated a guess. Coding agents came with a natural spec — the code either runs or it doesn't. Work agents need you to define done before they can hit it.",
  },
  {
    title: 'The Cure',
    content:
      "Three decisions close the trap. First, pick one recurring task with a measurable time cost and give the agent ownership of it end to end. Second, structure the workflow before the prompt: inputs, boundaries, outputs, and where a human checks the work. Third, measure reclaimed hours against the baseline for eight weeks. Agents that survive that loop earn more responsibility. The rest get switched off without sentiment.",
  },
];

const statistics = [
  { value: '67%', label: 'Of AI pilots never scale to production — the same pattern, one agent at a time' },
  { value: '72%', label: 'Cite workflow redesign, not technology, as the top barrier to AI value' },
  { value: '10-20 hrs', label: 'Reclaimed per week when agents are given owned, structured workflows' },
];

export default function TheInstallTrapPage() {
  return (
    <div className="min-h-[100dvh] bg-canvas">
      <LastUpdated date="2026-08-21" />

      {/* Navigation */}
      <div className="container mx-auto px-4 md:px-6 py-6">
        <Breadcrumbs items={[{ label: 'Concepts', href: '/concepts' }, { label: 'The Install Trap', href: '/concepts/the-install-trap' }]} />
        <Link
          href="/concepts"
          className="inline-flex items-center gap-2 text-sm text-graphite hover:text-hp-electric transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          All Concepts
        </Link>
      </div>

      {/* Hero */}
      <section className="py-12 md:py-16 bg-cloud">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <BlurFade inView>
            <div className="mb-4">
              <span className="text-xs text-graphite/70 font-mono uppercase tracking-widest">
                Core Concept
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-medium tracking-tight text-hp-electric mb-6">
              The Install Trap
            </h1>
            <p className="text-xl text-charcoal font-body leading-relaxed mb-8">
              The belief that value arrives when an agent runs. Hermes, Grok, and
              OpenClaw made installation a weekend task. Deciding what the agent
              owns, how it is structured, and whether it pays off is still the work.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/#services">Get Past Installation</Link>
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
        <span itemProp="headline">The Install Trap: Why Running an Agent Is Not the Win</span>
        <span itemProp="author">Alex Myers</span>
        <span itemProp="publisher">The Armchair Futurist</span>
        <span itemProp="datePublished">2026-08-21</span>
        <span itemProp="description">
          The Install Trap is the belief that value arrives when an agent runs. Work-automation agents like Hermes, Grok, and OpenClaw made installation easy; value comes from deciding what the agent owns, structuring its workflow, and measuring reclaimed hours. The cure: one owned task, a defined workflow, an eight-week measurement loop.
        </span>
      </div>

      {/* Key Statistics */}
      <section className="py-12 bg-canvas">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {statistics.map((stat) => (
              <div key={stat.label} className="text-center p-6 rounded-hp-lg bg-cloud border border-hairline">
                <p className="text-3xl md:text-4xl font-medium font-display text-hp-electric mb-2">{stat.value}</p>
                <p className="text-sm text-graphite">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="grid grid-cols-1 gap-8">
            {keyPoints.map((point, index) => (
              <BlurFade inView key={point.title} delay={index * 0.1}>
                <article className="p-6 rounded-hp-lg border border-hairline bg-canvas">
                  <h2 className="font-display text-xl font-medium text-hp-electric mb-3">
                    {point.title}
                  </h2>
                  <p className="text-charcoal leading-relaxed">
                    {point.content}
                  </p>
                </article>
              </BlurFade>
            ))}
          </div>

          {/* What It's NOT */}
          <BlurFade inView className="mt-8">
            <div className="p-6 rounded-hp-lg border border-hp-electric/20 bg-hp-electric/5">
              <h3 className="font-display text-lg font-medium text-hp-electric mb-3">
                What It&apos;s NOT
              </h3>
              <ul className="space-y-2 text-charcoal">
                <li>• A failure of the agent: most trapped agents run exactly as installed</li>
                <li>• A prompt-engineering problem: better words cannot fix an unowned workflow</li>
                <li>• A reason to avoid agents: structured agents reclaim 10-20 hours per week</li>
                <li>• Permanent: one owned task and eight weeks of measurement breaks it</li>
              </ul>
            </div>
          </BlurFade>

          {/* Related Concepts */}
          <div className="mt-16">
            <h3 className="font-display text-2xl font-medium text-hp-electric mb-6">
              Related Concepts
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {relatedConcepts.map((concept) => (
                <Link
                  key={concept.href}
                  href={concept.href}
                  className="group p-4 rounded-hp-md border border-hairline hover:border-hp-electric/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-display font-medium text-ink group-hover:text-hp-electric transition-colors">
                        {concept.title}
                      </h4>
                      <p className="text-sm text-graphite">{concept.description}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-graphite group-hover:text-hp-electric" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-cloud">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
          <BlurFade inView>
            <h2 className="font-display text-3xl font-medium text-hp-electric mb-4">
              Have an Agent That Runs But Pays Nothing Back?
            </h2>
            <p className="text-lg text-charcoal mb-8">
              One session maps what your agent should own, how it is structured,
              and how you will measure it. Book a free 15-minute call to diagnose
              which side of the trap you are on.
            </p>
            <Button asChild size="lg" className="font-semibold">
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
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'The Install Trap: Why Running an Agent Is Not the Win',
            author: { '@id': 'https://thearmchairfuturist.com/#person' },
            publisher: { '@id': 'https://thearmchairfuturist.com/#organization' },
            datePublished: '2026-08-21',
            dateModified: '2026-08-21',
            description:
              'The Install Trap is the belief that value arrives when an agent runs. Work-automation agents like Hermes, Grok, and OpenClaw made installation easy; value comes from deciding what the agent owns, structuring its workflow, and measuring reclaimed hours.',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://thearmchairfuturist.com/concepts/the-install-trap',
            },
            articleSection: 'Core Concepts',
            keywords: ['The Install Trap', 'AI Agents', 'Work Automation', 'Agent Deployment', 'Hermes', 'OpenClaw', 'AI Workflow Design', 'Alex Myers'],
          }),
        }}
      />
    </div>
  );
}
