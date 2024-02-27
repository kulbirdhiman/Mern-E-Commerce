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
        }),
        profile: builder.mutation({
            query: (data) => ({
                url: `${User_Url}/profile`,
                method: "POST",
                body: data
            })
        }),
        getUsers: builder.query({
            query: () => ({
                url: User_Url,
            }),
            providesTags: ["User"],
            keepUnusedDataFor: 5,
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: ` ${User_Url}/${userId}`,
                method: "DELETE",
            })
        }),
        getUserDetails: builder.query({
            query: (id) => ({
                url: `${User_Url}/${id}`,
                method: "GET"
            }),
            keepUnusedDataFor: 5
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${User_Url}/${data.userId}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["User"]
        })
    })
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useGetUsersQuery, useProfileMutation, useDeleteUserMutation, useGetUserDetailsQuery, useUpdateUserMutation } = userApiSlice;
