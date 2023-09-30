import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartProducts: [],
  data: [],
  status: null,
  error: "",
};

export let fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    let res = await axios.get(`https://khalidadell.github.io/api/db.json`);
    return res.data;
  }
);

const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    cartProductsFun: (state, action) => {
      state.cartProducts = [...state.cartProducts, action.payload];
    },
    filterCartProducts: (state, action) => {
      state.cartProducts = action.payload;
    },
  },
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.status = "loading";
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "success";
    },
    [fetchProducts.rejected]: (state) => {
      state.status = "failed";
    },
  },
});
export let { cartProductsFun, filterCartProducts } = ProductSlice.actions;
export default ProductSlice.reducer;
