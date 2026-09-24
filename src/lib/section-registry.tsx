/** @deprecated Import from homepage-sections; kept as a narrow compatibility seam. */
export {
  SECTION_IDS,
  getSections,
  getHomepageSections,
  getNavigatorItems,
} from "@/lib/homepage-sections";
export type { HomepageSection } from "@/lib/homepage-sections";
/** @deprecated Use HomepageSection. */
export type SectionEntry = import("@/lib/homepage-sections").HomepageSection;
