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
import Colors from '../../constants/Colors';
import {authContext} from '../../contexts/context';
import {getScreenHeight} from '../../utils/domUtils';
import {navigate} from '../../utils/routerServices';

const Login = () => {
  const [email, setEmail] = useState('caroline@yopmail.com');
  const [password, setPassword] = useState('12345678');
  const {setRefetch}: any = useContext(authContext);

  const signIn = async () => {
    try {
      const res = await Auth.signIn(email, password);
      if (res) {
        setRefetch(true);
      }
    } catch (error: any) {
      if (error.message === 'User is not confirmed.') {
        Alert.alert('Please verify first');
        resendConfirmationCode(email);
      } else {
        Alert.alert(error.message);
      }
    }
  };

  const resendConfirmationCode = async (userEmail: any) => {
    try {
      const res = await Auth.resendSignUp(userEmail);
      if (res) {
        navigate('ConfirmationOTP', {email: userEmail});
      }
    } catch (error: any) {
      Alert.alert(error.message);
    } finally {
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.screen}>
        <CustomHeader title="Login" />
        <View style={styles.contanier}>
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

          <TouchableOpacity onPress={() => navigate('Signup')}>
            <Text style={{color: Colors.black}}>
              Did not have account? Sign up
            </Text>
          </TouchableOpacity>

          <View style={{height: getScreenHeight(3)}} />

          <TouchableOpacity onPress={() => navigate('ForgotPassword')}>
            <Text style={{color: Colors.black}}>Forgot Password?</Text>
          </TouchableOpacity>

          <View style={{height: getScreenHeight(3)}} />

          <CustomButton action={signIn} color={Colors.green} title="Login" />
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

export default Login;
