import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { TripFormProvider } from './contexts/FormContext';
import AppNavigator from './navigation/AppNavigator';
import Toast from 'react-native-toast-message';

const Main:React.FC = () => {
  return (
    <AuthProvider>
      <TripFormProvider>
        <AppNavigator />
        <Toast />
      </TripFormProvider>
    </AuthProvider>
  );
};

export default Main;
