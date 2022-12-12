import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {NavigationRef} from './src/utils/routerServices';
import MainStack from './src/routers/MainStack';

const App = () => {
  return (
    <NavigationContainer ref={NavigationRef}>
      <MainStack />
    </NavigationContainer>
  );
};

export default App;
