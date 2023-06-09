import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchState } from './types';

const initialState: SearchState = {
  showSearchBar: false,
  query: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setShowSearchBar(state, action: PayloadAction<boolean>) {
      state.showSearchBar = action.payload;
    },
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
  },
});

export const { setShowSearchBar, setQuery } = searchSlice.actions;

export default searchSlice.reducer;
