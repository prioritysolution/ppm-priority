import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    tankerData:[]
};
const tankerSlice = createSlice({
    name: 'tanker',
    initialState,
    reducers: {
        getTankerData: (state, action) => {
            state.tankerData = action.payload;
        }
    },
});
export const { getTankerData } = tankerSlice.actions;
export default tankerSlice.reducer;