// Utility: Detect currency code by locale or country
// (Basic version, can be expanded with full mapping)

const localeToCurrency = {
  'en-US': 'USD',
  'en-GB': 'GBP',
  'en-IN': 'INR',
  'fr-FR': 'EUR',
  'de-DE': 'EUR',
  'ja-JP': 'JPY',
  // ...add more as needed
};

const countryToCurrency = {
  US: 'USD',
  GB: 'GBP',
  IN: 'INR',
  FR: 'EUR',
  DE: 'EUR',
  JP: 'JPY',
  // ...add more as needed
};

/**
 * Detect currency code by locale string (e.g., 'en-US')
 */
export function detectCurrencyByLocale(locale) {
  return localeToCurrency[locale] || null;
}

/**
 * Detect currency code by country code (e.g., 'US')
 */
export function detectCurrencyByCountry(countryCode) {
  return countryToCurrency[countryCode] || null;
}
