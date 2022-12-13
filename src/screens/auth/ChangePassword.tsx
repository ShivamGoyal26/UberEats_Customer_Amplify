import {Auth} from 'aws-amplify';
import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomButton} from '../../components';
import CustomHeader from '../../components/CustomHeader';
import CustomLoader from '../../components/CustomLoader';
import Colors from '../../constants/Colors';
import {authContext} from '../../contexts/context';
import {getScreenHeight} from '../../utils/domUtils';
import {goBack, navigate} from '../../utils/routerServices';

const ChangePassword = () => {
  const {user_data}: any = useContext(authContext);
  const [loading, setLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');

  const changePassword = async () => {
    setLoading(true);
    try {
      const res = await Auth.changePassword(
        user_data,
        currentPassword,
        password,
      );
      if (res) {
        Alert.alert('Password changed successfully');
        goBack();
      }
    } catch (error: any) {
      Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <CustomLoader />;
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.screen}>
        <CustomHeader title="Change Password" />
        <View style={styles.contanier}>
          <TextInput
            autoCapitalize="none"
            placeholder="Enter the Current Password"
            placeholderTextColor={'grey'}
            value={currentPassword}
            onChangeText={setCurrentPassword}
            style={styles.input}
          />
          <View style={{height: getScreenHeight(3)}} />
          <TextInput
            placeholder="Enter the Password"
            placeholderTextColor={'grey'}
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />

          <View style={{height: getScreenHeight(3)}} />
          <CustomButton
            action={changePassword}
            color={Colors.green}
            title="Change Password"
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
    padding: getScreenHeight(2),
  },
  input: {
    color: Colors.black,
  },
});

export default ChangePassword;
