import { getHomepageSections } from '@/lib/section-registry';
import SectionNavigator from '@/components/ui/SectionNavigator';
import { ChevronDivider } from '@/components/ui/ChevronDivider';

export default function HomePage() {
  const sections = getHomepageSections();

  return (
    <div className="flex flex-col">
      {sections.map((entry, index) => {
        const Component = entry.component;
        return (
          <div key={entry.id}>
            {index > 0 && <ChevronDivider />}
            <Component />
          </div>
        );
      })}

      {/* SECTION NAVIGATOR — floating dot nav for long page */}
      <SectionNavigator />
    </div>
  );
}
