import { getHomepageSections } from '@/lib/section-registry';
import SectionNavigator from '@/components/ui/SectionNavigator';

/**
 * Homepage with CSS scroll-snap (y proximity).
 * Sections snap to top of viewport with 64px header offset.
 */
export default function HomePage() {
  const sections = getHomepageSections();

  return (
    <div className="flex flex-col snap-sections">
      {sections.map((entry) => {
        const Component = entry.component;
        return (
          <div key={entry.id} id={entry.id} className="snap-start-header">
            <Component />
          </div>
        );
      })}
      {/* SECTION NAVIGATOR — floating dot nav for long page */}
      <SectionNavigator />
    </div>
  );
}
