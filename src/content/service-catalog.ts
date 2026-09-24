import { CALENDAR_URL } from "@/lib/constants";
import { AUDIT_LIST_LABEL, SERVICES_PRICING } from "@/lib/pricing";

/** Service path content and the icon-key seam consumed by the homepage adapter. */
export type ServicePriceKey =
  | "roadmapAudit"
  | "selfSufficiency"
  | "guidanceRange"
  | "digitalIdentity"
  | "customAiProvisioning";

export interface ServiceTier {
  name: string;
  tag: string;
  description: string;
  features: string[];
  cta: string;
  ctaLink: string;
  highlighted: boolean;
  icon: string;
  note?: string;
  priceKey: ServicePriceKey;
}

export interface ServicePath {
  id: string;
  label: string;
  title: string;
  kicker: string;
  description: string;
  tiers: ServiceTier[];
}

export const SERVICE_PATHS: ServicePath[] = [
  {
    id: "together",
    label: "Guidance & Education",
    title: "We Do It Together",
    kicker: "Build the literacy to do it yourself",
    description:
      "We build on your live work, from a single session pack to a 3-month executive intensive. Session packs build your AI literacy. The Self-Sufficiency Program builds your AI business.",
    tiers: [
      {
        name: SERVICES_PRICING.roadmapAudit.name,
        priceKey: "roadmapAudit",
        tag: "90-Minute Working Session",
        description:
          "A paid deep dive that turns this diagnosis into a scored roadmap for your actual workflows: what to automate, what to buy, what to build, in what order. You get the report and a video walkthrough. The blueprint is yours to keep — implement it yourself, or with me.",
        features: [
          "90-minute deep discovery call",
          "Scored roadmap mapped to your actual workflows",
          "Ranked by time saved and revenue impact",
          "Written report + video walkthrough, yours to keep",
          "Includes current-generation agent and tooling review",
        ],
        cta: "Get the Roadmap Audit",
        ctaLink: "/audit",
        highlighted: false,
        icon: "Compass",
        note: `Normally ${AUDIT_LIST_LABEL}. Launch pricing while the format is new.`,
      },
      {
        name: "1-on-1 AI Guidance",
        priceKey: "guidanceRange",
        tag: "5 · 10 · 20 Packs",
        description:
          "Session packs (5, 10, 20) that build your AI literacy, from first understanding to full independence. Start with 5 and scale up. Most clients choose 5 or 10.",
        features: [
          "60-minute 1-on-1 video sessions",
          "From understanding to agency to action",
          "Custom to your role and goals",
          "Recording + follow-up notes",
          "Flexible scheduling",
        ],
        cta: "Browse Session Packs",
        ctaLink: "#ai-guidance",
        highlighted: false,
        icon: "BookOpen",
        note: "5, 10, and 20-session packs save up to 15%",
      },
      {
        name: SERVICES_PRICING.selfSufficiency.name,
        priceKey: "selfSufficiency",
        tag: "8-Week Build Sprint",
        description:
          "The 8-week Build Sprint (AI Self-Sufficiency Program) ships a launched AI-powered service or brand by week 8. A proven playbook, 10–15 coaching sessions, and async support throughout, so you finish with something real to sell, not just notes from sessions.",
        features: [
          "Your own AI-powered service, designed & launched by week 8",
          "Structured build playbook (not open coaching)",
          "10–15 coaching sessions guiding each phase of your build",
          "Async support between sessions — never stuck waiting a week",
          "Personal brand & service framework",
          "Lifetime alumni access",
        ],
        cta: "Book a Fit Call",
        ctaLink: CALENDAR_URL,
        highlighted: true,
        icon: "Target",
        note: "No lock-in. You leave with a launched service, the playbook, and the skills — they're yours whether or not we keep working together.",
      },
    ],
  },
  {
    id: "foryou",
    label: "Done-For-You Implementation",
    title: "I Do It For You",
    kicker: "Production-ready AI, built and shipped",
    description:
      "When you need a working AI system this week, not a curriculum. I provision the servers, install the agents, connect the tools, and hand you a system you own.",
    tiers: [
      {
        name: SERVICES_PRICING.digitalIdentity.name,
        priceKey: "digitalIdentity",
        tag: "Delivered in 2-4 Days",
        description:
          "An interview-ready digital identity site that consolidates your LinkedIn, resume, and social links into one professional platform you own. Like Linktree, but built for serious operators.",
        features: [
          "Custom-designed landing page",
          "LinkedIn, resume, and social links",
          "Conversion-focused layout",
          "Mobile-optimized",
          "You own the code and content",
        ],
        cta: "Start the Intake",
        ctaLink: "/intake/digital-identity",
        highlighted: false,
        icon: "Globe",
      },
      {
        name: SERVICES_PRICING.customAiProvisioning.name,
        priceKey: "customAiProvisioning",
        tag: "1-2 Weeks",
        description:
          "A done-for-you private AI command center. Custom business workflows, agent installation (OpenClaw, Hermes), API integrations, calendar/email sync, and secure infrastructure. Reclaim 10-20 hours a week.",
        features: [
          "Custom business workflows",
          "Agent installation (OpenClaw, Hermes)",
          "Private AI command center",
          "Calendar, email, and tool integrations",
          "Open-standard stack — no lock-in",
          "You own the infrastructure",
        ],
        cta: "Request a Build",
        ctaLink: CALENDAR_URL,
        highlighted: false,
        icon: "Wrench",
        note: "Scope and price finalized in a 30-min fit call",
      },
    ],
  },
];


