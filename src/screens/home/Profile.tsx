import {Auth, DataStore} from 'aws-amplify';
import React, {useContext} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {CustomButton} from '../../components';
import CustomHeader from '../../components/CustomHeader';
import Colors from '../../constants/Colors';
import {authContext} from '../../contexts/context';
import {getScreenHeight} from '../../utils/domUtils';
import {navigate} from '../../utils/routerServices';

const Profile = () => {
  const {setUserData, user_data}: any = useContext(authContext);

  const signout = async () => {
    try {
      await Auth.signOut();

      setUserData(null);
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };
  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <View style={styles.screen}>
        <CustomHeader title="Profile" />

        <View style={styles.contanier}>
          <Text style={styles.title}>{user_data.attributes.email}</Text>
          <View
            style={{
              height: getScreenHeight(2),
            }}
          />
          <Text style={styles.title}>{user_data.attributes.name}</Text>
          <View
            style={{
              height: getScreenHeight(2),
            }}
          />
          <Text style={styles.title}>{user_data.attributes.address}</Text>
          <View
            style={{
              height: getScreenHeight(2),
            }}
          />
          <TouchableOpacity onPress={signout}>
            <Text style={[styles.title, {color: 'red'}]}>{'Sign Out'}</Text>
          </TouchableOpacity>
          <View
            style={{
              height: getScreenHeight(4),
            }}
          />
          <CustomButton
            color={Colors.green}
            action={() => navigate('EditProfile')}
            title="Edit Profile"
          />
          <View
            style={{
              height: getScreenHeight(4),
            }}
          />
          <CustomButton
            color={Colors.green}
            action={() => navigate('ChangePassword')}
            title="Change Password"
          />
          <View
            style={{
              height: getScreenHeight(4),
            }}
          />
          <CustomButton
            color={Colors.green}
            action={() => navigate('ManageAddress')}
            title="Manage Address"
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
});

export default Profile;
