import {Auth} from 'aws-amplify';
import React, {useContext, useState} from 'react';
import {View, StyleSheet, Text, TextInput, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomButton} from '../../components';
import CustomHeader from '../../components/CustomHeader';
import Colors from '../../constants/Colors';
import {authContext} from '../../contexts/context';
import {getScreenHeight} from '../../utils/domUtils';
import {goBack, navigate} from '../../utils/routerServices';

const ConfirmationOTP = (props: any) => {
  const data = props.route.params.data;
  const {setRefetch}: any = useContext(authContext);

  const [OTP, setOTP] = useState('');

  const confirmEmail = async () => {
    try {
      const res = await Auth.confirmSignUp(data.user.username, OTP);
      if (res) {
        setRefetch(true);
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.screen}>
        <CustomHeader title="Verify" />

        <View style={styles.contanier}>
          <Text style={{color: 'black'}}>
            Code sent to {data.user.username}
          </Text>
          <View style={{height: getScreenHeight(3)}} />

          <TextInput
            placeholder="Enter the code"
            placeholderTextColor={'grey'}
            value={OTP}
            onChangeText={setOTP}
            style={styles.input}
          />

          <View style={{height: getScreenHeight(3)}} />
          <CustomButton
            color={Colors.green}
            title="verify"
            action={confirmEmail}
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

export default ConfirmationOTP;
