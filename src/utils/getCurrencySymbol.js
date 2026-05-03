import { currencySymbols } from '../data/currency-symbols';

/**
 * Returns the currency symbol for a given currency code.
 * @param {string} code - The ISO 4217 currency code (e.g., 'USD', 'EUR')
 * @returns {string} The currency symbol
 */
export function getCurrencySymbol(code) {
  return currencySymbols[code] || code;
}
