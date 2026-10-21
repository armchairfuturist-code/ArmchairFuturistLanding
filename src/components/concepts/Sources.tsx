interface SourceItem {
  title: string;
  href: string;
  note: string;
}

interface SourcesProps {
  items: readonly SourceItem[];
}

/**
 * Where the claims come from.
 *
 * Every number on a concept page should point at something a reader can open.
 * Links are plain anchors rather than a list of names, so a citation stays
 * checkable when the page is quoted by an answer engine.
 */
export default function Sources({ items }: SourcesProps) {
  return (
    <section className="mt-12" aria-labelledby="sources-heading">
      <h3 id="sources-heading" className="font-heading text-xl font-bold text-primary mb-4">
        Sources
      </h3>
      <ol className="space-y-3">
        {items.map((item, index) => (
          <li key={item.href} className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-mono text-xs mr-2">{index + 1}.</span>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2 hover:text-primary/80"
            >
              {item.title}
            </a>
            <span className="ml-1">{item.note}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
