'use client';

import dynamic from 'next/dynamic';

import SectionSkeleton from '@/components/ui/SectionSkeleton';

export const CaseStudiesSection = dynamic(
  () => import('./CaseStudiesSection'),
  { loading: () => <SectionSkeleton minHeight="min-h-[640px]" label="Loading case studies" /> }
);

export const KeyStatsSection = dynamic(
  () => import('./KeyStatsSection'),
  { loading: () => <SectionSkeleton minHeight="min-h-[360px]" label="Loading key stats" /> }
);

export const ROICalculatorSection = dynamic(
  () => import('./ROICalculatorSection'),
  { loading: () => <SectionSkeleton minHeight="min-h-[720px]" label="Loading ROI calculator" /> }
);

export const AssessmentCtaSection = dynamic(
  () => import('./AssessmentCtaSection'),
  { loading: () => <SectionSkeleton minHeight="min-h-[280px]" label="Loading assessment" /> }
);

export const InsightsSection = dynamic(
  () => import('./InsightsSection'),
  { loading: () => <SectionSkeleton minHeight="min-h-[800px]" label="Loading insights" /> }
);
