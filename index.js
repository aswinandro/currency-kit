// Entry point for currency-kit
import { currencySymbols } from './currency-symbols.js';

/**
 * getCurrencySymbol
 * Returns the currency symbol for a given currency code.
 * @param {string} code - The ISO 4217 currency code (e.g., 'USD', 'EUR')
 * @returns {string} The currency symbol
 */
export function getCurrencySymbol(code) {
  return currencySymbols[code] || code;
}

// More features and React Native components will be added here.
