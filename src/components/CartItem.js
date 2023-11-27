import { View, Text, StyleSheet, Image, Pressable, Alert } from "react-native";
import React from 'react'
import { colors } from '../theme/colors'
import { useWindowDimensions } from "react-native";
import { useDispatch } from "react-redux";
import { setSetectedProduct, removeFromCart } from "../redux/slice/homeSlice";
import { AntDesign } from "@expo/vector-icons";

const CartItem = ({ item, navigation }) => {
    const { height, width } = useWindowDimensions();

    // const widthScreen = Dimensions.get("window").width;
    const dispatch = useDispatch();

    const onHandleProduct = () => {
        dispatch(setSetectedProduct({ item: item }));
        // console.log(JSON.stringify(item, null, " "));
        navigation.navigate("detail", { item: item });
    };

    const onHandleDeleteItem = () => {
        Alert.alert(
            "Delete Item",
            "Are you sure you want to delete this item?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
                { text: "Yes", onPress: () => dispatch(removeFromCart(item)) },
            ]
        );
    };

    return (
        <View style={styles.productContainer}>
            <View style={styles.titleContainer}>
                <Text style={width < 350 ? styles.textMin : styles.title}>
                    {item.title}
                </Text>
                <Pressable onPress={() => onHandleDeleteItem()}>
                    <AntDesign name="delete" size={26} color={colors.red} />
                </Pressable>
            </View>
            <View style={styles.imageContainer}>
                <Pressable onPress={() => onHandleProduct()}>
                    <Image
                        source={{ uri: item.images[0] }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </Pressable>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Quantity: </Text>
                    <Text style={styles.text}>Price: ${item.price}</Text>
                </View>
            </View>
        </View>
    );
};

export default CartItem

const styles = StyleSheet.create({
    productContainer: {
        flexDirection: "column",
        borderColor: colors.creamYellow,
        minWidth: 400,
        height: 200,
        borderWidth: 3,
        borderRadius: 5,
        padding: 5,
        backgroundColor: colors.lightYellow,
    },
    title: {
        color: colors.darkNavy,
        fontSize: 20,
        fontFamily: "Montserrat",
        marginBottom: 2,
        padding: 3,
        textAlign: "center",
        borderColor: colors.darkNavy,
        borderWidth: 3,
        borderRadius: 5,
        width: 350,
    },
    textMin: {
        color: colors.fadedWhite,
        fontSize: 10,
        fontFamily: "Montserrat",
        marginBottom: 25,
        padding: 3,
        textAlign: "center",
        borderColor: colors.darkNavy,
        borderWidth: 3,
        borderRadius: 5,
        width: 190,
    },
    textDescription: {
        color: colors.fadedWhite,
        fontSize: 14,
        fontFamily: "Montserrat",
    },
    text: {
        fontSize: 18,
        fontFamily: "Montserrat",
    },
    image: {
        minWidth: 190,
        minHeight: 145,
        borderRadius: 2,
        borderColor: colors.navyBlue,
        borderWidth: 2,
    },
    imageContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    titleContainer: {
        alignItems: "center",
        flexDirection: 'row',
        gap: 7,
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginRight: 25
    }
});