import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  meterReadingData: [],
  additionalItemData: [],
  noteDenom: [],
};
const MeterReadingSlice = createSlice({
  name: "meterReading",
  initialState,
  reducers: {
    getMeterReadingData: (state, action) => {
      state.meterReadingData = action.payload;
    },
    getNoteDenom: (state, action) => {
      state.noteDenom = action.payload;
    },
  },
});
export const { getMeterReadingData, getNoteDenom } = MeterReadingSlice.actions;
export default MeterReadingSlice.reducer;
