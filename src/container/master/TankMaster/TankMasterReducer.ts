import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  tankMasterData: [],
  tankItemData: [],
};
const tankMasterSlice = createSlice({
  name: "tankMasterData",
  initialState,
  reducers: {
    getTankMasterData: (state, action) => {
      state.tankMasterData = action.payload;
    },
    getTankItemData: (state, action) => {
      state.tankItemData = action.payload;
    },
  },
});
export const { getTankMasterData, getTankItemData } = tankMasterSlice.actions;
export default tankMasterSlice.reducer;
