import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Amplify} from 'aws-amplify';

import {NavigationRef} from './src/utils/routerServices';
import MainStack from './src/routers/MainStack';
import config from './src/aws-exports';
import {AuthContextProvider} from './src/contexts/provider';

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

const App = () => {
  return (
    <AuthContextProvider>
      <NavigationContainer ref={NavigationRef}>
        <MainStack />
      </NavigationContainer>
    </AuthContextProvider>
  );
};

export default App;
