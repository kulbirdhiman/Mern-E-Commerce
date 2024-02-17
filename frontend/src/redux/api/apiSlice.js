import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'
import { BaseUrl } from '../constants'
export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: BaseUrl }),
    tagTypes: ['Product', 'Oder', 'User', 'Category'],
    endpoints: () => ({})
})
