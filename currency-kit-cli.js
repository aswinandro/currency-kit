#!/usr/bin/env node
/**
 * CurrencyKit CLI
 * Scaffold for adding/updating currency symbols and SVGs
 */
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
      const file = path.join(__dirname, 'currency-symbols.js');
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
      const file = path.join(__dirname, 'currency-symbols.js');
      let content = fs.readFileSync(file, 'utf8');
      // Find the export const currencySymbols = { ... } block
      const match = content.match(/export const currencySymbols = \{([\s\S]*?)\n\};/);
      if (!match) {
        console.error('Could not find currencySymbols object in currency-symbols.js');
        process.exit(1);
      }
      let objStr = match[1];
      // Parse the object for existence check (robust)
      let exists = false;
      try {
        const objCode = `module.exports = ${content.match(/export const currencySymbols = (\{[\s\S]*?\n\};)/)[1]}`;
        const temp = {};
        // eslint-disable-next-line no-eval
        eval(objCode);
        exists = Object.prototype.hasOwnProperty.call(module.exports, code);
      } catch (e) {
        // fallback to regex if parsing fails
      }
      if (!exists) {
        console.error(`Currency code ${code} does not exist.`);
        process.exit(1);
      }
      // Try to match with comma (not last property)
      let regex = new RegExp(`(\n\s*)${code}: [^,\n]+,`);
      let found = regex.test(objStr);
      if (!found) {
        // Try to match last property (no comma, before closing brace)
        regex = new RegExp(`(\n\s*)${code}: [^,\n]+(?=\n?\s*\})`);
        found = regex.test(objStr);
      }
      content = content.replace(regex, `$1${code}: '${symbol}',`);
      // Remove double comma if last property
      content = content.replace(/,\s*};/, '\n};');
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Updated ${code} to '${symbol}' in currency-symbols.js`);
      break;
    }
    case 'list': {
      // List all supported currency codes and symbols
      try {
        const { currencySymbols } = require('./currency-symbols.js');
        const codes = Object.keys(currencySymbols);
        console.log(`\nSupported currencies (${codes.length}):\n`);
        codes.forEach(code => {
          let symbol = currencySymbols[code];
          if (typeof symbol === 'object') {
            // Print all locale/variant values as comma-separated
            symbol = Object.entries(symbol).map(([k, v]) => `${k}:${v}`).join(', ');
          }
          console.log(`${code}\t${symbol}`);
        });
      } catch (e) {
        console.error('Error loading currency-symbols.js:', e.message);
      }
      break;
    }
    case 'help':
    default:
      printHelp();
      break;
  }
}

main();
