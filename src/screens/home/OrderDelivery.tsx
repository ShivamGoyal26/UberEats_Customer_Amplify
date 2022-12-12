import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  useWindowDimensions,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BottomSheet from '@gorhom/bottom-sheet';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

import orders from '../../../assets/data/orders.json';
import {CustomButton} from '../../components';
import Colors from '../../constants/Colors';
import {getScreenHeight} from '../../utils/domUtils';
import Images from '../../constants/Images';

const OrderDelivery = (props: any) => {
  const order = props.route.params.item;
  const {height, width} = useWindowDimensions();
  const bottomSheetRef = useRef(null);
  // variables
  const snapPoints = useMemo(() => ['12%', '90%'], []);

  const [driverLocation, setDriverLocation]: any = useState(null);

  console.log(order.Restaurant.lat);
  useEffect(() => {
    oneTimePickLocation();
  }, []);

  const oneTimePickLocation = useCallback(async () => {
    Geolocation.getCurrentPosition(
      position => {
        setDriverLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => {
        // See error code charts below.
        console.log('>>> Result from Location Lib', error.code, error.message);
        if (error.code === 2) {
          Alert.alert('Location provider not available');
        }
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  if (!driverLocation) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <View style={styles.screen}>
        <MapView
          style={{width, height}}
          zoomEnabled={true}
          showsUserLocation={true}
          showsCompass={true}
          initialRegion={{
            latitude: driverLocation.latitude,
            longitude: driverLocation.longitude,
            latitudeDelta: 0.07,
            longitudeDelta: 0.07,
          }}
          followsUserLocation={true}>
          <Marker
            title={order.Restaurant.name}
            description={order.Restaurant.address}
            coordinate={{
              latitude: order.Restaurant.lat,
              longitude: order.Restaurant.lng,
            }}>
            <View
              style={{
                backgroundColor: Colors.green,
                padding: getScreenHeight(1),
                borderRadius: getScreenHeight(100),
              }}>
              <Image style={styles.icon} source={Images.restaurant} />
            </View>
          </Marker>
          <Marker
            title={order.User.name}
            description={order.User.address}
            coordinate={{
              latitude: order.User.lat,
              longitude: order.User.lng,
            }}>
            <View
              style={{
                backgroundColor: Colors.green,
                padding: getScreenHeight(1),
                borderRadius: getScreenHeight(100),
              }}>
              <Image style={styles.icon} source={Images.home} />
            </View>
          </Marker>
        </MapView>
        <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints}>
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
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    width: getScreenHeight(2),
    height: getScreenHeight(2),
    resizeMode: 'contain',
    tintColor: Colors.white,
  },
});

export default OrderDelivery;
