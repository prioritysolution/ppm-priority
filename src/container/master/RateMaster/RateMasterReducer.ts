import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    rateMasterData: []
};
const RateMasterSlice = createSlice({
    name: 'rates',
    initialState,
    reducers: {
        getRateData: (state, action) => {
            state.rateMasterData = action.payload;
        },
    },
});
export const { getRateData } = RateMasterSlice.actions;
export default RateMasterSlice.reducer;