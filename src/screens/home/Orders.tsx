import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  useWindowDimensions,
  Platform,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BottomSheet from '@gorhom/bottom-sheet';
import MapView, {Marker} from 'react-native-maps';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

import orders from '../../../assets/data/orders.json';
import {OrderItem} from '../../components';
import Colors from '../../constants/Colors';
import {getScreenHeight} from '../../utils/domUtils';

const Orders = () => {
  const {height, width} = useWindowDimensions();
  const bottomSheetRef = useRef(null);

  const checkPermissions = useCallback(() => {
    request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    )
      .then(result => {
        console.log('<<< Result from Permission library', result);
        if (
          result === 'denied' ||
          result === 'blocked' ||
          result === 'unavailable'
        ) {
          Alert.alert('Denied');
        } else {
          console.log('Have permission');
        }
      })
      .catch(error => {
        console.log('This is the error', error);
      });
  }, []);

  // variables
  const snapPoints = useMemo(() => ['12%', '90%'], []);

  useEffect(() => {
    checkPermissions();
  }, []);

  const renderItem = ({item}: any) => {
    return (
      <View style={styles.item}>
        <OrderItem item={item} />
      </View>
    );
  };

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <View style={styles.screen}>
        <MapView
          style={{width, height}}
          zoomEnabled={true}
          showsUserLocation={true}
          showsCompass={true}
          followsUserLocation={true}>
          {orders.map((marker, index) => {
            return (
              <Marker
                key={index}
                title={marker.Restaurant.name}
                description={marker.Restaurant.address}
                coordinate={{
                  latitude: marker.Restaurant.lat,
                  longitude: marker.Restaurant.lng,
                }}
              />
            );
          })}
        </MapView>
        <BottomSheet index={1} ref={bottomSheetRef} snapPoints={snapPoints}>
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
