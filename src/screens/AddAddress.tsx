import { API, Auth } from 'aws-amplify';
import React, { useContext, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton } from '../components';
import CustomHeader from '../components/CustomHeader';
import Colors from '../constants/Colors';
import { authContext } from '../contexts/context';

import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';
import { getScreenHeight } from '../utils/domUtils';
import { goBack } from '../utils/routerServices';

const AddAddress = () => {
    const [address, setAddress] = useState('');
    const { user_data }: any =
        useContext(authContext);


    const addAddress = async () => {
        try {
            let finalAddress = {
                address: address,
                lat: 42.23763,
                lng: 27.83734,
                userID: user_data.attributes.sub
            }
            const res = await API.graphql({
                query: mutations.createAddress,
                variables: { input: finalAddress },
            });
            if(res) {
                Alert.alert("Address has been added")
                goBack()
            }
        } catch (error: any) {
            console.log(error.errors[0].message)
            Alert.alert(error.errors[0].message)
        }
    }


    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.screen}>
                <CustomHeader title="Add Address" />
                <View style={styles.contanier}>

                    <TextInput
                        placeholder="Enter the address"
                        placeholderTextColor={'grey'}
                        value={address}
                        onChangeText={setAddress}
                        style={styles.input}
                    />

                    <View style={{ height: getScreenHeight(3) }} />

                    <CustomButton action={addAddress} color={Colors.green} title="Add" />
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

export default AddAddress;
