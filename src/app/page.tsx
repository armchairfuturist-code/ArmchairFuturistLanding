import { getHomepageSections } from '@/lib/section-registry';
import SectionNavigator from '@/components/ui/SectionNavigator';

/**
 * Homepage — wrapped sections use content-visibility for scroll perf,
 * plus progressive scroll-driven reveal via CSS animation-timeline.
 */
export default function HomePage() {
  const sections = getHomepageSections();

  return (
    <div className="flex flex-col">
      {sections.map((entry, idx) => {
        const Component = entry.component;
        const isHero = entry.id === 'hero';
        return (
          <div
            key={entry.id}
            id={entry.id}
            className={isHero ? undefined : 'section-cv'}
          >
            <Component />
          </div>
        );
      })}
      {/* SECTION NAVIGATOR — floating dot nav for long page */}
      <SectionNavigator />
    </div>
  );
}
