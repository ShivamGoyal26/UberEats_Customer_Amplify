import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Colors from '../../constants/Colors';

const Home = () => {
  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <View style={styles.screen}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default Home;
