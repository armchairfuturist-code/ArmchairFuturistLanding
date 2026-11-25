import { HomepageComposition } from "@/components/homepage/HomepageComposition";
import SectionNavigator from "@/components/ui/SectionNavigator";

export default function Home() {
  return (
    <div className="flex flex-col">
      <main id="main-content">
        <HomepageComposition />
      </main>

      <SectionNavigator />
    </div>
  );
}