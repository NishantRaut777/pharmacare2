import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logInStart: (state) => {
            state.loading = true;
        },

        logInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },

        logInFailure: (state, action) => {
            state.currentUser = null;
            state.error = action.payload;
            state.loading = false;
        },

        logOutStart: (state) => {
            state.loading = true;
        },

        logOutSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },

        logOutFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },

        registerStart: (state) => {
            state.loading = true;
        },

        registerSuccess: (state) => {
            state.loading = false;
            state.error = null;
        },

        registerFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },

        setUser: (state, action) => {
            state.currentUser = action.payload;
        }

    }
});

export const {
    logInStart,
    logInSuccess,
    logInFailure,
    logOutStart,
    logOutSuccess,
    logOutFailure,
    registerStart,
    registerSuccess,
    registerFailure,
    setUser
} = userSlice.actions;

export default userSlice.reducer;