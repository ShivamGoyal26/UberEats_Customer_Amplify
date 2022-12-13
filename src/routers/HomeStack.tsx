import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BottomBar from './BottomBar';
import EditProfile from '../screens/home/EditProfile';
import ChangePassword from '../screens/auth/ChangePassword';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName="BottomBar"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="BottomBar" component={BottomBar} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
      </Stack.Navigator>
    </>
  );
};

export default HomeStack;
