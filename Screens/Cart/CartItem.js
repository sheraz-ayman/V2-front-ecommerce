import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const CartItem = (props) => {
  const item = props.item;

  return (
    <View style={styles.listItem}>
      <Image
        source={{
          uri: item.product.image
            ? item.product.image
            : 'https://i.pinimg.com/474x/47/32/eb/4732eb1592b116443340917e51eed478.jpg',
        }}
        style={styles.thumbnail}
      />
      <View style={styles.body}>
        <Text>{item.product.name}</Text>
        <Text>${item.product.price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  thumbnail: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  body: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default CartItem;
