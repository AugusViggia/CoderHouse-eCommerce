import {
  FlatList,
  Pressable,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Search from "../components/Search";
// import products from '../data/products';
import ProductItem from "../components/ProductItem";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
// import { useSelector } from 'react-redux';
import { useGetProductsQuery } from "../services/eCommerceApi";

const Products = ({ route, navigation }) => {
  const [textInput, setTextInput] = useState("");
  const [filterCategory, setFilterCategory] = useState([]);

  // const products = useSelector((state) => state.homeSlice.allProducts);

  const { data, isLoading, isError, error } = useGetProductsQuery();
  const products = data;

  // console.log(products);

  // const productsFilterByCategory = useSelector((state) => state.homeSlice.productsFilterByCategory);
  // console.log(productsFilterByCategory);

  // console.log(JSON.stringify(products, null, " ")); //JSON.stringify() te acomoda todo el objeto para que se vea separado.

  // console.log(textInput);

  const { item } = route.params; //de esta manera se pasa info entre componentes mediante rutas, y asi modifico el nombre del Header con el de la categoria
  // console.log(item);

  const itemToLowerCase = item.toLowerCase();

  // console.log(itemToLowerCase);

  useEffect(() => {
    // console.log(products);
    // console.log(itemToLowerCase);
    if (!isLoading) {
      const filteredProducts = products.filter(
        (product) => product.category.trim() === itemToLowerCase.trim()
      );

      setFilterCategory(filteredProducts);
      // console.log(filteredProducts);
    }

    // const filteredProducts = products.filter((product) => product.category.trim() === item.trim());

    if (textInput) {
      const productTitleSearch = products.filter(
        (product) => product.title.toLowerCase() === textInput.toLowerCase()
      );

      // console.log(productTitleSearch);

      setFilterCategory(productTitleSearch);
    }
  }, [item, textInput, products]);

  // console.log(filterCategory);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.isLoading}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View>
          <View>
            <View>
              <Header title={item.charAt(0).toUpperCase() + item.slice(1)} />
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
            </View>
            <View style={styles.searchContainer}>
              <Search textInput={textInput} setTextInput={setTextInput} />
            </View>
            <View style={styles.productsContainer2}>
              <FlatList
                data={filterCategory}
                numColumns={2}
                keyExtractor={products.id}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => (
                  <View style={styles.productList}>
                    <ProductItem item={item} navigation={navigation} />
                  </View>
                )}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: colors.creamYellow,
  },
  container: {
    minHeight: "100%",
    backgroundColor: colors.lightBlue,
  },
  productsContainer2: {
    backgroundColor: colors.lightBlue,
  },
  pressableBack: {
    position: "absolute",
    marginLeft: 10,
    marginTop: 70,
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

export default Products;
