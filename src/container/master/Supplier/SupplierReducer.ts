import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    supplierData:[]
};
const supplierSlice = createSlice({
    name: 'supplier',
    initialState,
    reducers: {
        getSupplierData: (state, action) => {
            state.supplierData = action.payload;
        }
    },
});
export const { getSupplierData } = supplierSlice.actions;
export default supplierSlice.reducer;