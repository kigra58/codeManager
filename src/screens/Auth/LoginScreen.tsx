import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { loginSchema } from '../../validations/authValidation';
import { useAuth } from '../../contexts/AuthContext';
import Toast from 'react-native-toast-message';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ROUTES } from '../../routes/routes';
import { getUserByEmailService } from '../../services/userService';

type LoginForm = z.infer<typeof loginSchema>;
interface LoginScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
}

const LoginScreen:React.FC<LoginScreenProps> = ({navigation}) => {
  const { login } = useAuth();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
     const res = await getUserByEmailService(data.email);

     console.log("User by email",res);
      if (res) {
        login(res);
        Toast.show({ type: 'success', text1: 'Login Successful' });
      } else {
        Toast.show({ type: 'error', text1: 'User not found' });
      }
    } catch (err) {
      Toast.show({ type: 'error', text1: 'Login failed' });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={text => setValue('email', text)}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={text => setValue('password', text)}
      />
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={() => {
        navigation.navigate(ROUTES.SIGNUP);
      }}>
        <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
      <Toast />
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
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2b2d42',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    height: 48,
    borderColor: '#8d99ae',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    height: 48,
    backgroundColor: '#0f4c81',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
    shadowColor: '#0f4c81',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: '#ef233c',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  link: {
    marginTop: 8,
  },
  linkText: {
    color: '#0f4c81',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
