import React, {useContext, useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Auth, Hub} from 'aws-amplify';

import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import {ActivityIndicator, Alert, View} from 'react-native';
import {authContext} from '../contexts/context';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  const [loading, setLoading] = useState(true);
  const {user_data, setUserData, refetch, setRefetch}: any =
    useContext(authContext);

  const retrieveCurrentSession = () => {
    setLoading(true);
    Auth.currentAuthenticatedUser()
      .then((data: any) => {
        if (data) {
          setUserData(data);
        }
      })
      .catch(err => {
        setUserData(null);
      })
      .finally(() => {
        setLoading(false);
        setRefetch(false);
      });
  };

  useEffect(() => {
    if (refetch) {
      retrieveCurrentSession();
    }
  }, [refetch]);

  if (loading || refetch) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <>
      <Stack.Navigator
        initialRouteName="AuthStack"
        screenOptions={{headerShown: false}}>
        {user_data ? (
          <Stack.Screen name="HomeStack" component={HomeStack} />
        ) : (
          <Stack.Screen name="AuthStack" component={AuthStack} />
        )}
      </Stack.Navigator>
    </>
  );
};

export default MainStack;
