import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Manager, ManagerState, RegisterDataActionPayload } from './types';

const initialState: ManagerState = {
  isAuthenticated: false,
  loading: false,
  manager: null,
};

const persistedState = localStorage.getItem('managerAuth')
  ? JSON.parse(localStorage.getItem('managerAuth')!)
  : initialState;

const managerSlice = createSlice({
  name: 'manager',
  initialState: persistedState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(sendRegisterRequest.pending, state => {
      state.loading = true;
    });
    builder.addCase(sendRegisterRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.manager = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(sendRegisterRequest.rejected, state => {
      state.loading = false;
    });
  },
});

const sendRegisterRequest = createAsyncThunk(
  'manager/register',
  async (payload: RegisterDataActionPayload) => {
    const response = await axios.post(
      `${import.meta.env.VITE_AUTH_API_URL}/register`,
      payload,
    );

    const manager = response.data as Manager;
    return manager;
  },
);

export default managerSlice.reducer;
