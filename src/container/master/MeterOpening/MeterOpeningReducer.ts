import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    meterOpeningData: []
};
const MeterOpeningSlice = createSlice({
    name: 'meterOpening',
    initialState,
    reducers: {
        getMeterOpeningData: (state, action) =>{
            state.meterOpeningData = action.payload;
        }
    },
});
export const { getMeterOpeningData } = MeterOpeningSlice.actions;
export default MeterOpeningSlice.reducer;