import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    categories: [],
    product: [],
    checked: [],
    radio: [],
    brandCheckBox: {},
    checkedBrands: []
}
const shopSlice = createSlice({
    name: "shop",
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload
        },
        setProducts: (state, action) => {
            state.product = action.payload
        },
        setChecked: (state, action) => {
            state.checked = action.payload
        },
        setRadio: (state, action) => {
            state.radio = action.payload
        },
        setCheckedBrand: (state, action) => {
            state.checkedBrands = action.payload
        },
    }
})
export const { setCategories, setChecked, setRadio, setProducts } = shopSlice.actions
export default shopSlice.reducer