import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { popUpMessage } from './messageSlice';
import {
  Credentials,
  LoginDataActionPayload,
  Manager,
  ManagerState,
} from './types';

const initialState: ManagerState = {
  isAuthenticated: false,
  loading: false,
  manager: null,
};

const persistedState: ManagerState = localStorage.getItem('manager')
  ? JSON.parse(localStorage.getItem('manager')!)
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

    builder
      .addCase(sendLogoutRequest.pending, state => {
        state.loading = true;
      })
      .addCase(sendLogoutRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.manager = null;
        state.isAuthenticated = false;
      })
      .addCase(sendLogoutRequest.rejected, state => {
        state.loading = false;
        state.isAuthenticated = false;
      });

    builder
      .addCase(sendUpdatePasswordRequest.pending, state => {
        state.loading = true;
      })
      .addCase(sendUpdatePasswordRequest.fulfilled, state => {
        state.loading = false;
      })
      .addCase(sendUpdatePasswordRequest.rejected, state => {
        state.loading = false;
      });

    builder
      .addCase(sendUpdateProfileRequest.pending, state => {
        state.loading = true;
      })
      .addCase(sendUpdateProfileRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.manager = action.payload;
      })
      .addCase(sendUpdateProfileRequest.rejected, state => {
        state.loading = false;
      });

    builder
      .addCase(sendRefreshRequest.pending, state => {
        state.loading = true;
      })
      .addCase(sendRefreshRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.manager = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(sendRefreshRequest.rejected, state => {
        state.loading = false;
        state.manager = null;
        state.isAuthenticated = false;
      });
  },
});

const sendLoginRequest = createAsyncThunk(
  'manager/login',
  async (payload: LoginDataActionPayload, { dispatch }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_MANAGER_AUTH_API_URL}/login`,
        payload,
        {
          withCredentials: true,
        },
      );

      dispatch(
        popUpMessage({
          message: 'Successfully logged in.',
          status: response.status,
        }),
      );

      const manager = response.data as Manager;
      return manager;
    } catch (error) {
      const { response } = error as AxiosError;
      if (response) {
        dispatch(
          popUpMessage({
            message: 'Error logging in. Please check your credentials.',
            status: response.status,
          }),
        );
      } else {
        dispatch(
          popUpMessage({
            message: 'Error logging in. Please check your internet connection.',
            status: 500,
          }),
        );
      }
      throw error;
    }
  },
);

const sendLogoutRequest = createAsyncThunk(
  'manager/logout',
  async (_, { dispatch }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_MANAGER_AUTH_API_URL}/logout`,
        null,
        {
          withCredentials: true,
        },
      );

      dispatch(
        popUpMessage({
          message: 'Successfully logged out.',
          status: response.status,
        }),
      );
    } catch (error) {
      const { response } = error as AxiosError;
      if (response) {
        dispatch(
          popUpMessage({
            message: 'Error logging out.',
            status: response.status,
          }),
        );
      } else {
        dispatch(
          popUpMessage({
            message:
              'Error logging out. Please check your internet connection.',
            status: 500,
          }),
        );
      }
      throw error;
    }
  },
);

const sendRefreshRequest = createAsyncThunk(
  'manager/refresh',
  async (_, { dispatch }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_MANAGER_AUTH_API_URL}/refresh`,
        {
          withCredentials: true,
        },
      );

      const manager = response.data as Manager;
      return manager;
    } catch (error) {
      const { response } = error as AxiosError;
      if (response) {
        dispatch(
          popUpMessage({
            message: 'Token expired. Please log in again.',
            status: response.status,
          }),
        );
      } else {
        dispatch(
          popUpMessage({
            message: 'Please check your internet connection.',
            status: 500,
          }),
        );
      }
      throw error;
    }
  },
);

const sendUpdatePasswordRequest = createAsyncThunk(
  'manager/updatePassword',
  async (
    payload: {
      oldCredentials: Credentials;
      newCredentials: Credentials;
    },
    { dispatch },
  ) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_MANAGER_ACCOUNT_API_URL}/password`,
        payload,
        {
          withCredentials: true,
        },
      );

      dispatch(
        popUpMessage({
          message: 'Successfully updated password.',
          status: response.status,
        }),
      );
    } catch (error) {
      const { response } = error as AxiosError;
      if (response) {
        dispatch(
          popUpMessage({
            message: 'Error updating password. Please try again.',
            status: response.status,
          }),
        );
      } else {
        dispatch(
          popUpMessage({
            message:
              'Error updating password. Please check your internet connection.',
            status: 500,
          }),
        );
      }

      throw error;
    }
  },
);

const sendUpdateProfileRequest = createAsyncThunk(
  'manager/updateProfile',
  async (payload: Manager, { dispatch }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_MANAGER_ACCOUNT_API_URL}`,
        payload,
        {
          withCredentials: true,
        },
      );

      dispatch(
        popUpMessage({
          message: 'Successfully updated profile.',
          status: response.status,
        }),
      );

      return response.data as Manager;
    } catch (error) {
      const { response } = error as AxiosError;
      if (response) {
        dispatch(
          popUpMessage({
            message: 'Error updating profile. Please try again.',
            status: response.status,
          }),
        );
      } else {
        dispatch(
          popUpMessage({
            message:
              'Error updating profile. Please check your internet connection.',
            status: 500,
          }),
        );
      }

      throw error;
    }
  },
);

export {
  sendLoginRequest,
  sendLogoutRequest,
  sendRefreshRequest,
  sendUpdatePasswordRequest,
  sendUpdateProfileRequest,
};

export default managerSlice.reducer;
