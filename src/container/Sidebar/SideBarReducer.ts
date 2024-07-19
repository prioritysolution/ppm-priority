import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    financialYear: [],
    sideBarData: []
};
const sideBarSlice = createSlice({
    name: 'sideBarData',
    initialState,
    reducers: {
        getFinancialYear: (state, action) => {
            state.financialYear = action.payload;
        },
        getSideBarData: (state, action) =>{
            state.sideBarData = action.payload;
        }
    },
});
export const { getFinancialYear,getSideBarData } = sideBarSlice.actions;
export default sideBarSlice.reducer;