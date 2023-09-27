import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { connect } from 'react-redux';

const CartIcon = (props) => {
  return (
    <View style={styles.badge}>
      {props.cartItem.length ? (
        <View style={styles.badgeInner}>
          <Text style={styles.text}>{props.cartItem.length}</Text>
        </View>
      ) : null}
    </View>
  )

};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItem: cartItems,
  };
};

const styles = StyleSheet.create({
  badge: {
    width: 25,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: -4,
    right: -15,
    backgroundColor: 'red', // You can customize the badge background color
    borderRadius: 25, // Make it round
  },
  badgeInner: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white', // You can customize the text color
  },
});

export default connect(mapStateToProps)(CartIcon);
