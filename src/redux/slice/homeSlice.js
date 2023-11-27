import { createSlice } from "@reduxjs/toolkit";
import { categories } from "../../data/categories";
import products from "../../data/products";

const homeSlice = createSlice({
    name: "home",
    initialState: {
        allCategories: categories,
        allProducts: products,
        categoryPressed: "",
        // productsFilterByCategory: [],
        selectedProduct: [],
        productDetail: null,
        cartList: [],
    },
    reducers: {
        setCategory: (state, action) => {
            state.categoryPressed = action.payload;
        },
        setFilterCategory: (state, action) => {
            state.productsFilterByCategory = state.allProducts.filter(
                (product) => product.category === state.categoryPressed
            );
            // console.log(state.allProducts);
            // console.log(state.categoryPressed);
            // console.log(state.allCategories);
        },
        setSetectedProduct: (state, action) => {
            state.selectedProduct = action.payload;
        },
        setProductDetail: (state, action) => {
            state.productDetail = action.payload;
        },
        addToCart: (state, action) => {
            // Agregar el producto al carrito
            state.cartList.push(action.payload);
        },
        removeFromCart: (state, action) => {
            state.cartList = state.cartList.filter(
                (item) => item.id !== action.payload.id
            );
        },
        emptyCart: (state, action) => {
            state.cartList = [];
        },
    },
});

export const {
    setCategory,
    setSetectedProduct,
    setFilterCategory,
    setProductDetail,
    addToCart,
    removeFromCart,
    emptyCart,
} = homeSlice.actions;

export default homeSlice.reducer;
