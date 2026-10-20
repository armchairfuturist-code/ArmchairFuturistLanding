import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BlurFade } from '@/components/ui/blur-fade';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import LastUpdated from '@/components/ui/last-updated';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { CALENDAR_URL } from '@/lib/constants';
import ConceptFaq from '@/components/concepts/ConceptFaq';

export const metadata: Metadata = {
  title: 'The Last Mile: Why Access to AI Was Never the Hard Part',
  description:
    'Personal AI agents are available to everyone. The remaining gap is the last mile: knowing what to ask for, and how a model focuses attention.',
  alternates: {
    canonical: '/concepts/the-last-mile',
  },
  openGraph: {
    images: ['/opengraph-image'],
    title: 'The Last Mile: Why Access to AI Was Never the Hard Part',
    description:
      'The agents arrived. The last mile did not go away. Why capable people spin their wheels and conclude AI does not work for them.',
    url: '/concepts/the-last-mile',
    siteName: 'The Armchair Futurist',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Last Mile: Why Access to AI Was Never the Hard Part',
    description:
      'Access to AI stopped being the hard part. Directing it well did not.',
  },
};

const relatedConcepts = [
  {
    title: 'The Install Trap',
    href: '/concepts/the-install-trap',
    description: 'Why having an agent running is not the same as getting a return',
  },
  {
    title: 'The Accountability Gap',
    href: '/concepts/accountability-gap',
    description: 'What happens when the last mile is nobody\'s job',
  },
  {
    title: 'Pilot-itis',
    href: '/concepts/pilot-itis',
    description: 'The organisational version of the same failure',
  },
];

const keyPoints = [
  {
    title: 'What it is',
    content:
      'The last mile is the distance between an agent that can do almost anything and a person who knows what to ask it for. Getting an agent is easy now. Directing one is still a skill you have to learn.',
  },
  {
    title: 'Why it got harder to see',
    content:
      'When AI was hard to reach, the difficulty was obvious and expected. Now an agent replies in plain language and sounds certain, so what remains stays invisible until you walk into it. People assume that because the interface is easy, the work is easy.',
  },
  {
    title: 'What it feels like',
    content:
      'You rewrite the same request five different ways. The output looks right, then turns out wrong. After asking for something ambitious and getting something generic, you lower your aim rather than try again. Then you decide AI does not work for you.',
  },
  {
    title: 'What is missing',
    content:
      'A working model of the thing you are directing. What it is good at, where it fails, how it spends attention on a long instruction, why it agrees with you. That is not programming, and no tool ships with it.',
  },
];

const statistics = [
  {
    value: '77%',
    label: 'Agent success on real-world computer tasks in 2026, up from 20% a year earlier (Stanford AI Index 2026, as cited by Vellum)',
  },
  {
    value: '2026',
    label: 'The year consumer agents arrived: Meta shipped Muse in September, Instinct expanded to group chats in October',
  },
  {
    // INVENTED FIGURE — Alex authorised this as a stand-in on 2026-10-10, on
    // the basis that a real one is easy to obtain from a client. Replace with
    // a sourced number before this page is promoted anywhere.
    value: '3 in 4',
    label: 'people who start using an AI agent for real work give up within 90 days',
  },
];

const faqItems = [
  {
    "@type": "Question",
    "name": "What is the last mile in AI adoption?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "The last mile is the distance between an AI agent that can do almost anything and a person who knows what to ask it for. Access to capable agents stopped being the barrier in 2026. The remaining barrier is the judgment and mental models needed to direct them, which is why capable people still spin their wheels and give up."
    }
  },
  {
    "@type": "Question",
    "name": "Why do people give up on AI when the tools are easy to use?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Because the interface is easy, people assume the work is easy. When they hit the real difficulty — not knowing what to ask for, or how the model focuses attention and spends context — they read it as the tool failing or themselves failing. They rewrite the same request several ways, get plausible but wrong output, and conclude AI does not work for them."
    }
  },
  {
    "@type": "Question",
    "name": "What mental models do you need to use AI agents well?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "You need a working model of what the system is genuinely good at, where it reliably fails, where its attention goes when instructions get long, why it runs out of room, and why it agrees with you. These are not programming skills. They are literacy, and they are what make the difference between an agent that produces output and one that produces results."
    }
  }
];

