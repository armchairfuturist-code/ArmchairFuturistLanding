/**
 * Lightweight loading placeholder used by next/dynamic for below-the-fold
 * sections. Renders an accessible, animated pulse block sized to a typical
 * section. Keeps CLS predictable while the chunk loads.
 */
export default function SectionSkeleton({
  minHeight = "min-h-[420px]",
  label = "Loading section",
}: {
  minHeight?: string;
  label?: string;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={label}
      className={`w-full ${minHeight} bg-hp-base/30 animate-pulse`}
    >
      <span className="sr-only">{label}…</span>
    </div>
  );
}
