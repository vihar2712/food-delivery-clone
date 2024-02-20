import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loginDisplay: false,
  },
  reducers: {
    showLoginDisplay: (state) => {
      state.loginDisplay = !state.loginDisplay;
    },
  },
});

export const { showLoginDisplay } = userSlice.actions;

export default userSlice.reducer;
