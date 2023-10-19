import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  seller: null,
  error: null,
  isSeller: false,
};

const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    LoadSellerRequest: (state) => {
      state.isLoading = true;
    },
    LoadSellerSuccess: (state, action) => {
      state.isSeller = true;
      state.isLoading = false;
      state.seller = action.payload;
    },
    LoadSellerFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isSeller = false;
    },
  },
});

export const { LoadSellerFail, LoadSellerRequest, LoadSellerSuccess } =
  sellerSlice.actions;
export default sellerSlice.reducer;
