import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PathState } from './types';

const initialState: PathState = {
  pathName: '/',
};

const pathSlice = createSlice({
  name: 'path',
  initialState,
  reducers: {
    setPathName(state, action: PayloadAction<string>) {
      state.pathName = action.payload;
    },
  },
});

export const { setPathName } = pathSlice.actions;

export default pathSlice.reducer;
