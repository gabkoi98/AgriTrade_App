import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import { URL } from "./constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Details = ({ route }) => {
  const navigation = useNavigation();
  const [count, setCount] = useState(1);
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { productId } = route.params;

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${URL}/product/${productId}`);
        const productData = response.data;
        setProduct(productData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (isLoading || product === null) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  const handleAddToCart = async () => {
    try {
      const loginData = await AsyncStorage.getItem("userData");
      const parsedData = JSON.parse(loginData);

      const { id } = parsedData;

      const payload = { quantity: count };

      const response = await axios.post(
        `${URL}/create/${productId}/${id}`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      navigation.navigate("MainTabs", {
        screen: "AddToCart",
        params: {
          screen: "AddToCartStack",
        },
      });

      console.log("Server Response:", response.data);
    } catch (error) {
      Alert.alert("", "Product already added to the cart", [{ text: "okay" }]);
      // Alert.alert("", alertTitle, [{ text: okButtonText }], alertStyle);
    }
  };
  const formattedPrice = product ? product.price.toFixed(2) : 0;

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.productImage} />

      <View style={styles.nameContainer}>
        <Text style={styles.riceText}>{product.productname}</Text>
        <Text style={styles.prouctAmount}>${formattedPrice}</Text>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.desText}>Description</Text>
        <Text numberOfLines={5} style={styles.paraText}>
          {product.description}
        </Text>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
        <Text style={styles.buttonText}>Add to cart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingHorizontal: 20,
    marginTop: 100,
  },
  productImage: {
    height: 200,
    width: "100%",
    borderRadius: 15,
  },
  nameContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
  },
  riceText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  prouctAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  textItem: {
    padding: 2,
    backgroundColor: "green",
    color: "white",
    borderRadius: 100,
  },
  iconStyle: {
    fontSize: 22,
  },
  descriptionContainer: {
    marginTop: 20,
  },
  paraText: {
    fontSize: 14,
    marginTop: 10,
    color: "black",
  },
  desText: {
    fontSize: 20,
    fontWeight: "bold",
  },

  addButton: {
    // backgroundColor: "#00B251",
    backgroundColor: "black",
    padding: 14,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginTop: 20,
    width: "96%",
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
