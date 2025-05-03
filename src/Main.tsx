import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import AppNavigator from './navigation/AppNavigator';
import Toast from 'react-native-toast-message';

const Main:React.FC = () => {
  return (
    <AuthProvider>
      <AppNavigator />
      <Toast />
    </AuthProvider>
  );
};

export default Main;
