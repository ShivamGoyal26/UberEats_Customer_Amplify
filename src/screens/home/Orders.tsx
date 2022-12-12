import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BottomSheet from '@gorhom/bottom-sheet';

import orders from '../../../assets/data/orders.json';
import {OrderItem} from '../../components';
import Colors from '../../constants/Colors';
import {getScreenHeight} from '../../utils/domUtils';

const Orders = () => {
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['12%', '90%'], []);

  const renderItem = ({item}: any) => {
    return (
      <View style={styles.item}>
        <OrderItem item={item} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.screen}>
        <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints}>
          <View style={styles.bottomsheet}>
            <Text style={styles.title}>You are Online</Text>
            <Text>Available Orders: {orders.length}</Text>
          </View>
          <FlatList
            data={orders}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.flatlist}
          />
        </BottomSheet>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  flatlist: {
    padding: getScreenHeight(2),
  },
  item: {
    marginBottom: getScreenHeight(2),
  },
  bottomsheet: {
    flex: 1,
    alignItems: 'center',
    marginVertical: getScreenHeight(1),
  },
  title: {
    fontSize: getScreenHeight(2.5),
    fontWeight: '600',
    letterSpacing: 1,
  },
});

export default Orders;
