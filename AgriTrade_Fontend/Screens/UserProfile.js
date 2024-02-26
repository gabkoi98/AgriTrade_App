import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        const { fullname } = JSON.parse(userData);

        setCurrentUser(fullname);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "SignIn" }],
    });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0]?.uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageWork}>
        <View style={styles.backgroundColorone}>
          <View style={styles.circleMask} />
        </View>
        <View style={styles.imageBox}>
          {
            <Pressable onPress={pickImage}>
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={styles.profileImage}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.static}>
                  <Image
                    source={require("../assets/user.png")}
                    style={styles.profileImage}
                    resizeMode="cover"
                  />
                </View>
              )}
            </Pressable>
          }
        </View>
        <Text style={styles.profileName}>{currentUser}</Text>
      </View>

      <View style={styles.profileOption}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("editProfileStack")}
        >
          <AntDesign name="user" size={24} color="black" />
          <Text style={styles.optionLabel}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={handleLogout}>
          <MaterialIcons name="logout" size={24} color="black" />
          <Text style={styles.optionLabel}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageWork: {
    height: 150,
    width: "100%",
    alignItems: "center",
    marginTop: 50,
  },

  imageBox: {
    width: 100,
    height: 100,
    position: "absolute",
    marginTop: 50,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: "white",
  },

  backgroundColorone: {
    backgroundColor: "#00B251",
    height: 80,
    width: "90%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginTop: 100,
    alignItems: "center",
  },

  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },

  profileOption: {
    paddingTop: 50,
    paddingHorizontal: 30,
    gap: 20,
    marginTop: 100,
  },

  option: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#eee",
    padding: 15,
    gap: 15,
  },
  optionLabel: {
    fontSize: 16,
    marginLeft: 10,
  },

  profileContianer: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 30,
  },

  profileName: {
    fontSize: 20,
    marginTop: 15,
    fontWeight: "bold",
  },

  IconRotate: {
    fontWeight: "bold",
    fontSize: 30,
  },

  profileNames: {
    fontSize: 25,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
