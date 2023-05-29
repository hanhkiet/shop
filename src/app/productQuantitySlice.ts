import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ItemsInStore } from './types';
import { ProductQuantityState } from './types';

const initialState: ProductQuantityState = {
  productQuantity: [],
};

const productQuantitySlice = createSlice({
  name: 'productQuantity',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getProductQuantityData.pending, (state, action) => {
        state.productQuantity = [];
      })
      .addCase(getProductQuantityData.fulfilled, (state, action) => {
        state.productQuantity = action.payload;
      })
      .addCase(getProductQuantityData.rejected, (state, action) => {
        state.productQuantity = [];
      });
  },
});

const getProductQuantityData = createAsyncThunk(
  'product/getProductQuantityData',
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_ITEM_QUANTITY_API_URL}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data as ItemsInStore[];
  },
);

export const {} = productQuantitySlice.actions;

export { getProductQuantityData };

export default productQuantitySlice.reducer;
