import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { relatedConcepts } from "@/content/concepts";

/**
 * Lateral links between concept pages.
 *
 * Before this, no concept page linked to any other: the cluster was a hub
 * that pointed out and six pages that pointed nowhere. Internal links are how
 * a search engine learns that pages belong to the same body of work, and how
 * a reader who finishes one page finds the next instead of leaving.
 *
 * Anchor text is the concept title — descriptive, and it matches what people
 * actually search for.
 */
export default function RelatedConcepts({ current }: { current: string }) {
  const related = relatedConcepts(current);
  if (related.length === 0) return null;

  return (
    <aside
      aria-labelledby="related-concepts-heading"
      className="mt-14 border-t border-ink/15 pt-8"
    >
      <h2
        id="related-concepts-heading"
        className="font-mono text-[11px] uppercase tracking-[0.25em] text-graphite mb-5"
      >
        Related concepts
      </h2>
      <ul className="grid gap-3 sm:grid-cols-3">
        {related.map((c) => (
          <li key={c.slug}>
            <Link
              href={c.href}
              className="group flex h-full flex-col justify-between rounded-lg border border-ink/15 p-4 transition-colors duration-150 hover:border-hp-electric/40 hover:bg-hp-electric/5"
            >
              <span className="font-display text-base font-medium text-ink group-hover:text-hp-electric transition-colors duration-150">
                {c.title}
              </span>
              <span className="mt-2 text-sm leading-relaxed text-graphite">
                {c.summary}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-sm text-graphite">
        <Link
          href="/concepts"
          className="inline-flex items-center gap-1 text-hp-electric font-medium hover:underline"
        >
          All concepts
          <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      </p>
    </aside>
  );
}
