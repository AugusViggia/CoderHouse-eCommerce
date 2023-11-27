import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React from "react";
// import products from "../data/products";
import { colors } from "../theme/colors";
import Header from "../components/Header";
import { Ionicons } from "@expo/vector-icons";
import { useGetImageQuery } from "../services/eCommerceApi";
import { useDispatch } from "react-redux";
import { addToCart, setProductDetail } from "../redux/slice/homeSlice";

export default function ProductDetail({ route, navigation }) {
  const { item } = route.params;
  // const product = products.filter((product) => product.id === item.id);
  // const productDetail = product[0];

  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addToCart(item)); // Almacena la información del producto en el estado global
    navigation.navigate("cart");
  };

  const { data, isLoading, error, refetch } = useGetImageQuery();
  // console.log(JSON.stringify(item, null, " "));

  // console.log(item);
  // console.log(route);
  // console.log(product);
  
  const productDetail = item;
    
  return (
    <View style={styles.detailView}>
      {isLoading ? (
        <View style={styles.isLoading}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={styles.detailView}>
          <Header title={item.title} />
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.pressableBack}
          >
            <Ionicons
              name="ios-arrow-back"
              size={24}
              color={colors.fadedWhite}
            />
          </Pressable>

          <View style={styles.productContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: productDetail.images[0] }}
                style={styles.image}
              />
            </View>
            <View>
              <View style={styles.textView}>
                <Text style={styles.text}>Product: {productDetail.title}</Text>
                <Text style={styles.textDescription}>
                  Description: {productDetail.description}
                </Text>
                <Text style={styles.text}>Rating: {productDetail.rating}</Text>
                <Text style={styles.text}>Price: ${productDetail.price}</Text>
              </View>
            </View>
          </View>

          <View style={styles.buttonsView}>
            <Pressable
              title="Add to cart"
              onPress={() => handleAddToCart()}
              style={styles.pressable}
            >
              <Text style={styles.buttonText}>Add to Cart</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  detailView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.lightBlue,
  },
  productContainer: {
    alignItems: "center",
    borderColor: colors.creamYellow,
    width: 280,
    height: 510,
    borderWidth: 3,
    borderRadius: 5,
    padding: 5,
    marginBottom: 20,
    marginTop: 10,
    backgroundColor: colors.lightYellow,
  },
  textView: {
    flexDirection: "column",
    alignItems: "center",
  },
  text: {
    minWidth: 250,
    color: colors.darkNavy,
    fontSize: 12.5,
    fontFamily: "Montserrat",
    marginBottom: 10,
    padding: 3,
    textAlign: "center",
    borderColor: colors.darkNavy,
    borderWidth: 3,
    borderRadius: 5,
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
    minHeight: 185,
    minWidth: 100,
    color: colors.darkNavy,
    fontSize: 15,
    fontFamily: "Montserrat",
    marginBottom: 12,
    textAlign: "left",
    alignContent: "center",
    padding: 7,
  },
  imageContainer: {
    borderColor: colors.navyBlue,
    borderWidth: 2,
    borderRadius: 2,
    marginBottom: 15,
    width: "auto",
    height: "auto",
  },
  image: {
    minWidth: 190,
    minHeight: 160,
    borderRadius: 2,
  },
  buttonsView: {
    minWidth: "100%",
    alignItems: "center",
  },
  pressable: {
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
    minHeight: 30,
    backgroundColor: colors.creamYellow,
    marginBottom: 6,
    borderRadius: 3,
    borderColor: colors.darkNavy,
    borderWidth: 2,
  },
  pressableBack: {
    position: "absolute",
    marginTop: 70,
    marginLeft: 10,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: colors.fadedWhite,
    fontSize: 15.5,
    fontFamily: "Montserrat",
    fontWeight: "bold",
    textAlign: "center",
    width: 190,
  },
  isLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
