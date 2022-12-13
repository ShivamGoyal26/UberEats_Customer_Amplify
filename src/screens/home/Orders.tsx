import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Colors from '../../constants/Colors';

const Orders = () => {
  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <View style={styles.screen}>
        <Text>Orders</Text>
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

export default Orders;
