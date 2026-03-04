import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Readiness Assessment | The Armchair Futurist',
  description:
    'Take the free 9-question AI readiness assessment. Get a personalized diagnosis of your clarity, readiness, and urgency, with a recommendation that matches where you actually are.',
  openGraph: {
    title: 'AI Readiness Assessment | The Armchair Futurist',
    description:
      'How ready are you for AI? 9 honest questions. 3 minutes. A personalized diagnosis and action plan from Alex Myers.',
    url: '/assessment',
  },
};

export default function AssessmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