/** Shared content for the Services hub, its four system pages, and SEO. */
export interface ServiceSystemBlock {
  title: string;
  content: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceSystemSeo {
  title: string;
  description: string;
  openGraphDescription: string;
}

export interface ServiceSystem {
  slug: string;
  label: string;
  href: string;
  seo: ServiceSystemSeo;
  heroTitle: string;
  heroDescription: string;
  schemaName: string;
  schemaDescription: string;
  blocks: ServiceSystemBlock[];
  keep: string;
  notFor: string[];
  faqs: ServiceFaq[];
  ctaTitle: string;
  ctaDescription: string;
  hubSummary: string;
  hubDescription: string;
  covers: string;
}

/**
 * One record per build system. The page, hub, and structured-data adapters
 * read this catalog instead of maintaining parallel copies of the facts.
 */
export const SERVICE_SYSTEMS: readonly ServiceSystem[] = [
  {
    slug: "data-foundation",
    label: "Data Foundation",
    href: "/services/data-foundation",
    seo: {
      title: "Data Foundation: Context Layer, Pipelines, Knowledge Base",
      description:
        "One queryable system for SOPs, sheets, and inbox. AI answers from your source, not memory. Built with you, owned by you.",
      openGraphDescription: "One place your AI tells the truth from.",
    },
    heroTitle: "One place your AI tells the truth from.",
    heroDescription:
      "Sheets, inbox threads, and SOPs join into one queryable system. AI answers from that system, not from memory. Audits pass faster.",
    schemaName: "Data Foundation",
    schemaDescription:
      "Context Layer, consolidation pipelines, and SOP knowledge base in one queryable system. You keep repo, configs, store, keys, and runbook.",
    blocks: [
      {
        title: "Context Layer",
        content:
          "One place for data, SOPs, and workflows. It replaces 20 disconnected tools as the reference point. Staff checks here first.",
      },
      {
        title: "Data Consolidation",
        content:
          "Pipelines pull scattered sheets and inbox threads into one system you can query. Nightly sync. Dedupe rules you can read.",
      },
      {
        title: "Internal Knowledge Base",
        content:
          "AI answers from your SOPs and cites the source per answer. The team stops asking the same questions twice.",
      },
    ],
    keep:
      "Repo, pipeline configs, vector store, access keys, 2-page runbook. Running cost is typically $20-80 per month plus model use. One named owner and one hour per week keeps it clean.",
    notFor: [
      "No one can own it. The system needs one named owner and one hour a week.",
      "You want a migration project. This wires the tools you already have.",
    ],
    faqs: [
      {
        question: "How long does a Data Foundation take?",
        answer: "One to two weeks after the audit. Top 20 SOPs first, then the rest.",
      },
      {
        question: "What do you need from us?",
        answer: "Access to Sheets, Drive, and inbox, plus one operator interview. No migration project.",
      },
      {
        question: "What if our SOPs are messy?",
        answer: "We structure the top 20 first. The rest follows the same template.",
      },
    ],
    ctaTitle: "Start with the Blueprint",
    ctaDescription: "We pick the top 20 SOPs first, then wire the rest.",
    hubSummary: "One source of truth for the workflows your team and AI share.",
    hubDescription:
      "One place for data, SOPs, and workflows. Pipelines pull scattered sheets and inbox threads into one system you can query. AI answers from your SOPs and cites the source.",
    covers: "Context Layer · Data Consolidation · Internal Knowledge Base",
  },
  {
    slug: "revenue-operations",
    label: "Revenue Operations",
    href: "/services/revenue-operations",
    seo: {
      title: "Revenue Operations: Onboarding, Pipeline, Docs, Billing",
      description:
        "Onboarding, pipeline, documents, reporting, and billing that run without copy-paste. Built with you, owned by you.",
      openGraphDescription: "Deals get touched. Reports build themselves.",
    },
    heroTitle: "Money in, money out, nothing stuck.",
    heroDescription:
      "Five flows that leak cash when run by hand. We wire them to your CRM and books, then hand you the keys.",
    schemaName: "Revenue Operations Automation",
    schemaDescription:
      "Onboarding, pipeline, document, reporting, and billing automation wired to CRM and books. Owner approves before anything sends.",
    blocks: [
      {
        title: "Client Onboarding Automation",
        content:
          "Account setup, kickoff routing, and intake run without a hand on the keyboard. New client in, welcome out, tasks assigned.",
      },
      {
        title: "Pipeline Automation",
        content:
          "New deals enter, enrich, and flag when they sit too long. Nothing sits untouched.",
      },
      {
        title: "Document Generation",
        content:
          "Proposals, contracts, and memos draft from structured data. You approve before anything sends.",
      },
      {
        title: "Automated Reporting",
        content:
          "Dashboards and client reports pull from CRM, ad platforms, and books. No copy-paste at month end.",
      },
      {
        title: "Billing Reconciliation",
        content:
          "We catch scope creep and invoice errors before they leak. You see what to bill and why.",
      },
    ],
    keep:
      "Repo, workflow configs, field map, keys, 2-page runbook. Running cost mapped in the Blueprint. No seat trap.",
    notFor: [
      "You want messages sent without review. Drafts build, you approve.",
      "You want a new CRM. This wires the one you have.",
    ],
    faqs: [
      {
        question: "Does automation send to clients without approval?",
        answer: "No. Drafts build automatically. You approve before anything sends.",
      },
      {
        question: "Which system does it connect to?",
        answer:
          "Your CRM, ad platforms, and books. We map fields in the audit, then wire once.",
      },
    ],
    ctaTitle: "Stop the leak first",
    ctaDescription: "The Blueprint ranks which flow pays back fastest.",
    hubSummary: "The handoffs, documents, and reporting between sale and renewal.",
    hubDescription:
      "Onboarding, pipeline, documents, reporting, and billing that run without copy-paste. Deals get touched. Reports build themselves. Invoices match the work.",
    covers: "Onboarding · Pipeline · Documents · Reporting · Billing",
  },
  {
    slug: "visibility",
    label: "Visibility",
    href: "/services/visibility",
    seo: {
      title: "Visibility: Reporting and Capacity Tracking",
      description:
        "Dashboards and capacity views from CRM, ads, and books. See overload and margin before month end.",
      openGraphDescription: "See overload and margin before month end.",
    },
    heroTitle: "See the week as it is.",
    heroDescription:
      "Reports and capacity pull from live sources. No month-end scramble. No silent overload.",
    schemaName: "Reporting and Capacity Visibility",
    schemaDescription:
      "Automated reporting and capacity tracking from CRM, ad platforms, and financials. Client-ready reports with zero manual input.",
    blocks: [
      {
        title: "Automated Reporting",
        content:
          "Dashboards and client-ready reports pull from CRM, ad platforms, and financials. Sources listed on each page. Refresh times stamped.",
      },
      {
        title: "Capacity Tracking",
        content:
          "Live view of who holds too much and who has room. Assignments move before burnout. History stays for planning.",
      },
    ],
    keep:
      "Sources, refresh times, and field map, plus keys and a 2-page runbook. You see where every number comes from.",
    notFor: [
      "You want a warehouse rebuild. Sources stay where they are.",
      "You want vanity charts. Every number lists its source.",
    ],
    faqs: [
      {
        question: "Where does the data come from?",
        answer:
          "Your CRM, ad platforms, and books. Each report lists its sources and refresh time.",
      },
      {
        question: "How fresh is the data?",
        answer:
          "Each report stamps its refresh time next to its sources. Stale numbers show their age.",
      },
    ],
    ctaTitle: "One true page",
    ctaDescription: "We wire your three sources first. The rest follows.",
    hubSummary: "The source-traceable view of performance, workload, and margin.",
    hubDescription:
      "Dashboards and capacity views pull from CRM, ad platforms, and books. You see who holds too much and what pays before month end.",
    covers: "Automated Reporting · Capacity Tracking",
  },
  {
    slug: "frontline-help",
    label: "Front-Line Help",
    href: "/services/frontline-help",
    seo: {
      title: "Front-Line Help: Agents, SaaS Cuts, Model Costs",
      description:
        "Tier-1 agents for intake and support, fewer SaaS seats, lower model spend. Scoped pilots, human handoff, you own the stack.",
      openGraphDescription: "Agents take the repeat work. Humans take the rest.",
    },
    heroTitle: "Agents take the repeat work.",
    heroDescription:
      "Intake, scheduling, and Tier-1 support run on rails. Scope stays tight. Handoff to humans stays one tap away.",
    schemaName: "Front-Line AI Help",
    schemaDescription:
      "Tier-1 agents, SaaS consolidation, and model routing. Scoped pilots with human handoff. Client owns the stack.",
    blocks: [
      {
        title: "Tier-1 AI Agents",
        content:
          "Agents take scheduling, intake, and repeat support questions. Scoped pilots handle 60-70% of inbound volume. Humans take the rest. Every answer links its source.",
      },
      {
        title: "SaaS Consolidation",
        content:
          "We replace overlapping subscriptions with one app on your data layer. Fewer seats. One bill you control. Exports stay open.",
      },
      {
        title: "AI Cost Reduction",
        content:
          "Calls route to the cheapest model that clears your bar. Spend drops. Output holds. Monthly report shows both.",
      },
    ],
    keep:
      "Agent configs, handoff rules, keys, 2-page runbook. Monthly spend report shows cost and output side by side.",
    notFor: [
      "You want humans out. Agents take the repeat work, humans take the rest.",
      "You want a black box. Every answer links its source.",
    ],
    faqs: [
      {
        question: "What happens when the agent cannot help?",
        answer: "It hands to a human with full transcript and source links. No dead ends.",
      },
      {
        question: "Do we lose our data if we cancel a tool?",
        answer:
          "No. Exports stay open and the data layer is yours. That is the point of consolidation.",
      },
    ],
    ctaTitle: "Pilot one flow",
    ctaDescription: "One intake or support flow. Measured for two weeks. Then decide.",
    hubSummary: "Repeat intake and support with a clean human handoff.",
    hubDescription:
      "Agents take scheduling, intake, and repeat support questions. Overlapping seats go. Model spend drops while output holds.",
    covers: "Tier-1 Agents · SaaS Consolidation · Cost Reduction",
  },
] as const;

export const SERVICE_SYSTEM_SLUGS = SERVICE_SYSTEMS.map(({ slug }) => slug);

export function getServiceSystem(slug: string): ServiceSystem {
  const system = SERVICE_SYSTEMS.find((candidate) => candidate.slug === slug);
  if (!system) throw new Error(`Unknown Service System: ${slug}`);
  return system;
}

export const SERVICE_HUB_FAQS: readonly ServiceFaq[] = [
  {
    question: "Where does a build start?",
    answer:
      "With the ROI Blueprint. We map your workflows, rank each fix by hours back and cash protected, and hand you the plan in writing.",
  },
  {
    question: "Who owns the system after?",
    answer: "You do. Repo, configs, keys, and a 2-page runbook transfer at handoff. No lock-in.",
  },
  {
    question: "What does it cost to run?",
    answer: "Typically $20-80 per month in infra plus model use. Builds reuse your data layer to cut seat spend.",
  },
];

export const SERVICE_HUB_HERO = {
  title: "Work I build with you. Systems you own.",
  lead:
    "I install the system with you. You run it after. Every build starts with the ROI Blueprint. You keep the code, the docs, and the keys.",
  support:
    "Four build groups. One starting audit. Team training closes every handoff, so logins turn into daily use.",
  assessmentCta: "Take Free Assessment",
} as const;

export const SERVICE_HUB_STATS = {
  proof: "40+ AI systems deployed.",
  result: "10–20 hours a week handed back. Rated 4.9/5 across 40+ engagements.",
} as const;

export const SERVICE_HUB_TRAINING = {
  title: "Team Adoption Training",
  description:
    "Staff use the system in live work, not in a slide deck. Logins mean nothing until the work moves. Training runs inside every build until it moves.",
  href: "/how-i-work",
  linkLabel: "How I work",
} as const;

export const SERVICE_HUB_STEPS = [
  {
    title: "ROI Blueprint",
    description: "We map your workflows and rank each fix by hours back and cash protected.",
  },
  {
    title: "One system live",
    description: "One group ships in 1-2 weeks. You watch each connection go in.",
  },
  {
    title: "Handoff",
    description: "Runbook, keys, and training. You run it without me.",
  },
] as const;

export const SERVICE_HUB_CTA = {
  title: "Map it before you build it",
  description: "The Blueprint costs {price} while the format is new. If it names fewer than three ranked actions, you do not pay.",
} as const;

export const SERVICE_HUB_DESCRIPTION =
  "Work built with you, systems you own. Four build groups plus ROI Blueprint and adoption training.";

export const SERVICE_HUB_COLLECTION_DESCRIPTION =
  "The Armchair Futurist builds AI systems with clients who keep full ownership. Groups: data groundwork, revenue operations, visibility, front-line help. Every build starts with the ROI Blueprint audit. Team adoption training closes each handoff.";

/** Compact discovery projection for crawler-facing files and tests. */
export function getServiceSystemDiscoveryLines(): string[] {
  return SERVICE_SYSTEMS.flatMap((system) => [
    `- ${system.label}: ${system.href}`,
    `  ${system.hubSummary}`,
  ]);
}

/** Path records and system records form one catalog seam. */
export const SERVICE_CATALOG = {
  paths: SERVICE_PATHS,
  systems: SERVICE_SYSTEMS,
} as const;

export interface ServiceOfferProjection {
  name: string;
  description: string;
  price: string;
  priceCurrency: string;
  priceSpecification?: {
    minPrice: string;
    maxPrice: string;
    priceCurrency: string;
  };
}

const PRICE_BY_KEY: Partial<Record<ServicePriceKey, {
  name: string;
  description: string;
  priceUSD: number;
  currency: string;
  minPriceUSD?: number;
  maxPriceUSD?: number;
}>> = {
  roadmapAudit: SERVICES_PRICING.roadmapAudit,
  selfSufficiency: SERVICES_PRICING.selfSufficiency,
  digitalIdentity: SERVICES_PRICING.digitalIdentity,
  customAiProvisioning: SERVICES_PRICING.customAiProvisioning,
};

/** Canonical paid-offer projection shared by the UI catalog and JSON-LD. */
export function getServiceOfferSchemaItems(): ServiceOfferProjection[] {
  return SERVICE_PATHS.flatMap((path) =>
    path.tiers.flatMap((tier) => {
      const pricing = PRICE_BY_KEY[tier.priceKey];
      if (!pricing) return [];
      const item: ServiceOfferProjection = {
        name: pricing.name,
        description: pricing.description,
        price: String(pricing.priceUSD),
        priceCurrency: pricing.currency,
      };
      if (tier.priceKey === "customAiProvisioning" && pricing.minPriceUSD && pricing.maxPriceUSD) {
        item.priceSpecification = {
          minPrice: String(pricing.minPriceUSD),
          maxPrice: String(pricing.maxPriceUSD),
          priceCurrency: pricing.currency,
        };
      }
      return [item];
    }),
  );
}

