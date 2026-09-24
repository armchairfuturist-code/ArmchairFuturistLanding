import { describe, expect, it } from "vitest";
import { getHomepageSections, getNavigatorItems, SECTION_IDS } from "../homepage-sections";

describe("homepage composition data", () => {
  it("keeps the approved order and excludes the non-homepage entry", () => {
    expect(getHomepageSections().map(({ id }) => id)).toEqual([
      SECTION_IDS.hero,
      SECTION_IDS.whatIsNot,
      SECTION_IDS.assessment,
      SECTION_IDS.caseStudies,
      SECTION_IDS.community,
      SECTION_IDS.roi,
      SECTION_IDS.services,
      SECTION_IDS.about,
      SECTION_IDS.mentoring,
      SECTION_IDS.speaking,
      SECTION_IDS.faq,
      SECTION_IDS.connect,
    ]);
  });

  it("projects navigation from the same records", () => {
    const sections = getHomepageSections();
    const navigable = getNavigatorItems();
    expect(navigable.some(({ id }) => id === SECTION_IDS.hero)).toBe(false);
    expect(navigable.some(({ id }) => id === SECTION_IDS.roi)).toBe(false);
    expect(navigable.map(({ id }) => id)).toEqual(
      sections.filter((section) => section.navigable !== false).map(({ id }) => id),
    );
  });
});
