import { getUserLocale } from '../utils/getUserLocale';
import { detectCurrencyByLocale } from '../utils/detectCurrencyByLocale';
import { getCurrencySymbol } from '../utils/getCurrencySymbol';

/**
 * Returns the user's local currency symbol (auto-detected, no permissions required)
 * Falls back to USD if detection fails
 */
export function getUserCurrencySymbol() {
  const locale = getUserLocale();
  let code = detectCurrencyByLocale(locale);
  if (!code && locale.includes('-')) {
    // Try just the country part
    code = detectCurrencyByLocale(locale.split('-')[1]);
  }
  if (!code) code = 'USD';
  return getCurrencySymbol(code);
}
