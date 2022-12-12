import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Colors from '../../constants/Colors';

const Login = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.screen}>
        <Text>Good</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default Login;
