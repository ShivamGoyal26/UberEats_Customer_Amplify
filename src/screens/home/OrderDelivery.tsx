import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BottomSheet from '@gorhom/bottom-sheet';

import orders from '../../../assets/data/orders.json';
import {OrderItem} from '../../components';
import Colors from '../../constants/Colors';
import {getScreenHeight} from '../../utils/domUtils';
import CustomButton from '../../components/CustomButton';

const OrderDelivery = () => {
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['12%', '90%'], []);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.screen}>
        <BottomSheet index={1} ref={bottomSheetRef} snapPoints={snapPoints}>
          <View style={styles.bottomsheet}>
            <Text style={styles.title}>14 min, 5km</Text>
            <Text>Available Orders: {orders.length}</Text>
          </View>
          <View style={styles.contanier}>
            <CustomButton title="Accept order" />
          </View>
        </BottomSheet>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  screen: {
    flex: 1,
    backgroundColor: 'lightblue',
  },
  flatlist: {
    padding: getScreenHeight(2),
  },
  item: {
    marginBottom: getScreenHeight(2),
  },
  bottomsheet: {
    alignItems: 'center',
    marginVertical: getScreenHeight(1),
  },
  title: {
    fontSize: getScreenHeight(2.5),
    fontWeight: '600',
    letterSpacing: 1,
  },
  contanier: {
    flex: 1,
    padding: getScreenHeight(2),
  },
});

export default OrderDelivery;
