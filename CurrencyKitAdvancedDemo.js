import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, Button } from 'react-native';
import { CurrencySymbol } from './index';
import { currencySymbols } from './currency-symbols';

// Advanced demo: live customization and search
export default function CurrencyKitAdvancedDemo() {
  const [size, setSize] = useState(32);
  const [color, setColor] = useState('#2196f3');
  const [search, setSearch] = useState('');
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
        <Text>Search:</Text>
        <TextInput
          style={styles.input}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      {codes.map(code => (
        <View key={code} style={styles.row}>
          <CurrencySymbol code={code} size={size} color={color} />
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
