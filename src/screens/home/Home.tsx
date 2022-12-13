import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {API, graphqlOperation} from 'aws-amplify';
import * as queries from '../../graphql/queries';
import {DataStore} from '@aws-amplify/datastore';

import CustomHeader from '../../components/CustomHeader';
import ResturantItem from '../../components/ResturantItem';
import Colors from '../../constants/Colors';
import {getScreenHeight} from '../../utils/domUtils';
import CustomLoader from '../../components/CustomLoader';
import NotFound from '../../components/NotFound';
import {Restaurant} from '../../models';

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRestaurants = async () => {
    try {
      const res: any = await API.graphql(
        graphqlOperation(queries.listRestaurants),
      );
      if (res?.data?.listRestaurants?.items?.length) {
        setData(res?.data?.listRestaurants?.items);
      }
    } catch (error) {
      console.log('Error here', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const renderItem = ({item}: any) => {
    return (
      <View style={styles.item}>
        <ResturantItem item={item} />
      </View>
    );
  };

  if (loading) {
    return <CustomLoader />;
  }

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <View style={styles.screen}>
        <CustomHeader title="Restruants" />
        <FlatList
          data={data}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.flatlist}
          ListEmptyComponent={NotFound}
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
  flatlist: {
    padding: getScreenHeight(2),
  },
  item: {
    marginBottom: getScreenHeight(2),
  },
});

export default Home;
