import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoryProduct, CategoryProductState } from './types';

const initialState: CategoryProductState = {
  categoryProduct: [],
};

const categoryProductSlice = createSlice({
  name: 'categoryProduct',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCategoryProductData.pending, (state, action) => {
        state.categoryProduct = [];
      })
      .addCase(getCategoryProductData.fulfilled, (state, action) => {
        state.categoryProduct = action.payload;
      })
      .addCase(getCategoryProductData.rejected, (state, action) => {
        state.categoryProduct = [];
      });
  },
});

const getCategoryProductData = createAsyncThunk(
  'product/categoryProduct',
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_CATEGORY_PRODUCT_API_URL}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data as CategoryProduct[];
  },
);

export const {} = categoryProductSlice.actions;

export { getCategoryProductData };

export default categoryProductSlice.reducer;
