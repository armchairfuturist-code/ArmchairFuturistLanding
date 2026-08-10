import { describe, it, expect } from 'vitest';
import {
  COACHING_PACKAGES,
  resolvePricing,
  resolveDefaultCurrency,
  EURO_COUNTRIES,
} from '@/lib/pricing';

const single = COACHING_PACKAGES.find((p) => p.id === 'single')!;

describe('resolvePricing', () => {
  it('selects the EUR fields when currency is EUR', () => {
    const view = resolvePricing(single, 'EUR');
    expect(view).toEqual({
      total: single.totalPrice,
      perSession: single.pricePerSession,
      savings: single.savings,
    });
  });

  it('selects the USD fields when currency is USD', () => {
    const view = resolvePricing(single, 'USD');
    expect(view).toEqual({
      total: single.totalPriceUSD,
      perSession: single.pricePerSessionUSD,
      savings: single.savingsUSD,
    });
  });

  it('keeps the two currencies distinct (the bug it exists to prevent)', () => {
    const eur = resolvePricing(single, 'EUR');
    const usd = resolvePricing(single, 'USD');
    expect(eur.total).toBe(single.totalPrice);
    expect(usd.total).toBe(single.totalPriceUSD);
    expect(eur.total).not.toBe(usd.total);
  });
});

describe('resolveDefaultCurrency', () => {
  it('returns a stored EUR preference unchanged', () => {
    expect(resolveDefaultCurrency('en-US', 'EUR')).toBe('EUR');
  });

  it('returns a stored USD preference unchanged', () => {
    expect(resolveDefaultCurrency('de-DE', 'USD')).toBe('USD');
  });

  it('defaults a euro-region locale to EUR when nothing is stored', () => {
    expect(resolveDefaultCurrency('de-DE', null)).toBe('EUR');
  });

  it('handles underscore locales the same as hyphen locales', () => {
    expect(resolveDefaultCurrency('fr_FR', null)).toBe('EUR');
  });

  it('defaults a non-euro locale to USD', () => {
    expect(resolveDefaultCurrency('en-GB', null)).toBe('USD');
  });

  it('falls back to the locale when the stored value is not a currency', () => {
    expect(resolveDefaultCurrency('it-IT', 'banana')).toBe('EUR');
    expect(resolveDefaultCurrency('en-US', 'banana')).toBe('USD');
  });

  it('falls back to USD when there is no locale and no stored value', () => {
    expect(resolveDefaultCurrency(undefined, null)).toBe('USD');
    expect(resolveDefaultCurrency('', '')).toBe('USD');
  });

  it('covers the documented eurozone', () => {
    for (const region of EURO_COUNTRIES) {
      expect(resolveDefaultCurrency(`xx-${region}`, null)).toBe('EUR');
    }
  });
});
