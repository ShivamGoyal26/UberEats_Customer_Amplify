import {Auth} from 'aws-amplify';
import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomButton} from '../../components';
import CustomHeader from '../../components/CustomHeader';
import Colors from '../../constants/Colors';
import {getScreenHeight} from '../../utils/domUtils';
import {navigate} from '../../utils/routerServices';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const signUpManager = async () => {
    try {
      const res = await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          address: address,
          name: name,
        },
      });
      if (res) {
        navigate('ConfirmationOTP', {data: res});
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.screen}>
        <CustomHeader title="Sign up" />
        <View style={styles.contanier}>
          <View style={{height: getScreenHeight(3)}} />
          <TextInput
            placeholder="Enter the Name"
            placeholderTextColor={'grey'}
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <View style={{height: getScreenHeight(3)}} />
          <TextInput
            autoCapitalize="none"
            placeholder="Enter the email"
            placeholderTextColor={'grey'}
            value={email}
            onChangeText={setEmail}
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
          <TextInput
            placeholder="Enter the Address"
            placeholderTextColor={'grey'}
            value={address}
            onChangeText={setAddress}
            style={styles.input}
          />

          <View style={{height: getScreenHeight(3)}} />
          <CustomButton
            color={Colors.green}
            title="Sign up"
            action={signUpManager}
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

export default Signup;
