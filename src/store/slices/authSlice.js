import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loggedEmail: null,
    isLoggedIn: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.loggedEmail = action.payload;
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.loggedEmail = null;
            state.isLoggedIn = false;
        },
    },
});

export const { setLogin, logout } = authSlice.actions;
export default authSlice.reducer;
