/**
 * A/B Testing Infrastructure
 * 
 * Based on Karpathy's AutoResearch pattern:
 * - Experiment → Measure → Keep/Discard → Iterate
 * 
 * This provides a simple framework for running concurrent experiments
 * and tracking conversion metrics.
 */

import { trackEvent } from './analytics';

// Experiment configuration types
export type ExperimentVariant = {
  id: string;
  weight: number; // 0-1, probability of being selected
  name: string;
};

export type Experiment = {
  id: string;
  name: string;
  description: string;
  variants: ExperimentVariant[];
  // Conversion goal metric
  goalMetric: string;
};

// Pre-defined experiments
export const EXPERIMENTS: Record<string, Experiment> = {
  HERO_HEADLINE: {
    id: 'hero_headline',
    name: 'Hero Headline Copy',
    description: 'Test different headlines to improve engagement',
    goalMetric: 'hero_headline_impression',
    variants: [
      { id: 'control', name: 'Control - Intelligence is cheap. Trust is the new scarcity.', weight: 0.33 },
      { id: 'variant_a', name: 'Variant A - AI can do the work. You provide the trust.', weight: 0.33 },
      { id: 'variant_b', name: 'Variant B - Stop wasting 20 hours a week on AI chaos', weight: 0.34 },
    ],
  },
  HERO_CTA_COPY: {
    id: 'hero_cta_copy',
    name: 'Hero CTA Button Copy',
    description: 'Test different CTA button copy to improve click-through rate',
    goalMetric: 'hero_cta_click',
    variants: [
      { id: 'control', name: 'Control - Book a Free Strategy Call', weight: 0.33 },
      { id: 'variant_a', name: 'Variant A - Book Your Free Call', weight: 0.33 },
      { id: 'variant_b', name: 'Variant B - Schedule Free Consultation', weight: 0.34 },
    ],
  },
  HERO_SECONDARY_CTA: {
    id: 'hero_secondary_cta',
    name: 'Hero Secondary CTA',
    description: 'Test different secondary CTA options',
    goalMetric: 'hero_secondary_cta_click',
    variants: [
      { id: 'control', name: 'Control - Take the Free Assessment', weight: 0.5 },
      { id: 'variant_a', name: 'Variant A - Get Your Free Score', weight: 0.5 },
    ],
  },
  SPOTLIGHT_CTA: {
    id: 'spotlight_cta',
    name: 'Spotlight Section CTA Style',
    description: 'Test different CTA styles for the $199 offer',
    goalMetric: 'spotlight_cta_click',
    variants: [
      { id: 'control', name: 'Control - Claim Your $199 Page', weight: 0.5 },
      { id: 'variant_a', name: 'Variant A - Get Started for $199', weight: 0.5 },
    ],
  },
  HERO_BACKGROUND: {
    id: 'hero_background',
    name: 'Hero Background Type',
    description: 'Test video vs image background performance',
    goalMetric: 'hero_background_impression',
    variants: [
      { id: 'control', name: 'Control - Video Background', weight: 0.5 },
      { id: 'variant_a', name: 'Variant A - Static Image', weight: 0.5 },
    ],
  },
  SOCIAL_PROOF_COUNT: {
    id: 'social_proof_count',
    name: 'Social Proof Items',
    description: 'Test number of social proof stats to show',
    goalMetric: 'social_proof_impression',
    variants: [
      { id: 'control', name: 'Control - 3 stats', weight: 0.5 },
      { id: 'variant_a', name: 'Variant A - 6 stats', weight: 0.5 },
    ],
  },
  CTA_BUTTON_STYLE: {
    id: 'cta_button_style',
    name: 'CTA Button Style',
    description: 'Test different CTA button styles',
    goalMetric: 'cta_button_impression',
    variants: [
      { id: 'control', name: 'Control - White primary', weight: 0.33 },
      { id: 'variant_a', name: 'Variant A - Gradient primary', weight: 0.33 },
      { id: 'variant_b', name: 'Variant B - Large with icon', weight: 0.34 },
    ],
  },
};

// Deterministic random based on session + experiment ID
function seededRandom(seed: string): number {
  if (typeof window === 'undefined') return Math.random();
  
  // Get or create persistent session ID
  let sessionId = sessionStorage.getItem('ab_session_id');
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem('ab_session_id', sessionId);
  }
  
  // Simple hash function
  const hash = `${sessionId}_${seed}`.split('').reduce((acc, char) => {
    return ((acc << 5) - acc) + char.charCodeAt(0);
  }, 0);
  
  return Math.abs(hash) / 2147483647;
}

/**
 * Get assigned variant for an experiment
 * Uses deterministic assignment based on session ID
 */
export function getAssignedVariant(experimentId: string): string {
  if (typeof window === 'undefined') {
    return EXPERIMENTS[experimentId]?.variants[0]?.id || 'control';
  }
  
  const experiment = EXPERIMENTS[experimentId];
  if (!experiment) return 'control';
  
  const random = seededRandom(experimentId);
  let cumulative = 0;
  
  for (const variant of experiment.variants) {
    cumulative += variant.weight;
    if (random < cumulative) {
      return variant.id;
    }
  }
  
  return experiment.variants[0].id;
}

/**
 * Track experiment conversion
 * Call this when a conversion goal is reached
 */
export function trackExperimentConversion(
  experimentId: string,
  conversionMetric: string,
  metadata?: Record<string, string | number>
): void {
  const variant = getAssignedVariant(experimentId);
  
  trackEvent('experiment_conversion', {
    experiment_id: experimentId,
    variant_id: variant,
    conversion_metric: conversionMetric,
    ...metadata,
  });
  
  // Also track to console for debugging
  if (process.env.NODE_ENV === 'development') {
    console.log('[A/B Test] Conversion:', {
      experiment: experimentId,
      variant,
      metric: conversionMetric,
      metadata,
    });
  }
}

/**
 * Track experiment impression
 * Call this when an experiment is first shown to user
 */
export function trackExperimentImpression(experimentId: string): void {
  if (typeof window === 'undefined') return;
  
  const variant = getAssignedVariant(experimentId);
  
  // Only track once per session
  const trackedKey = `ab_impression_${experimentId}`;
  if (sessionStorage.getItem(trackedKey)) return;
  
  sessionStorage.setItem(trackedKey, 'true');
  
  trackEvent('experiment_impression', {
    experiment_id: experimentId,
    variant_id: variant,
  });
  
  if (process.env.NODE_ENV === 'development') {
    console.log('[A/B Test] Impression:', {
      experiment: experimentId,
      variant,
    });
  }
}

/**
 * Get experiment results (for dashboard)
 * In production, this would query analytics data
 */
export function getExperimentResults(experimentId: string): {
  experiment: Experiment;
  variants: Array<{
    id: string;
    name: string;
    impressions: number;
    conversions: number;
    rate: number;
  }>;
} {
  const experiment = EXPERIMENTS[experimentId];
  if (!experiment) {
    throw new Error(`Experiment ${experimentId} not found`);
  }
  
  // In production, fetch from analytics
  // For now, return structure
  return {
    experiment,
    variants: experiment.variants.map((v) => ({
      id: v.id,
      name: v.name,
      impressions: 0,
      conversions: 0,
      rate: 0,
    })),
  };
}
