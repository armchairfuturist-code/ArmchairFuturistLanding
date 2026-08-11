/**
 * Shared pricing — single source of truth across UI components and structured data.
 * Update here and both UI and SEO schema stay in sync.
 *
 * Previously split across constants.ts (COACHING_PACKAGES for UI) and
 * pricing.ts (PRICING for SEO) — now consolidated.
 */

export type CurrencyCode = 'EUR' | 'USD';

// ── Service pricing (used by StructuredData + ServicesSection) ──

export const SERVICES_PRICING = {
  digitalIdentity: {
    name: "Digital Identity Landing Page",
    price: 199,
    currency: "USD" as const,
    description:
      "Interview-ready digital identity site that translates your LinkedIn, resume, and social links into one professional platform you own. Delivered in 2-4 days.",
  },
  customAiProvisioning: {
    name: "Custom AI Provisioning",
    price: 1000,
    minPrice: 1000,
    maxPrice: 5000,
    currency: "USD" as const,
    description:
      "Done-for-you private AI command center with API integrations, workflow automation, and secure infrastructure. Reclaim 10-20 hours per week.",
  },
  speakingFacilitation: {
    name: "Executive Roundtables & Workshops",
    currency: "USD" as const,
    description:
      "Facilitated AI strategy sessions for leadership teams. Executive roundtables, team workshops, and strategy facilitation to move from AI discussions to AI decisions.",
  },

} as const;

// ── Coaching / mentoring packages (used by MentoringSection) ──

export interface CoachingPackage {
  id: string;
  name: string;
  sessions: number;
  totalPrice: number;
  totalPriceUSD: number;
  pricePerSession: number;
  pricePerSessionUSD: number;
  discountPercent: number;
  savings: number;
  savingsUSD: number;
  description: string;
  features: string[];
  popular: boolean;
  /** Optional upsell note rendered under the pack features. */
  upgradeNote?: string;
}

export const COACHING_PACKAGES: CoachingPackage[] = [
  {
    id: 'single',
    name: 'Single Session',
    sessions: 1,
    totalPrice: 100,
    totalPriceUSD: 120,
    pricePerSession: 100,
    pricePerSessionUSD: 120,
    discountPercent: 0,
    savings: 0,
    savingsUSD: 0,
    description: 'One focused session. No commitment, no package. You bring a specific question or a mixed scope; we work through it together. Ideal for discovery, or when you\'re not sure what you need yet.',
    features: [
      'One 60-minute video session',
      'Focused on your specific challenge or question',
      'No commitment or package to manage',
      'Session summary with key insights',
    ],
    popular: false,
  },
  {
    id: 'pack-5',
    name: '5-Session Pack',
    sessions: 5,
    totalPrice: 475,
    totalPriceUSD: 570,
    pricePerSession: 95,
    pricePerSessionUSD: 114,
    discountPercent: 5,
    savings: 25,
    savingsUSD: 30,
    description: 'Five sessions with progress tracking and priority scheduling',
    features: [
      'Personal AI mindset coaching',
      'Priority scheduling',
      'Progress tracking between sessions',
      'Personalized learning roadmap',
    ],
    popular: false,
  },
  {
    id: 'pack-10',
    name: '10-Session Pack',
    sessions: 10,
    totalPrice: 900,
    totalPriceUSD: 1100,
    pricePerSession: 90,
    pricePerSessionUSD: 110,
    discountPercent: 10,
    savings: 100,
    savingsUSD: 100,
    description: 'Deep transformation with sustained support and accountability',
    features: [
      'Everything in 5-Session Pack',
      'Custom AI literacy curriculum',
      'Between-session async support',
      'Quarterly progress review',
    ],
    popular: false,
  },
  {
    id: 'pack-20',
    name: '20-Session Pack',
    sessions: 20,
    totalPrice: 1700,
    totalPriceUSD: 2000,
    pricePerSession: 85,
    pricePerSessionUSD: 100,
    discountPercent: 15,
    savings: 300,
    savingsUSD: 400,
    description: 'Premium long-arc coaching — the deepest 1:1 track for building independent AI judgment',
    features: [
      'Everything in 10-Session Pack',
      'Between-session follow-up on session-related topics (WhatsApp)',
      'Custom session planning',
      'Priority scheduling & rescheduling',
    ],
    upgradeNote:
      'Want hands-on co-building and launch accountability? The 8-Week Build Sprint adds a structured playbook, async build support, and a fixed deliverable by week 8 — amounts paid here credit toward the Program.',
    popular: true,
  },
];

// ── Derived values ──

/** Coaching packages keyed by id for O(1) lookup */
export const COACHING_PACKAGES_BY_ID: Record<string, CoachingPackage> = Object.fromEntries(
  COACHING_PACKAGES.map((p) => [p.id, p]),
);

/** All prices from services + coaching for priceRange display */
const ALL_PRICES: number[] = [
  ...Object.values(SERVICES_PRICING)
    .filter((s): s is typeof s & { price: number } => 'price' in s)
    .map((s) => s.price),
  ...COACHING_PACKAGES.flatMap((p) => [p.totalPrice, p.totalPriceUSD]),
];

export const PRICE_RANGE = {
  min: Math.min(...ALL_PRICES),
  max: Math.max(...ALL_PRICES),
};

// ── Backward-compat aliases (for StructuredData) ──

export const PRICING = SERVICES_PRICING;
export type PricingKey = keyof typeof SERVICES_PRICING;

/** Coaching entries in the old flat format used by StructuredData */
export const COACHING_PRICING: Record<string, { name: string; price: number; currency: string; description: string }> = Object.fromEntries(
  COACHING_PACKAGES.map((pkg) => [
    pkg.id,
    { name: pkg.name, price: pkg.totalPrice, currency: 'EUR', description: pkg.description },
  ]),
);

export const EUR_USD_RATE = 1.17;

// ── Currency selection (the deep selector over the dual-currency fields) ──

/** ISO-3166 region codes whose default currency is the euro. */
export const EURO_COUNTRIES = new Set([
  'DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'AT', 'PT', 'IE', 'FI',
  'GR', 'SK', 'LT', 'SI', 'LV', 'EE', 'CY', 'LU', 'MT', 'HR',
]);

/** Currency-correct price fields for one coaching package. */
export interface PricingView {
  total: number;
  perSession: number;
  savings: number;
}

/** Select the currency-correct price fields for a coaching package. */
export function resolvePricing(
  pkg: CoachingPackage,
  currency: CurrencyCode,
): PricingView {
  return currency === 'USD'
    ? { total: pkg.totalPriceUSD, perSession: pkg.pricePerSessionUSD, savings: pkg.savingsUSD }
    : { total: pkg.totalPrice, perSession: pkg.pricePerSession, savings: pkg.savings };
}

/**
 * Pick the default display currency for a visitor. A stored preference
 * wins; otherwise the locale's region is matched against the eurozone;
 * otherwise USD. Pure — no DOM access.
 */
export function resolveDefaultCurrency(
  locale: string | undefined,
  stored: string | null | undefined,
): CurrencyCode {
  if (stored === 'EUR' || stored === 'USD') return stored;
  if (locale) {
    const region = locale.trim().toUpperCase().split(/[-_]/).pop();
    if (region && EURO_COUNTRIES.has(region)) return 'EUR';
  }
  return 'USD';
}