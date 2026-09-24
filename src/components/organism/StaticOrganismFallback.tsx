export function StaticOrganismFallback({ visible }: { visible: boolean }) {
  return (
    <svg
      className={"organism-fallback" + (visible ? " is-visible" : "")}
      viewBox="0 0 1000 600"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="fb-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--org-warm)" stopOpacity="0.35" />
          <stop offset="50%" stopColor="var(--org-warm)" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id="fb-blue" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--org-blue)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--org-blue)" stopOpacity="0.03" />
        </linearGradient>
      </defs>
      <ellipse cx="500" cy="240" rx="480" ry="200" fill="url(#fb-grad)" />
      <path
        d="M80 420 C210 380 310 480 460 408 S680 348 920 260"
        fill="none"
        stroke="var(--org-warm)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeOpacity="0.55"
      />
      <path
        d="M180 340 C310 328 400 368 530 300 S700 240 840 200"
        fill="none"
        stroke="var(--org-blue)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeOpacity="0.40"
      />
      <circle cx="220" cy="280" r="2.5" fill="var(--org-warm)" opacity="0.35" />
      <circle cx="340" cy="220" r="1.8" fill="var(--org-warm)" opacity="0.30" />
      <circle cx="580" cy="260" r="2" fill="var(--org-blue)" opacity="0.28" />
      <circle cx="720" cy="300" r="3" fill="var(--org-warm)" opacity="0.25" />
      <circle cx="860" cy="180" r="1.5" fill="var(--org-blue)" opacity="0.30" />
      <circle cx="140" cy="360" r="1.8" fill="var(--org-blue)" opacity="0.20" />
      <circle cx="450" cy="340" r="2.2" fill="var(--org-warm)" opacity="0.30" />
      <circle cx="630" cy="200" r="1.5" fill="var(--org-warm)" opacity="0.25" />
      <circle cx="780" cy="240" r="2.8" fill="var(--org-blue)" opacity="0.20" />
    </svg>
  );
}
