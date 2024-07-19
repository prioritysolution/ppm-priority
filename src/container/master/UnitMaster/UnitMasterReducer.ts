import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    unitMasterData: []
};
const unitMasterSlice = createSlice({
    name: 'unitMasterData',
    initialState,
    reducers: {
        getUnitMasterData: (state, action) => {
            state.unitMasterData = action.payload;
        }
    },
});
export const { getUnitMasterData } = unitMasterSlice.actions;
export default unitMasterSlice.reducer;