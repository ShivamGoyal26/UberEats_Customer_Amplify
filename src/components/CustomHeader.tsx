import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import Colors from '../constants/Colors';
import {getScreenHeight} from '../utils/domUtils';

const CustomHeader = (props: any) => {
  return (
    <View style={{...styles.screen}}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    height: getScreenHeight(6),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.green,
  },
  title: {
    fontSize: getScreenHeight(2),
    color: Colors.white,
  },
});

export default CustomHeader;
