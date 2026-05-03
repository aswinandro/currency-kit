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
    USD: `<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\"><text x=\"4\" y=\"26\" font-size=\"28\" font-family=\"Arial\">$</text></svg>`,
    EUR: `<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\"><text x=\"2\" y=\"26\" font-size=\"28\" font-family=\"Arial\">€</text></svg>`,
    INR: `<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\"><text x=\"2\" y=\"26\" font-size=\"28\" font-family=\"Arial\">₹</text></svg>`,
    GBP: `<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\"><text x=\"2\" y=\"26\" font-size=\"28\" font-family=\"Arial\">£</text></svg>`,
    // ...add all SVGs or import from svgs folder
  };
  let svg = svgMap[code] || svgMap.USD;

  // Color override (if no gradient)
  if (color && !gradient && !gradientColors) {
    svg = svg.replace(/fill=\"[^\"]*\"/g, `fill=\"${color}\"`).replace(/<text /, `<text fill=\"${color}\" `);
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
