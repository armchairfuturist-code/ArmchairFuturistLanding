import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import AuthorByline from '@/components/concepts/AuthorByline';
import { CONCEPTS } from '@/content/concepts';

const siteUrl = 'https://thearmchairfuturist.com';

export const metadata: Metadata = {
  title: 'AI Adoption Glossary: The Terms I Use | The Armchair Futurist',
  description:
    'Short definitions of the terms behind AI adoption work: the last mile, the install trap, the accountability gap, pilot-itis, and the roles that close them.',
  alternates: { canonical: '/glossary' },
  openGraph: {
    images: ['/opengraph-image'],
    title: 'AI Adoption Glossary',
    description:
      'Short definitions of the terms behind AI adoption work, written for people who have to make a decision with them.',
    url: '/glossary',
    siteName: 'The Armchair Futurist',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Adoption Glossary | The Armchair Futurist',
    description:
      'Short definitions of the terms behind AI adoption work, written for people who have to make a decision with them.',
  },
};

/**
 * Two extra terms sit alongside the concept cluster. They are the two a buyer
 * asks about first, and neither has a page of its own.
 */
const SUPPLEMENTARY_TERMS = [
  {
    slug: 'ai-technical-literacy',
    term: 'AI Technical Literacy',
    definition:
      'The working knowledge of what an AI system is good at, where it reliably fails, and how to direct it. Held by the person doing the work, so it survives a change of vendor.',
  },
  {
    slug: 'ai-agent',
    term: 'AI agent',
    definition:
      'A model given a goal and the ability to act across tools and steps without a person driving each one. Installing one is a weekend task. Deciding what it owns is the work.',
  },
];

const TERMS = [
  ...CONCEPTS.map((concept) => ({
    slug: concept.slug,
    term: concept.title,
    definition: concept.description,
    href: concept.href,
  })),
  ...SUPPLEMENTARY_TERMS.map((term) => ({ ...term, href: null })),
];

export default function GlossaryPage() {
  return (
    <main className="min-h-[100dvh] bg-background">
      <div className="container mx-auto px-4 md:px-6 py-6">
        <Breadcrumbs items={[{ label: 'Glossary', href: '/glossary' }]} />
      </div>

      <AuthorByline published="2026-10-21" />

      <section className="bg-secondary py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <span className="text-xs text-muted-foreground/60 font-mono uppercase tracking-widest">
            Reference
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-primary mb-6 mt-2">
            AI adoption glossary
          </h1>
          <p className="text-xl text-foreground/80 leading-relaxed">
            The terms I use when I audit AI work, defined in plain language and
            in the way I mean them. Each definition is short enough to quote and
            precise enough to check against your own organisation.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <dl className="divide-y divide-border/60">
            {TERMS.map((term) => (
              <div key={term.slug} id={term.slug} className="py-6 scroll-mt-24">
                <dt className="font-heading text-xl font-bold text-primary mb-2">
                  {term.term}
                </dt>
                <dd className="text-foreground/80 leading-relaxed">
                  {term.definition}
                  {term.href && (
                    <Link
                      href={term.href}
                      className="block mt-2 text-sm font-semibold text-primary underline underline-offset-2 hover:text-primary/80"
                    >
                      Read the full definition
                    </Link>
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-10 text-foreground/80 leading-relaxed">
            A definition that survives contact with a real decision is the only
            useful kind. If one of these reads differently inside your
            organisation, that difference is usually the problem worth fixing
            first.
          </p>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'DefinedTermSet',
            '@id': siteUrl + '/glossary#termset',
            name: 'AI Adoption Glossary',
            description:
              'Definitions of the terms behind AI adoption work, by Alex Myers.',
            url: siteUrl + '/glossary',
            hasDefinedTerm: TERMS.map((term) => ({
              '@type': 'DefinedTerm',
              name: term.term,
              description: term.definition,
              inDefinedTermSet: siteUrl + '/glossary#termset',
              ...(term.href ? { url: siteUrl + term.href } : {}),
            })),
          }),
        }}
      />
    </main>
  );
}
