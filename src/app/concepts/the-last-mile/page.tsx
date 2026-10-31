import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { BlurFade } from '@/components/ui/blur-fade';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import LastUpdated from '@/components/ui/last-updated';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { CALENDAR_URL } from '@/lib/constants';
import ConceptFaq from '@/components/concepts/ConceptFaq';
import Sources from '@/components/concepts/Sources';

export const metadata: Metadata = {
  title: 'The Last Mile: Why Access to AI Was Never the Hard Part',
  description:
    'Personal AI agents are available to everyone. The remaining gap is mental models: what the tool remembers, what it costs, and what it is allowed to touch.',
  alternates: {
    canonical: '/concepts/the-last-mile',
  },
  openGraph: {
    images: ['/opengraph-image'],
    title: 'The Last Mile: Why Access to AI Was Never the Hard Part',
    description:
      'The agents arrived. The mental models did not. Why capable people get little from AI and conclude it does not work for them.',
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


const statistics = [
  {
    value: '97%',
    label: 'of workers use AI poorly or not at all (Section, Jan 2026)',
  },
  {
    value: '2%',
    label: 'of 4,500 logged work use cases were advanced (Section, Jan 2026)',
  },
  {
    value: '33%',
    label: 'lose at least half of the time AI saves them to rework (Workday, Oct 2026)',
  },
  {
    value: '32,813x',
    label: 'spread between the dearest and cheapest model per million tokens (BenchLM, Oct 2026)',
  },
];

const assumptions = [
  {
    assume: 'The chat remembers everything',
    truth:
      'Context is finite and degrades as it fills. Across 18 models, accuracy fell as inputs grew, and needle-in-haystack tests overstate what long context really does.',
    action: 'Restate your constraints near the end, and split work that will not fit.',
  },
  {
    assume: 'One model for every job',
    truth:
      'Prices per million tokens span 32,813x. Frontier models rose 61% year on year while the mid-tier fell 41%.',
    action: 'Default to a cheap model. Escalate only where the output must be right.',
  },
  {
    assume: 'More thinking is always better',
    truth:
      '16,000 reasoning tokens cost 32x more than 500. Stopping near 6,000 cut compute by half for about 6% accuracy loss.',
    action: 'Match reasoning effort to the task. Sizing that is a skill, not a setting.',
  },
  {
    assume: 'More agents, more throughput',
    truth:
      'Multi-agent beat single-agent by 90.2% on research and used about 15x the tokens. Parallel writers make conflicting implicit choices.',
    action: 'Parallelise research. Keep anything that writes in one thread.',
  },
  {
    assume: 'Desktop and web chat are the same tool',
    truth:
      'Local steps, the built-in browser and the Agent SDK are desktop or CLI only. Web chat cannot see your files.',
    action:
      'Do the work in the harness that can touch the work. Web chat is for questions.',
  },
  {
    assume: 'Guardrails are an enterprise concern',
    truth:
      'One GraphQL mutation deleted a production database and every backup in nine seconds. Only 5% of tech leaders are confident they can see what runs in production.',
    action:
      'Set permissions and sandboxing before you grant autonomy, not after.',
  },
];

const sources = [
  {
    title: 'The AI Proficiency Report, January 2026',
    href: 'https://www.sectionai.com/ai/the-ai-proficiency-report-january-2026',
    note: 'Section. 97% of workers use AI poorly or not at all; 25% have no work use case; of 4,500 use cases, 59% basic and 2% advanced; training received rose 2% while tool access rose 16-17%.',
  },
  {
    title: 'The Path to AI Fluency: AI Works for America',
    href: 'https://www.ipsos.com/sites/default/files/ct/news/documents/2026-02/The%20Path%20to%20AI%20Fluency.%20AI%20Works%20for%20America%20-%20Google-Ipsos.pdf',
    note: 'Google/Ipsos, February 2026, n=4,464 employees and 1,511 managers. 40% use AI at work, 5% are AI fluent, 14% were offered training.',
  },
  {
    title: 'AI@Work, October 2026',
    href: 'https://www.workday.com/en-us/perspectives/ai/ai-at-work-october.html',
    note: 'Workday, about 6,000 workers, fieldwork September 2026. 38% can explain what an AI agent is; 33% lose at least half their time savings to rework; 41% conceal their AI use.',
  },
  {
    title: 'Context Rot: How Increasing Input Tokens Impacts LLM Performance',
    href: 'https://www.trychroma.com/research/context-rot',
    note: 'Chroma Research, July 2025. Eighteen models degrade as input length grows, non-uniformly; distractors matter and needle-in-haystack tests overstate long-context ability.',
  },
  {
    title: 'LLM pricing statistics',
    href: 'https://benchlm.ai/stats/llm-pricing',
    note: 'BenchLM, as of 29 October 2026. Median $0.75 input and $3.00 output per million tokens across 209 models; dearest API about 32,813x the cheapest.',
  },
  {
    title: 'Why Johnny Can\u2019t Use Agents',
    href: 'https://arxiv.org/abs/2509.14528',
    note: 'ACM Conference on AI and Agentic Systems, September 2025. Review of 102 commercial agents plus an N=31 study of Operator and Manus: agent capabilities were misaligned with user mental models.',
  },
  {
    title: 'Efficient reasoning and the cost of thinking longer',
    href: 'https://arxiv.org/abs/2604.10739',
    note: 'April 2026. 16,000 reasoning tokens cost 32x more than 500; stopping near 6,000 cuts compute about 50% for roughly 6% accuracy loss.',
  },
  {
    title: 'How we built our multi-agent research system',
    href: 'https://www.anthropic.com/engineering/multi-agent-research-system',
    note: 'Anthropic Engineering, June 2025. Multi-agent beat single-agent by 90.2% on research tasks; token use explained 80% of the variance; about 15x the tokens of a chat.',
  },
  {
    title: 'Do not build multi-agents',
    href: 'https://cognition.com/blog/dont-build-multi-agents',
    note: 'Cognition, June 2025. Parallel agents make implicit conflicting choices; context engineering beats prompt engineering, and writes stay single-threaded.',
  },
  {
    title: 'AI agent deleted a production database in 9 seconds',
    href: 'https://zenity.io/blog/ai-agent-database-deletion-pocketos',
    note: 'Zenity, April 2026. One GraphQL mutation wiped the volume and every backup; the most recent recoverable backup was three months old.',
  },
  {
    title: 'AI governance report 2026',
    href: 'https://retool.com/blog/ai-governance-report-2026',
    note: 'Retool, 307 CTOs, CIOs and CISOs. Only 5% are confident in their visibility into production AI tools; 93% worry about vibe-coded tools reaching production.',
  },
  {
    title: 'State of AI Architecture 2026',
    href: 'https://stacklok.com/resources/state-of-ai-architecture-2026/',
    note: 'Stacklok, 520 leaders surveyed September 2026. 81% agree frontier labs and hyperscalers make moving between vendors difficult; 84% say avoiding lock-in matters.',
  },
  {
    title: 'Permissions and sandboxing',
    href: 'https://code.claude.com/docs/en/permissions',
    note: 'Anthropic. The documented permission and sandboxing model for a coding agent, which is the guardrail layer most individual users never configure.',
  },
];

const faqItems = [
  {
    "@type": "Question",
    "name": "What is the last mile in AI adoption?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "The last mile is the distance between an agent that can do almost anything and a person who has a mental model of what it actually does. Access stopped being the barrier in 2026. Section found 97% of workers still use AI poorly or not at all, and only 2% of 4,500 logged use cases were advanced. The gap is models of the tool, not access to it."
    }
  },
  {
    "@type": "Question",
    "name": "Why do capable people get so little from AI tools?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Because the interface is easy, people assume the work is easy. They do not know that context is finite, that models differ in price by more than 30,000 times, that reasoning effort has a cost curve, or that a desktop harness can touch files a web chat cannot see. So they rewrite the same request, get plausible but wrong output, and conclude the tool does not work. Workday found a third of users lose at least half their time savings to rework."
    }
  },
  {
    "@type": "Question",
    "name": "What mental models do I need to use agents well?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Six cover most of it: context is finite and degrades as it fills; models are priced and capable across a huge range, so routing matters; reasoning effort costs, and sizing it is a skill; parallel agents multiply tokens and conflict, so writes stay single-threaded; desktop harnesses do things web chat cannot; and permissions come before autonomy. None of these are programming skills. They are literacy, and they are trainable in weeks, not years."
    }
  }
];

