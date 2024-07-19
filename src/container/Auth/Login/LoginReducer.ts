import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    modalState: false
};
const LoginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        getModalState: (state, action) =>{
            state.modalState = action.payload;
        }
    },
});
export const { getModalState } = LoginSlice.actions;
export default LoginSlice.reducer;