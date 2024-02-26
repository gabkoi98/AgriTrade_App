import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Foundation } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const Payment = () => {
  const [showCartInfo, setShowCartInfo] = useState(false);
  const [showMobileInfo, setShowMobileInfo] = useState(false);

  const toggleCartInfo = () => {
    setShowCartInfo(!showCartInfo);
    setShowMobileInfo(false);
  };

  const toggleMobileInfo = () => {
    setShowMobileInfo(!showMobileInfo);
    setShowCartInfo(false);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.inner}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={toggleCartInfo} style={styles.button}>
              <Text style={styles.buttonTexTop}>Card</Text>
            </TouchableOpacity>

            <View style={styles.verticalLine} />

            <TouchableOpacity onPress={toggleMobileInfo} style={styles.button}>
              <Text style={styles.buttonTexTop}>Mobile</Text>
            </TouchableOpacity>
          </View>
          {showCartInfo && (
            <View style={styles.infoContainer}>
              <Text style={styles.cardText}>Card Number</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Enter card number"
                  style={styles.input}
                  keyboardType="numeric"
                  placeholderTextColor="black"
                />
                {<Foundation name="credit-card" size={24} color="black" />}
              </View>

              <Text style={styles.cardText}>Card Holder Name</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Enter card holder name"
                  placeholderTextColor="black"
                  style={styles.input}
                />
                <Feather name="user" size={24} color="black" />
              </View>

              <Text style={styles.cardText}>Expiration Date</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="MM/YY"
                  style={styles.input}
                  keyboardType="numeric"
                  placeholderTextColor="black"
                  maxLength={5}
                />
              </View>

              <Text style={styles.cardText}> 3-Digit cvv</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="CVV"
                  placeholderTextColor="black"
                  style={styles.input}
                  keyboardType="numeric"
                  maxLength={3}
                />
              </View>
            </View>
          )}

          {showMobileInfo && (
            <View style={styles.infoContainer}>
              <Text style={styles.cardText}>Orange money number</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Enter number"
                  style={styles.input}
                  keyboardType="numeric"
                  placeholderTextColor="black"
                />
                <FontAwesome5 name="money-check-alt" size={18} color="black" />
              </View>

              <Text style={styles.cardText}>Orange Money Password</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Enter password"
                  keyboardType="numeric"
                  placeholderTextColor="black"
                  style={styles.input}
                />
                <Feather name="eye-off" size={20} color="black" />
              </View>

              <Text style={styles.cardText}>confirmed Password</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Enter password"
                  keyboardType="numeric"
                  placeholderTextColor="black"
                  style={styles.input}
                />
                <Feather name="eye-off" size={20} color="black" />
              </View>
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.buttonText}>Continue Payment</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
  },
  inner: {
    marginTop: 0,
    justifyContent: "flex-end",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  infoContainer: {
    paddingHorizontal: 20,
  },
  cardText: {
    fontSize: 20,
    color: "black",
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },

  button: {
    padding: 13,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "45%",
    justifyContent: "center",
    alignItems: "center",
  },

  addButton: {
    backgroundColor: "#00B251",
    padding: 14,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginTop: 15,
    width: "90%",
    alignSelf: "center",
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },

  buttonTexTop: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },

  verticalLine: {
    width: 2,
    height: "80%",
    backgroundColor: "black",
  },
});
