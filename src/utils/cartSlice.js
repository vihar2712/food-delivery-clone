import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    cartTotalPrice: 0,
    resId: null,
    warning: false,
  },
  reducers: {
    addItem: (state, action) => {
      state.items.unshift(action.payload);
      // RTK says either mutate a state or return a new state, you can't do both. so we can not write the push operation without {}
      //  addItem: (state, action) =>  state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

      state.items = state.items.filter(
        (item) => item.itemInfo.id !== action.payload
      );
      // state.items.pop();
    },
    addPriceInCart: (state, action) => {
      state.cartTotalPrice = Number.parseFloat(
        (state.cartTotalPrice + action.payload).toFixed(2)
      );
    },
    subtractPriceInCart: (state, action) => {
      state.cartTotalPrice = Number.parseFloat(
        (state.cartTotalPrice - action.payload).toFixed(2)
      );
    },
    clearCart: (state) => {
      // RTK says either mutate a state or return a new state, you can't do both.
      // 1st way
      // state.items = [];
      // console.log(state);
      // return state;

      // 2nd way
      state.items.length = 0;

      // 3rd way
      // return { items: [] };
    },
    addResId: (state, action) => {
      state.resId = action.payload;
    },
    setWarning: (state, action) => {
      state.warning = action.payload;
    },
  },
});
/*
cartSlice = {
{ actions : addItem},
reducer,
}
*/

export const {
  addItem,
  removeItem,
  clearCart,
  addPriceInCart,
  subtractPriceInCart,
  addResId,
  setWarning,
} = cartSlice.actions;
export default cartSlice.reducer;
