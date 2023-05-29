import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { clearAddresses } from './addressSlice';
import {
  AuthState,
  LoginDataActionPayload,
  RegisterDataActionPayload,
  User,
} from './types';

const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  status: null,
  user: null,
};

const persistedState: AuthState = localStorage.getItem('auth')
  ? JSON.parse(localStorage.getItem('auth')!)
  : initialState;

const authSlice = createSlice({
  name: 'auth',
  initialState: persistedState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(sendRegisterRequest.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(sendRegisterRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(sendRegisterRequest.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      });

    builder
      .addCase(sendLoginRequest.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(sendLoginRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(sendLoginRequest.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      });

    builder
      .addCase(sendLogoutRequest.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(sendLogoutRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(sendLogoutRequest.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

const sendRegisterRequest = createAsyncThunk(
  'auth/register',
  async (payload: RegisterDataActionPayload) => {
    const response = await axios.post(
      `${import.meta.env.VITE_CUSTOMER_AUTH_API_URL}/register`,
      payload,
      {
        withCredentials: true,
      },
    );

    const user = response.data as User;
    return user;
  },
);

const sendLoginRequest = createAsyncThunk(
  'auth/login',
  async (payload: LoginDataActionPayload, { dispatch }) => {
    const response = await axios.post(
      `${import.meta.env.VITE_CUSTOMER_AUTH_API_URL}/login`,
      payload,
      {
        withCredentials: true,
      },
    );

    const user = response.data as User;

    return user;
  },
);

const sendLogoutRequest = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_CUSTOMER_AUTH_URL}/logout`,
        {},
        {
          withCredentials: true,
        },
      );

      dispatch(clearAddresses());
    } catch (error) {
      console.log(error);
    }
  },
);

export { sendLoginRequest, sendLogoutRequest, sendRegisterRequest };
export default authSlice.reducer;
