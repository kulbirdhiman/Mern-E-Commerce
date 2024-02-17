import { createSlice } from "@reduxjs/toolkit"
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userinfo: localStorage.getItem("userinfo") ? JSON.parse(localStorage.getItem("userinfo")) : null,
    },
    reducers: {
        setCreadionls: (state, action) => {
            state.userinfo = action.payload;
            localStorage.setItem('userinfo', JSON.stringify(action.payload))
            const expDate = new Date().getTime + 30 * 24 * 60 * 60 * 100
            localStorage.setItem("expDate", JSON.stringify(expDate))
        },
        logout: (state) => {
            state.userinfo = null;
            localStorage.clear()
        }
    }
})
export const { setCreadionls, logout } = authSlice.actions
export default authSlice.reducer