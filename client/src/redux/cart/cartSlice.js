import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {
    cartData: null,
    loading: false,
    error: null
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        getCart: (state, action) => {
            state.cartData = action.payload;
            state.loading = false
        },

        addingToCart: (state) => {
            state.loading = true;
        },

        addToCart: (state, action) => {
            state.cartData = action.payload;
            state.loading = false;
        },

        makeCartEmpty: (state) => {
            state.cartData = null;
        },

        deletingFromCart: (state) => {
            state.loading = true;
        },

        deleteFromCart: (state, action) => {
            state.cartData = action.payload;
            state.loading = false;
        },

        cartLoading: (state, action) => {
            state.loading = true;
        },

        addToCartFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },

        deleteFromCartFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload
        }
    }
});

export const {
    getCart,
    addingToCart,
    addToCart,
    makeCartEmpty,
    deletingFromCart,
    deleteFromCart,
    cartLoading,
    addToCartFailure,
    deleteFromCartFailure
} = cartSlice.actions;

export default cartSlice.reducer;