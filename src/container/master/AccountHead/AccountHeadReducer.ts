import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    accountHeadData: [],
    accountHeadMainData: []
};
const AccountHeadSlice = createSlice({
    name: 'accountHead',
    initialState,
    reducers: {
        getAccountHeadData: (state, action) =>{
            state.accountHeadData = action.payload;
        },
        getAccountHeadMainData:(state, action)=>{
            state.accountHeadMainData= action.payload;
        }
    },
});
export const { getAccountHeadData, getAccountHeadMainData } = AccountHeadSlice.actions;
export default AccountHeadSlice.reducer;