import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Alert,
  Pressable,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { URL } from "./constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Signup = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(true);
  const [currentUser, setCurrentUser] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handlelogIn = () => {
    if (!data.email || !data.password) {
      Alert.alert("Missing Field", "Email and Password are required");
      return;
    }
    axios;
    axios
      .post(
        `${URL}/login`,
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("response", response.data);
        const { fullName, ...userData } = response.data;
        AsyncStorage.setItem("userData", JSON.stringify(userData));
        setCurrentUser(fullName);
        navigation.reset({
          index: 0,
          routes: [{ name: "MainTabs" }],
        });
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          Alert.alert("Login Failed", "Please check your email and password", [
            { text: "Okay" },
          ]);
        }
        console.log("Error:", err);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>AgriTrade Form</Text>
      <KeyboardAvoidingView
        style={styles.KeyboardAdvord}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <KeyboardAwareScrollView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.formContainer}>
              <View style={styles.loginformContainer}>
                <View style={[styles.searchBar, styles.searchBarWidth]}>
                  <Fontisto name="email" size={20} color="black" />
                  <View style={styles.searchInputContainer}>
                    <TextInput
                      placeholder="Email"
                      placeholderTextColor="black"
                      style={styles.inputStyles}
                      value={data.email}
                      autoCapitalize="none"
                      keyboardType="email-address"
                      onChangeText={(val) => setData({ ...data, email: val })}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.loginformContainer}>
                <View style={[styles.searchBar, styles.searchBarWidth]}>
                  <EvilIcons name="lock" size={28} color="black" />
                  <View style={styles.searchInputContainer}>
                    <TextInput
                      secureTextEntry={showPassword}
                      placeholder="Password"
                      placeholderTextColor="black"
                      style={styles.inputStyles}
                      value={data.password}
                      onChangeText={(val) =>
                        setData({ ...data, password: val })
                      }
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

              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handlelogIn}>
                  <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
              </View>

              {/* <Pressable onPress={() => navigation.navigate("PaswordUpdate")}>
                <Text style={styles.updateText}>Update Password </Text>
              </Pressable> */}

              <View style={styles.option}>
                <Text style={styles.accountName}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                  <Text style={styles.optionText}>Resgister</Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
  },

  headerImage: {
    height: 150,
    justifyContent: "flex-end",
    paddingHorizontal: 10,
  },

  icon: {
    marginRight: 10,
  },

  appName: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 40,
    color: "#00B251",
  },

  accountName: {
    fontWeight: "bold",
  },

  buttonContainer: {
    marginTop: 13,
    backgroundColor: "#00B251",
    borderRadius: 11,
    paddingHorizontal: -5,
    padding: 10,
    paddingVertical: 15,
    marginLeft: -6,
  },

  buttonText: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },

  KeyboardAdvord: {
    flex: 100,
    padding: 5,
  },
  loginStyles: {
    fontSize: 30,
    marginBottom: 10,
  },
  option: {
    flexDirection: "row",
    marginTop: 30,
    paddingHorizontal: 50,
    alignItems: "center",
  },

  optionText: {
    color: "black",
    fontSize: 15,
    color: "#00B251",
    paddingHorizontal: 2,
  },

  updateText: {
    marginTop: 15,
  },

  // Form Login Styles
  formContainer: {
    marginTop: 90,
    marginRight: 10,
    marginLeft: 20,
  },

  searchInputContainer: {
    flex: 1,
  },

  loginformContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 1,
    marginLeft: -10,
    padding: 4,
    marginTop: 10,
  },

  inputStyles: {
    marginBottom: 1,
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
    height: 50,
  },

  fieldText: {
    textAlign: "right",
    color: "black",
    fontSize: 15,
  },
});
