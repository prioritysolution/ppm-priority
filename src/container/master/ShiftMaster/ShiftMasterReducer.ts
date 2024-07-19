import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    shiftMasterData:[]
};
const shiftMasterSlice = createSlice({
    name: 'shiftMasterData',
    initialState,
    reducers: {
        getShiftMaster: (state, action) => {
            state.shiftMasterData = action.payload;
        }
    },
});
export const { getShiftMaster } = shiftMasterSlice.actions;
export default shiftMasterSlice.reducer;