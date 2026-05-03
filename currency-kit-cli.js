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
    case 'add':
      console.log('Add command (not implemented yet)', opts);
      break;
    case 'update':
      console.log('Update command (not implemented yet)', opts);
      break;
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
