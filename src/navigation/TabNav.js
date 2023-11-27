import { StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Profile from '../screens/Profile';
import ProfileNav from "./ProfileNav";
import RootNavigation from "./RootNavigation";
import Cart from "../screens/Cart";
// import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";

const Tab = createBottomTabNavigator();

const TabNav = () => {
    return (
        <Tab.Navigator
            initialRouteName="home"
            screenOptions={{ headerShown: false, title: "" }}
        >
            <Tab.Screen
                name="rootNavigation"
                component={RootNavigation}
                options={{
                    title: "",
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name="md-home"
                            size={focused ? 30 : 22}
                            color={focused ? colors.creamYellow : "black"}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="profileNav"
                component={ProfileNav}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons
                            name="account"
                            size={focused ? 30 : 22}
                            color={focused ? colors.creamYellow : "black"}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="cart"
                component={Cart}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name="cart"
                            size={focused ? 30 : 22}
                            color={focused ? colors.creamYellow : "black"}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default TabNav;

//screenOptions borra el titulo de todos los botones, options en cada Tab saca de ese boton especifico