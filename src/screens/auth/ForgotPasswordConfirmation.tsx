import {Auth} from 'aws-amplify';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomButton} from '../../components';
import CustomHeader from '../../components/CustomHeader';
import CustomLoader from '../../components/CustomLoader';
import Colors from '../../constants/Colors';
import {getScreenHeight} from '../../utils/domUtils';
import {navigate, popToTop} from '../../utils/routerServices';

const ForgotPasswordConfirmation = (props: any) => {
  const email = props.route.params.email;
  const [resend, setResend] = useState(false);

  const [OTP, setOTP] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const verifyForgotPassword = async () => {
    setLoading(true);
    try {
      const res = await Auth.forgotPasswordSubmit(email, OTP, password);
      if (res) {
        Alert.alert('Password change');
        popToTop();
      }
    } catch (error: any) {
      Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const resendConfirmationCode = async () => {
    setResend(true);
    try {
      const res = await Auth.forgotPassword(email);
      if (res) {
        Alert.alert('code resent successfully');
      }
    } catch (error: any) {
      Alert.alert(error.message);
    } finally {
      setResend(false);
    }
  };

  if (resend || loading) {
    return <CustomLoader />;
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.screen}>
        <CustomHeader title="Verify" />

        <View style={styles.contanier}>
          <Text style={{color: 'black'}}>Code sent to {email}</Text>
          <View style={{height: getScreenHeight(3)}} />

          <TextInput
            placeholder="Enter the code"
            placeholderTextColor={'grey'}
            value={OTP}
            onChangeText={setOTP}
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

          <TouchableOpacity onPress={resendConfirmationCode}>
            <Text>Resend Code</Text>
          </TouchableOpacity>

          <View style={{height: getScreenHeight(3)}} />
          <CustomButton
            color={Colors.green}
            title="verify"
            action={verifyForgotPassword}
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

export default ForgotPasswordConfirmation;
