import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/Splash/Splash';
import { RootStackParamList } from '../utils/interfaces';
import TripRegister from '../components/TripRegister';



const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator:React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay for splash (e.g., fetch user, check token, etc.)
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* {user ? (
          <Stack.Screen name={ROUTES.DASHBOARD} component={DashboardScreen} options={{ headerShown: false }} />
        ) : (
          <>
            <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name={ROUTES.SIGNUP} component={SignupScreen} options={{ headerShown: false }} />
          </>
        )} */}
  <Stack.Screen name="TripRegister" component={TripRegister} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );



};

export default AppNavigator;
