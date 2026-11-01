"use client";

/**
 * The same task, twice.
 *
 * Replaces the old prompt-only diagram. Frontier models infer well now, so
 * the prompt is not the gap. The gap is workflow: ad-hoc pasting and full
 * retries on a frontier model versus a saved recipe with a cheap classifier
 * route, one strong plan, and cheap execution models. Same data, same task,
 * different cost, repeatability and result.
 *
 * Inline SVG plus CSS keyframes in the site tokens; no dependency. Loops
 * every 9s; every card holds a readable base state, so a still capture is
 * complete. Under prefers-reduced-motion the base state renders static.
 */
export default function SameAgentTwice() {
  return (
    <figure
      className="mt-12 max-w-3xl"
      aria-label="Diagram: an ad-hoc attempt and a skilled workflow run the same task with different cost and outcome"
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
      <svg className="sat w-full h-auto" viewBox="0 0 760 430" role="img">
        {/* lane one: ad-hoc, frontier model for everything */}
        <rect x="8" y="16" width="210" height="132" rx="12" fill="currentColor" fillOpacity=".05" className="text-ink" />
        <text x="26" y="46" fontSize="14" fill="currentColor" className="text-charcoal">Paste CSV, type a prompt,</text>
        <text x="26" y="68" fontSize="14" fill="currentColor" className="text-charcoal">retry it five times.</text>
        <text x="26" y="94" fontSize="12" fill="currentColor" className="mono text-muted-foreground">ad-hoc, unlogged</text>
        <text x="26" y="114" fontSize="12" fill="currentColor" className="mono text-muted-foreground">no trigger, no recipe</text>
        <path d="M226 82 H300" stroke="currentColor" strokeOpacity=".45" strokeWidth="1.5" strokeDasharray="74" className="d1 text-ink" fill="none" />
        <rect x="308" y="28" width="112" height="108" rx="10" fill="currentColor" fillOpacity=".1" className="text-ink" />
        <text x="364" y="54" fontSize="13" textAnchor="middle" fill="currentColor" className="text-ink">frontier only</text>
        <text x="364" y="74" fontSize="12" textAnchor="middle" fill="currentColor" className="mono text-muted-foreground">full price</text>
        <text x="364" y="94" fontSize="12" textAnchor="middle" fill="currentColor" className="mono text-muted-foreground">retry x5</text>
        <text x="364" y="114" fontSize="12" textAnchor="middle" fill="currentColor" className="mono text-muted-foreground">no route</text>
        <path d="M428 82 H500" stroke="currentColor" strokeOpacity=".45" strokeWidth="1.5" strokeDasharray="74" className="d1 text-ink" fill="none" />
        <rect x="508" y="10" width="244" height="144" rx="12" fill="currentColor" fillOpacity=".05" className="text-ink" />
        <text x="526" y="40" fontSize="14" fill="currentColor" className="text-charcoal">Looks fine, no major risks</text>
        <g className="g1">
          <rect x="526" y="52" width="208" height="20" rx="5" fill="currentColor" fillOpacity=".1" className="text-hp-electric" />
          <text x="534" y="66" fontSize="12.5" fill="currentColor" className="text-hp-electric">two falls missed, again</text>
        </g>
        <text x="526" y="102" fontSize="12" fill="currentColor" className="mono text-muted-foreground">$0.42, 45 min, varies</text>
        <rect x="526" y="110" width="208" height="8" rx="4" fill="currentColor" fillOpacity=".12" className="text-ink" />
        <rect x="526" y="110" width="188" height="8" rx="4" fill="currentColor" className="text-ink" fillOpacity=".55" />

        {/* lane two: skilled, route then plan once then cheap runs */}
        <rect x="8" y="216" width="210" height="132" rx="12" fill="currentColor" fillOpacity=".05" className="text-ink" />
        <text x="26" y="246" fontSize="14" fill="currentColor" className="text-charcoal">CSV lands, trigger fires.</text>
        <text x="26" y="268" fontSize="14" fill="currentColor" className="text-charcoal">Saved recipe runs it.</text>
        <text x="26" y="294" fontSize="12" fill="currentColor" className="mono text-muted-foreground">scheduled, logged</text>
        <text x="26" y="314" fontSize="12" fill="currentColor" className="mono text-muted-foreground">same each run</text>
        <path d="M226 282 H300" stroke="currentColor" strokeOpacity=".45" strokeWidth="1.5" strokeDasharray="74" className="d2 text-ink" fill="none" />
        <rect x="308" y="208" width="112" height="148" rx="10" fill="currentColor" fillOpacity=".1" className="text-ink" />
        <text x="364" y="234" fontSize="12" textAnchor="middle" fill="currentColor" className="text-ink">router sorts it</text>
        <text x="364" y="252" fontSize="11" textAnchor="middle" fill="currentColor" className="mono text-muted-foreground">cheap check</text>
        <text x="364" y="278" fontSize="12" textAnchor="middle" fill="currentColor" className="text-ink">thinker plans</text>
        <text x="364" y="296" fontSize="11" textAnchor="middle" fill="currentColor" className="mono text-muted-foreground">once, then saved</text>
        <text x="364" y="322" fontSize="12" textAnchor="middle" fill="currentColor" className="text-ink">workers run</text>
        <text x="364" y="340" fontSize="11" textAnchor="middle" fill="currentColor" className="mono text-muted-foreground">cheap models</text>
        <path d="M428 282 H500" stroke="currentColor" strokeOpacity=".45" strokeWidth="1.5" strokeDasharray="74" className="d2 text-ink" fill="none" />
        <rect x="508" y="210" width="244" height="144" rx="12" fill="currentColor" fillOpacity=".05" className="text-ink" />
        <text x="526" y="240" fontSize="14" fill="currentColor" className="text-charcoal">Q3 summary, risks ranked</text>
        <g className="h2">
          <rect x="526" y="252" width="208" height="20" rx="5" fill="currentColor" fillOpacity=".16" className="text-hp-electric" />
          <text x="534" y="266" fontSize="12.5" fill="currentColor" className="text-hp-electric">1. Meridian Foods, down 38%</text>
          <rect x="526" y="276" width="208" height="20" rx="5" fill="currentColor" fillOpacity=".16" className="text-hp-electric" />
          <text x="534" y="290" fontSize="12.5" fill="currentColor" className="text-hp-electric">2. Halcyon Retail, down 31%</text>
        </g>
        <text x="526" y="322" fontSize="12" fill="currentColor" className="mono text-muted-foreground">$0.05, 4 min, repeats</text>
        <rect x="526" y="330" width="208" height="8" rx="4" fill="currentColor" fillOpacity=".12" className="text-ink" />
        <rect x="526" y="330" width="26" height="8" rx="4" fill="currentColor" className="text-hp-electric" />

        <text x="8" y="410" fontSize="17" fontWeight="500" fill="currentColor" className="nt text-ink">
          Same task. Same data. Skill sets cost, proof and repeat runs.
        </text>
      </svg>
      <figcaption className="mt-4 text-sm text-muted-foreground">
        Costs show the pattern, not a quote. Frontier retries cost more
        and drift. A cheap router, one strong plan and a saved recipe
        repeat at low cost. Names changed.
      </figcaption>
    </figure>
  );
}
