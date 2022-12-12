import React from 'react';
import {View, StyleSheet, Image, Text, Pressable} from 'react-native';
import Colors from '../constants/Colors';
import Images from '../constants/Images';
import {getScreenHeight} from '../utils/domUtils';

import {navigate} from '../utils/routerServices';

const OrderItem = (props: any) => {
  return (
    <Pressable
      onPress={() => navigate('OrderDelivery', {item: props.item})}
      style={styles.main}>
      <Image source={{uri: props.item.Restaurant.image}} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {props.item.Restaurant.name}
        </Text>
        <Text numberOfLines={1}>{props.item.Restaurant.address}</Text>
        <Text style={styles.subtitle}>Delivery Details:</Text>

        <Text numberOfLines={1}>{props.item.User.name}</Text>
        <Text numberOfLines={1}>{props.item.User.address}</Text>
      </View>
      <View style={styles.fotter}>
        <Image source={Images.check} style={styles.icon} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    borderRadius: getScreenHeight(1),
    borderColor: Colors.black,
    borderWidth: 1,
    padding: getScreenHeight(1),
  },
  image: {
    width: '30%',
    height: '100%',
    borderRadius: getScreenHeight(1),
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: getScreenHeight(1),
  },
  fotter: {
    backgroundColor: Colors.green,
    width: '15%',
    borderRadius: getScreenHeight(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '800',
    marginTop: getScreenHeight(2),
  },
  icon: {
    height: getScreenHeight(2),
    width: getScreenHeight(2),
    resizeMode: 'contain',
    tintColor: Colors.white,
  },
});

export default OrderItem;
