# CurrencyKit Documentation

[![npm version](https://img.shields.io/npm/v/currency-kit-code.svg)](https://www.npmjs.com/package/currency-kit-code)
[View on npm](https://www.npmjs.com/package/currency-kit-code)

CurrencyKit is a React Native npm package for displaying all world currency symbols, fully customizable, with official SVGs for each symbol. Now supports advanced gradients, symbol placement, RTL/LTR, and more.


## Features
- Get currency symbol by ISO 4217 code
- Display stylized SVG symbols in React Native
- Auto-detect and display the user's local currency symbol (no permissions required)
- Locale/variant support for multi-locale currencies
- CLI for adding/updating currencies
- Demo component to showcase all features
- Customization: size, color, gradients (linear/radial, multi-color)
- Symbol placement (before/after amount), RTL/LTR support

## Installation
```sh
npm install currency-kit-code
```


## Usage
```js
import { getCurrencySymbol, getUserCurrencySymbol, CurrencySymbol, CurrencyAmount } from 'currency-kit-code';

// Get symbol as string
const symbol = getCurrencySymbol('USD'); // $

// Get the user's local currency symbol automatically
const userSymbol = getUserCurrencySymbol(); // e.g., '£' in UK, '$' in US, '₹' in India

// Render a simple symbol
<CurrencySymbol code="EUR" size={32} color="#2196f3" />

// Advanced: Linear gradient (multi-color)
<CurrencySymbol
	code="USD"
	size={48}
	gradientType="linear"
	gradientColors={[
		{ color: '#ff0', offset: '0%' },
		{ color: '#f0f', offset: '50%' },
		{ color: '#0ff', offset: '100%' },
	]}
	gradientProps={{ x1: '0', y1: '0', x2: '1', y2: '1' }}
/>

// Advanced: Radial gradient
<CurrencySymbol
	code="EUR"
	size={48}
	gradientType="radial"
	gradientColors={[
		{ color: '#ff0', offset: '0%' },
		{ color: '#f0f', offset: '100%' },
	]}
	gradientProps={{ cx: '50%', cy: '50%', r: '50%' }}
/>

// CurrencyAmount: symbol placement, RTL, and custom props
<CurrencyAmount
	code="INR"
	amount={1234.56}
	symbolPosition="after"
	rtl={false}
	symbolProps={{ size: 40, gradientType: 'linear', gradientColors: [
		{ color: '#ff9800', offset: '0%' },
		{ color: '#f44336', offset: '100%' },
	] }}
	amountProps={{ style: { fontSize: 28, color: '#333' } }}
/>
```

### Get the user's local currency symbol (optional)
```js
import { getUserCurrencySymbol } from 'currency-kit-code';
const symbol = getUserCurrencySymbol(); // e.g., '£' in UK, '$' in US, '₹' in India
```

## CLI Usage
```sh
npx currency-kit-code list
npx currency-kit-code add --code=XYZ --symbol=¤
npx currency-kit-code update --code=XYZ --symbol=§
```


## Demo
See `CurrencyKitDemo.js` and `CurrencyKitAdvancedDemo.js` for a showcase of all supported currencies and advanced customization options.


## Contributing
- Use the CLI to add or update currencies
- Submit SVGs for official or stylized symbols
- Open issues or pull requests for improvements

## License
MIT
