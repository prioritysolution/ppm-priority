import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    staffData:[],
    staffType:[],
    staffDesignation:[]
};
const staffSlice = createSlice({
    name: 'staffMaster',
    initialState,
    reducers: {
        getStaffData: (state, action) => {
            state.staffData = action.payload;
        },
        getStaffType:(state, action)=>{
            state.staffType =action.payload
        },
        getStaffDesignation:(state, action)=>{
            state.staffDesignation= action.payload
        }
    },

});
export const { getStaffData, getStaffDesignation, getStaffType } = staffSlice.actions;
export default staffSlice.reducer;