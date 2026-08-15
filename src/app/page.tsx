import { OrganismHero } from "@/components/organism/OrganismHero";
import SectionNavigator from "@/components/ui/SectionNavigator";
import { getHomepageSections } from "@/lib/section-registry";

export default function Home() {
  const sections = getHomepageSections();

  return (
    <div className="flex flex-col snap-sections">
      {sections.map(({ id, component: Component }) => (
        id === "hero" ? <OrganismHero key={id} /> : <div key={id} id={id} className="snap-start-header"><Component /></div>
      ))}
      <SectionNavigator />
    </div>
  );
}
