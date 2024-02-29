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
  const [isExpanded, setIsExpanded] = useState(false);

  const { productId } = route.params;

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${URL}/product/${productId}`);
        const productData = response.data;
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product details:", error);
        Alert.alert(
          "Error",
          "Failed to fetch product details. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

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
      Alert.alert("Error", "Product already added to the cart");
    }
  };

  const formattedPrice = product ? product.price.toFixed(2) : 0;

  return (
    <View style={styles.container}>
      {isLoading || product === null ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="green" />
        </View>
      ) : (
        <>
          {product.image ? (
            <Image
              source={{ uri: product.image }}
              style={styles.productImage}
            />
          ) : (
            <Text style={styles.errorText}>Image not available</Text>
          )}

          <View style={styles.detailsContainer}>
            <Text style={styles.productName}>{product.productname}</Text>
            <Text style={styles.productPrice}>${formattedPrice}</Text>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>Description</Text>

            <View style={styles.descriptionTextContainer}>
              <Text style={styles.descriptionText}>
                {isExpanded
                  ? product.description
                  : `${product.description.slice(0, 135)}...`}
              </Text>
              {!isExpanded && (
                <TouchableOpacity onPress={toggleDescription}>
                  <Text style={styles.readMore}>Read More</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingHorizontal: 20,
    marginTop: 90,
  },
  productImage: {
    height: 200,
    width: "100%",
    borderRadius: 18,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  productPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  descriptionContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  descriptionTextContainer: {
    flexDirection: "column",
  },
  descriptionText: {
    fontSize: 16,
    color: "black",
  },
  readMore: {
    color: "#00B251",
    fontWeight: "bold",
    marginTop: -21,
    paddingLeft: 135,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#00B251",
    padding: 14,
    borderRadius: 15,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});
