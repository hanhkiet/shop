import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Menu, MenuState } from './types';

const initialState: MenuState = {
  hoverMenuId: 0,
  activeMenu: null,
  activeMenuChild: [],
  visibleMenu: false,
  menus: [],
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setHoverMenuId(state, action: PayloadAction<number>) {
      state.hoverMenuId = action.payload;
    },
    setVisibleMenu(state, action: PayloadAction<boolean>) {
      state.visibleMenu = action.payload;
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
      .addCase(getMenuData.pending, (state, action) => {
        state.menus = [];
      })
      .addCase(getMenuData.fulfilled, (state, action) => {
        state.menus = action.payload;
      })
      .addCase(getMenuData.rejected, (state, action) => {
        state.menus = [];
      });
  },
});

const getMenuData = createAsyncThunk('menu/getMenuData', async () => {
  const response = await axios.get(`${import.meta.env.VITE_MENUS_API_URL}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data as Menu[];
});

export const {
  setHoverMenuId,
  setActiveMenu,
  setVisibleMenu,
  addActiveMenuChild,
  removeActiveMenuChild,
} = menuSlice.actions;

export { getMenuData };

export default menuSlice.reducer;
