import type { Metadata } from 'next';
import SubstackSection from '@/components/sections/SubstackSection';
import { fetchSubstackPosts } from '@/lib/substack-feed';

const siteUrl = 'https://thearmchairfuturist.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'AI Adoption Blog: Notes From the Last Mile',
  description:
    'Weekly notes on AI adoption, the last mile between a demo and a system people use, and what changes when a team owns the tooling. Written by Alex Myers.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'AI Adoption Blog | The Armchair Futurist',
    description: 'Weekly notes on AI adoption and the last mile between a demo and a system people use.',
    url: '/blog',
    siteName: 'The Armchair Futurist',
    images: ['/opengraph-image'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Adoption Blog | The Armchair Futurist',
    description: 'Weekly notes on AI adoption and the last mile between a demo and a system people use.',
  },
};

/** Server component: the feed is fetched here so the issues land in the HTML. */
export default async function BlogPage() {
  const posts = await fetchSubstackPosts(9);

  return (
    <main id="main-content" className="flex flex-col">
      <section className="bg-canvas pt-16 md:pt-24 pb-2">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-hp-electric mb-4">
            Newsletter
          </p>
          <h1 className="font-heading text-display font-medium tracking-tight text-ink mb-4 max-w-[30ch]">
            AI adoption, written down while it happens
          </h1>
          <p className="text-charcoal text-base md:text-lg leading-relaxed">
            Every week I write one note about AI inside a working business: what
            shipped, what stalled, and the part nobody puts in the launch post.
            The archive below is the newsletter itself, published on Substack and
            listed here so you can read it without an account.
          </p>
        </div>
      </section>
      <SubstackSection initialPosts={posts} showDescriptions />
    </main>
  );
}
