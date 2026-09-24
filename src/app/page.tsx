import { HomepageComposition } from "@/components/homepage/HomepageComposition";
import SectionNavigator from "@/components/ui/SectionNavigator";

export default function Home() {
  return (
    <div className="flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:rounded-lg focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
      >
        Skip to content
      </a>

      <main id="main-content">
        <HomepageComposition />
      </main>

      <SectionNavigator />
    </div>
  );
}