"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { TESTIMONIALS, type Testimonial } from "@/content/testimonials";
import { WHATSAPP_URL } from "@/lib/constants";
import {
  AUDIT_PRICE_LABEL,
  CUSTOM_PROVISIONING_RANGE_LABEL,
  GUIDANCE_RANGE_LABEL,
  PROGRAM_PRICE_LABEL,
  SINGLE_SESSION_LABEL,
} from "@/lib/pricing";
import WhatsAppGlyph from "@/components/ui/WhatsAppGlyph";

/**
 * Three problems strangers arrive with, named in the words clients used.
 *
 * Why this replaced the testimonial marquee: the marquee sat second on the
 * homepage, so a visitor read praise before knowing what was for sale, and
 * the strip moved, so a reader who lost their place started the same card
 * again. Six quotes is one memory slot. Here each quote sits under the
 * problem it answers, so the same sentence argues instead of decorating.
 *
 * Proof is still pulled from TESTIMONIALS by name and never typed twice:
 * the quote text and the portrait come from the single source, so a client
 * who rewrites their line updates this section and ProofSection together.
 */

/** Fail at module load, not mid-render, if a featured name drifts. */
const byName = (name: string): Testimonial => {
  const client = TESTIMONIALS.find((item) => item.name === name);
  if (!client) throw new Error(`ProblemCards: no testimonial named "${name}"`);
  return client;
};

interface ProblemCard {
  id: string;
  /** The problem, stated as the client hit it. */
  problem: string;
  /** What it looks like once fixed. No adjectives. */
  fixed: string;
  /** Three to five steps, one short clause each. */
  steps: readonly string[];
  /** Time and cost, built from the pricing seam. */
  terms: string;
  client: Testimonial;
  /** The sentence from the client's own review that answers this problem. */
  excerpt: string;
}

const CARDS: readonly ProblemCard[] = [
  {
    id: "memory",
    problem: "You hear what AI can do. You try it, get stuck, and give up. The model knows the world, but nothing about your business.",
    fixed: "It clicks. Your context, memory, and automations load before you type. The work that took hours takes minutes.",
    steps: [
      "Show me where you got stuck.",
      "I load your files into the AI's memory.",
      "We wire the connector or automation the job needs.",
      "You ask something only your team can answer.",
      "It gets it right, first try.",
    ],
    terms: `${SINGLE_SESSION_LABEL} for one session. Packs of five to twenty: ${GUIDANCE_RANGE_LABEL}. Eight-week build program: ${PROGRAM_PRICE_LABEL}.`,
    client: byName("Brenda Fonseca"),
    excerpt:
      "When I first reached out to him, I wasn't even sure what type of training to ask for. … Now I have a foundational understanding of what AI actually is and how I can use it.",
  },
  {
    id: "configs",
    problem: "You changed a setting somewhere. Now the replies are wrong, or the AI forgets your project.",
    fixed: "You find the stale instruction and fix it. The replies come back right, and they stay right.",
    steps: [
      "Send me what changed.",
      "I find the stale instruction.",
      "We rewrite it for the job it owns.",
      "Your replies come back right.",
      "It stays right, and you know why.",
    ],
    terms: `Fix and model map: one session, ${SINGLE_SESSION_LABEL}. Written setup doc: ${AUDIT_PRICE_LABEL}. A build with the right model wired in: ${CUSTOM_PROVISIONING_RANGE_LABEL}.`,
    client: byName("Maria Fonseca"),
    excerpt:
      "…he was able to explain all this new concepts and tools in a way that even I, a neophyte, could follow … Alex has been very organized and obliging us to focus just on what we really needed.",
  },
  {
    id: "usage",
    problem: "Two subscriptions, one job. Or your month's allowance gone by Wednesday, and one prompt ate it.",
    fixed: "Each ask gets the tool and depth it needs. The bill drops. The work doesn't change.",
    steps: [
      "Send me your last two AI bills.",
      "I map each task to the tool it needs.",
      "We set the depth to match the ask.",
      "We cancel the overlap.",
      "The bill drops. The work doesn't.",
    ],
    terms: `The list is one session: ${SINGLE_SESSION_LABEL}. Written roadmap: ${AUDIT_PRICE_LABEL}. Full build: ${CUSTOM_PROVISIONING_RANGE_LABEL}.`,
    client: byName("Shannon Myers"),
    excerpt: "He has saved me over $10,000 a year. I save 10 to 20 hours a week now.",
  },
];function Client({ client }: { client: Testimonial }) {
  const initials = client.name
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="mt-5 flex items-center gap-3">
      {client.imageSrc ? (
        <Image
          src={client.imageSrc}
          alt={`Profile picture of ${client.name}`}
          width={40}
          height={40}
          className="h-10 w-10 shrink-0 rounded-full object-cover"
        />
      ) : (
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-hp-electric/10 font-display text-sm font-medium text-hp-electric"
        >
          {initials}
        </span>
      )}
      <div className="min-w-0">
        <p className="font-semibold text-ink">{client.name}</p>
        {client.title ? (
          <p className="text-sm text-graphite">{client.title}</p>
        ) : null}
      </div>
    </div>
  );
}

export default function ProblemCards() {
  return (
    <section aria-labelledby="problems-heading" className="bg-canvas py-16 md:py-20">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <BlurFade inView>
          <h2
            id="problems-heading"
            className="max-w-3xl font-display text-display font-medium text-ink"
          >
            Does this happen to you?
          </h2>
        </BlurFade>

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card) => (
            <BlurFade inView key={card.id}>
              <article className="flex h-full flex-col border-t-2 border-hp-electric pt-6">
                <h3 className="font-display text-xl font-medium leading-snug text-ink">
                  {card.problem}
                </h3>

                <p className="mt-4 text-base leading-relaxed text-charcoal">
                  <span className="font-semibold text-ink">Fixed: </span>
                  {card.fixed}
                </p>

                <ol className="mt-4 space-y-1 text-base leading-relaxed text-charcoal">
                  {card.steps.map((step, i) => (
                    <li key={step} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-hp-soft text-xs font-semibold text-hp-deep"
                      >
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>

                <p className="mt-4 text-sm leading-relaxed text-graphite">{card.terms}</p>

                <blockquote className="mt-6 rounded-hp-xl bg-cloud p-5 font-sans text-base italic leading-relaxed text-ink-soft">
                  <p>{card.excerpt}</p>
                  <Client client={card.client} />
                </blockquote>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex min-h-11 items-center gap-2 self-start font-semibold text-hp-electric underline-offset-4 hover:underline"
                >
                  <WhatsAppGlyph className="h-4 w-4" tone="inherit" />
                  Ask me about this
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </article>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
