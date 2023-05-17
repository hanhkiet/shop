import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MenuState } from './types';

const initialState: MenuState = {
  hoverMenuId: 0,
  activeMenu: null,
  activeMenuChild: [],
};

const menuSlice = createSlice({
  name: 'menu',
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
});

export const {
  setHoverMenuId,
  setActiveMenu,
  addActiveMenuChild,
  removeActiveMenuChild,
} = menuSlice.actions;

export default menuSlice.reducer;
