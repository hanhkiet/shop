import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderState } from './types';

const initialState: OrderState = {
  note: localStorage.getItem('cartNote')
    ? localStorage.getItem('cartNote')!
    : '',
    contactEmailOrder: localStorage.getItem('contactEmailOrder')
    ? localStorage.getItem('contactEmailOrder')!
    : '',
    shippingAddress: localStorage.getItem('shippingAddress')
    ? localStorage.getItem('shippingAddress')!
    : ''
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setNote(state, action: PayloadAction<string>) {
      state.note = action.payload;
      localStorage.setItem('cartNote', state.note);
    },
    setContactEmailOrder(state, action: PayloadAction<string>) {
      state.contactEmailOrder = action.payload;
      localStorage.setItem('contactEmailOrder', state.contactEmailOrder);
    },
    setShippingAddress(state, action: PayloadAction<string>) {
      state.shippingAddress = action.payload;
      localStorage.setItem('shippingAddress', state.shippingAddress);
    },
  },
});

export const { setNote, setContactEmailOrder, setShippingAddress } = orderSlice.actions;

export default orderSlice.reducer;
