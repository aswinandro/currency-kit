/**
 * CurrencyAmount React Native component
 * @param {object} props
 * @param {string} props.code - ISO 4217 currency code
 * @param {number|string} props.amount - The amount to display
 * @param {string} [props.symbolPosition='before'] - 'before' or 'after'
 * @param {boolean} [props.rtl] - If true, use RTL order
 * @param {object} [props.symbolProps] - Props to pass to CurrencySymbol
 * @param {object} [props.amountProps] - Props to pass to amount <Text>
 */
export function CurrencyAmount({ code, amount, symbolPosition = 'before', rtl, symbolProps = {}, amountProps = {} }) {
  // Get symbol (string or SVG)
  const symbol = <CurrencySymbol code={code} {...symbolProps} />;
  const amt = <Text {...amountProps}>{amount}</Text>;
  let children;
  if (rtl) {
    // RTL: amount then symbol (if after), or symbol then amount (if before)
    children = symbolPosition === 'after' ? [amt, symbol] : [symbol, amt];
  } else {
    // LTR: symbol then amount (if before), or amount then symbol (if after)
    children = symbolPosition === 'before' ? [symbol, amt] : [amt, symbol];
  }
  return <View style={{ flexDirection: 'row', alignItems: 'center' }}>{children}</View>;
}
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


// --- React Native CurrencySymbol Component ---
// Usage: <CurrencySymbol code="USD" size={32} color="#2196f3" gradient={["#2196f3", "#21cbf3"]} />
import React from 'react';
import { SvgXml } from 'react-native-svg';

/**
 * CurrencySymbol React Native component
 * @param {object} props
 * @param {string} props.code - ISO 4217 currency code
 * @param {number} [props.size=32] - Icon size in px
 * @param {string} [props.color] - Fill color (overrides SVG)
 * @param {string[]} [props.gradient] - (DEPRECATED) Array of colors for linear gradient fill
 * @param {string} [props.gradientType] - 'linear' (default) or 'radial'
 * @param {Array<{color: string, offset?: string}>} [props.gradientColors] - Array of color stops for gradient
 * @param {object} [props.gradientProps] - Extra props for gradient (direction, angle, center, radius)
 */
export function CurrencySymbol({ code, size = 32, color, gradient, gradientType = "linear", gradientColors, gradientProps = {} }) {
  const svgMap = {
    USD: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><text x="4" y="26" font-size="28" font-family="Arial">$</text></svg>`,
    EUR: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><text x="2" y="26" font-size="28" font-family="Arial">€</text></svg>`,
    INR: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><text x="2" y="26" font-size="28" font-family="Arial">₹</text></svg>`,
    GBP: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><text x="2" y="26" font-size="28" font-family="Arial">£</text></svg>`,
    // ...add all SVGs or import from svgs folder
  };
  let svg = svgMap[code] || svgMap.USD;

  // Color override (if no gradient)
  if (color && !gradient && !gradientColors) {
    svg = svg.replace(/fill="[^"]*"/g, `fill="${color}"`).replace(/<text /, `<text fill="${color}" `);
  }

  // Gradient support (linear/radial, multiple stops)
  let gradStops = null;
  let gradId = null;
  let gradDef = null;
  let useGradient = false;
  // Backward compatibility: if gradient (array of colors) is provided, convert to stops
  let stopsArr = null;
  if (gradient && Array.isArray(gradient) && gradient.length > 1) {
    stopsArr = gradient.map((c, i) => ({ color: c, offset: `${(i/(gradient.length-1))*100}%` }));
    useGradient = true;
  } else if (gradientColors && Array.isArray(gradientColors) && gradientColors.length > 1) {
    stopsArr = gradientColors.map((s, i) => ({ color: s.color || s, offset: s.offset || `${(i/(gradientColors.length-1))*100}%` }));
    useGradient = true;
  }
  if (useGradient && stopsArr) {
    gradId = `grad${Math.random().toString(36).slice(2, 10)}`;
    gradStops = stopsArr.map(s => `<stop offset=\"${s.offset}\" stop-color=\"${s.color}\" />`).join('');
    if (gradientType === "radial") {
      // Radial gradient: cx, cy, r, fx, fy from gradientProps
      const { cx = "50%", cy = "50%", r = "50%", fx, fy } = gradientProps;
      gradDef = `<radialGradient id=\"${gradId}\" cx=\"${cx}\" cy=\"${cy}\" r=\"${r}\"${fx ? ` fx=\"${fx}\"` : ''}${fy ? ` fy=\"${fy}\"` : ''}>${gradStops}</radialGradient>`;
    } else {
      // Linear gradient: x1, y1, x2, y2, angle from gradientProps
      const { x1 = "0", y1 = "0", x2 = "1", y2 = "1" } = gradientProps;
      gradDef = `<linearGradient id=\"${gradId}\" x1=\"${x1}\" y1=\"${y1}\" x2=\"${x2}\" y2=\"${y2}\">${gradStops}</linearGradient>`;
    }
    svg = svg.replace('<svg ', `<svg >\n  <defs>${gradDef}</defs>\n`);
    svg = svg.replace(/<text /, `<text fill=\"url(#${gradId})\" `);
  }

  return <SvgXml xml={svg} width={size} height={size} />;
}
