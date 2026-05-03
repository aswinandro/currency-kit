import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { CurrencySymbol } from './index';
import { currencySymbols } from './currency-symbols';

// Demo component to showcase all currency symbols
export default function CurrencyKitDemo() {
  const codes = Object.keys(currencySymbols).slice(0, 50); // Show first 50 for demo
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>CurrencyKit Demo</Text>
      {codes.map(code => (
        <View key={code} style={styles.row}>
          <CurrencySymbol code={code} size={36} color="#2196f3" />
          <Text style={styles.code}>{code}</Text>
          <Text style={styles.symbol}>{currencySymbols[code]}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  code: {
    width: 60,
    fontSize: 18,
    marginLeft: 12,
  },
  symbol: {
    fontSize: 24,
    marginLeft: 12,
  },
});
