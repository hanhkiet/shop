import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from './types';
import { ProductState } from './types';

const initialState: ProductState = {
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  products: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getProductData.pending, state => {
        state.products = [];
      })
      .addCase(getProductData.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(getProductData.rejected, state => {
        state.products = [];
      });
  },
});

const getProductData = createAsyncThunk<Product[]>(
  'product/getProductData',
  async () => {
    const allData: Product[] = [];
    let currentPage = 1;

    while (true) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_PRODUCTS_API_URL}?page=${currentPage}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        const jsonData = response.data as Product[];

        if (jsonData.length === 0) {
          break;
        }

        allData.push(...jsonData);
        currentPage++;
      } catch (error) {
        console.error('Error fetching data:', error);
        return [];
      }
    }

    return allData;
  },
);

export const {} = productSlice.actions;

export { getProductData };

export default productSlice.reducer;
