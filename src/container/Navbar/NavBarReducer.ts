import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    navData: [],
};
const navSlice = createSlice({
    name: 'navbarData',
    initialState,
    reducers: {
        getNavData: (state, action) => {
            state.navData = action.payload;
        },
    },
});
export const { getNavData } = navSlice.actions;
export default navSlice.reducer;