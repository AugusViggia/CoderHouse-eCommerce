import { View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import { colors } from '../theme/colors';
import { setCategory } from '../redux/slice/homeSlice';
import { useDispatch } from 'react-redux';

const CategoryItem = ({ item, navigation }) => {

    // const itemCategory = item;

    const dispatch = useDispatch();
    
    const onHandleItem = () => {
        dispatch(setCategory({ item: item }));
        // console.log(itemCategory);
        navigation.navigate('products', { item: item });
    };

    return (
        <View style={styles.categoriesContainer}>
            <Pressable
                style={styles.categoryItem}
                onPress={() => onHandleItem()}
            >
                {/* a navigation le agrego el metodo .navigate("aca adentro va a la panalla que quiero llegar") */}
                <Text style={styles.text}>{item}</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    categoriesContainer: {
        alignItems: "center",
        marginBottom: 2,
        marginTop: 2,
    },
    categoryItem: {
        borderRadius: 2,
        borderWidth: 3,
        backgroundColor: colors.creamYellow,
        borderColor: colors.darkNavy,
    },
    text: {
        color: colors.fadedWhite,
        fontSize: 20,
        padding: 8,
        textAlign: "center",
        width: 300,
    },
});

export default CategoryItem;