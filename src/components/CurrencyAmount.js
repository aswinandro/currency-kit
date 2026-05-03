import React from 'react';
import { View, Text } from 'react-native';
import { CurrencySymbol } from './CurrencySymbol';

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
  const symbol = <CurrencySymbol code={code} {...symbolProps} />;
  const amt = <Text {...amountProps}>{amount}</Text>;
  let children;
  if (rtl) {
    children = symbolPosition === 'after' ? [amt, symbol] : [symbol, amt];
  } else {
    children = symbolPosition === 'before' ? [symbol, amt] : [amt, symbol];
  }
  return <View style={{ flexDirection: 'row', alignItems: 'center' }}>{children}</View>;
}
