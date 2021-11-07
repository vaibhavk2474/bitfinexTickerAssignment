import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ticker from './src/components/Ticker';


// 01
// App fun() has component Ticker 
export default function App() {
  return (
    <View style={styles.container}>
      <Text>my ticker</Text>
      <Ticker/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
