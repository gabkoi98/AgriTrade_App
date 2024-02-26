import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import { URL } from "./constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";

const Signup = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [data, setData] = useState({
    fullname: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignUp = async () => {
    try {
      if (
        !data.fullname ||
        !data.email ||
        !data.username ||
        !data.password ||
        !data.confirmPassword
      ) {
        throw new Error("Please fill in all the required fields");
      }

      if (data.password !== data.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const response = await axios.post(
        `${URL}/register`,
        {
          fullname: data.fullname,
          email: data.email,
          username: data.username,
          password: data.password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data) {
        console.log(response.data);

        const jsonValue = JSON.stringify(response.data);
        await AsyncStorage.setItem("signupData", jsonValue);
        navigation.navigate("SignIn");
      } else {
        console.log("Unexpected response data:", response.data);
        throw new Error("Unexpected response data");
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        Alert.alert("Login Failed", "Please check your email and password", [
          { text: "Okay" },
        ]);
      } else {
        Alert.alert("Error", err.message);
        console.log("Error:", err);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>Create account</Text>

      <KeyboardAwareScrollView extraHeight={120}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={styles.formContainer}>
            <View style={styles.SignupformContainer}>
              <View style={[styles.searchBar, styles.searchBarWidth]}>
                <AntDesign name="user" size={24} color="black" />
                <View style={styles.searchInputContainer}>
                  <TextInput
                    placeholder="Full Name"
                    placeholderTextColor="#7F8487"
                    style={styles.inputStyles}
                    value={data.fullname}
                    onChangeText={(val) => setData({ ...data, fullname: val })}
                  />
                </View>
              </View>
            </View>

            <View style={styles.SignupformContainer}>
              <View style={[styles.searchBar, styles.searchBarWidth]}>
                <AntDesign name="user" size={24} color="black" />
                <View style={styles.searchInputContainer}>
                  <TextInput
                    placeholder="Username "
                    placeholderTextColor="#7F8487"
                    style={styles.inputStyles}
                    value={data.username}
                    onChangeText={(val) => setData({ ...data, username: val })}
                  />
                </View>
              </View>
            </View>

            <View style={styles.SignupformContainer}>
              <View style={[styles.searchBar, styles.searchBarWidth]}>
                <Fontisto name="email" size={20} color="black" />
                <View style={styles.searchInputContainer}>
                  <TextInput
                    placeholder="Enter email "
                    placeholderTextColor="#7F8487"
                    style={styles.inputStyles}
                    value={data.email}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    onChangeText={(val) => setData({ ...data, email: val })}
                  />
                </View>
              </View>
            </View>

            <View style={styles.SignupformContainer}>
              <View style={[styles.searchBar, styles.searchBarWidth]}>
                <EvilIcons name="lock" size={30} color="black" />
                <View style={styles.searchInputContainer}>
                  <TextInput
                    secureTextEntry={showPassword}
                    placeholder="Password"
                    placeholderTextColor="#7F8487"
                    style={styles.inputStyles}
                    value={data.password}
                    onChangeText={(val) => setData({ ...data, password: val })}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Feather
                    name={showPassword ? "eye-off" : "eye"}
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.SignupformContainer}>
              <View style={[styles.searchBar, styles.searchBarWidth]}>
                <EvilIcons name="lock" size={30} color="black" />
                <View style={styles.searchInputContainer}>
                  <TextInput
                    secureTextEntry={showConfirmPassword}
                    placeholder="Confirm Password"
                    placeholderTextColor="#7F8487"
                    style={styles.inputStyles}
                    value={data.confirmPassword}
                    onChangeText={(val) =>
                      setData({ ...data, confirmPassword: val })
                    }
                  />
                </View>
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Feather
                    name={showConfirmPassword ? "eye-off" : "eye"}
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleSignUp}>
                <Text style={styles.buttonText}>Signup</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
  },

  appName: {
    fontSize: 39,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#00B251",
  },

  buttonContainer: {
    marginTop: 13,
    backgroundColor: "#00B251",
    borderRadius: 11,
    paddingHorizontal: -5,
    padding: 10,
    paddingVertical: 15,
    marginLeft: -1,
  },

  buttonText: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },

  formContainer: {
    marginTop: 40,
    marginRight: 10,
    marginLeft: 20,
  },

  searchInputContainer: {
    flex: 1,
  },

  SignupformContainer: {
    justifyContent: "space-between",
    padding: 2,
    marginTop: -2,
    width: "100%",
    margin: 1,
    marginLeft: 1,
    marginRight: 10,
  },

  inputStyles: {
    paddingHorizontal: 10,
    fontSize: 15,
  },

  searchBar: {
    flex: 1,
    flexDirection: "row",
  },

  searchBarWidth: {
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    height: 48,
  },

  fieldText: {
    textAlign: "right",
    color: "black",
    fontSize: 15,
  },
});

export default Signup;
