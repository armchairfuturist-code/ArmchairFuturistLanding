"use client";

import { DollarSign, Euro } from "lucide-react";
import type { CurrencyCode } from "@/lib/pricing";

export function CurrencyToggle({
  currency,
  onChange,
}: {
  currency: CurrencyCode;
  onChange: (currency: CurrencyCode) => void;
}) {
  return (
    <div className="inline-flex items-center gap-1 bg-canvas border border-ink/15 p-1 self-start md:self-auto">
      <button
        type="button"
        onClick={() => onChange("USD")}
        className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold transition-colors ${
          currency === "USD" ? "bg-hp-electric text-white" : "text-charcoal hover:text-ink"
        }`}
        aria-pressed={currency === "USD"}
        aria-label="Show prices in US Dollars"
      >
        <DollarSign className="h-4 w-4" aria-hidden="true" />
        USD
      </button>
      <button
        type="button"
        onClick={() => onChange("EUR")}
        className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold transition-colors ${
          currency === "EUR" ? "bg-hp-electric text-white" : "text-charcoal hover:text-ink"
        }`}
        aria-pressed={currency === "EUR"}
        aria-label="Show prices in Euros"
      >
        <Euro className="h-4 w-4" aria-hidden="true" />
        EUR
      </button>
    </div>
  );
}
