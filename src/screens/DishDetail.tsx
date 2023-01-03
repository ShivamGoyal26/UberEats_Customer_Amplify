import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {API, DataStore} from 'aws-amplify';

import CustomHeader from '../components/CustomHeader';
import Colors from '../constants/Colors';
import {getScreenHeight} from '../utils/domUtils';
import {Basket, BasketDish, Dish} from '../models';
import NotFound from '../components/NotFound';
import MenuItem from '../components/MenuItem';
import {authContext} from '../contexts/context';
import * as mutations from '../graphql/mutations';
import {CustomButton} from '../components';
import {navigate} from '../utils/routerServices';

const DishDetail = (props: any) => {
  const item = props.route.params.item;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [basketData, setBasketData] = useState(null);
  const {user_data}: any = useContext(authContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const sub = DataStore.observeQuery(Dish, dish =>
      dish.restaurantID.eq(item.id),
    ).subscribe(({items}: any) => {
      setData(items);
      setLoading(false);
    });

    return () => {
      sub.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const subscription = DataStore.observeQuery(Basket, c =>
      c.and(c => [
        c.restaurantID.eq(item.id),
        c.userID.eq(user_data.attributes.sub),
      ]),
    ).subscribe(msg => {
      console.log('>>> length >>>>', msg.items.length);
      if (!msg.items.length) {
        craateBasket();
      }
      setBasketData(msg.items[0]);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const sub = DataStore.observeQuery(BasketDish, dish =>
      dish.basketID.eq(basketData?.id),
    ).subscribe(({items}: any) => {
      console.log('S>>S>S', items);
      setCartData(items);
    });

    return () => {
      sub.unsubscribe();
    };
  }, [basketData]);

  const craateBasket = async () => {
    let createBasketData = {
      restaurantID: item.id,
      userID: user_data.attributes.sub,
    };
    const res = await API.graphql({
      query: mutations.createBasket,
      variables: {input: createBasketData},
    });
    console.log('Create Basket', res);
  };

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          const result = cartData.filter((i: any) => {
            if (i.basketDishDishId === item.id) {
              return true;
            }
            return false;
          });
          console.log(result[0]);
          props.navigation.navigate('MenuDetail', {
            item,
            basketData,
            result: result[0],
          });
        }}>
        <MenuItem item={item} />
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <View style={styles.screen}>
        <CustomHeader title={item.name} />
        {/* <ScrollView> */}
        <Image style={styles.image} source={{uri: item.image}} />
        <View style={styles.contanier}>
          <Text style={styles.subtitle}>
            Time: {item.minDeliveryTime} - {item.maxDeliveryTime} min
          </Text>
          <Text style={styles.subtitle}>Address: {item.address}</Text>

          <View style={{height: getScreenHeight(2)}} />
          <Text style={styles.subtitle}>
            {'Total Cart Items'} {cartData.length}
          </Text>
          <View style={{height: getScreenHeight(2)}} />
          <Text style={styles.subtitle}>MENU</Text>
          <View style={{height: getScreenHeight(2)}} />
          <CustomButton
            title="Place Order"
            color={Colors.green}
            action={() => navigate('PlaceOrder', {cartData})}
          />
          <FlatList
            data={data}
            keyExtractor={(_, index) => index.toString()}
            ListEmptyComponent={NotFound}
            renderItem={renderItem}
          />
        </View>

        {/* </ScrollView> */}
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

export default DishDetail;
