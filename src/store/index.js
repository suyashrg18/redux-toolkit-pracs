import { configureStore } from "@reduxjs/toolkit";

import uiStateSlice from "./ui-slice";
import cartSlice from "./cart-slice";

const store = configureStore({
  reducer: {
    ui: uiStateSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default store;
