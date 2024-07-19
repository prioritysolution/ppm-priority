import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    bankAccountsData: []
};
const BankAccountSlice = createSlice({
    name: 'bankAccounts',
    initialState,
    reducers: {
        getBankAccountData: (state, action) =>{
            state.bankAccountsData = action.payload;
        }
    },
});
export const { getBankAccountData } = BankAccountSlice.actions;
export default BankAccountSlice.reducer;