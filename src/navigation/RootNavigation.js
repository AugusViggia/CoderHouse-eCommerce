import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import ProductDetail from '../screens/ProductDetail';
import Products from '../screens/Products';
import PaymentScreen from '../screens/PaymentScreen';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
    return (
        <Stack.Navigator initialRouteName='home' screenOptions={{ headerShown: false }}>
            <Stack.Screen component={Home} name='home' />
            <Stack.Screen component={Products} name='products' />
            <Stack.Screen component={ProductDetail} name='detail' />
            <Stack.Screen component={PaymentScreen} name='payment' />
        </Stack.Navigator>
    );
};

export default RootNavigation;