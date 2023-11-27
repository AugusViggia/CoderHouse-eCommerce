import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabNav from "./TabNav";
import AuthNav from "./AuthNav";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MainNav = () => {
    const user = useSelector((state) => state.authSlice.user);
    const [checkedUser, setCheckedUser] = useState(null);

    // console.log(user);

    // para traer los datos del userEmail uso el metodo .getItem()
    useEffect(() => {
        const checkUser = async () => {
            try {
                const userEmail = await AsyncStorage.getItem("userEmail");
                console.log("userEmail:", userEmail);

                // aca seteo el nuevo estado del usuario para crear el storage
                userEmail ? setCheckedUser(userEmail) : setCheckedUser(user);
            } catch (error) {
                console.log(error);
            }
        };
        checkUser();
    }, [user]);

    //pregunto si user existe
    return (
        <NavigationContainer>
            {checkedUser ? <TabNav /> : <AuthNav />}
        </NavigationContainer>
    );
};

export default MainNav;