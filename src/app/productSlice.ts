import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from './types';
import { ProductState } from './types';

const initialState: ProductState = {
  colors: ['RED', 'BLUE', 'GREEN', 'BLACK', 'WHITE'],
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  products: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getProductData.pending, (state, action) => {
        state.products = [];
      })
      .addCase(getProductData.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(getProductData.rejected, (state, action) => {
        state.products = [];
      });
  },
});

const getProductData = createAsyncThunk('product/getProductData', async () => {
  const response = await axios.get(`${import.meta.env.VITE_PRODUCTS_API_URL}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data as Product[];
});

export const {} = productSlice.actions;

export { getProductData };

export default productSlice.reducer;
