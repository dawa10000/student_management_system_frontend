import { createSlice } from "@reduxjs/toolkit";
import { getUserFromLocal, removeUserfromLocal, setUserToLocal } from "../local/local.js";



export const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    user: getUserFromLocal()
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      setUserToLocal(state.user);
    },
    removeUser: (state) => {
      state.user = null;
      removeUserfromLocal();
    }
  }
})

export const { setUser, removeUser } = userSlice.actions;