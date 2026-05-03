#!/usr/bin/env node
// CurrencyKit CLI
// Scaffold for adding/updating currency symbols and SVGs
const fs = require('fs');
const path = require('path');

function printHelp() {
  console.log(`\nCurrencyKit CLI\n\nUsage:\n  currency-kit add --code=USD --symbol="$" --svg=./svgs/USD.svg\n  currency-kit update --code=INR --svg=./svgs/INR.svg\n  currency-kit list\n  currency-kit help\n\nOptions:\n  --code     ISO 4217 currency code\n  --symbol   Currency symbol (optional, for add)\n  --svg      Path to SVG file\n`);
}

function parseArgs() {
  const args = process.argv.slice(2);
  const cmd = args[0];
  const opts = {};
  args.slice(1).forEach(arg => {
    if (arg.startsWith('--')) {
      const [k, v] = arg.replace('--', '').split('=');
      opts[k] = v;
    }
  });
  return { cmd, opts };
}

function main() {
  const { cmd, opts } = parseArgs();
  switch (cmd) {
    case 'add': {
      const { code, symbol } = opts;
      if (!code || !symbol) {
        console.error('Usage: currency-kit add --code=XXX --symbol=SYMBOL');
        process.exit(1);
      }
      const file = path.join(__dirname, '../data/currency-symbols.js');
      let content = fs.readFileSync(file, 'utf8');
      // Find the export const currencySymbols = { ... } block
      const match = content.match(/export const currencySymbols = \{([\s\S]*?)\n\};/);
      if (!match) {
        console.error('Could not find currencySymbols object in currency-symbols.js');
        process.exit(1);
      }
      let objStr = match[1];
      if (objStr.includes(`\n  ${code}:`)) {
        console.error(`Currency code ${code} already exists.`);
        process.exit(1);
      }
      // Insert new code at the end before closing }
      const insert = `  ${code}: '${symbol}',\n`;
      content = content.replace(/(export const currencySymbols = \{[\s\S]*?)\n\};/, `$1\n${insert}};`);
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Added ${code}: '${symbol}' to currency-symbols.js`);
      break;
    }
    case 'update': {
      const { code, symbol } = opts;
      if (!code || !symbol) {
        console.error('Usage: currency-kit update --code=XXX --symbol=SYMBOL');
        process.exit(1);
      }
      // ...rest of update logic
      break;
    }
    case 'list': {
      // ...list logic
      break;
    }
    case 'help':
    default:
      printHelp();
      break;
  }
}

if (require.main === module) {
  main();
}
