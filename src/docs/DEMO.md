# CurrencyKit Demo

This demo showcases the usage of the `CurrencySymbol` React Native component and the currency symbol mapping utility.

## Usage

1. Import the component and mapping:

```js
import { CurrencySymbol, getCurrencySymbol } from 'currency-kit-code';
```

2. Render a currency symbol:

```js
<CurrencySymbol code="USD" size={32} color="#2196f3" />
```

3. Get a symbol programmatically:

```js
const symbol = getCurrencySymbol('EUR'); // returns '\u20ac'
```

4. See all supported codes in the demo:

```js
import CurrencyKitDemo from './CurrencyKitDemo';
```

## Customization

- `size`: Icon size in px (default: 32)
- `color`: Fill color (overrides SVG)
- `gradient`: Array of colors for linear gradient fill (coming soon)

## Running the Demo

1. Add `CurrencyKitDemo` to your React Native app's main screen.
2. Run your app with Metro bundler.

---

For more details, see the source code in `CurrencyKitDemo.js`.
