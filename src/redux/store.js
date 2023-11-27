import { configureStore } from '@reduxjs/toolkit';
import homeSlice from './slice/homeSlice';
import { eCommerceApi } from '../services/eCommerceApi';
import authSlice from './slice/authSlice';

export const store = configureStore({
    reducer: {
        homeSlice,
        [eCommerceApi.reducerPath]: eCommerceApi.reducer,
        authSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(eCommerceApi.middleware),
});