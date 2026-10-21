import Link from 'next/link';

interface AuthorBylineProps {
  published: string;
  updated?: string;
}

/**
 * Visible authorship on article pages.
 *
 * The Person schema already names Alex as author, but a reader and an answer
 * engine both need the byline in the text. Credentials sit next to the name
 * because that is the part an evaluating reader checks.
 */
export default function AuthorByline({ published, updated }: AuthorBylineProps) {
  return (
    <div className="container mx-auto px-4 md:px-6 max-w-4xl py-2">
      <p className="text-sm text-muted-foreground">
        By{' '}
        <Link href="/about" className="text-foreground underline underline-offset-2 hover:text-primary">
          Alex Myers
        </Link>
        , AI Technical Literacy and Workflow Strategy Consultant. 40+ AI systems
        deployed, 6 certifications. Published {published}
        {updated ? `\u00a0\u00b7 Updated ${updated}` : ''}
      </p>
    </div>
  );
}
