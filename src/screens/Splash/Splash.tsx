import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';

const Splash: React.FC = () => {
  // You can add navigation logic here if needed
  return (
    <View style={styles.container}>
      {/* <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      /> */}
      <Text style={styles.title}>Welcome to Splash Screen</Text>
      <ActivityIndicator size="large" color="#0f4c81" style={styles.loader} />
      <Text style={styles.subtitle}>Loading, please wait...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0f4c81',
    marginBottom: 12,
  },
  loader: {
    marginVertical: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#8d99ae',
    marginTop: 8,
  },
});

export default Splash;