import React from 'react';
import {StyleSheet, Text} from 'react-native';

import Colors from '../constants/Colors';
import {getScreenHeight} from '../utils/domUtils';

const NotFound = () => {
  return <Text style={styles.title}>Data Not Found</Text>;
};

const styles = StyleSheet.create({
  title: {
    color: Colors.black,
    padding: getScreenHeight(2),
  },
});

export default NotFound;
