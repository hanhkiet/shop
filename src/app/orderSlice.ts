import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderState } from './types';

const initialState: OrderState = {
  note: '',
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setNote(state, action: PayloadAction<string>) {
      state.note = action.payload;
    },
  },
});

export const { setNote } = orderSlice.actions;

export default orderSlice.reducer;
