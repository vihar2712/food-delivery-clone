import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    cuisineArr: [],
  },
  reducers: {
    filterCuisineArr: (state, action) => {
      state.cuisineArr = action.payload;
    },
  },
});

export const { filterCuisineArr } = filterSlice.actions;

export default filterSlice.reducer;
