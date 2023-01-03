import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BottomBar from './BottomBar';
import EditProfile from '../screens/home/EditProfile';
import ChangePassword from '../screens/auth/ChangePassword';
import DishDetail from '../screens/DishDetail';
import MenuDetail from '../screens/MenuDetail';
import ManageAddress from '../screens/ManageAddress';
import AddAddress from '../screens/AddAddress';
import PlaceOrder from '../screens/PlaceOrder';

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
        <Stack.Screen name="DishDetail" component={DishDetail} />
        <Stack.Screen name="MenuDetail" component={MenuDetail} />
        <Stack.Screen name="ManageAddress" component={ManageAddress} />
        <Stack.Screen name="AddAddress" component={AddAddress} />
        <Stack.Screen name="PlaceOrder" component={PlaceOrder} />
      </Stack.Navigator>
    </>
  );
};

export default HomeStack;
