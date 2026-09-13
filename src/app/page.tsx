import Link from "next/link";
import { OrganismHero } from "@/components/organism/OrganismHero";
import SectionNavigator from "@/components/ui/SectionNavigator";
import { BookCallButton } from "@/components/ui/BookCallButton";
import { getHomepageSections } from "@/lib/section-registry";
import { WHATSAPP_URL } from "@/lib/constants";

export default function Home() {
  const sections = getHomepageSections();

  return (
    <div className="flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:rounded-lg focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
      >
        Skip to content
      </a>

      <main id="main-content">
        {sections.map(({ id, component: Component }) =>
          id === "hero" ? (
            <OrganismHero key={id} />
          ) : (
            <div key={id} id={id} className="scroll-mt-20">
              <Component />
            </div>
          )
        )}
      </main>

      <SectionNavigator />

      {/* Mobile — fixed bottom CTA bar for thumb-zone access */}
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden border-t border-ink/10 bg-ink text-white shadow-lg">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between gap-2">
          <Link
            href="/assessment"
            className="inline-flex items-center justify-center h-12 px-4 text-xs font-semibold uppercase tracking-[0.7px] text-white/80 hover:text-hp-bright transition-colors shrink-0"
          >
            Free Assessment
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-3 text-white/70 hover:text-hp-bright transition-colors"
            aria-label="WhatsApp"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#25D366" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
          <BookCallButton
            location="mobile_bottom_bar"
            size="default"
            variant="default"
            className="bg-hp-electric text-white hover:bg-hp-bright h-12 px-5 text-xs font-semibold uppercase tracking-[0.7px] shrink-0"
            icon="calendar-days"
            iconClassName="mr-1.5 h-4 w-4"
          >
            Book a Call
          </BookCallButton>
        </div>
      </div>

      {/* Bottom padding guard so content doesn't hide behind the fixed bar */}
      <div className="lg:hidden h-[72px]" aria-hidden="true" />
    </div>
  );
}