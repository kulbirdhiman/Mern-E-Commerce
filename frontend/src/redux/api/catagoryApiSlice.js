import { apiSlice } from "./apiSlice";
import { CATEGORY_URL } from '../constants'
import { query } from "express";
const catagoryApi = apiSlice.injectEndpoints({
    endpoints: (builder) => {
        createCategroy: builder.mutation({
            query: (data) => ({
                url: `${catagoryApi}`,
                method: "POST",
                body: data
            }),
            updatedCatagory: builder.mutation({
                query: (id, data) => ({
                    url: `${CATEGORY_URL}/${id}`,
                    method: "PUT",
                    body: data
                }),
                deletedCatagory: builder.mutation({
                    query: id => ({
                        url: `${CATEGORY_URL}/:${id}`,
                        method: "DELETE"
                    }),
                    fecthCatagory: builder.query({
                        query: () => ({
                            url: `${CATEGORY_URL}/categories`,
                            method: "GET"
                        })
                    })
                })
            }),
        })
    }
})