export default function TheLastMilePage() {
  return (
    <div className="min-h-[100dvh] bg-background">
      <LastUpdated date="2026-10-31" />

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
          <div className="flex flex-col md:flex-row md:items-start gap-10">
            <BlurFade inView className="flex-1">
              <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tight text-primary mb-6">
                The Last Mile
              </h1>
              <p className="text-xl md:text-2xl text-foreground/80 font-sans leading-relaxed mb-8 max-w-2xl">
                Getting an agent was never the hard part. The hard part is that
                almost nobody has a mental model of what the thing they are
                asking actually does.
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
            <BlurFade inView delay={0.1} className="md:w-64 shrink-0">
              <Image
                src="/header.webp"
                alt="Alex Myers, the Armchair Futurist"
                width={1255}
                height={1102}
                sizes="(max-width: 768px) 60vw, 256px"
                className="w-full h-auto rounded-2xl object-cover"
              />
              <p className="mt-3 text-sm text-muted-foreground">
                Alex Myers. I build these systems with individuals and small
                teams, and this page is what I keep having to explain.
              </p>
            </BlurFade>
          </div>
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
          The last mile is the distance between an agent that can do almost
          anything and a person who has a mental model of what it actually
          does. Access stopped being the barrier in 2026. Section reports 97%
          of workers still use AI poorly or not at all, and only 2% of 4,500
          logged use cases were advanced. Six assumptions account for most of
          the damage: that context is infinite, that one model fits every job,
          that more reasoning is always better, that more agents mean more
          throughput, that desktop and web chat are the same tool, and that
          guardrails are somebody else&rsquo;s problem. The fix is literacy,
          not another tool.
        </span>
      </div>

      {/* Key Statistics */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
            {statistics.map((stat, i) => (
              <BlurFade key={stat.label} inView delay={i * 0.08}>
                <p className="text-4xl md:text-5xl font-black text-primary mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground leading-snug">{stat.label}</p>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                                        <div className="max-w-3xl space-y-6 text-[17px] leading-relaxed text-foreground/85">
            <p>
              I work with individuals and small teams, and the pattern is the
              same at every skill level. The tools are not the problem, and
              access is not the problem. What is missing is a mental model of
              what the machine in front of you actually does.
            </p>

            <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mt-10 mb-4">
              The gap is mental models
            </h2>
            <p>
              In January 2026 Section assessed working AI use and found 97% of
              people using it poorly or not at all. Of 4,500 work use cases they
              logged, 59% were basic and 2% advanced. A quarter of respondents
              had no work use case at all. Over the same period access to tools
              rose 16 to 17 percent, and training rose 2 percent.
            </p>
            <p>
              Google and Ipsos measured the same gap from the other side a month
              later: 40% of employees use AI at work, 5% are fluent, and 14%
              were offered training. Workday found in October that only 38% of
              workers can explain what an AI agent is, and that a third of users
              lose at least half of the time AI saves them to rework. Rework is
              what a missing mental model costs, measured in hours.
            </p>
            <p>
              This is not a prompting-skill problem. Researchers reviewed 102
              commercial agents and ran a 31-person study of Operator and Manus,
              and reported capabilities misaligned with user mental models. You
              cannot delegate work to a system you cannot picture.
            </p>

            <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mt-10 mb-4">
              Six assumptions I keep correcting
            </h2>
            <p>
              Almost every failure I see in client work starts as one of these.
              None of them shows up in the interface, which is why rephrasing a
              request never fixes them.
            </p>
            <BlurFade inView>
              <div className="mt-6 mb-10 overflow-x-auto">
                <table className="w-full border-collapse text-left text-[15px]">
                  <caption className="sr-only">
                    Six common assumptions about AI tools, what is true in 2026,
                    and what to do about each
                  </caption>
                  <thead>
                    <tr className="border-b-2 border-ink/25">
                      <th scope="col" className="py-3 pr-4 font-heading text-sm font-bold text-primary">
                        What people assume
                      </th>
                      <th scope="col" className="py-3 pr-4 font-heading text-sm font-bold text-primary">
                        What is true in 2026
                      </th>
                      <th scope="col" className="py-3 font-heading text-sm font-bold text-primary">
                        What to do
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {assumptions.map((row) => (
                      <tr key={row.assume} className="border-b border-ink/10 align-top">
                        <td className="py-3 pr-4 font-medium text-foreground">{row.assume}</td>
                        <td className="py-3 pr-4 text-muted-foreground">{row.truth}</td>
                        <td className="py-3 text-foreground/85">{row.action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </BlurFade>

            <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mt-10 mb-4">
              What changes when the models are right
            </h2>
            <p>
              A consultant I work with spent three hours a month assembling
              board packs from all four of her spreadsheets. She asked an agent
              to summarise the sales data and flag risks, and got a tidy page
              that missed the two accounts which had gone quiet for six weeks.
              Her request described a task; her work needed a decision. When she
              added a line asking it to flag accounts whose order volume fell
              more than 30 percent against their own twelve-month average,
              ranked by revenue at risk, the same agent put both on top.
            </p>
            <p>
              That exchange is the whole problem in miniature. She had to know
              what the output was for, and no model could supply that for her.
              The six assumptions above are the same thing at a different scale:
              each one is a fact about the tool you have to hold in your head
              before you can ask it for anything well.
            </p>
            <p>
              For a one-person shop or a small team this is cheap to fix and
              expensive to skip. Literacy is not a training day, it is something
              you keep paying attention to, since the tools move under you. The
              people I see get value are not the ones with the best access. They
              are the ones who can say what the model is doing, roughly what it
              costs, and what it is allowed to touch.
            </p>
          </div>
          <Sources items={sources} />

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
            citation: [
              'https://arxiv.org/abs/2307.03172',
              'https://arxiv.org/abs/2310.13548',
              'https://hai.stanford.edu/ai-index',
            ],
          }),
        }}
      />
      {/* FAQPage Schema - answer-first citation block */}
      <ConceptFaq items={faqItems} />
    </div>
  );
}
