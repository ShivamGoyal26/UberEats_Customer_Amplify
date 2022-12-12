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
import MapViewDirections from 'react-native-maps-directions';
import {goBack} from '../../utils/routerServices';

const ORDER_STATUS = {
  READY_FOR_PICKUP: 'READY_FOR_PICKUP',
  ACCEPTED: 'ACCEPTED',
  PICKED_UP: 'PICKED_UP',
};

const OrderDelivery = (props: any) => {
  const order = props.route.params.item;
  const {height, width} = useWindowDimensions();

  const restaurantLocation = useMemo(() => {
    return {
      latitude: order.Restaurant.lat,
      longitude: order.Restaurant.lng,
    };
  }, []);

  const deliveryLocation = useMemo(() => {
    return {
      latitude: order.User.lat,
      longitude: order.User.lng,
    };
  }, []);

  const bottomSheetRef: any = useRef(null);
  const mapRef: any = useRef(null);
  // variables
  const snapPoints = useMemo(() => ['12%', '90%'], []);

  const [driverLocation, setDriverLocation]: any = useState(null);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [totalKm, setTotalKm] = useState(0);
  const [deliveryStatus, setDeliveryStatus] = useState(
    ORDER_STATUS.READY_FOR_PICKUP,
  );
  const [isDriverClose, setIsDriverClose] = useState(false);

  useEffect(() => {
    oneTimePickLocation();

    const watchID = Geolocation.watchPosition(
      position => {
        console.log('updated location', position.coords);
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
      // fastestInterval ==> after this much miliseconds it will check
      {enableHighAccuracy: true, fastestInterval: 5000, distanceFilter: 20},
    );
    return () => Geolocation.clearWatch(watchID);
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

  const onButtonPressed = () => {
    if (deliveryStatus === ORDER_STATUS.READY_FOR_PICKUP) {
      bottomSheetRef.current.collapse();
      mapRef.current.animateToRegion({
        latitude: driverLocation.latitude,
        longitude: driverLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      setDeliveryStatus(ORDER_STATUS.ACCEPTED);
    }
    if (deliveryStatus === ORDER_STATUS.ACCEPTED) {
      setDeliveryStatus(ORDER_STATUS.PICKED_UP);
    }
    if (deliveryStatus === ORDER_STATUS.PICKED_UP) {
      goBack();
      Alert.alert('Delivery Finished');
    }
  };

  const renderButtonTitle = () => {
    if (deliveryStatus === ORDER_STATUS.READY_FOR_PICKUP) {
      return 'Accept Order';
    }
    if (deliveryStatus === ORDER_STATUS.ACCEPTED) {
      return 'Pick-Up Order';
    }
    if (deliveryStatus === ORDER_STATUS.PICKED_UP) {
      return 'Complete Delivery';
    }
  };

  const isButtonDisabled = () => {
    if (deliveryStatus === ORDER_STATUS.READY_FOR_PICKUP) {
      return false;
    }
    if (deliveryStatus === ORDER_STATUS.ACCEPTED && isDriverClose) {
      return false;
    }
    if (deliveryStatus === ORDER_STATUS.PICKED_UP && isDriverClose) {
      return false;
    }
    return true;
  };

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
          ref={mapRef}
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
          <MapViewDirections
            strokeWidth={10}
            strokeColor={Colors.green}
            origin={driverLocation}
            waypoints={
              deliveryStatus === ORDER_STATUS.READY_FOR_PICKUP
                ? [restaurantLocation]
                : []
            }
            destination={
              deliveryStatus === ORDER_STATUS.ACCEPTED
                ? restaurantLocation
                : deliveryLocation
            }
            apikey={'AIzaSyAbcVfeiTr0sdz1M8eCYzNeUKqyU4XDMIc'}
            onReady={res => {
              setIsDriverClose(res.distance <= 0.1);
              setTotalMinutes(res.duration);
              setTotalKm(res.distance);
            }}
          />
          <Marker
            title={order.Restaurant.name}
            description={order.Restaurant.address}
            coordinate={restaurantLocation}>
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
        <BottomSheet index={1} ref={bottomSheetRef} snapPoints={snapPoints}>
          <View style={styles.bottomsheet}>
            <Text style={styles.title}>
              {totalMinutes.toFixed(0)} min, {totalKm.toFixed(2)} km
            </Text>
            <Text>Available Orders: {orders.length}</Text>
          </View>
          <View style={styles.contanier}>
            <CustomButton
              color={isButtonDisabled() ? 'grey' : Colors.green}
              disabled={isButtonDisabled()}
              action={onButtonPressed}
              title={renderButtonTitle()}
            />
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
