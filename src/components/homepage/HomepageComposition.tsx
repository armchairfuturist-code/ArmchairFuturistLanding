import { OrganismHero } from "@/components/organism/OrganismHero";
import SubstackSection from "@/components/sections/SubstackSection";
import { getHomepageSections, SECTION_IDS } from "@/lib/homepage-sections";
import { fetchSubstackPosts } from "@/lib/substack-feed";

/** The single homepage composition seam: ordered sections and wrapper policy. */
export async function HomepageComposition() {
  // Server-rendered so the newsletter's recent issues are in the HTML.
  const posts = await fetchSubstackPosts(3);

  return (
    <>
      {getHomepageSections().map((section) => {
        if (section.id === SECTION_IDS.hero) {
          return <OrganismHero key={section.id} />;
        }
        if (section.id === SECTION_IDS.substack) {
          return (
            <div
              key={section.id}
              id={section.id}
              className="scroll-mt-20 homepage-section"
            >
              <SubstackSection initialPosts={posts} />
            </div>
          );
        }
        if (!section.component) return null;
        const Component = section.component;
        return (
          <div
            key={section.id}
            id={section.id}
            className="scroll-mt-20 homepage-section"
          >
            <Component />
          </div>
        );
      })}
    </>
  );
}
