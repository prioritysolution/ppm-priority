import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    pumpMasterData:[],
    nozzleData:[]
};
const pumpMasterSlice = createSlice({
    name: 'pumpMasterData',
    initialState,
    reducers: {
        getPumpMasterData: (state, action) => {
            state.pumpMasterData = action.payload;
        },
        getNozzleData: (state, action)=>{
            state.nozzleData = action.payload;
        }
    },
});
export const { getPumpMasterData, getNozzleData } = pumpMasterSlice.actions;
export default pumpMasterSlice.reducer;