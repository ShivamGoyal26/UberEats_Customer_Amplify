import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Orders from '../screens/home/Orders';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName="Orders"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Orders" component={Orders} />
      </Stack.Navigator>
    </>
  );
};

export default HomeStack;
