import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    itemCategoryData: []
};
const itemCategorySlice = createSlice({
    name: 'itemCategory',
    initialState,
    reducers: {
        getItemCategoryData: (state, action) =>{
            state.itemCategoryData = action.payload;
        }
    },
});
export const { getItemCategoryData } = itemCategorySlice.actions;
export default itemCategorySlice.reducer;