import React, { useState, useEffect, use } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  RefreshControl,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { URL } from "./constants";
import { useFocusEffect } from "@react-navigation/native";

const EditProfile = () => {
  const [data, setData] = useState({
    id: "",
    fullname: "",
    user: "",
    address: "",
    phone: "",
    password: "",
    email: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        if (userData) {
          const parsedUserData = JSON.parse(userData);
          setData(parsedUserData);
        } else {
          Alert.alert("User data not found.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        Alert.alert("Error fetching user data.");
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = () => {
    axios
      .put(
        `${URL}/update`,
        {
          id: data.id,
          fullname: data.fullname,
          username: data.user,
          address: data.address,
          phone: data.phone,
          email: data.email,
          password: data.password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        console.log("Profile updated successfully:", response.data);
        AsyncStorage.setItem("userData", JSON.stringify(response.data)); // update user data in AsyncStorage
        Alert.alert("Profile Updated Successfully");
      })
      .catch((error) => {
        console.error("Error updating profile:", error.response?.data);
        Alert.alert("Error updating profile");
      });
  };

  return (
    <ScrollView style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={{ alignItems: "center", marginTop: 30, marginBottom: 30 }}>
          <View style={styles.profileInfo}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Full Name:</Text>
              <TextInput
                style={styles.input}
                value={data.fullname}
                onChangeText={(val) => setData({ ...data, fullname: val })}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Username:</Text>
              <TextInput
                style={styles.input}
                value={data.user}
                onChangeText={(val) => setData({ ...data, user: val })}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email:</Text>
              <TextInput
                style={styles.input}
                value={data.email}
                onChangeText={(val) => setData({ ...data, email: val })}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Address:</Text>
              <TextInput
                style={styles.input}
                value={data.address}
                onChangeText={(val) => setData({ ...data, address: val })}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Phone:</Text>
              <TextInput
                keyboardType="numeric"
                style={styles.input}
                value={data.phone}
                onChangeText={(val) => setData({ ...data, phone: val })}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password:</Text>
              <TextInput
                style={styles.input}
                value={data.password}
                onChangeText={(val) => setData({ ...data, password: val })}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.addButton} onPress={handleUpdate}>
            <Text style={styles.buttonText}>UPDATE</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
  },
  profileInfo: {
    width: 335,
  },
  label: {
    fontWeight: "bold",
  },
  inputContainer: {
    marginBottom: 25,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "#EEEEEE", // Input border color
    borderBottomWidth: 2,
  },

  addButton: {
    backgroundColor: "#00B251",
    padding: 13,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginTop: -15,
    width: "90%",
    alignSelf: "center",
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default EditProfile;
