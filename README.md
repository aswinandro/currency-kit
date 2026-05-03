# CurrencyKit Documentation

CurrencyKit is a React Native npm package for displaying all world currency symbols, fully customizable, with official SVGs for each symbol.

## Features
- Get currency symbol by ISO 4217 code
- Display stylized SVG symbols in React Native
- Locale/variant support for multi-locale currencies
- CLI for adding/updating currencies
- Demo component to showcase all features
- Customization: size, color, (gradient coming soon)

## Installation
```sh
npm install currency-kit
```

## Usage
```js
import { getCurrencySymbol, CurrencySymbol } from 'currency-kit';

// Get symbol as string
const symbol = getCurrencySymbol('USD'); // $

// Render in React Native
<CurrencySymbol code="EUR" size={32} color="#2196f3" />
```

## CLI Usage
```sh
npx currency-kit list
npx currency-kit add --code=XYZ --symbol=¤
npx currency-kit update --code=XYZ --symbol=§
```

## Demo
See `CurrencyKitDemo.js` for a showcase of all supported currencies and customization options.

## Contributing
- Use the CLI to add or update currencies
- Submit SVGs for official or stylized symbols
- Open issues or pull requests for improvements

## License
MIT
