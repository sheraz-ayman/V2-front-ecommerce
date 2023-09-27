import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const paymentCards = [
  { name: "Wallet", value: 1 },
  { name: "Visa", value: 2 },
  { name: "MasterCard", value: 3 },
  { name: "Other", value: 4 },
];

const Payment = (props) => {
  const [selectedCard, setSelectedCard] = useState(null);

  const order = props.route.params?.order;

  const handleCardSelection = (value) => {
    setSelectedCard(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your payment method</Text>
      {paymentCards.map((card) => (
        <TouchableOpacity
          key={card.value}
          style={[
            styles.cardItem,
            selectedCard === card.value && styles.selectedCardItem,
          ]}
          onPress={() => handleCardSelection(card.value)}
        >
          <Text style={styles.cardItemText}>{card.name}</Text>
          <RadioButton selected={selectedCard === card.value} />
        </TouchableOpacity>
      ))}
      <Button
        title="Confirm"
        onPress={() => props.navigation.navigate("Confirm", { order: order })}
      />
    </View>
  );
};

const RadioButton = ({ selected }) => (
  <View style={styles.radioButton}>
    {selected && <View style={styles.radioButtonInner} />}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 28,
    marginBottom: 24,
    textAlign: "center",
    fontWeight: "bold",
    color: "#333",
  },
  cardItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  selectedCardItem: {
    backgroundColor: "#e6f7ff",
  },
  cardItemText: {
    flex: 1,
    fontSize: 18,
    color: "#333",
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#007AFF",
  },
});

export default Payment;
