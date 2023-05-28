import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { LoginDataActionPayload, Manager, ManagerState } from './types';

const initialState: ManagerState = {
  isAuthenticated: false,
  loading: false,
  manager: null,
};

const persistedState: ManagerState = localStorage.getItem('managerAuth')
  ? JSON.parse(localStorage.getItem('managerAuth')!)
  : initialState;

const managerSlice = createSlice({
  name: 'manager',
  initialState: persistedState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(sendLoginRequest.pending, state => {
      state.loading = true;
    });
    builder.addCase(sendLoginRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.manager = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(sendLoginRequest.rejected, state => {
      state.loading = false;
    });
  },
});

const sendLoginRequest = createAsyncThunk(
  'manager/login',
  async (payload: LoginDataActionPayload) => {
    const response = await axios.post(
      `${import.meta.env.VITE_MANAGER_AUTH_API_URL}/login`,
      payload,
      {
        withCredentials: true,
      },
    );

    const manager = response.data as Manager;
    return manager;
  },
);

export { sendLoginRequest };

export default managerSlice.reducer;
