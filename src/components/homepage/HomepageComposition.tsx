import { OrganismHero } from "@/components/organism/OrganismHero";
import { getHomepageSections, SECTION_IDS } from "@/lib/homepage-sections";

/** The single homepage composition seam: ordered sections and wrapper policy. */
export function HomepageComposition() {
  return (
    <>
      {getHomepageSections().map((section) => {
        if (section.id === SECTION_IDS.hero) {
          return <OrganismHero key={section.id} />;
        }
        if (!section.component) return null;
        const Component = section.component;
        return (
          <div key={section.id} id={section.id} className="scroll-mt-20">
            <Component />
          </div>
        );
      })}
    </>
  );
}
