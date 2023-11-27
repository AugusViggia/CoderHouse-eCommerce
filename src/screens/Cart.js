import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Pressable,
  FlatList,
  Alert, Linking
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import CartItem from "../components/CartItem";
import { colors } from "../theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useGetImageQuery } from "../services/eCommerceApi";
import { useSelector, useDispatch } from "react-redux";
import { emptyCart } from "../redux/slice/homeSlice";
import axios from "axios";

const apiURL = "https://chiniapp-api-production.up.railway.app";

const Cart = ({ navigation }) => {
  const cartList = useSelector((state) => state.homeSlice.cartList);
  const [totalPrice, setTotalPrice] = useState(0);

  const dispatch = useDispatch();

  console.log("esta es la cartList", cartList);

  const { data, isLoading, error, refetch } = useGetImageQuery();

  const totalSum = cartList.reduce((sum, product) => sum + product.price, 0);

  useEffect(() => {
    setTotalPrice(totalSum);
  }, [totalSum]);

  const onHandlePay = async () => {
    try {
      const response = await axios.post(`${apiURL}/create-order`, cartList);
      const initPoint = response.data.init_point;
      console.log("esta es la response.data", response.data);
      Linking.openURL(initPoint);
    } catch (error) {
      console.log("soy el error", error);
    }
  };

  const onHandleEmpty = () => {
    Alert.alert(
      "Empty Cart",
      "Are you sure you want to empty your cart?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Yes", onPress: () => dispatch(emptyCart()) },
      ]
    );
  };

  return (
    <View style={styles.cartContainer}>
      {isLoading ? (
        <View style={styles.isLoading}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={styles.cartContainer}>
          <Header title="Cart" />
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
          <FlatList
            data={cartList}
            keyExtractor={(item) => item.id.toString()} // Usar un key único para cada elemento
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <View style={styles.productList}>
                <CartItem item={item} navigation={navigation} />
              </View>
            )}
          />

          <Text style={styles.text}>Total Price: ${totalPrice}</Text>
          <Pressable onPress={() => onHandleEmpty()}>
            <Text style={styles.text}>Empty</Text>
          </Pressable>
          <Pressable onPress={() => onHandlePay()}>
            <Text style={styles.text}>Pay Now</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

// <Pressable onPress={() => onHandlePay(e))}>

export default Cart;

const styles = StyleSheet.create({
  cartContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.lightBlue,
  },
  pressableBack: {
    position: "absolute",
    marginTop: 70,
    marginLeft: 10,
    alignSelf: "flex-start",
  },
  text: {
    color: colors.darkNavy,
    fontSize: 17,
    fontFamily: "Montserrat",
    marginBottom: 10,
    padding: 3,
    textAlign: "center",
    borderColor: colors.yellow,
    borderWidth: 3,
    borderRadius: 5,
    width: 220,
  },
  productList: {
    mixHeight: "100%",
    marginRight: 2,
    marginLeft: 2,
  },
  listContainer: {
    alignItems: "center",
    mixHeight: "100%",
    marginTop: 5,
    gap: 2,
  },
  isLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
