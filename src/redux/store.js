import { configureStore } from "@reduxjs/toolkit";
import sellerSlice from "./slices/sellerSlice";

const Store = configureStore({
  reducer: {
    seller: sellerSlice,
  },
});

export default Store;
