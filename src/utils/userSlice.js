import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loginDisplay: false,
    userInfo: null,
  },
  reducers: {
    showLoginDisplay: (state, action) => {
      state.loginDisplay = action.payload;
    },
    addUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },

    removeUserInfo: (state) => {
      state.userInfo = null;
    },
  },
});

export const { showLoginDisplay, addUserInfo, removeUserInfo } =
  userSlice.actions;

export default userSlice.reducer;
