import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from '../screens/Profile';
import MapLocation from '../screens/MapLocation';

const Stack = createNativeStackNavigator();

const ProfileNav = () => {
    return (
        <Stack.Navigator
            initialRouteName="profile"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="profile" component={Profile} />
            <Stack.Screen name="mapLocation" component={MapLocation} />
        </Stack.Navigator>
    );
};

export default ProfileNav;