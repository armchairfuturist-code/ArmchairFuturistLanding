import { getHomepageSections } from '@/lib/section-registry';
import SectionNavigator from '@/components/ui/SectionNavigator';

export default function HomePage() {
  const sections = getHomepageSections();

  return (
    <div className="flex flex-col">
      {sections.map((entry) => {
        const Component = entry.component;
        return <Component key={entry.id} />;
      })}
      {/* SECTION NAVIGATOR — floating dot nav for long page */}
      <SectionNavigator />
    </div>
  );
}
