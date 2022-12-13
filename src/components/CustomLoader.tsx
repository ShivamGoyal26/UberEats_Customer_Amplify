import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

const CustomLoader = () => {
  return (
    <View style={styles.screen}>
      <ActivityIndicator size={'large'} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomLoader;
