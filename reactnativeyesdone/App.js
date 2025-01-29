import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/Login';
import Home from './components/Home';
import ForgotPassword from './components/ForgotPassword';
import Signup from './components/Signup';
import OTPVerification from './components/OtpVerification';
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown:true}} />
        <Stack.Screen name='Signup' component={Signup} />
        <Stack.Screen name='OtpVerification' component={OTPVerification} options={{headerShown:true}}/>
      </Stack.Navigator>
    </NavigationContainer>
    <Toast/>
    </>
  );
}
