import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const OrderSummary = ({ navigation, route }) => {
  const { cartItems } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>Item</Text>
        <Text style={styles.tableCell}>Quantity</Text>
        <Text style={styles.tableCell}>Price</Text>
      </View>

      {cartItems.map((item) => (
        <View style={styles.tableRow} key={item.id}>
          <Text style={styles.tableCell}>{item.product.productname}</Text>
          <Text style={styles.tableCell}>{item.quantity}</Text>
          <Text style={styles.tableCell}>
            ${(item.product.price * item.quantity).toFixed(2)}
          </Text>
        </View>
      ))}

      <View style={styles.totalRow}>
        <Text style={styles.totalCell}>Total:</Text>
        <Text style={styles.totalCell}></Text>
        <Text style={styles.totalCell}>
          $
          {cartItems
            .reduce(
              (total, item) => total + item.product.price * item.quantity,
              0
            )
            .toFixed(2)}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("Payment")}
      >
        <Text style={styles.buttonText}>Continue Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    marginTop: 95,
  },
  header: {
    fontSize: 18,
    marginBottom: 16,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  tableCell: {
    flex: 1,
    marginRight: 8,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },

  totalCell: {
    flex: 1,
    fontWeight: "bold",
  },

  addButton: {
    backgroundColor: "#00B251",
    padding: 13,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginTop: 20,
    width: "100%",
    alignSelf: "center",
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
  },
});

export default OrderSummary;
