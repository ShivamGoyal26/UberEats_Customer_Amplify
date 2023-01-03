import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {API, DataStore, graphqlOperation} from 'aws-amplify';

import CustomHeader from '../components/CustomHeader';
import Colors from '../constants/Colors';
import {getScreenHeight} from '../utils/domUtils';
import {Dish} from '../models';
import {CustomButton} from '../components';
import * as mutations from '../graphql/mutations';
import {goBack} from '../utils/routerServices';

const MenuDetail = (props: any) => {
  const item = props.route.params.item;
  const basketData = props.route.params.basketData;
  const result = props.route.params.result;
  const [data, setData]: any = useState(null);
  const [count, setCount] = useState(1);

  console.log('basketData', result);

  useEffect(() => {
    fetchMenuDetail();
  }, []);

  useEffect(() => {
    if (result) {
      setCount(result.quantity);
    }
  }, [result]);

  const addItemToBasket = async () => {
    let createBasketDetailData = {
      quantity: count,
      basketID: basketData.id,
      basketDishDishId: data.id,
    };

    if (result) {
      let updatedBasketData = {
        id: result.id,
        ...createBasketDetailData,
        _version: result._version,
      };
      const res = await API.graphql(
        graphqlOperation(mutations.updateBasketDish, {
          input: updatedBasketData,
        }),
      );

      if (res) {
        goBack();
      }
    } else {
      const res = await API.graphql({
        query: mutations.createBasketDish,
        variables: {input: createBasketDetailData},
      });
      console.log('created', res);
      if (res) {
        goBack();
      }
    }
  };

  const fetchMenuDetail = async () => {
    try {
      const res: any = await DataStore.query(Dish, item.id);
      if (res) {
        setData(res);
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const removeItem = async () => {
    try {
      const res = await API.graphql({
        query: mutations.deleteBasketDish,
        variables: {input: {id: result.id, _version: result._version}},
      });
      console.log('Deleted data >>>', res);
      if (res) {
        goBack();
      }
    } catch (error: any) {
      console.log(error);
      Alert.alert(error.errors[0].message);
    }
  };

  if (!data) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <View style={styles.screen}>
        <CustomHeader title={data.name} />
        {/* <ScrollView> */}
        <Image style={styles.image} source={{uri: data.image}} />
        <View style={styles.contanier}>
          <Text style={styles.subtitle}>{data.description}</Text>
          <Text style={styles.subtitle}>Price: ${data.price}</Text>
          <View style={styles.row}>
            <Text
              onPress={() => {
                if (count === 1) {
                  return;
                }
                setCount(pre => pre - 1);
              }}
              style={styles.subtitle}>
              Dec
            </Text>
            <Text
              style={[styles.subtitle, {marginHorizontal: getScreenHeight(2)}]}>
              {count}
            </Text>
            <Text
              onPress={() => {
                setCount(pre => pre + 1);
              }}
              style={styles.subtitle}>
              Inc
            </Text>
          </View>

          <CustomButton
            color={Colors.green}
            action={addItemToBasket}
            title={`Add ${count} to Basket for $${
              parseFloat(data.price) * count
            }`}
          />
          <View style={{height: getScreenHeight(5)}} />
          {result ? (
            <CustomButton
              color={Colors.green}
              action={() => removeItem(data)}
              title={'Remove'}
            />
          ) : null}
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
    textTransform: 'capitalize',
  },
  contanier: {
    padding: getScreenHeight(1),
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: getScreenHeight(3),
  },
});

export default MenuDetail;
