import React from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import CustomHeader from '../components/CustomHeader';
import Colors from '../constants/Colors';
import {getScreenHeight} from '../utils/domUtils';
import {CustomButton} from '../components';
import NotFound from '../components/NotFound';

const PlaceOrder = (props: any) => {
  const cartData = props.route.params.cartData;

  const renderItem = ({item}: any) => {
    return (
      <View style={{padding: getScreenHeight(2)}}>
        <Text style={styles.subtitle}>{item.quantity}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <View style={styles.screen}>
        <CustomHeader title={'CHECKOUT'} />
        <FlatList
          data={cartData}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          ListEmptyComponent={NotFound}
        />

        <View style={styles.contanier}>
          <CustomButton title="Checkout" color={Colors.green} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  safe: {
    flex: 1,
    backgroundColor: Colors.green,
  },
  image: {
    width: '100%',
    height: getScreenHeight(35),
  },
  subtitle: {
    color: Colors.black,
  },
  contanier: {
    padding: getScreenHeight(1),
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PlaceOrder;
