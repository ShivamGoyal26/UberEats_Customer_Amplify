import React, {useContext, useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {API, Auth} from 'aws-amplify';
import {ActivityIndicator, View} from 'react-native';
import {DataStore} from '@aws-amplify/datastore';

import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import {authContext} from '../contexts/context';
import {User} from '../models';
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  const [loading, setLoading] = useState(true);
  const {user_data, setUserData, refetch, setRefetch}: any =
    useContext(authContext);

  const syncUser = async (data: any) => {
    try {
      if (data) {
        const user: any = await API.graphql({
          query: queries.getUser,
          variables: {id: data.attributes.sub},
        });
        if (!user.data.getUser) {
          const mainUser = {
            name: data.attributes.name,
            sub: data.attributes.sub,
            id: data.attributes.sub,
          };
          const res = await API.graphql({
            query: mutations.createUser,
            variables: {input: mainUser},
          });
          console.log('>>> RES', res);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const retrieveCurrentSession = () => {
    setLoading(true);
    Auth.currentAuthenticatedUser({bypassCache: true})
      .then((data: any) => {
        setUserData(data);
        syncUser(data);
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
