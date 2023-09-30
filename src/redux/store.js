import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Slices/AuthSlice";
import ProductSlice from "./Slices/ProductSlice";

const rootReducer = combineReducers({
  auth: AuthSlice,
  products: ProductSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
