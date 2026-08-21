'use client';

import { useCallback, useEffect, useState } from 'react';
import { resolveDefaultCurrency, type CurrencyCode } from '@/lib/pricing';

const STORAGE_KEY = 'af_currency';
const SYNC_EVENT = 'af-currency-change';

export type SetCurrency = (currency: CurrencyCode) => void;

function readStoredCurrency(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    // private mode / disabled storage — fall back to locale detection
    return null;
  }
}

/**
 * Preferred display currency: a stored preference, the visitor's locale
 * region, then USD. The pure rule lives in {@link resolveDefaultCurrency};
 * this hook owns the localStorage side-effect.
 *
 * Every instance on the page stays in sync: a toggle in one section
 * updates all sections through the af-currency-change event.
 */
export function usePreferredCurrency(): readonly [CurrencyCode, SetCurrency] {
  const [currency, setCurrency] = useState<CurrencyCode>('USD');

  useEffect(() => {
    setCurrency(resolveDefaultCurrency(navigator.language, readStoredCurrency()));

    const sync = (event: Event) => {
      const detail = (event as CustomEvent<CurrencyCode>).detail;
      if (detail) setCurrency(detail);
    };
    window.addEventListener(SYNC_EVENT, sync);
    // Another tab changed the preference.
    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY && event.newValue) {
        setCurrency(resolveDefaultCurrency(navigator.language, event.newValue));
      }
    };
    window.addEventListener('storage', onStorage);

    return () => {
      window.removeEventListener(SYNC_EVENT, sync);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const setPreferredCurrency: SetCurrency = useCallback((next) => {
    setCurrency(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore — preference simply won't persist
    }
    window.dispatchEvent(new CustomEvent<CurrencyCode>(SYNC_EVENT, { detail: next }));
  }, []);

  return [currency, setPreferredCurrency] as const;
}
