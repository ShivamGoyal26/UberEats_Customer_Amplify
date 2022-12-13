import {Auth} from 'aws-amplify';
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Alert, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomButton} from '../../components';
import CustomHeader from '../../components/CustomHeader';
import CustomLoader from '../../components/CustomLoader';
import Colors from '../../constants/Colors';
import {authContext} from '../../contexts/context';
import {getScreenHeight} from '../../utils/domUtils';
import {goBack} from '../../utils/routerServices';

const EditProfile = () => {
  const {user_data, setRefetch, setUserData}: any = useContext(authContext);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName(user_data.attributes.name);
    setAddress(user_data.attributes.address);
  }, [user_data]);

  const updateUser = async () => {
    setLoading(true);
    try {
      const res = await Auth.updateUserAttributes(user_data, {
        address: address,
        name: name,
      });
      if (res) {
        retrieveCurrentSession();
      }
    } catch (error: any) {
      Alert.alert(error.message);
      setLoading(false);
    }
  };

  const retrieveCurrentSession = () => {
    Auth.currentAuthenticatedUser({bypassCache: true})
      .then((data: any) => {
        setUserData(data);
        goBack();
        Alert.alert('Profile has been updated!');
      })
      .catch(err => {
        Alert.alert(err.message);
        setUserData(null);
        setLoading(false);
      });
  };

  if (loading) {
    return <CustomLoader />;
  }

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <View style={styles.screen}>
        <CustomHeader title="Edit Profile" />

        <View style={styles.contanier}>
          <TextInput
            placeholder="Enter the name"
            placeholderTextColor={'grey'}
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <View
            style={{
              height: getScreenHeight(2),
            }}
          />
          <TextInput
            placeholder="Enter the address"
            placeholderTextColor={'grey'}
            value={address}
            onChangeText={setAddress}
            style={styles.input}
          />
          <View
            style={{
              height: getScreenHeight(2),
            }}
          />
          <CustomButton
            color={Colors.green}
            title="Update Profile"
            action={updateUser}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contanier: {
    padding: getScreenHeight(1),
  },
  title: {
    color: Colors.black,
  },
  input: {
    color: Colors.black,
  },
});

export default EditProfile;
