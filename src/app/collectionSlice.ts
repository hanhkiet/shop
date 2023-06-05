import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Collection, CollectionState } from './types';

const initialState: CollectionState = {
  hoverMenuId: 0,
  activeMenu: null,
  activeMenuChild: [],
  collections: [],
};

const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    setHoverMenuId(state, action: PayloadAction<number>) {
      state.hoverMenuId = action.payload;
    },
    setActiveMenu(state, action: PayloadAction<string | null>) {
      state.activeMenu = action.payload;
    },
    addActiveMenuChild(state, action: PayloadAction<string>) {
      state.activeMenuChild.push(action.payload);
    },
    removeActiveMenuChild(state, action: PayloadAction<string>) {
      state.activeMenuChild = state.activeMenuChild.filter(
        element => element !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCollectionData.pending, (state, action) => {
        state.collections = [];
      })
      .addCase(getCollectionData.fulfilled, (state, action) => {
        state.collections = action.payload;
      })
      .addCase(getCollectionData.rejected, (state, action) => {
        state.collections = [];
      });
  },
});

const getCollectionData = createAsyncThunk(
  'collection/getCollectionData',
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_COLLECTIONS_API_URL}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data as Collection[];
  },
);

export const {
  setHoverMenuId,
  setActiveMenu,
  addActiveMenuChild,
  removeActiveMenuChild,
} = collectionSlice.actions;

export { getCollectionData };

export default collectionSlice.reducer;
