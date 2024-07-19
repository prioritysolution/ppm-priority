import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    CustomerData: []
};
const CustomerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        getCustomerData: (state, action) =>{
            state.CustomerData = action.payload;
        }
    },
});
export const { getCustomerData } = CustomerSlice.actions;
export default CustomerSlice.reducer;