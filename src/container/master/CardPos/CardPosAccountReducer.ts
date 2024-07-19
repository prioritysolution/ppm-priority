import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    CardPosData: [],
    bankPosData: []
};
const CardPosSlice = createSlice({
    name: 'cardPos',
    initialState,
    reducers: {
        getCardPosData: (state, action) =>{
            state.CardPosData = action.payload;
        },
        getBankPosData: (state, action)=>{
            state.bankPosData= action.payload;
        }
    },
});
export const { getCardPosData, getBankPosData } = CardPosSlice.actions;
export default CardPosSlice.reducer;