import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    cartTotalPrice: 0,
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
      state.cartTotalPrice += action.payload;
    },
    subtractPriceInCart: (state, action) => {
      state.cartTotalPrice -= action.payload;
    },
    clearCart: (state) => {
      // RTK says either mutate a state or return a new state, you can't do both.
      // 1st way
      // state.items = [];
      // console.log(state);
      // return state;

      // 2nd way
      //   state.items.length = 0;

      // 3rd way
      return { items: [] };
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
} = cartSlice.actions;
export default cartSlice.reducer;
