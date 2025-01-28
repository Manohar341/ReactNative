import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axiosInstance from '../axios';

const TOKEN_KEY = 'access_token';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation();

  // Email validation regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  // Validate email and password
  const validateInputs = () => {
    if (!email || !emailRegex.test(email)) {
      setLoginError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const loginUser = async (email, password) => {
    const url = `login`; 
    const data = { email, password };

    try {
      const response = await axiosInstance.post(url, data);
      if (response?.data?.status === 200) {
        Toast.show({
          type: 'success',
          text1: 'Login Successful!',
        });

        const token = response?.data?.data?.access_token;
        await AsyncStorage.setItem(TOKEN_KEY, token);
        navigation.navigate('Home'); 
        return response?.data;
      } else {
        setLoginError('Invalid credentials');
        return null;
      }
    } catch (error) {
      console.error('Login Error:', error);
      setLoginError('Invalid credentials. Please try again.');
      throw new Error(error.message);
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setLoginError(null);

    // Validate email and password before making the login request
    if (validateInputs()) {
      try {
        await loginUser(email, password);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.header}>Log In</Text>

        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
         
        />
        {loginError && <Text style={styles.errorText}>{loginError}</Text>}

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.togglePassword}>
            <Text style={styles.togglePasswordText}>{passwordVisible ? 'Hide' : 'Show'}</Text>
          </TouchableOpacity>
        </View>
       

<TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Log In</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.signup}>
          If you are a new user, signup here/
          <Text style={styles.signtext}  onPress={() => navigation.navigate('Signup')}>
           Sign Up
          </Text>
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <Toast position="top" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems:"center",
    backgroundColor: '#f7f7f7',
  },
  card: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 15,
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',

  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 25,
    width:"50%",
  alignContent:"center",
  cursor:"pointer",
  marginHorizontal:"auto"
   },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  textAlign:"center",
  },
  forgotPassword: {
    marginTop: 10,
    color: '#007bff',
    textAlign: 'center',
  },
  passwordContainer: {
    position: 'relative',
  },
  togglePassword: {
    position: 'absolute',
    right: 10,
    top: 12,
  },
  togglePasswordText: {
    color: '#007bff',
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
  },
  signup:{
textAlign:"center",
paddingTop:15,
  },
  signtext:{
color:"#007bff",
cursor:"pointer",

  },
});

export default Login;
