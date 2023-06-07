import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchState } from './types';

const initialState: SearchState = {
  showSearchBar: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setShowSearchBar(state, action: PayloadAction<boolean>) {
      state.showSearchBar = action.payload;
    },
  },
});

export const { setShowSearchBar } = searchSlice.actions;

export default searchSlice.reducer;
