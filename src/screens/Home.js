import { View, StyleSheet, FlatList, ActivityIndicator, Pressable, Text } from 'react-native';
import React from 'react';
import Header from '../components/Header';
import CategoryItem from '../components/CategoryItem';
// import { categories } from '../data/categories';
// import Categories from '../components/Categories';
import { colors } from '../theme/colors';
// import { useSelector } from 'react-redux';
import { useGetCategoriesQuery } from '../services/eCommerceApi';

const Home = ({ navigation }) => {
    // const categories = useSelector((state) => state.homeSlice.allCategories);

    // const hookData = useGetCategoriesQuery();
    // console.log(JSON.stringify(hookData, null, " "));

    const { data, isLoading, isError, error } = useGetCategoriesQuery();
    const categories = data;

    // con isError y error hacer el condicional

    return (
        <View style={styles.container}>
            {
                isLoading ? (
                    <View style={styles.isLoading}>
                        <ActivityIndicator size="large" />
                    </View>
                ) : (
                    <View style={styles.container}>
                            <Header title="Categories" />
                        <FlatList
                            data={categories}
                            keyExtractor={(key) => key}
                            renderItem={({ item }) => (
                                <CategoryItem
                                    navigation={navigation}
                                    item={item.charAt(0).toUpperCase() + item.slice(1)}
                                />
                            )}
                        />
                        {/* <Categories navigation={navigation} /> */}
                        {/* para la navegacion, paso navigation como prop en Home y desde ahi que es la primer pantalla voy pasando el navigation hasta el componente aal que quiero llegar (categoryItem)*/}
                    </View>
                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxHeight: "100%",
        minWidth: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.lightBlue,
    },
    isLoading: {
        flex: 1,
        justifyContent: 'center', 
        minHeight: '100%',
        alignItems: 'center',
    },
});

export default Home;