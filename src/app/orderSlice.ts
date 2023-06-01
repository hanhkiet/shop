import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderState } from './types';

const initialState: OrderState = {
  note: localStorage.getItem('cartNote')
    ? localStorage.getItem('cartNote')!
    : '',
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setNote(state, action: PayloadAction<string>) {
      state.note = action.payload;
      localStorage.setItem('cartNote', state.note);
    },
  },
});

export const { setNote } = orderSlice.actions;

export default orderSlice.reducer;
