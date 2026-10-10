import { BookOpen, Brain, Users } from "lucide-react";

/**
 * The concept cluster — single source of truth.
 *
 * This list used to live inline in the /concepts hub only. The six concept
 * pages had no links between them at all, so the cluster was a one-way star:
 * the hub pointed out, nothing pointed back or sideways. Google had no
 * structural evidence the pages were related, and a reader finishing one had
 * nowhere to go next.
 *
 * `summary` is the short form used by RelatedConcepts on each page.
 * `description` and `stats` are the longer forms used by the hub cards.
 */
export interface Concept {
  slug: string;
  href: string;
  title: string;
  summary: string;
  description: string;
  icon: typeof Brain;
  stats: string[];
}

export const CONCEPTS: Concept[] = [
  {
    // Leads the cluster deliberately: this is the individual-level gap, and
    // every concept below it is an organisation-level consequence of it.
    slug: "the-last-mile",
    href: "/concepts/the-last-mile",
    title: "The Last Mile",
    summary: "Access to AI stopped being the hard part. Directing it well did not.",
    description:
      "The distance between an agent that can do almost anything and a person who knows what to ask it for. Capable agents became available to everyone in 2026, which made the remaining difficulty invisible rather than absent.",
    icon: Brain,
    stats: [
      "Access is solved; judgement is not",
      "77% agent task success in 2026, up from 20%",
      "The dropout point most people never name",
    ],
  },
  {
    slug: "the-install-trap",
    href: "/concepts/the-install-trap",
    title: "The Install Trap",
    summary: "Why running an agent is not the same as getting a return from one.",
    description:
      "The belief that value arrives when an agent runs. Work-automation agents made installation a weekend task; deciding what they own and whether they pay off is still the work.",
    icon: Brain,
    stats: [
      "67% of pilots never scale — same pattern",
      "72% cite workflow redesign as the barrier",
      "10–20 hrs/week when structured right",
    ],
  },
  {
    slug: "accountability-gap",
    href: "/concepts/accountability-gap",
    title: "The Accountability Gap",
    summary: "The space between what AI produces and what the business needed.",
    description:
      "The space between AI outputs and business results. Where AI adoption stalls because no one owns the outcome.",
    icon: Brain,
    stats: [
      "72% cite workflow redesign as top barrier",
      "67% pilot-only failure rate",
      "14 weeks avg. to 80% adoption",
    ],
  },
  {
    slug: "human-architect",
    href: "/concepts/human-architect",
    title: "The Human Architect",
    summary: "The role that closes the gap — and how to find who fills it.",
    description:
      "The role that closes the Accountability Gap. Translates AI output into business outcome. Found through Psychology-Led Adoption profiling, not job title.",
    icon: Brain,
    stats: [
      "1 role per AI investment",
      "15–25% of operator time",
      "6 months typical runway",
    ],
  },
  {
    slug: "pilot-itis",
    href: "/concepts/pilot-itis",
    title: "Pilot-itis",
    summary: "Why AI pilots succeed in isolation and die before production.",
    description:
      "The disease where AI pilots succeed in isolation and never scale to production. 67% of AI initiatives never make it past pilot stage.",
    icon: BookOpen,
    stats: [
      "67% never scale to production",
      "4–6 weeks to value if designed right",
      "14 weeks avg. to 80% adoption",
    ],
  },
  {
    slug: "psychology-led-adoption",
    href: "/concepts/psychology-led-adoption",
    title: "Psychology-Led Adoption",
    summary: "Fix the human barriers before the technical ones.",
    description:
      "Address human barriers to AI adoption before technical ones. Uses data-driven profiling to identify the 5% who naturally embrace uncertainty.",
    icon: Users,
    stats: ["5% are Results Thinkers", "3x faster adoption", "72% cite people, not tech"],
  },
  {
    slug: "results-thinkers",
    href: "/concepts/results-thinkers",
    title: "Results Thinkers",
    summary: "The 5% who ask what outcome is needed, not what AI can do.",
    description:
      'The top 5% who ask "What outcome do I need?" instead of "What can AI do?" Your highest-leverage asset for driving organizational change.',
    icon: BookOpen,
    stats: [
      "5% drive disproportionate success",
      "15–20 hours/week reclaimed",
      "Model behavior for peers",
    ],
  },
];

/** Concepts other than the one being read, for lateral linking. */
export function relatedConcepts(currentSlug: string, limit = 3): Concept[] {
  return CONCEPTS.filter((c) => c.slug !== currentSlug).slice(0, limit);
}
