import { apiSlice } from "./apiSlice";
import { PRODUCT_URL } from '../constants'
export const ProductApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ keyword }) => ({
                url: `${PRODUCT_URL}/`,
                method: "GET",
                params: { keyword }
            }),
            keepUnusedDataFor: 5,
            providesTags: ["Product"]
        }),
        getProductById: builder.query({
            query: (id) => ({
                url: `${PRODUCT_URL}/${id}`,
                method: "GET"
            }),
            providesTags: (res, err, productId) => [{ type: "Product", id: productId },]
        }),
        getAllProducts: builder.query({
            query: () => ({
                url: `${PRODUCT_URL}/allproducts`,
            }),
            getProductDetails: builder.query({
                query: (id) => ({
                    url: `${PRODUCT_URL}/${id}`
                }),
                keepUnusedDataFor: 5
            }),
            createProduct: builder.mutation({
                query: (data) => ({
                    url: `${PRODUCT_URL}`,
                    method: "POST",
                    body: data
                }),
                providesTags: ["Product"],
            }),
            updateProduct: builder.mutation({
                query: ({ id, formData }) => ({
                    url: `${PRODUCT_URL}/${id}`,
                    method: "Put",
                    body: formData
                }),
            }),
            deleteProduct: builder.mutation({
                query: (id) => ({
                    url: `${PRODUCT_URL}/${id}`,
                    method: "DELETE",
                }),
                providesTags: ["Product"]
            }),
            createReview: builder.mutation({
                query: (data) => ({
                    url: `${PRODUCT_URL}/${data.id}/`,
                    method: "POST",
                    body: data
                }),
            })

        })
    })
})
// const export { } = ProductApiSlice
