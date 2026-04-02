/**
 * Tamkinly Currency Configuration
 * =================================
 * This file contains all currency configurations for multi-currency support.
 * Currently using USD only (Wise integration), will expand with new payment gateway.
 */

export interface CurrencyConfig {
  code: string;
  symbol: string;
  name: string;
  nameAr: string;
  exchangeRate: number; // Base: USD
  symbolPosition: 'before' | 'after';
  decimalSeparator: '.' | ',';
  thousandsSeparator: ',' | '.' | ' ';
  decimalPlaces: number;
  enabled: boolean;
  regions: string[];
}

export const CURRENCIES: Record<string, CurrencyConfig> = {
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    nameAr: 'دولار أمريكي',
    exchangeRate: 1,
    symbolPosition: 'before',
    decimalSeparator: '.',
    thousandsSeparator: ',',
    decimalPlaces: 2,
    enabled: true, // Currently active (Wise)
    regions: ['US', 'Global'],
  },
  SAR: {
    code: 'SAR',
    symbol: 'ر.س',
    name: 'Saudi Riyal',
    nameAr: 'ريال سعودي',
    exchangeRate: 3.75,
    symbolPosition: 'after',
    decimalSeparator: '.',
    thousandsSeparator: ',',
    decimalPlaces: 2,
    enabled: false, // Enable with new payment gateway
    regions: ['SA', 'GCC'],
  },
  AED: {
    code: 'AED',
    symbol: 'د.إ',
    name: 'UAE Dirham',
    nameAr: 'درهم إماراتي',
    exchangeRate: 3.67,
    symbolPosition: 'after',
    decimalSeparator: '.',
    thousandsSeparator: ',',
    decimalPlaces: 2,
    enabled: false,
    regions: ['AE', 'GCC'],
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    nameAr: 'يورو',
    exchangeRate: 0.92,
    symbolPosition: 'before',
    decimalSeparator: ',',
    thousandsSeparator: '.',
    decimalPlaces: 2,
    enabled: false,
    regions: ['EU'],
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    nameAr: 'جنيه إسترليني',
    exchangeRate: 0.79,
    symbolPosition: 'before',
    decimalSeparator: '.',
    thousandsSeparator: ',',
    decimalPlaces: 2,
    enabled: false,
    regions: ['UK'],
  },
  EGP: {
    code: 'EGP',
    symbol: 'ج.م',
    name: 'Egyptian Pound',
    nameAr: 'جنيه مصري',
    exchangeRate: 30.90,
    symbolPosition: 'after',
    decimalSeparator: '.',
    thousandsSeparator: ',',
    decimalPlaces: 2,
    enabled: false,
    regions: ['EG'],
  },
  KWD: {
    code: 'KWD',
    symbol: 'د.ك',
    name: 'Kuwaiti Dinar',
    nameAr: 'دينار كويتي',
    exchangeRate: 0.31,
    symbolPosition: 'after',
    decimalSeparator: '.',
    thousandsSeparator: ',',
    decimalPlaces: 3,
    enabled: false,
    regions: ['KW', 'GCC'],
  },
  QAR: {
    code: 'QAR',
    symbol: 'ر.ق',
    name: 'Qatari Riyal',
    nameAr: 'ريال قطري',
    exchangeRate: 3.64,
    symbolPosition: 'after',
    decimalSeparator: '.',
    thousandsSeparator: ',',
    decimalPlaces: 2,
    enabled: false,
    regions: ['QA', 'GCC'],
  },
  BHD: {
    code: 'BHD',
    symbol: 'د.ب',
    name: 'Bahraini Dinar',
    nameAr: 'دينار بحريني',
    exchangeRate: 0.38,
    symbolPosition: 'after',
    decimalSeparator: '.',
    thousandsSeparator: ',',
    decimalPlaces: 3,
    enabled: false,
    regions: ['BH', 'GCC'],
  },
  OMR: {
    code: 'OMR',
    symbol: 'ر.ع',
    name: 'Omani Rial',
    nameAr: 'ريال عماني',
    exchangeRate: 0.38,
    symbolPosition: 'after',
    decimalSeparator: '.',
    thousandsSeparator: ',',
    decimalPlaces: 3,
    enabled: false,
    regions: ['OM', 'GCC'],
  },
};

/**
 * Product pricing in base currency (USD)
 */
export const PRODUCT_PRICES_USD = {
  TRIAL: 7,
  PLANNER: 17,
  PREMIUM: 27,
  BUNDLE: 47,
} as const;

/**
 * Convert price from USD to target currency
 */
export function convertPrice(
  priceUSD: number,
  targetCurrency: string
): number {
  const currency = CURRENCIES[targetCurrency];
  if (!currency || !currency.enabled) {
    return priceUSD;
  }
  return Number((priceUSD * currency.exchangeRate).toFixed(currency.decimalPlaces));
}

/**
 * Format price with currency symbol
 */
export function formatPrice(
  amount: number,
  currencyCode: string = 'USD',
  locale: string = 'en'
): string {
  const currency = CURRENCIES[currencyCode] || CURRENCIES.USD;

  const formattedAmount = amount.toLocaleString(
    locale === 'ar' ? 'ar-SA' : 'en-US',
    {
      minimumFractionDigits: currency.decimalPlaces,
      maximumFractionDigits: currency.decimalPlaces,
    }
  );

  if (currency.symbolPosition === 'before') {
    return `${currency.symbol}${formattedAmount}`;
  }
  return `${formattedAmount} ${currency.symbol}`;
}

/**
 * Get enabled currencies for display
 */
export function getEnabledCurrencies(): CurrencyConfig[] {
  return Object.values(CURRENCIES).filter((c) => c.enabled);
}

/**
 * Get currency by region
 */
export function getCurrencyByRegion(regionCode: string): CurrencyConfig {
  const currency = Object.values(CURRENCIES).find(
    (c) => c.enabled && c.regions.includes(regionCode)
  );
  return currency || CURRENCIES.USD;
}

/**
 * Exchange rates last updated date
 */
export const EXCHANGE_RATES_UPDATED = '2025-01-15';

/**
 * Note: In production, exchange rates should be fetched from an API
 * Recommended APIs:
 * - exchangerate-api.com
 * - openexchangerates.org
 * - currencyapi.com
 */
