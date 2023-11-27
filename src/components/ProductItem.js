import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import { colors } from '../theme/colors';
import { useWindowDimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import { setSetectedProduct } from '../redux/slice/homeSlice';
// import { Dimensions } from 'react-native';

const ProductItem = ({ item, navigation }) => {
    const { height, width } = useWindowDimensions();

    // const widthScreen = Dimensions.get("window").width;
    const dispatch = useDispatch();

    const onHandleProduct = () => {
        dispatch(setSetectedProduct({ item: item }));
        // console.log(JSON.stringify(item, null, " "));
        navigation.navigate("detail", { item: item });
    };

    console.log(item);

    const titleToUpperCase =
        item.title.charAt(0).toUpperCase() + item.title.slice(1);

    return (
        <View style={styles.productContainer}>
            <Text style={width < 350 ? styles.textMin : styles.text}>{titleToUpperCase}</Text>
            <Pressable onPress={() => onHandleProduct()}>
                <Image
                    source={{ uri: item.images[0] }}
                    style={styles.image}
                    resizeMode="cover"
                />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    productContainer: {
        alignItems: "center",
        borderColor: colors.creamYellow,
        width: 200,
        height: 250,
        borderWidth: 3,
        borderRadius: 5,
        padding: 5,
        backgroundColor: colors.lightYellow,
    },
    text: {
        color: colors.darkNavy,
        fontSize: 15,
        fontFamily: "Montserrat",
        marginBottom: 25,
        padding: 3,
        textAlign: "center",
        borderColor: colors.darkNavy,
        borderWidth: 3,
        borderRadius: 5,
        width: 190,
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
    image: {
        width: 160,
        height: 130,
        borderRadius: 2,
        marginBottom: 25,
        borderColor: colors.navyBlue,
        borderWidth: 2,
    },
});

export default ProductItem