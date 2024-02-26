import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
  Pressable,
} from "react-native";
import axios from "axios";

import { URL } from "./constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SeeAllproduct = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        const { user } = JSON.parse(userData);
        const response = await axios.get(`${URL}/products`);

        // Reverse the order of products array
        const reversedProducts = response.data.reverse();

        setProducts(reversedProducts);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="green" />
        </View>
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingContainer}
        >
          <ScrollView>
            <View style={styles.productContainer}>
              {products.map((product, index) => (
                <Pressable
                  style={styles.productItem}
                  key={index}
                  onPress={() =>
                    navigation.navigate("DetailScreen", {
                      productId: product.id,
                    })
                  }
                >
                  <Image
                    style={styles.cardImage}
                    source={{ uri: product.image }}
                  />
                  <View style={styles.cardContainer}>
                    <Text style={styles.cardText}>{product.productname}</Text>
                    <View style={styles.priceContainer}>
                      <Text style={styles.priceStyles}></Text>
                      <Text style={styles.amountStyles}>
                        {" "}
                        ${product.price ? product.price.toFixed(2) : 0}
                      </Text>
                    </View>
                    <View style={styles.AddContainer}></View>
                  </View>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  productContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 13,
    justifyContent: "space-between",
  },
  productItem: {
    width: "48%",
    marginVertical: 5,
  },
  cardImage: {
    width: "100%",
    height: 160,
    marginBottom: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cardContainer: {
    padding: 10,
  },
  cardText: {
    fontSize: 20,
    marginTop: 1,
  },
  priceContainer: {
    flexDirection: "row",
    // paddingHorizontal: 10,
  },
  amountStyles: {
    paddingHorizontal: -10,
    fontSize: 15,
    color: "#00B251",
    marginTop: 1,
  },
  AddContainer: {
    backgroundColor: "#00B251",
    marginTop: 5,
    borderRadius: 10,
    width: 100,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SeeAllproduct;
