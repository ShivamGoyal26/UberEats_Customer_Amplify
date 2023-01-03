import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DataStore } from 'aws-amplify';

import CustomHeader from '../../components/CustomHeader';
import ResturantItem from '../../components/ResturantItem';
import Colors from '../../constants/Colors';
import { getScreenHeight } from '../../utils/domUtils';
import CustomLoader from '../../components/CustomLoader';
import NotFound from '../../components/NotFound';
import { Restaurant } from '../../models';

const Home = (props: any) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const sub = DataStore.observeQuery(Restaurant).subscribe(({items}: any) => {
      setData(items)
      setLoading(false)
    })

    return () => {
      sub.unsubscribe();
    };
  }, []);



  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate("DishDetail", { item })}
        style={styles.item}>
        <ResturantItem item={item} />
      </TouchableOpacity>
    );
  };

  if (loading) {
    return <CustomLoader />;
  }

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <StatusBar backgroundColor={Colors.green} barStyle = "light-content" />
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
});

export default Home;
