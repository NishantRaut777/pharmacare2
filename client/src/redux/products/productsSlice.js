import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    error: null,
    loading: false
};


const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        getProductsStart: (state) => {
            state.loading = true;
        },

        getProductsSuccess: (state) => {
            state.loading = false;
            state.error = false;
        },

        getProductsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const {
    getProductsStart,
    getProductsSuccess,
    getProductsFailure
} = productSlice.actions;

export default productSlice.reducer;