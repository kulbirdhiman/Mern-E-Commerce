import { createSlice } from "@reduxjs/toolkit"


const favoriteSlice = createSlice({
    name: "favorite",
    initialState: [],
    reducers: {
        addTwofavorites: (state, action) => {
            if (!state.some(() => product._id === action.payload._id)) {
                state.push(action.payload)
            }
        },
        removeFav: (state, action) => {
            state.filter((product) => product._id !== action.payload)._d;
        },
        setFavoties: (state, action) => {
            return action.payload
        }
    }
})
export default favoriteSlice
export const { addTwofavorites, removeFav, setFavoties } = favoriteSlice.actions