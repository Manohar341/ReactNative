import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/Login';
import Home from './components/Home';
import ForgotPassword from './components/ForgotPassword';
import Signup from './components/Signup';
import Toast from 'react-native-toast-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MyOrders from './components/MyOrders';
// import Otp from './components/Otp';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}> 
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MyOrders">
      <Stack.Screen name="Home" component={Home}  options={{headerShown:false}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
         <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown:true}} />
        <Stack.Screen name='Signup' component={Signup} />
        <Stack.Screen name='MyOrders' component={MyOrders} options={{headerShown:false}} />
        {/* <Stack.Screen name='Otp' component={Otp}  /> */}
      </Stack.Navigator>
    </NavigationContainer>
    <Toast/>
    </GestureHandlerRootView>
  );
}
