import { combineReducers, configureStore } from "@reduxjs/toolkit";
import sellerSlice from "./slices/sellerSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: 'root',
  storage
};

const reducer = combineReducers({
  seller: sellerSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default Store;
