import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { CurrencySymbol } from '../components/CurrencySymbol';
import { currencySymbols } from '../data/currency-symbols';

// Demo component to showcase all currency symbols
export default function CurrencyKitDemo() {
  const codes = Object.keys(currencySymbols).slice(0, 50); // Show first 50 for demo
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>CurrencyKit Demo</Text>
      {codes.map((code, i) => (
        <View key={code} style={styles.row}>
          {/* Alternate between color, linear gradient, and radial gradient */}
          {i % 3 === 0 ? (
            <CurrencySymbol code={code} size={36} color="#2196f3" />
          ) : i % 3 === 1 ? (
            <CurrencySymbol
              code={code}
              size={36}
              gradientType="linear"
              gradientColors={[
                { color: '#ff9800', offset: '0%' },
                { color: '#f44336', offset: '100%' },
              ]}
              gradientProps={{ x1: '0', y1: '0', x2: '1', y2: '1' }}
            />
          ) : (
            <CurrencySymbol
              code={code}
              size={36}
              gradientType="radial"
              gradientColors={[
                { color: '#4caf50', offset: '0%' },
                { color: '#2196f3', offset: '100%' },
              ]}
              gradientProps={{ cx: '50%', cy: '50%', r: '50%' }}
            />
          )}
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
