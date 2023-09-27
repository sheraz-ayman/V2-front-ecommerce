import React, { useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import FormContainer from '../../Shared/Form/FormContainer'
import Input from "../../Shared/Form/input"
import Error from '../../Shared/Error'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-toast-message'

import axios from 'axios'

const Register = (props) => {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')


    const register = () => {
        if (
            email === "" ||
            name === "" ||
            phone === "" ||
            password === ""
        ) {
            setError("Please fill all forms correctly")
        }

        let user = {
            name: name,
            email: email,
            password: password,
            phone: phone,
            isAdmin: false
        }

        axios.post(`http://192.168.100.105:5000/api/v1/users/register`, user)
            .then((res) => {
                if (res.status == 200) {
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "Registeration Succeeded",
                        text2: "Please login into your account"
                    })
                    setTimeout(() => {
                        props.navigation.navigate("Login")
                    }, 500)
                }
            })
            .catch((error) => {
                Toast.show({
                    topOffset: 60,
                    type: "error",
                    text1: "Something went wrong",
                    text2: "Please Try again"
                })
            })
    }

    return (
        <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={200}
            enableOnAndroid={true}
        >

            <FormContainer title={'Register'}>
                <Input
                    placeholder={'Email'}
                    name={'email'}
                    id={'email'}
                    onChangeText={(text) => setEmail(text.toLowerCase())}
                />
                <Input
                    placeholder={'Name'}
                    name={'name'}
                    id={'name'}
                    onChangeText={(text) => setName(text)}
                />
                <Input
                    placeholder={'Phone Number'}
                    name={'phone'}
                    keyboardType={'numeric'}
                    id={'phone'}
                    onChangeText={(text) => setPhone(text)}
                />
                <Input
                    placeholder={'Password'}
                    name={'password'}
                    id={'password'}
                    securityTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                />
                <View styles={styles.buttonGroup}>
                    {error ? <Error message={error} /> : null}
                </View>
                <View>
                    <Button title={'Register'}
                        onPress={() => register()} />
                </View>
                <View>
                    <Button
                        title={'Back to Login'}
                        onPress={() => props.navigation.navigate('Login')}
                    />
                </View>

            </FormContainer>

        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    buttonGroup: {
        width: '80%',
        margin: 10,
        alignItems: 'center'
    }
})



export default Register;