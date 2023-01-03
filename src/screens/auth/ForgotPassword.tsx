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

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const forgotPassword = async () => {
    setLoading(true);
    try {
      const res = await Auth.forgotPassword(email);
      if (res) {
        Alert.alert(`Code has been sent to ${email}`);
        navigate('ForgotPasswordConfirmation', {
          email,
        });
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
        <CustomHeader title="Enter the email" />
        <View style={styles.contanier}>
          <TextInput
            autoCapitalize="none"
            placeholder="Enter the Email"
            placeholderTextColor={'grey'}
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />

          <View style={{height: getScreenHeight(3)}} />
          <CustomButton
            action={forgotPassword}
            color={Colors.green}
            title="Forgot Password"
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

export default ForgotPassword;
