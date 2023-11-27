import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../theme/colors";
import { firebase_auth } from "../firebase/firebase_auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setIdToken, setUser } from "../redux/slice/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGetImageQuery } from "../services/eCommerceApi";

const LogIn = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const { data, isLoading, error, refetch } = useGetImageQuery();

    const dispatch = useDispatch();
    
    function isEmailValid(email) {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    };

    function isPasswordValid(password) {
        return password.length >= 6;
    };

    const handleLogIn = async () => {
        setEmailError("");
        setPasswordError("");

        if (!isEmailValid(email)) {
            setEmailError("Invalid Email");
            return;
        }

        if (!isPasswordValid(password)) {
            setPasswordError(
                "Password must be at least 6 characters long"
            );
            return;
        };

        try {
            const response = await signInWithEmailAndPassword(
                firebase_auth,
                email,
                password
            );
            // console.log(response);

            // AsyncStorage para hacer persistencia de datos, con clave (nombre de lo que estoy guardando) - valo uso su metodo setItem
            AsyncStorage.setItem("userEmail", response.user.email);
            dispatch(setUser(response.user.email));
            dispatch(setIdToken(response._tokenResponse.idToken));
        } catch (error) {
            console.log("Error while LogIn", error);
        }
    };

    return (
        <View style={styles.container}>
            {isLoading ? (
                <View style={styles.isLoading}>
                    <ActivityIndicator size="large" />
                </View>
            ) : (
                <View style={styles.container}>
                    <Text style={styles.title}>LogIn</Text>
                    <View style={styles.inputsContainer}>
                        <TextInput
                            placeholder="Email"
                            style={styles.input}
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                        {emailError !== "" && (
                            <Text style={styles.errorText}>{emailError}</Text>
                        )}
                        <TextInput
                            placeholder="Password"
                            style={styles.input}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                        {passwordError !== "" && (
                            <Text style={styles.errorText}>{passwordError}</Text>
                        )}
                    </View>
                    <View style={styles.buttonContainer}>
                        <Pressable onPress={handleLogIn}>
                            <Text style={styles.text}>Sign In</Text>
                        </Pressable>
                        <Pressable
                            style={styles.button}
                            onPress={() => navigation.navigate("register")}
                        >
                            <Text style={styles.text}>
                                You don't have an account? Register
                            </Text>
                        </Pressable>
                    </View>
                </View>
            )}
        </View>
    );
};

export default LogIn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100%",
        width: "100%",
        backgroundColor: colors.lightBlue,
    },
    input: {
        color: colors.darkNavy,
        fontSize: 17,
        fontFamily: "Montserrat",
        borderWidth: 3,
        borderColor: colors.lightYellow,
        borderRadius: 2,
        backgroundColor: colors.fadedWhite,
        minWidth: 320,
        marginBottom: 10,
    },
    inputsContainer: {
        gap: 7,
        marginBottom: 22,
    },
    button: {
        marginTop: 200,
    },
    buttonContainer: {
        alignItems: "center",
    },
    title: {
        color: colors.darkNavy,
        fontSize: 35,
        fontFamily: "Montserrat",
        marginBottom: 25,
    },
    text: {
        color: colors.darkNavy,
        fontSize: 15,
        fontFamily: "Montserrat",
    },
    errorText: {
        marginBottom: 5,
        marginTop: 0,
        color: colors.red,
        fontSize: 13,
        fontFamily: "Montserrat",
        fontWeight: 'bold',
    },
});
