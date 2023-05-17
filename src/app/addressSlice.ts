import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Address } from './types';

const initialState: Address[] = [];

const persistedState: Address[] = localStorage.getItem('addresses')
  ? JSON.parse(localStorage.getItem('addresses')!)
  : initialState;

const addressSlice = createSlice({
  name: 'addresses',
  initialState: persistedState,
  reducers: {
    loadAddresses: (state, action: PayloadAction<Address[]>) => {
      return action.payload;
    },
    clearAddresses: (state, action: PayloadAction<Address[]>) => {
      return [];
    },
    addAddress: (state, action: PayloadAction<Address>) => {
      state.push(action.payload);
    },
    deleteAddress: (state, action: PayloadAction<number>) => {
      state.splice(action.payload, 1);
    },
    updateAddress: (
      state,
      action: PayloadAction<{ index: number; address: Address }>,
    ) => {
      state[action.payload.index] = action.payload.address;
    },
  },
});

export const {
  loadAddresses,
  clearAddresses,
  addAddress,
  deleteAddress,
  updateAddress,
} = addressSlice.actions;
export default addressSlice.reducer;
