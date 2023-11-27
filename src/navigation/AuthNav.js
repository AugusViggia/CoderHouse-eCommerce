import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LogIn from '../screens/LogIn';
import Register from '../screens/Register';

const Stack = createNativeStackNavigator();

const AuthNav = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" component={LogIn} />
            <Stack.Screen name="register" component={Register} />
        </Stack.Navigator>
    );
};

export default AuthNav;

const styles = StyleSheet.create({})