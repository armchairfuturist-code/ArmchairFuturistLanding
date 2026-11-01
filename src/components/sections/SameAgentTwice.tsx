"use client";

/**
 * The same agent, twice.
 *
 * Replaces the author photograph in LastMileSection. The section states the
 * thesis in prose; this shows its mechanism: identical model and identical
 * data, two requests, two outcomes. The distance between the two outcomes is
 * the last mile.
 *
 * Content is the board-pack exchange from /concepts/the-last-mile, compressed
 * to its load-bearing lines. Inline SVG plus CSS keyframes in the site's own
 * tokens; no new dependency. Loops every 9s; every card holds a readable base
 * state at every frame, so a still capture never shows an empty panel. Under
 * prefers-reduced-motion the base state renders with no animation.
 *
 * Surfaces are tone changes, not outlines: cards sit on a faint fill of the
 * ink colour so the diagram reads as objects, not as a wireframe.
 */
export default function SameAgentTwice() {
  return (
    <figure
      className="mt-12 max-w-3xl"
      aria-label="Diagram: the same agent given two different requests returns two different outcomes"
    >
      <style>{`
        .sat text { font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif; }
        .sat .mono { font-family: var(--font-mono), ui-monospace, monospace; letter-spacing: .02em; }
        @keyframes sat-draw  { 0%,6%  { stroke-dashoffset: 74; } 14%,100% { stroke-dashoffset: 0; } }
        @keyframes sat-gap   { 0%,18% { opacity: 0; } 26%,48% { opacity: 1; } 56%,100% { opacity: .5; } }
        @keyframes sat-draw2 { 0%,50% { stroke-dashoffset: 74; } 58%,100% { stroke-dashoffset: 0; } }
        @keyframes sat-hit   { 0%,62% { opacity: 0; transform: translateY(5px); } 70%,100% { opacity: 1; transform: none; } }
        @keyframes sat-note  { 0%,76% { opacity: 0; } 84%,100% { opacity: 1; } }
        .sat .d1 { animation: sat-draw 9s ease-out infinite; }
        .sat .g1 { animation: sat-gap 9s ease-in-out infinite; }
        .sat .d2 { animation: sat-draw2 9s ease-out infinite; }
        .sat .h2 { animation: sat-hit 9s ease-out infinite; }
        .sat .nt { animation: sat-note 9s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .sat .d1,.sat .g1,.sat .d2,.sat .h2,.sat .nt { animation: none; }
          .sat .g1 { opacity: .5; }
        }
      `}</style>
      <svg className="sat w-full h-auto" viewBox="0 0 760 352" role="img">
        {/* lane one: a request that describes a task */}
        <rect x="8" y="16" width="210" height="96" rx="12" fill="currentColor" fillOpacity=".05" className="text-ink" />
        <text x="26" y="48" fontSize="15" fill="currentColor" className="text-charcoal">Summarise the sales data</text>
        <text x="26" y="70" fontSize="15" fill="currentColor" className="text-charcoal">and flag risks.</text>
        <text x="26" y="96" fontSize="12" fill="currentColor" className="mono text-muted-foreground">request one</text>
        <path d="M226 64 H300" stroke="currentColor" strokeOpacity=".45" strokeWidth="1.5" strokeDasharray="74" className="d1 text-ink" fill="none" />
        <rect x="308" y="34" width="112" height="60" rx="10" fill="currentColor" fillOpacity=".1" className="text-ink" />
        <text x="364" y="60" fontSize="14" textAnchor="middle" fill="currentColor" className="text-ink">the same agent</text>
        <text x="364" y="80" fontSize="12" textAnchor="middle" fill="currentColor" className="mono text-muted-foreground">same data</text>
        <path d="M428 64 H500" stroke="currentColor" strokeOpacity=".45" strokeWidth="1.5" strokeDasharray="74" className="d1 text-ink" fill="none" />
        <rect x="508" y="10" width="244" height="112" rx="12" fill="currentColor" fillOpacity=".05" className="text-ink" />
        <text x="526" y="40" fontSize="14" fill="currentColor" className="text-charcoal">Q3 revenue summary</text>
        <text x="526" y="62" fontSize="14" fill="currentColor" className="text-charcoal">Top five accounts listed</text>
        <text x="526" y="84" fontSize="14" fill="currentColor" className="text-charcoal">Risks: none flagged</text>
        <g className="g1">
          <rect x="526" y="94" width="208" height="20" rx="5" fill="currentColor" fillOpacity=".1" className="text-hp-electric" />
          <text x="534" y="108" fontSize="12.5" fill="currentColor" className="text-hp-electric">two quiet accounts: absent</text>
        </g>

        {/* lane two: the same request, plus the decision it serves */}
        <rect x="8" y="168" width="210" height="124" rx="12" fill="currentColor" fillOpacity=".05" className="text-ink" />
        <text x="26" y="198" fontSize="15" fill="currentColor" className="text-charcoal">Same request, plus one line:</text>
        <text x="26" y="222" fontSize="14" fill="currentColor" className="text-charcoal">flag accounts down over 30%</text>
        <text x="26" y="242" fontSize="14" fill="currentColor" className="text-charcoal">against their own 12-month</text>
        <text x="26" y="262" fontSize="14" fill="currentColor" className="text-charcoal">average, ranked by revenue</text>
        <text x="26" y="280" fontSize="14" fill="currentColor" className="text-charcoal">at risk.</text>
        <path d="M226 230 H300" stroke="currentColor" strokeOpacity=".45" strokeWidth="1.5" strokeDasharray="74" className="d2 text-ink" fill="none" />
        <rect x="308" y="200" width="112" height="60" rx="10" fill="currentColor" fillOpacity=".1" className="text-ink" />
        <text x="364" y="226" fontSize="14" textAnchor="middle" fill="currentColor" className="text-ink">the same agent</text>
        <text x="364" y="246" fontSize="12" textAnchor="middle" fill="currentColor" className="mono text-muted-foreground">same data</text>
        <path d="M428 230 H500" stroke="currentColor" strokeOpacity=".45" strokeWidth="1.5" strokeDasharray="74" className="d2 text-ink" fill="none" />
        <rect x="508" y="162" width="244" height="112" rx="12" fill="currentColor" fillOpacity=".05" className="text-ink" />
        <text x="526" y="192" fontSize="14" fill="currentColor" className="text-charcoal">Q3 revenue summary</text>
        <text x="526" y="214" fontSize="14" fill="currentColor" className="text-charcoal">Top five accounts listed</text>
        <g className="h2">
          <rect x="526" y="226" width="208" height="20" rx="5" fill="currentColor" fillOpacity=".16" className="text-hp-electric" />
          <text x="534" y="240" fontSize="12.5" fill="currentColor" className="text-hp-electric">1. Meridian Foods, down 38%</text>
          <rect x="526" y="250" width="208" height="20" rx="5" fill="currentColor" fillOpacity=".16" className="text-hp-electric" />
          <text x="534" y="264" fontSize="12.5" fill="currentColor" className="text-hp-electric">2. Halcyon Retail, down 31%</text>
        </g>

        <text x="8" y="338" fontSize="17" fontWeight="500" fill="currentColor" className="nt text-ink">
          Same model. Same data. The difference is what the request knew.
        </text>
      </svg>
      <figcaption className="mt-4 text-sm text-muted-foreground">
        The exchange is real, compressed from the board-pack story on the
        concept page. Account names changed.
      </figcaption>
    </figure>
  );
}