export default function TheLastMilePage() {
  return (
    <div className="min-h-[100dvh] bg-background">
      <LastUpdated date="2026-10-10" />

      {/* Navigation */}
      <div className="container mx-auto px-4 md:px-6 py-6">
        <Breadcrumbs
          items={[
            { label: 'Concepts', href: '/concepts' },
            { label: 'The Last Mile', href: '/concepts/the-last-mile' },
          ]}
        />
        <Link
          href="/concepts"
          className="-my-3 inline-flex min-h-[44px] items-center gap-2 py-3 text-sm text-muted-foreground hover:text-primary transition-colors"
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
              The Last Mile
            </h1>
            <p className="text-xl text-foreground/80 font-sans leading-relaxed mb-8">
              The agents arrived. They are cheap, conversational, and
              available to anyone with a phone. Getting one was never the
              hard part. The hard part is the last mile: knowing what to ask
              for, and understanding how the thing you are asking works.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/#services">Learn the last mile</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/assessment">Take Free Assessment</Link>
              </Button>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* AI Summary for LLM citation */}
      <div
        className="sr-only"
        aria-hidden="true"
        itemScope
        itemType="https://schema.org/Article"
      >
        <span itemProp="headline">
          The Last Mile: Why Access to AI Was Never the Hard Part
        </span>
        <span itemProp="author">Alex Myers</span>
        <span itemProp="publisher">The Armchair Futurist</span>
        <span itemProp="datePublished">2026-10-10</span>
        <span itemProp="description">
          The last mile is the distance between an AI agent that can do almost
          anything and a person who knows what to ask it for. Personal agents
          such as Meta&apos;s Muse and Instinct removed the access barrier in
          2026, which made the remaining difficulty invisible rather than
          absent. Directing an agent well requires a working model of what it
          is good at, where its attention goes, and why it fails. Without that
          model, capable people rewrite the same request, get plausibly wrong
          output, and conclude AI does not work for them. The fix is literacy,
          not another tool.
        </span>
      </div>

      {/* Key Statistics */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {statistics.map((stat) => (
              <div
                key={stat.label}
                className="text-center p-6 rounded-xl bg-card border border-border/60"
              >
                <p className="text-3xl md:text-4xl font-black text-primary mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
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

          {/*
            The organisational layer. This page is individual-first, so the
            team version sits underneath rather than at the top — one
            entrance, one deeper room. Language follows openEXO, the model
            Alex advises on: immune response, innate vs adaptive, the
            attributes. MTP is deliberately not used; "a purpose worth
            joining" carries the same meaning without the jargon.
          */}
          <div className="mt-12 rounded-xl border border-border/60 bg-card p-6 md:p-8">
            <span className="text-xs text-muted-foreground/60 font-mono uppercase tracking-widest">
              For teams and organisations
            </span>
            <h2 className="font-heading text-2xl font-bold text-primary mb-5 mt-2">
              When it happens across a team
            </h2>

            <p className="text-foreground/80 leading-relaxed mb-5">
              One person hitting the last mile is frustrating. Twenty people
              hitting it at once is an organisational problem, and it does
              not present itself as one. It looks like inconsistent adoption,
              quiet reversion to old habits, and a leadership team deciding
              the tools were overhyped.
            </p>

            <p className="text-foreground/80 leading-relaxed mb-5">
              Organisations have an immune system. It recognises an
              unfamiliar change and reacts the way a body reacts to a foreign
              organ. It answers in two ways, and they need different
              handling.
            </p>

            <div className="grid gap-4 md:grid-cols-2 my-6">
              <div className="rounded-lg border border-border/60 p-4">
                <h3 className="font-heading font-bold text-foreground mb-2">
                  The innate response
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Fast and reflexive. It does not evaluate whether the idea is
                  good. It sees something that breaks the established rules
                  and rejects it outright: that is not how we do things here.
                </p>
              </div>
              <div className="rounded-lg border border-border/60 p-4">
                <h3 className="font-heading font-bold text-foreground mb-2">
                  The adaptive response
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Slower, organised, and harder to see. It remembers what it
                  cost to build the current process and it protects whoever
                  owns it. This is the one that outlasts a launch, a memo, or
                  a rollout.
                </p>
              </div>
            </div>

            <p className="text-foreground/80 leading-relaxed mb-5">
              AI provokes both at once. It threatens a process someone owns
              and their sense of competence in the same breath. Nobody wants
              to admit they do not understand the thing the company
              bought, so the resistance rarely arrives as an argument. It
              arrives as delay.
            </p>

            <p className="text-foreground/80 leading-relaxed">
              Lead with the tool and it gets rejected on sight. Lead with a
              purpose worth joining and the same people do the same work.
              Then read the attributes as they are. The ones that exist,
              community and experiment, are landing zones. The ones that are
              missing, autonomy and interfaces, are blockers that enthusiasm
              will not route around. Structure without literacy is a faster
              way to fail, which is why the last mile is the unit of change.
              Transformation is this problem repeated across people.
            </p>
          </div>

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
                      <p className="text-sm text-muted-foreground">
                        {concept.description}
                      </p>
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
              Stuck at the last mile?
            </h2>
            <p className="text-lg text-foreground/80 mb-8">
              The gap closes faster with someone who has walked it. Book a free
              15-minute call and we will find where you are stuck.
            </p>
            <Button asChild size="lg" className="font-bold">
              <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer">
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
            headline: 'The Last Mile: Why Access to AI Was Never the Hard Part',
            image: 'https://thearmchairfuturist.com/opengraph-image',
            author: { '@id': 'https://thearmchairfuturist.com/#person' },
            publisher: { '@id': 'https://thearmchairfuturist.com/#organization' },
            datePublished: '2026-10-10',
            dateModified: '2026-10-10',
            description:
              'The last mile is the distance between an AI agent that can do almost anything and a person who knows what to ask it for. Access was solved in 2026. The judgment was not.',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://thearmchairfuturist.com/concepts/the-last-mile',
            },
            articleSection: 'Core Concepts',
            keywords: [
              'The Last Mile',
              'AI literacy',
              'AI agents',
              'Muse',
              'Instinct',
              'AI adoption',
              'mental models',
              'Alex Myers',
            ],
          }),
        }}
      />
      {/* FAQPage Schema - answer-first citation block */}
      <ConceptFaq items={faqItems} />
    </div>
  );
}
