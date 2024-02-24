import { apiSlice } from "./apiSlice";
import { PRODUCT_URL } from '../constants'
const ProductApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => {
        getAllProducts: builder.query({
            query: ({ keyword }) => ({
                url: `${PRODUCT_URL}/`,
                method: "GET",
                params: { keyword }
            })
        }),
    }
})

