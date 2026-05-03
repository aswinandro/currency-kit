import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, Button } from 'react-native';
import { CurrencySymbol, CurrencyAmount } from '../components/CurrencySymbol';
import { currencySymbols } from '../data/currency-symbols';

// Advanced demo: live customization and search
export default function CurrencyKitAdvancedDemo() {
  const [size, setSize] = useState(32);
  const [color, setColor] = useState('#2196f3');
  const [search, setSearch] = useState('');
  const [symbolPosition, setSymbolPosition] = useState('before');
  const [rtl, setRtl] = useState(false);
  const [gradientType, setGradientType] = useState('linear');
  const [useGradient, setUseGradient] = useState(false);
  const codes = Object.keys(currencySymbols).filter(code =>
    code.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>CurrencyKit Advanced Demo</Text>
      <View style={styles.controls}>
        <Text>Size:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={size.toString()}
          onChangeText={v => setSize(Number(v) || 1)}
        />
        <Text>Color:</Text>
        <TextInput
          style={styles.input}
          value={color}
          onChangeText={setColor}
        />
        <Text>Gradient:</Text>
        <Button title={useGradient ? 'On' : 'Off'} onPress={() => setUseGradient(v => !v)} />
        <Text>Type:</Text>
        <Button title={gradientType} onPress={() => setGradientType(gradientType === 'linear' ? 'radial' : 'linear')} />
        <Text>Symbol Pos:</Text>
        <Button title={symbolPosition} onPress={() => setSymbolPosition(symbolPosition === 'before' ? 'after' : 'before')} />
        <Text>RTL:</Text>
        <Button title={rtl ? 'Yes' : 'No'} onPress={() => setRtl(r => !r)} />
        <Text>Search:</Text>
        <TextInput
          style={styles.input}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      {codes.map(code => (
        <View key={code} style={styles.row}>
          <CurrencyAmount
            code={code}
            amount={1234.56}
            symbolPosition={symbolPosition}
            rtl={rtl}
            symbolProps={useGradient ? {
              size,
              gradientType,
              gradientColors: gradientType === 'linear'
                ? [
                    { color: '#ff9800', offset: '0%' },
                    { color: color, offset: '100%' },
                  ]
                : [
                    { color: color, offset: '0%' },
                    { color: '#f44336', offset: '100%' },
                  ],
              gradientProps: gradientType === 'linear'
                ? { x1: '0', y1: '0', x2: '1', y2: '1' }
                : { cx: '50%', cy: '50%', r: '50%' },
            } : { size, color }}
            amountProps={{ style: { fontSize: 20, color: '#333' } }}
          />
          <Text style={styles.code}>{code}</Text>
          <Text style={styles.symbol}>{typeof currencySymbols[code] === 'object' ? JSON.stringify(currencySymbols[code]) : currencySymbols[code]}</Text>
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
  controls: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 4,
    width: 60,
    marginHorizontal: 4,
    marginBottom: 4,
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
