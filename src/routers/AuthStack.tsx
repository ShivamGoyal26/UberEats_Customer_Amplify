import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../screens/auth/Login';
import Signup from '../screens/auth/Signup';
import ConfirmationOTP from '../screens/auth/ConfirmationOTP';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="ConfirmationOTP" component={ConfirmationOTP} />
      </Stack.Navigator>
    </>
  );
};

export default AuthStack;
