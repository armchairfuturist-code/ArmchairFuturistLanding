"use client";

import { CurrencyCode } from '@/lib/constants';
import { Euro, DollarSign } from 'lucide-react';

interface CurrencyToggleProps {
  currency: CurrencyCode;
  onChange: (currency: CurrencyCode) => void;
}

export default function CurrencyToggle({ currency, onChange }: CurrencyToggleProps) {
  return (
    <div className="inline-flex items-center gap-1.5 bg-muted rounded-lg p-0.5 border border-border">
      <button
        onClick={() => onChange('EUR')}
        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
          currency === 'EUR'
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        aria-label="Show prices in Euros"
      >
        <Euro className="h-3 w-3" />
        EUR
      </button>
      <button
        onClick={() => onChange('USD')}
        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
          currency === 'USD'
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        aria-label="Show prices in US Dollars"
      >
        <DollarSign className="h-3 w-3" />
        USD
      </button>
    </div>
  );
}
