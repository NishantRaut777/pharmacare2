import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {
    loadingMyOrders: false
};

const myorderSlice = createSlice({
    name : "myOrdersSlice",
    initialState,
    reducers: {
        gettingMyOrders: (state, action) => {
            state.loadingMyOrders = true;
        },
        fetchedMyOrders: (state, action) => {
            state.loadingMyOrders = false;
        }
    }
});


export const {
    gettingMyOrders,
    fetchedMyOrders
} = myorderSlice.actions;

export default myorderSlice.reducer;