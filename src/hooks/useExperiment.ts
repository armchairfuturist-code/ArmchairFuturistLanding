"use client";

import { useState, useEffect, useMemo } from 'react';
import { 
  getAssignedVariant, 
  trackExperimentImpression, 
  trackExperimentConversion,
  EXPERIMENTS,
  type Experiment
} from '@/lib/ab-testing';

/**
 * Hook for using A/B test experiments
 * 
 * @param experimentId - The ID of the experiment (from EXPERIMENTS)
 * @param track - Whether to automatically track impressions
 * @returns Object containing variant info and helper functions
 */
export function useExperiment(
  experimentId: string, 
  track: boolean = true
) {
  const [variant, setVariant] = useState<string>('control');
  const [isLoaded, setIsLoaded] = useState(false);
  
  const experiment = useMemo(() => {
    return EXPERIMENTS[experimentId];
  }, [experimentId]);
  
  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;
    
    const assignedVariant = getAssignedVariant(experimentId);
    setVariant(assignedVariant);
    setIsLoaded(true);
    
    if (track) {
      trackExperimentImpression(experimentId);
    }
  }, [experimentId, track]);
  
  /**
   * Track a conversion for this experiment
   */
  const trackConversion = (metadata?: Record<string, string | number>) => {
    if (!isLoaded) return;
    
    trackExperimentConversion(
      experimentId, 
      experiment?.goalMetric || 'conversion',
      metadata
    );
  };
  
  return {
    variant,
    experiment,
    isLoaded,
    trackConversion,
    // Helper to check if variant matches
    isVariant: (v: string) => variant === v,
  };
}

/**
 * Hook for getting multiple experiments at once
 */
export function useExperiments(experimentIds: string[]) {
  const experiments = useMemo(() => {
    return experimentIds.map(id => ({
      id,
      ...useExperiment(id, false),
    }));
  }, [experimentIds.join(',')]);
  
  return experiments;
}
