import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../constants'
export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    tagTypes: ['Product', 'Oder', 'User', 'Category'],
    endpoints: () => ({})
})
