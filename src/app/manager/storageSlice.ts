import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { popUpMessage } from '../messageSlice';
import {
  CollectionItem,
  Product,
  ProductFilterPayload,
  StorageState,
} from '../types';

const initialState: StorageState = {
  loading: false,
  collections: [],
  products: [],
};

const storageSlice = createSlice({
  name: 'storage',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(sendLoadProductsCollectionRequest.pending, state => {
        state.loading = true;
      })
      .addCase(sendLoadProductsCollectionRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.collections = action.payload;
      })
      .addCase(sendLoadProductsCollectionRequest.rejected, state => {
        state.loading = false;
      });

    builder
      .addCase(sendAddProductCollectionRequest.pending, state => {
        state.loading = true;
      })
      .addCase(sendAddProductCollectionRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.collections.push(action.payload);
      })
      .addCase(sendAddProductCollectionRequest.rejected, state => {
        state.loading = false;
      });

    builder
      .addCase(sendUpdateProductCollectionRequest.pending, state => {
        state.loading = true;
      })
      .addCase(
        sendUpdateProductCollectionRequest.fulfilled,
        (state, action) => {
          state.loading = false;
          state.collections = state.collections.map(collection => {
            if (collection.id === action.payload.id) {
              return action.payload;
            }
            return collection;
          });
        },
      )
      .addCase(sendUpdateProductCollectionRequest.rejected, state => {
        state.loading = false;
      });

    builder
      .addCase(sendDeleteProductCollectionRequest.pending, state => {
        state.loading = true;
      })
      .addCase(
        sendDeleteProductCollectionRequest.fulfilled,
        (state, action) => {
          state.loading = false;
          state.collections = state.collections.filter(
            collection => collection.id !== action.payload,
          );
        },
      )
      .addCase(sendDeleteProductCollectionRequest.rejected, state => {
        state.loading = false;
      });

    builder
      .addCase(sendLoadProductsRequest.pending, state => {
        state.loading = true;
      })

      .addCase(sendLoadProductsRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(sendLoadProductsRequest.rejected, state => {
        state.loading = false;
      });
  },
});

const sendLoadProductsCollectionRequest = createAsyncThunk(
  'storage/loadProductsCollection',
  async (_, { dispatch }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_MANAGER_STORAGE_API_URL}/collections`,
        {
          withCredentials: true,
        },
      );

      const productsCollection = response.data as CollectionItem[];
      return productsCollection;
    } catch (error) {
      const { response } = error as AxiosError;
      if (response) {
        dispatch(
          popUpMessage({
            message:
              'Error loading products collection. Please try again later.',
            status: response.status,
          }),
        );
      } else {
        dispatch(
          popUpMessage({
            message:
              'Error loading products collection. Please check your internet connection.',
            status: 500,
          }),
        );
      }

      throw error;
    }
  },
);

const sendAddProductCollectionRequest = createAsyncThunk(
  'storage/addProductCollection',
  async (collection: CollectionItem, { dispatch }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_MANAGER_STORAGE_API_URL}/collections`,
        collection,
        {
          withCredentials: true,
        },
      );

      dispatch(
        popUpMessage({
          message: 'Product collection added successfully.',
          status: 200,
        }),
      );

      const newCollection = response.data as CollectionItem;
      return newCollection;
    } catch (error) {
      const { response } = error as AxiosError;
      if (response) {
        dispatch(
          popUpMessage({
            message: 'Error adding product collection. Please try again later.',
            status: response.status,
          }),
        );
      } else {
        dispatch(
          popUpMessage({
            message:
              'Error adding product collection. Please check your internet connection.',
            status: 500,
          }),
        );
      }

      throw error;
    }
  },
);

const sendUpdateProductCollectionRequest = createAsyncThunk(
  'storage/updateProductCollection',
  async (collection: CollectionItem, { dispatch }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_MANAGER_STORAGE_API_URL}/collections/${
          collection.id
        }`,
        collection,
        {
          withCredentials: true,
        },
      );

      dispatch(
        popUpMessage({
          message: 'Product collection updated successfully.',
          status: 200,
        }),
      );

      const updatedCollection = response.data as CollectionItem;
      return updatedCollection;
    } catch (error) {
      const { response } = error as AxiosError;
      if (response) {
        dispatch(
          popUpMessage({
            message:
              'Error updating product collection. Please try again later.',
            status: response.status,
          }),
        );
      } else {
        dispatch(
          popUpMessage({
            message:
              'Error updating product collection. Please check your internet connection.',
            status: 500,
          }),
        );
      }

      throw error;
    }
  },
);

const sendDeleteProductCollectionRequest = createAsyncThunk(
  'storage/deleteProductCollection',
  async (collectionId: number, { dispatch }) => {
    try {
      await axios.delete(
        `${
          import.meta.env.VITE_MANAGER_STORAGE_API_URL
        }/collections/${collectionId}`,
        {
          withCredentials: true,
        },
      );

      dispatch(
        popUpMessage({
          message: 'Product collection deleted successfully.',
          status: 200,
        }),
      );

      return collectionId;
    } catch (error) {
      const { response } = error as AxiosError;
      if (response) {
        dispatch(
          popUpMessage({
            message:
              'Error deleting product collection. Please try again later.',
            status: response.status,
          }),
        );
      } else {
        dispatch(
          popUpMessage({
            message:
              'Error deleting product collection. Please check your internet connection.',
            status: 500,
          }),
        );
      }

      throw error;
    }
  },
);

const sendLoadProductsRequest = createAsyncThunk(
  'storage/loadProducts',
  async (filter: ProductFilterPayload, { dispatch }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_MANAGER_STORAGE_API_URL}/products`,
        {
          params: filter,
          withCredentials: true,
        },
      );

      dispatch(sendLoadProductsCollectionRequest());

      const products = response.data as Product[];
      return products;
    } catch (error) {
      const { response } = error as AxiosError;
      if (response) {
        dispatch(
          popUpMessage({
            message: 'Error loading products. Please try again later.',
            status: response.status,
          }),
        );
      } else {
        dispatch(
          popUpMessage({
            message:
              'Error loading products. Please check your internet connection.',
            status: 500,
          }),
        );
      }

      throw error;
    }
  },
);

export {
  sendAddProductCollectionRequest,
  sendDeleteProductCollectionRequest,
  sendLoadProductsCollectionRequest,
  sendLoadProductsRequest,
  sendUpdateProductCollectionRequest
};
export default storageSlice.reducer;
