'use client';

import { useEffect, useState } from 'react';
import { resolveDefaultCurrency, type CurrencyCode } from '@/lib/pricing';

const STORAGE_KEY = 'af_currency';

export type SetCurrency = (currency: CurrencyCode) => void;

/**
 * Preferred display currency: a stored preference, the visitor's locale
 * region, then USD. The pure rule lives in {@link resolveDefaultCurrency};
 * this hook only owns the `localStorage` side-effect.
 */
export function usePreferredCurrency(): readonly [CurrencyCode, SetCurrency] {
  const [currency, setCurrency] = useState<CurrencyCode>('USD');

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      // private mode / disabled storage — fall back to locale detection
    }
    setCurrency(resolveDefaultCurrency(navigator.language, stored));
  }, []);

  const setPreferredCurrency: SetCurrency = (next) => {
    setCurrency(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore — preference simply won't persist
    }
  };

  return [currency, setPreferredCurrency] as const;
}
