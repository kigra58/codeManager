import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Toast from 'react-native-toast-message';
import { z } from 'zod';
import { signupSchema } from '../../validations/authValidation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ROUTES } from '../../routes/routes';
import { createNewUserService, getUserByEmailService } from '../../services/userService';

type SignupForm = z.infer<typeof signupSchema>;

interface SignupScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
}

const SignupScreen:React.FC<SignupScreenProps> = ({ navigation }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupForm) => {
    try {
      // const res = await signupService(data.email, data.password);
      const exisUser=await getUserByEmailService(data.email);
      if(exisUser.length>0){
        Toast.show({ type: 'error', text1: 'User already exists' });
        return;
      }
      const res = await createNewUserService(data);
      console.log("Signup response==========>",res);
      if (res.status === 201) {
        Toast.show({ type: 'success', text1: 'Signup successfully' });
        navigation.navigate(ROUTES.LOGIN);
      }else{
      Toast.show({ type: 'error', text1: 'Signup failed' });
      }
    } catch (err) {
      Toast.show({ type: 'error', text1: 'Signup failed' });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        autoCapitalize="none"
        onChangeText={text => setValue('name', text)}
      />
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
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={() => navigation.navigate(ROUTES.LOGIN)}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
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

export default SignupScreen;
