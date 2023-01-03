import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import Colors from '../constants/Colors';
import {getScreenHeight} from '../utils/domUtils';

const MenuItem = (props: any) => {

  return <View style = {styles.item}>
    <Image 
    source={{uri: props.item.image}}
    style = {styles.image}
    />
    <View style = {styles.content}>
        <Text style = {styles.subtitle}>{props.item.name}</Text>
        <Text style = {styles.subtitle}>{props.item.description}</Text>
        <Text style = {styles.subtitle}>At ${props.item.price} Only</Text>
    </View>
  </View>
};

const styles = StyleSheet.create({
  title: {
    color: Colors.black,
    padding: getScreenHeight(2),
  },
  image: {
    height: getScreenHeight(12),
    width: getScreenHeight(12),
    borderRadius: getScreenHeight(1),
    marginBottom: getScreenHeight(2)
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    flex: 1,
    marginLeft: getScreenHeight(1)
  },
  subtitle: {
    color: Colors.black
  }
});

export default MenuItem;
