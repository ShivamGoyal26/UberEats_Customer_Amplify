import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import Colors from '../constants/Colors';
import {getScreenHeight} from '../utils/domUtils';

const CustomButton = (props: any) => {
  return (
    <TouchableOpacity style={styles.screen} onPress={props.action}>
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  screen: {
    height: getScreenHeight(6),
    borderRadius: getScreenHeight(1),
    width: '100%',
    backgroundColor: Colors.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: getScreenHeight(2),
    color: Colors.white,
  },
});

export default CustomButton;
