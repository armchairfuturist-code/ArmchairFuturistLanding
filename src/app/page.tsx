import { OrganismHero } from "@/components/organism/OrganismHero";
import SectionNavigator from "@/components/ui/SectionNavigator";
import { getHomepageSections } from "@/lib/section-registry";

export default function Home() {
  const sections = getHomepageSections();

  return (
    <div className="flex flex-col snap-sections">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:rounded-lg focus:bg-foreground focus:px-4 focus:py-2 focus:text-background">
        Skip to content
      </a>
      <main id="main-content">
        {sections.map(({ id, component: Component }) => (
          id === "hero" ? <OrganismHero key={id} /> : <div key={id} id={id} className="scroll-mt-20"><Component /></div>
        ))}
      </main>
      <SectionNavigator />
    </div>
  );
}
