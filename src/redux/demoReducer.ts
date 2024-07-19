/**
 * @description This slice is example of a component reducer function that will be created for each component in container.
 */
"use client"
import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  users: [],
  loading: false,
  error: false,
};
const demoSlice = createSlice({
    /*The name property in createSlice is used internally by redux-toolkit to create the names for your actions. 
    If the name is 'user' then the getUser action will have { type: 'user/getUser' } */
  name: 'user',//
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.users = action.payload;
      state.loading = true;
      state.error = false;
    },
    deleteUser: (state, action) => {
      state.users?.filter((user : any) => user?.id !== action.payload.id);
      state.loading = false;
    },
  },
});
export const { deleteUser, getUser } = demoSlice.actions;
export default demoSlice.reducer;