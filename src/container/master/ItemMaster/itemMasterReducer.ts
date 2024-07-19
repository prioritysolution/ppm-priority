import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  itemMasterUnit: [],
  itemMasterCategory: [],
  itemMasterData: [],
  additionalItemData: [],
  itemRateMasterData: [],
};
const itemMasterSlice = createSlice({
  name: "itemMasterData",
  initialState,
  reducers: {
    getItemMasterUnit: (state, action) => {
      state.itemMasterUnit = action.payload;
    },
    getItemMasterCategory: (state, action) => {
      state.itemMasterCategory = action.payload;
    },
    getItemMaster: (state, action) => {
      state.itemMasterData = action.payload;
    },
    getAdditionalItemData: (state, action) => {
      state.additionalItemData = action.payload;
    },
    getItemRateMasterData: (state, action) => {
      state.itemRateMasterData = action.payload;
    },
  },
});
export const {
  getItemMasterUnit,
  getItemMasterCategory,
  getItemMaster,
  getAdditionalItemData,
  getItemRateMasterData,
} = itemMasterSlice.actions;
export default itemMasterSlice.reducer;
