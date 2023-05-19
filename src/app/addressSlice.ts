import { createSlice } from '@reduxjs/toolkit';
import { Address } from './types';

const initialState: Address[] = [];

const persistedState: Address[] = localStorage.getItem('addresses')
  ? JSON.parse(localStorage.getItem('addresses')!)
  : initialState;

const addressSlice = createSlice({
  name: 'addresses',
  initialState: persistedState,
  reducers: {},
});

export default addressSlice.reducer;
