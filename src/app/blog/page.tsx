import type { Metadata } from 'next';
import SubstackSection from '@/components/sections/SubstackSection';

const siteUrl = 'https://thearmchairfuturist.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Blog — AI Strategy, Adoption & The Future of Work',
  description: 'Weekly insights from Alex Myers on AI adoption, organizational change, and navigating the future of work. Practical guidance for leaders who want results, not hype.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog - AI Strategy & The Future of Work | The Armchair Futurist',
    description: 'Weekly insights on AI adoption, organizational change, and the future of work.',
    url: '/blog',
    siteName: 'The Armchair Futurist',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog — AI Strategy, Adoption & The Future of Work',
    description: 'Weekly insights from Alex Myers on AI adoption, organizational change, and navigating the future of work.',
  },
};

export default function BlogPage() {
  return <SubstackSection />;
}
