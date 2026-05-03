// Utility: Get user locale without permissions (browser/React Native)
// Falls back to 'en-US' if not available

export function getUserLocale() {
  if (typeof navigator !== 'undefined' && navigator.language) {
    return navigator.language;
  }
  if (typeof Intl !== 'undefined' && Intl.DateTimeFormat) {
    const locale = Intl.DateTimeFormat().resolvedOptions().locale;
    if (locale) return locale;
  }
  // React Native: try to use native modules if available
  if (typeof global !== 'undefined' && global.Intl && global.Intl.DateTimeFormat) {
    const locale = global.Intl.DateTimeFormat().resolvedOptions().locale;
    if (locale) return locale;
  }
  return 'en-US';
}
