import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
  RefreshControl,
  Pressable,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { URL } from "./constants";

const Home = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        const { user } = JSON.parse(userData);
        const response = await axios.get(`${URL}/products`);

        setCurrentUser(user);

        const reversedProductsResponse = response.data.reverse();
        setProducts(reversedProductsResponse);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCartItemsCount = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        const { id } = JSON.parse(userData);

        const response = await axios.get(`${URL}/getcarts/${id}`, {
          headers: { "Content-Type": "application/json" },
        });

        setCartItemsCount(response.data.cart.length);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    if (isFocused) {
      fetchCartItemsCount();
    }
  }, [isFocused]);

  const limitedProducts = useMemo(() => products.slice(0, 50), [products]);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = products.filter((product) =>
      product.productname.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        const { user } = JSON.parse(userData);
        const response = await axios.get(`${URL}/products`);

        setCurrentUser(user);
        const reversedProductsResponse = response.data.reverse();

        setProducts(reversedProductsResponse);
        setRefreshing(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setRefreshing(false);
      }
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="green" />
        </View>
      ) : (
        <>
          <View style={styles.greetingHead}>
            <Text style={styles.greetingheadText}>Welcome, {currentUser}.</Text>

            <TouchableOpacity onPress={() => navigation.navigate("AddToCart")}>
              <View style={styles.headIcon}>
                {cartItemsCount === 0 && <Text style={styles.zeroText}>0</Text>}
                <Feather
                  name="shopping-cart"
                  size={24}
                  color="black"
                  style={styles.shopMe}
                />
                {cartItemsCount > 0 && ( //
                  <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>{cartItemsCount}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>
          <Text style={styles.enjoyText}>Enjoy your Services</Text>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardAvoidingContainer}
          >
            <View style={styles.searchBarContainer}>
              <View style={[styles.searchBar, styles.searchBarWidth]}>
                <Feather name="search" size={20} color="black" />
                <View style={styles.searchInputContainer}>
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search your desired food"
                    placeholderTextColor="black"
                    onChangeText={handleSearch}
                    value={searchQuery}
                  />
                </View>
              </View>
            </View>
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              <View style={styles.slideImageContianer}>
                {/* image sliser */}
                <Swiper
                  style={styles.wrapper}
                  height={200}
                  vertical={true}
                  autoplay
                  paginationStyle={{ bottom: 10 }}
                  dotStyle={{ backgroundColor: "#00B251" }}
                  activeDotColor="#00B251"
                >
                  <Image
                    style={styles.image}
                    source={require("../assets/Agricar.jpg")}
                  />
                  <Image
                    style={styles.image}
                    source={require("../assets/chickens.jpg")}
                  />
                  <Image
                    style={styles.image}
                    source={require("../assets/Agricar.jpg")}
                  />
                </Swiper>
              </View>
              <View style={styles.featureTextContainer}>
                <Text style={styles.productText}>Featured Products</Text>

                <TouchableOpacity
                  onPress={() => navigation.navigate("SeeAllproduct")}
                >
                  <Text style={styles.productSeeall}>See All</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.productContainer}>
                {(searchQuery ? filteredProducts : limitedProducts).map(
                  (product, index) => (
                    <Pressable
                      style={styles.productItem}
                      key={index}
                      onPress={() =>
                        navigation.navigate("DetailScreen", {
                          productId: product.id,
                        })
                      }
                      activeOpacity={0.5}
                    >
                      <Image
                        style={styles.cardImage}
                        source={{ uri: product.image }}
                      />
                      <View style={styles.cardContainer}>
                        <Text style={styles.cardText}>
                          {product.productname}
                        </Text>
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
                  )
                )}
              </View>
            </ScrollView>
          </KeyboardAvoidingView>

          {/* Rest of your code */}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  searchBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    padding: 10,
    marginTop: 10,
    width: "102%",
  },
  greetingHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30,
    padding: 10,
    paddingHorizontal: 18,
  },
  greetingheadText: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
  enjoyText: {
    fontSize: 18,
    marginTop: -10,
    paddingHorizontal: 18,
  },
  searchBar: {
    flex: 100,
    flexDirection: "row",
  },
  searchBarWidth: {
    borderWidth: 2,
    height: 43,
    borderRadius: 100,
    alignItems: "center",
    padding: 10,
    marginRight: 20,
  },
  searchInputContainer: {
    flex: 1,
    marginLeft: 10,
  },
  searchInput: {
    flex: 1,
  },
  shopMe: {
    padding: 10,
    fontSize: 25,
  },

  featureTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginTop: -35,
  },
  productText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginTop: 40,
  },
  productSeeall: {
    fontSize: 18,
    paddingRight: 10,
    color: "#00B251",
    marginTop: 40,
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
  },
  amountStyles: {
    paddingHorizontal: -10,
    fontSize: 15,
    color: "#00B251",
    marginTop: 5,
  },
  AddContainer: {
    backgroundColor: "#00B251",
    marginTop: 5,
    borderRadius: 10,
    width: 100,
  },
  imageCon: {
    borderWidth: 1,
    width: "100%",
    borderRadius: 10,
    borderColor: "#00B251",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  priceCard: {
    fontSize: 16,
    padding: 5,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00B251",
  },
  text: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  slideImageContianer: {
    height: 195,
    marginTop: 3,
  },
  badgeContainer: {
    backgroundColor: "red",
    borderRadius: 50,
    paddingHorizontal: 6,
    paddingVertical: 2,
    position: "absolute",
    top: -2,
    right: -5,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 20,
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  zeroText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    position: "absolute",
    top: -2,
    right: -5,
    backgroundColor: "red",
    borderRadius: 50,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    textAlign: "center",
    zIndex: 1,
  },
});

export default Home;
