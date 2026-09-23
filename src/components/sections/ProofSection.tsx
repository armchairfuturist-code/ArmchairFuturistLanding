import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { TESTIMONIALS, type Testimonial } from "@/content/testimonials";
import { CASE_STUDIES } from "@/content/case-studies";
import { GITHUB_URL } from "@/lib/constants";

// Fail fast at module load if a featured name drifts from the testimonial
// source, instead of a null-dereference mid-render taking the page down.
const byName = (name: string): Testimonial => {
  const client = TESTIMONIALS.find((item) => item.name === name);
  if (!client) throw new Error(`ProofSection: no testimonial named "${name}"`);
  return client;
};

const clientExamples = [
  {
    client: byName("Brenda Fonseca"),
    path: "Build with me",
    title: "From unsure where to start to writing her own code",
    description: "Brenda came to the sessions unsure what training to ask for. Four months into working together, she was using AI for work and personal tasks, including coding her own productivity tools.",
    excerpt: "Now I have a foundational understanding of what AI actually is and how I can use it as a tool in my daily productivity for both work and personal - even using it to do my own coding to create customized productivity skills.",
  },
  {
    client: byName("Shannon Myers"),
    path: "Built for you",
    title: "A website launch and 20 hours back each week",
    description: "Shannon credits the work with helping her reclaim 20 hours a week and launch a website that landed a deal within an hour. These are her reported results from that engagement.",
    excerpt: "He helped me reclaim 20 hours per week through AI optimization and launch a website that landed a deal within an hour.",
  },
];

function ClientIdentity({ client }: { client: Testimonial }) {
  return (
    <figcaption className="mt-6 flex items-center gap-3">
      <Image
        src={client.imageSrc}
        alt={`Profile picture of ${client.name}`}
        width={56}
        height={56}
        className="h-14 w-14 shrink-0 rounded-full object-cover"
      />
      <div>
        <p className="font-semibold text-ink">{client.name}</p>
        <p className="text-sm text-graphite">{client.title}</p>
      </div>
    </figcaption>
  );
}

const disclosureClass = "cursor-pointer rounded-hp-md py-4 text-base font-semibold text-hp-electric underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hp-electric focus-visible:ring-offset-4";

export default function ProofSection() {
  return (
    <section aria-labelledby="proof-heading" className="bg-canvas py-16 md:py-20">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <h2 id="proof-heading" className="max-w-3xl font-display text-[44px] leading-none md:text-[56px] font-medium text-ink">
          What clients build and get back
        </h2>

        <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-12">
          {clientExamples.map((example) => (
            <article key={example.client.name} className="border-t border-hairline pt-6">
              <h3 className="font-display text-2xl leading-tight font-medium text-hp-electric">{example.path}</h3>
              <p className="mt-4 font-display text-[32px] leading-tight font-medium text-ink">{example.title}</p>
              <p className="mt-4 max-w-prose text-base leading-relaxed text-charcoal">{example.description}</p>
            </article>
          ))}
        </div>

        <div id="testimonials" className="mt-8 scroll-mt-20">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            {clientExamples.map(({ client, excerpt }) => (
              <figure key={client.name} className="m-0 rounded-hp-xl bg-cloud p-6 md:p-8">
                <blockquote className="font-display text-lg leading-relaxed text-ink">
                  <p>&ldquo;{excerpt}&rdquo;</p>
                </blockquote>
                <ClientIdentity client={client} />
              </figure>
            ))}
          </div>
          <p className="mt-4 text-sm text-graphite">Excerpts from client reviews. Individual results and timelines vary.</p>
          <details className="mt-4 border-b border-hairline pb-2">
            <summary className={disclosureClass}>Read more client reviews ({TESTIMONIALS.length} full reviews)</summary>
            <div className="grid gap-x-12 gap-y-8 py-6 md:grid-cols-2">
              {TESTIMONIALS.map((client) => (
                <figure key={client.name} className="m-0 border-t border-hairline pt-6">
                  <blockquote className="text-base leading-relaxed text-charcoal"><p>&ldquo;{client.text}&rdquo;</p></blockquote>
                  <ClientIdentity client={client} />
                </figure>
              ))}
            </div>
          </details>
        </div>

        <div id="stats" className="mt-10 scroll-mt-20 rounded-hp-xl bg-hp-electric p-6 text-white md:p-8">
          <h3 className="font-display text-2xl leading-tight font-medium">Across the work</h3>
          <dl className="mt-6 grid gap-6 md:grid-cols-3 md:gap-8">
            <div>
              <dt className="text-sm text-white">AI systems deployed</dt>
              <dd className="mt-2 font-display text-[32px] leading-tight font-medium tabular-nums">40+</dd>
              <dd className="mt-2 text-sm leading-relaxed text-white">From response pipelines to meeting-to-action workflows.</dd>
            </div>
            <div>
              <dt className="text-sm text-white">Weekly hours saved</dt>
              <dd className="mt-2 font-display text-[32px] leading-tight font-medium tabular-nums">5+ hours</dd>
              <dd className="mt-2 text-sm leading-relaxed text-white">Measured on implementation clients after handoff.</dd>
            </div>
            <div>
              <dt className="text-sm text-white">Time to self-sufficiency</dt>
              <dd className="mt-2 font-display text-[32px] leading-tight font-medium tabular-nums">8–10 weeks</dd>
              <dd className="mt-2 text-sm leading-relaxed text-white">Typical guided programme timeline; individual engagements can take longer.</dd>
            </div>
          </dl>
        </div>

        <details className="mt-6 border-b border-hairline pb-2">
          <summary className={disclosureClass}>See implementation examples</summary>
          <p className="max-w-prose py-4 text-sm leading-relaxed text-graphite">These examples are anonymized and composited. They do not describe the named clients above.</p>
          <div className="divide-y divide-hairline">
            {CASE_STUDIES.map((study) => (
              <article key={study.index} className="grid gap-4 py-6 md:grid-cols-3 md:gap-8">
                <div>
                  <h3 className="font-display text-2xl leading-tight font-medium text-ink">{study.title}</h3>
                  <p className="mt-2 text-sm text-graphite">{study.client} · {study.timeline}</p>
                </div>
                <div className="space-y-4 text-base leading-relaxed text-charcoal md:col-span-2">
                  <p>{study.problem}</p>
                  <p>{study.solution}</p>
                  <ul className="list-disc space-y-2 pl-5">{study.patterns.map((pattern) => <li key={pattern}>{pattern}</li>)}</ul>
                </div>
              </article>
            ))}
          </div>
        </details>
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-hp-md text-base font-semibold text-hp-electric underline underline-offset-4 hover:text-hp-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hp-electric focus-visible:ring-offset-4">
          Browse the working projects on GitHub
          <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
