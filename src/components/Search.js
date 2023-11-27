import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from "@expo/vector-icons";
import { colors } from '../theme/colors';

const Search = ({ textInput, setTextInput }) => {
    
    const clearTextInput = () => {
        setTextInput("");
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Search product..."
                style={styles.input}
                value={textInput}
                onChangeText={(value) => setTextInput(value)}
            />
            <Pressable style={styles.buttonContainer} onPress={clearTextInput}>
                <Ionicons name="refresh-sharp" size={30} color="black" />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
  },
  input: {
    backgroundColor: colors.fadedWhite,
    borderColor: colors.navyBlue,
    borderWidth: 2,
    borderRadius: 5,
    height: 35,
    width: 220,
    fontSize: 17,
    fontFamily: "Montserrat",
    marginRight: 5,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 37,
    width: 37,
  },
});

export default Search;