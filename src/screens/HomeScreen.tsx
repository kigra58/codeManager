import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';

// Define the type for navigation and route
interface HomeScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to CodeManager</Text>
      <Button
        title="Go to Jane's profile"
        onPress={() => navigation.navigate('Profile', { name: 'Jane' })}
        color="#0f4c81"
      />
    </View>
  );
};

interface ProfileScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
  route: RouteProp<any, any>;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ route }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.profileText}>This is {route?.params?.name}'s profile</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f7fa',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0f4c81',
    marginBottom: 24,
  },
  profileText: {
    fontSize: 22,
    color: '#2b2d42',
    fontWeight: '600',
  },
});

export { HomeScreen, ProfileScreen };