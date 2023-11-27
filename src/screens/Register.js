import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../theme/colors";
import { firebase_auth } from "../firebase/firebase_auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useGetImageQuery } from "../services/eCommerceApi";

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { data, isLoading, error, refetch } = useGetImageQuery();

  function isEmailValid(email) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  function isPasswordValid(password) {
    return password.length >= 6;
  };

  const handleRegister = async () => {
    setEmailError("");
    setPasswordError("");

    if (!isEmailValid(email)) {
      setEmailError("Invalid Email");
      return;
    }

    if (!isPasswordValid(password)) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    };

    try {
      const response = await createUserWithEmailAndPassword(
        firebase_auth,
        email,
        password
      );
      console.log(response);
      navigation.navigate("login");
    } catch (error) {
      console.log("error while register", error);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.isLoading}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View>
          <Text style={styles.title}>Sign Up</Text>
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
            <Pressable onPress={() => handleRegister()}>
              <Text style={styles.text}>Create User</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => navigation.navigate("login")}
            >
              <Text style={styles.text}>Already have an account? LogIn</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};

export default Register;

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
    minWidth: 270,
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
    textAlign: "center",
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
    fontWeight: "bold",
  },
});
