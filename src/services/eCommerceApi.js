import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { base_url } from '../firebase/database';

export const eCommerceApi = createApi({
    reducerPath: 'eCommerceApi',
    
    baseQuery: fetchBaseQuery({
        baseUrl: base_url,
    }),

    endpoints: (builder) => ({
        //Accede a categorias y productos de la DB
        getCategories: builder.query({
            query: () => "categories.json"
        }),

        getProducts: builder.query({
            query: () => "products.json",
        }),

        // Accede a la imagen en la DB
        getImage: builder.query({
            query: () => "image.json",
        }),

        // Envia la informacion a la DB para actualizar la imagen
        putImage: builder.mutation({
            query: (image) => ({
                url: "image.json",
                method: "PUT",
                body: image
            })
        })
    }),
});

export const { useGetCategoriesQuery, useGetProductsQuery, useGetImageQuery, usePutImageMutation } = eCommerceApi;