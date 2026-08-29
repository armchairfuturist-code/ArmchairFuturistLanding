/** Service path content — icon keys mapped in section adapter. */
export interface ServiceTier {
  name: string;
  price: string;
  tag: string;
  description: string;
  features: string[];
  cta: string;
  ctaLink: string;
  highlighted: boolean;
  icon: string;
  note?: string;
  priceKey?: "digitalIdentity" | "customAiProvisioning";
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
        name: "AI Readiness Assessment",
        price: "Free",
        tag: "3 Minutes",
        description:
          "Not sure where you stand? Take the free 3-minute diagnostic. You'll get your personalized AI archetype, clarity score, and a clear recommended next step — no pitch, no pressure.",
        features: [
          "3-minute quiz",
          "Personalized AI archetype",
          "Clarity & readiness score",
          "Recommended next step",
        ],
        cta: "Take the Assessment",
        ctaLink: "/assessment",
        highlighted: false,
        icon: "Zap",
      },
      {
        name: "1-on-1 AI Guidance",
        price: "$570 – $2,000",
        tag: "5 · 10 · 20 Packs",
        description:
          "Start with a 5-session pack and scale up. Most clients choose 5 or 10. Each session builds your AI literacy, from first understanding to full independence.",
        features: [
          "60-minute 1-on-1 video sessions",
          "From understanding to agency to action",
          "Custom to your role and goals",
          "Recording + follow-up notes",
          "Flexible scheduling",
        ],
        cta: "Browse Session Packs",
        ctaLink: "/#ai-guidance",
        highlighted: false,
        icon: "BookOpen",
        note: "5, 10, and 20-session packs save up to 15%",
      },
      {
        name: "AI Self-Sufficiency Program",
        price: "$2,497",
        tag: "8-Week Build Sprint",
      description:
        "You ship a launched AI-powered service or brand by week 8. A proven playbook, 10–15 coaching sessions, and async support throughout, so you finish with something real to sell, not just notes from sessions.",
        features: [
        "Your own AI-powered service, designed & launched by week 8",
        "Structured build playbook (not open coaching)",
        "10–15 coaching sessions guiding each phase of your build",
        "Async support between sessions — never stuck waiting a week",
        "Personal brand & service framework",
        "Lifetime alumni access",
      ],
        cta: "Apply for the Program",
        ctaLink: "CALENDAR_URL",
        highlighted: true,
        icon: "Target",
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
        name: "Digital Identity Landing Page",
        price: "$233",
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
        ctaLink: "https://forms.gle/Ak5af4CUkCfRk8mM9",
        highlighted: false,
        icon: "Globe",
      },
      {
        name: "Custom AI Provisioning",
        price: "$1,000 – $5,000",
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
        ctaLink: "CALENDAR_URL",
        highlighted: false,
        icon: "Wrench",
        note: "Scope and price finalized in a 30-min fit call",
      },
    ],
  },
];
