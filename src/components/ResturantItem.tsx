import React, {memo} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import Colors from '../constants/Colors';
import {getScreenHeight} from '../utils/domUtils';

const ResturantItem = (props: any) => {
  return (
    <View style={styles.screen}>
      <Image source={{uri: props.item.image}} style={styles.image} />
      <View style={styles.contanier}>
        <Text numberOfLines={1} style={styles.title}>
          {props.item.name}
        </Text>
        <View style = {styles.row}>
        <Text style = {styles.subtitle}>Time: {props.item.minDeliveryTime} - {props.item.maxDeliveryTime} min</Text>
        <Text style = {styles.subtitle}>Rating: {props.item.rating.toFixed(1)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: getScreenHeight(25),
    borderTopLeftRadius: getScreenHeight(1),
    borderTopRightRadius: getScreenHeight(1),
  },
  screen: {
    backgroundColor: Colors.white,
    borderRadius: getScreenHeight(1),
  },
  title: {
    color: Colors.black,
    fontSize: getScreenHeight(2.5),
  },
  contanier: {
    padding: getScreenHeight(1),
  },
  subtitle: {
    color: Colors.black
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
});

export default memo(ResturantItem);
