import React from "react";
import { NavigationContainer, Text } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

// Import your existing screen component here
import HomeScreen from "../Screens/HomeScreen";
import LoginScreen from "../Screens/Login";
import SignupScreen from "../Screens/SignUp";
import AddToCartScreen from "../Screens/AddToCart";
import UserProfileScreen from "../Screens/UserProfile";
import editprofileScreen from "../Screens/editprofileScreen";
import passwordupdatescreen from "../Screens/passwordupdatescreen";
import DetailScreen from "../Screens/DetailScreen";
import OrderSummaryScreen from "../Screens/OrderSummary";
import Payment from "../Screens/Payment";
import SeeAllproducts from "../Screens/SeeAllproducts";

// Here are the Stack Navigation
const HomeStack = createNativeStackNavigator();
const AddToCartStack = createNativeStackNavigator();
const UserProfileStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

// this handle the navigation structure
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AuthStack.Navigator initialRouteName="SignIn" headerMode="none">
        <AuthStack.Screen
          name="SignIn"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <AuthStack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{
            headerShown: false,
          }}
        />
        <AuthStack.Screen
          name="SignUp"
          component={SignupScreen}
          options={{
            headerShown: false,
          }}
        />
        <AuthStack.Screen
          name="PaswordUpdate"
          component={passwordupdatescreen}
          options={{
            headerShown: false,
          }}
        />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigator;

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarHideOnKeyboard: true,
      tabBarStyle: {
        backgroundColor: "#ffff",
        borderTopRightRadius: 2,
        borderTopLeftRadius: 2,
        height: 50,
        borderTopColor: "#00B251",
      },
    }}
  >
    <Tab.Screen
      name="Homepage"
      component={HomeStackScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="home" size={size} color={color} />
        ),
        tabBarLabel: "Home",
        title: "Homepage",
        headerTitleAlign: "center",
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 15,
          marginTop: -4,
          margin: 1,
        },

        tabBarInactiveTintColor: "black",
        tabBarActiveTintColor: "#00B251",
        tabBarPressColor: "#00B251",
      }}
    />

    <Tab.Screen
      name="AddToCart"
      component={AddToCartStackScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Feather name="shopping-cart" size={size} color={color} />
        ),
        // tabBarBadge: 0,
        tabBarLabel: "Cart",
        title: "My Cart",
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 15,
          marginTop: -4,
          margin: 1,
        },
        tabBarInactiveTintColor: "black",
        tabBarActiveTintColor: "#00B251",
        tabBarPressColor: "#00B251",
      }}
    />

    <Tab.Screen
      name="UserProfile"
      component={UserProfileStackScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="user" size={size} color={color} />
        ),
        tabBarLabel: "Profile",
        title: "User Profile",
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 15,
          marginTop: -4,
          margin: 1,
        },
        tabBarInactiveTintColor: "black",
        tabBarActiveTintColor: "#00B251",
        tabBarPressColor: "#00B251",
      }}
    />
  </Tab.Navigator>
);

// Home Stack Screen
const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="HomeStack"
      component={HomeScreen}
      options={{
        title: "Homepage",
        headerShown: false,
      }}
    />
    <HomeStack.Screen
      name="DetailScreen"
      component={DetailScreen}
      options={{
        title: "Product Details",
        // // headerTitleAlign: "center",
        headerTitleAlign: "left",
        headerStyle: {
          borderBottomWidth: 0,
        },
        headerTintColor: "black",
        headerTransparent: true,
      }}
    />
    {
      <HomeStack.Screen
        name="SeeAllproduct"
        component={SeeAllproducts}
        options={{
          title: "See All Products ",
          // headerTitleAlign: "center",
          headerStyle: {
            borderBottomWidth: 0,
          },
          headerTintColor: "black",
          headerTransparent: true,
        }}
      />
    }
  </HomeStack.Navigator>
);

const AddToCartStackScreen = () => (
  <AddToCartStack.Navigator>
    <AddToCartStack.Screen
      name="AddToCartStack"
      component={AddToCartScreen}
      options={{
        headerTitle: "My Cart",
        headerTitleAlign: "center",
        headerStyle: {
          borderBottomWidth: 0,
        },
        headerTintColor: "black",
        headerTransparent: true,
      }}
    />
    <AddToCartStack.Screen
      name="OrderSummary"
      component={OrderSummaryScreen}
      options={{
        headerTitle: "Order Summary",
        // headerTitleAlign: "center",
        headerStyle: {
          borderBottomWidth: 0,
        },
        headerTintColor: "black",
        headerTransparent: true,
      }}
    />
    <AddToCartStack.Screen
      name="Payment"
      component={Payment}
      options={{
        headerTitle: "Payment methods",
        // headerTitleAlig: "center",
        headerStyle: {
          borderBottomWidth: 0,
        },
        headerTintColor: "black",
        headerTransparent: true,
      }}
    />
  </AddToCartStack.Navigator>
);

// UserProfile Stack Screen
const UserProfileStackScreen = () => (
  <UserProfileStack.Navigator>
    <UserProfileStack.Screen
      name="UserProfileStack"
      component={UserProfileScreen}
      options={{
        title: "User Profile",
        headerShown: false,
      }}
    />
    <UserProfileStack.Screen
      name="editProfileStack"
      component={editprofileScreen}
      options={{
        title: "Edit Profile",
        headerStyle: {
          borderBottomWidth: 0,
        },
        headerTintColor: "black",
        headerTransparent: true,
      }}
    />
  </UserProfileStack.Navigator>
);
