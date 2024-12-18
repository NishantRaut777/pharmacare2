import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {
    checkoutLoading: false,
    checkoutError: null
};

const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {
        doingCheckout: (state) => {
            state.checkoutLoading = true;
        },
		
		checkoutSuccess: (state) => {
			state.checkoutLoading = false;	
		},
		
		checkoutFailure: (state) => {
			state.checkoutLoading = false;
		}
    }
});

export const {
    doingCheckout,
    checkoutSuccess,
    checkoutFailure
} = checkoutSlice.actions;

export default checkoutSlice.reducer;