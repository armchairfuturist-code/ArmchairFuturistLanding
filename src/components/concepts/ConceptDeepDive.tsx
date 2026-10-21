import type { ConceptDepth } from '@/content/concept-depth';

interface ConceptDeepDiveProps {
  depth: ConceptDepth | undefined;
}

/**
 * The long-form half of a concept page: worked example, contrast table, method
 * note, and sources. Everything renders server-side so answer engines see the
 * text, and the sources double as the citations the Article JSON-LD points at.
 */
export default function ConceptDeepDive({ depth }: ConceptDeepDiveProps) {
  if (!depth) return null;

  return (
    <>
      {depth.worked && (
        <div className="mt-12 rounded-xl border border-border/60 bg-card p-6 md:p-8">
          <span className="text-xs text-muted-foreground/60 font-mono uppercase tracking-widest">
            Worked example
          </span>
          <h2 className="font-heading text-2xl font-bold text-primary mb-5 mt-2">
            {depth.worked.heading}
          </h2>
          {depth.worked.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="text-foreground/80 leading-relaxed mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      )}

      {depth.table && (
        <div className="mt-12">
          <h2 className="font-heading text-2xl font-bold text-primary mb-2">
            {depth.table.heading}
          </h2>
          {depth.table.intro && (
            <p className="text-foreground/80 leading-relaxed mb-6">{depth.table.intro}</p>
          )}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-border/60">
                  <th scope="col" className="py-3 pr-4 font-heading font-bold text-foreground">
                    {depth.table.columns[0]}
                  </th>
                  <th scope="col" className="py-3 font-heading font-bold text-foreground">
                    {depth.table.columns[1]}
                  </th>
                </tr>
              </thead>
              <tbody>
                {depth.table.rows.map((row) => (
                  <tr key={row.left} className="border-b border-border/40 align-top">
                    <td className="py-3 pr-4 text-muted-foreground">{row.left}</td>
                    <td className="py-3 text-foreground/80">{row.right}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {depth.method && (
        <div className="mt-12 rounded-xl border border-border/60 bg-card p-6 md:p-8">
          <h2 className="font-heading text-2xl font-bold text-primary mb-5">
            {depth.method.heading}
          </h2>
          {depth.method.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="text-foreground/80 leading-relaxed mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      )}

      <section className="mt-12" aria-labelledby="sources-heading">
        <h2 id="sources-heading" className="font-heading text-xl font-bold text-primary mb-4">
          Sources
        </h2>
        <ol className="space-y-3">
          {depth.sources.map((source, index) => (
            <li key={source.href} className="text-sm text-muted-foreground leading-relaxed">
              <span className="font-mono text-xs mr-2">{index + 1}.</span>
              <a
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2 hover:text-primary/80"
              >
                {source.title}
              </a>
              <span className="ml-1">{source.note}</span>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
