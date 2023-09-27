import React, { useState, useEffect } from "react";
import { Text, View, Button, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import Input from "../../../Shared/Form/input";
import FormContainer from "../../../Shared/Form/FormContainer";
import { KeyboardAwarScrollView } from 'react-native-keyboard-aware-scroll-view'

const Checkout = (props) => {
  const [orderItems, setOrderItems] = useState([]);
  const [address, setAddress] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    setOrderItems(props.cartitems);

    return () => {
      setOrderItems([]);
    }
  }, []);

  const checkOut = () => {
    let order = {
        city,
        country,
        dateOrdered: Date.now(),
        orderItems,
        phone,
        shippingAddress1: address,
        shippingAddress2: address2,
        zip,
    };
    props.navigation.navigate('Payment', { order: order });
}


  return (
    <ScrollView>
      <FormContainer title="Shipping Address">
        <Input
          placeholder={'Phone'}
          name={'phone'}
          value={phone}
          keyboardType={'numeric'}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          placeholder={'Shipping Address 1'}
          name={'ShippingAddress1'}
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <Input
          placeholder={'Shipping Address 2'}
          name={'ShippingAddress2'}
          value={address2}
          onChangeText={(text) => setAddress2(text)}
        />
        <Input
          placeholder={'City'}
          name={'city'}
          value={city}
          onChangeText={(text) => setCity(text)}
        />
          <Input
          placeholder={'Country'}
          name={'cicountryty'}
          value={country}
          onChangeText={(text) => setCountry(text)}
        />
        <Input
          placeholder={'Zip code'}
          name={'zip'}
          keyboardType={'numeric'}
          value={zip}
          onChangeText={(text) => setZip(text)}
        />
        <View style={{ width: '80%', alignItems: 'center' }}>
          <Button title='Confirm' onPress={() => checkOut()} />
        </View>
      </FormContainer>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  const { cartitems } = state;
  return {
      cartitem: cartitems
  };
}

export default connect(mapStateToProps ,null )(Checkout);