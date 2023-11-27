import { Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import React from "react";
import { colors } from "../theme/colors";

const Header = ({ title }) => {
  const titleWithUpperCase = title.charAt(0).toUpperCase() + title.slice(1);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>{titleWithUpperCase}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 120,
    minWidth: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.darkNavy,
  },
  text: {
    maxWidth: "80%",
    color: colors.fadedWhite,
    fontSize: 25,
    fontFamily: "Montserrat",
    fontWeight: "bold",
  },
});

export default Header;