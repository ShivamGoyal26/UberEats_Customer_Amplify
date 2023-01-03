import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Text,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {API, DataStore} from 'aws-amplify';
import {Address} from '../models';
import CustomLoader from '../components/CustomLoader';
import Colors from '../constants/Colors';
import CustomHeader from '../components/CustomHeader';
import NotFound from '../components/NotFound';
import {getScreenHeight} from '../utils/domUtils';
import {authContext} from '../contexts/context';
import {CustomButton} from '../components';
import {navigate} from '../utils/routerServices';
import * as mutations from '../graphql/mutations';

const ManageAddress = (props: any) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {user_data}: any = useContext(authContext);

  useEffect(() => {
    const sub = DataStore.observeQuery(Address, address =>
      address.userID.eq(user_data.attributes.sub),
    ).subscribe(({items}: any) => {
      setData(items);
      setLoading(false);
    });

    return () => {
      sub.unsubscribe();
    };
  }, []);

  const deleteAddress = async (id: any, _version: any) => {
    try {
      const res = await API.graphql({
        query: mutations.deleteAddress,
        variables: {input: {id, _version}},
      });
      console.log('S>S>res', res);
    } catch (error: any) {
      console.log(error);
      Alert.alert(error.errors[0].message);
    }
  };

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate('DishDetail', {item})}
        style={styles.item}>
        <View style={styles.row}>
          <Text style={styles.subtitle}>{item.address}</Text>
          <TouchableOpacity
            onPress={() => {
              Alert.alert('Delete Address', 'Are you sure?', [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: () => deleteAddress(item.id, item._version),
                },
              ]);
            }}>
            <Text style={[styles.subtitle, {color: 'red'}]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return <CustomLoader />;
  }

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <StatusBar backgroundColor={Colors.green} barStyle="light-content" />
      <View style={styles.screen}>
        <CustomHeader title="Address" />
        <FlatList
          data={data}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.flatlist}
          ListEmptyComponent={NotFound}
        />
        <CustomButton
          title="Add Address"
          color={Colors.green}
          action={() => navigate('AddAddress')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safe: {
    flex: 1,
    backgroundColor: Colors.green,
  },
  flatlist: {
    padding: getScreenHeight(2),
  },
  item: {
    marginBottom: getScreenHeight(2),
  },
  subtitle: {
    color: Colors.black,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default ManageAddress;
