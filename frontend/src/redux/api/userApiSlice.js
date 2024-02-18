import { apiSlice } from "./apiSlice";
import { User_Url } from "../constants";

export const userApiSlice = apiSlice.injectEndpoints({
    reducerPath: "user",
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${User_Url}/login`, // 'url' should be lowercase
                method: "POST",
                body: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${User_Url}/logout`,
                method: "POST",
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${User_Url}/`,
                method: 'POST',
                body: data
            })
        })
    })
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } = userApiSlice;
