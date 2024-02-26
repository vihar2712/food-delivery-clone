import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";
import filterReducer from "./filterSlice";

const appStore = configureStore({
  reducer: {
    // this reducer is of our redux store and it contains reducers for all slices
    cartR: cartReducer,
    user: userReducer,
    filter: filterReducer,
    //  => reducer of other slices which may be present inside our redux store
  },
});
// console.log(appStore.getState());

export default appStore;
