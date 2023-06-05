import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { sendLoadAddressesRequest } from '../addressSlice';
import { popUpMessage } from '../messageSlice';
import {
    AccountState,
    Credentials,
    LoginDataActionPayload,
    RegisterDataActionPayload,
    User,
    UserProfilePayload,
} from '../types';

const initialState: AccountState = {
  isAuthenticated: false,
  loading: false,
  status: null,
  user: null,
};

const persistedState: AccountState = localStorage.getItem('account')
  ? JSON.parse(localStorage.getItem('account')!)
  : initialState;

const authSlice = createSlice({
  name: 'account',
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

    builder
      .addCase(sendUpdateProfileRequest.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(sendUpdateProfileRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          ...state.user!,
          ...action.payload,
        };
      })
      .addCase(sendUpdateProfileRequest.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

const sendRegisterRequest = createAsyncThunk(
  'account/register',
  async (payload: RegisterDataActionPayload, { dispatch }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_CUSTOMER_AUTH_API_URL}/register`,
        payload,
        {
          withCredentials: true,
        },
      );

      dispatch(
        popUpMessage({
          message: 'Successfully registered.',
          status: response.status,
        }),
      );

      const user = response.data as User;
      return user;
    } catch (error) {
      const { response } = error as AxiosError;
      if (response) {
        dispatch(
          popUpMessage({
            message: 'Error registering. Please check your credentials.',
            status: response.status,
          }),
        );
      } else {
        dispatch(
          popUpMessage({
            message:
              'Error registering. Please check your internet connection.',
            status: 500,
          }),
        );
      }
      throw error;
    }
  },
);

const sendLoginRequest = createAsyncThunk(
  'account/login',
  async (payload: LoginDataActionPayload, { dispatch }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_CUSTOMER_AUTH_API_URL}/login`,
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

      dispatch(sendLoadAddressesRequest());

      const user = response.data as User;
      return user;
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
  'account/logout',
  async (_, { dispatch }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_CUSTOMER_AUTH_API_URL}/logout`,
        {},
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
            message: 'Error logging out. Please try again.',
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

const sendUpdatePasswordRequest = createAsyncThunk(
  'account/updatePassword',
  async (
    payload: { oldCredentials: Credentials; newCredentials: Credentials },
    { dispatch },
  ) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_CUSTOMER_ACCOUNT_API_URL}/password`,
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
  'account/updateProfile',
  async (payload: UserProfilePayload, { dispatch }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_CUSTOMER_ACCOUNT_API_URL}`,
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

      const user = response.data as User;
      return user;
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
    sendRegisterRequest,
    sendUpdatePasswordRequest,
    sendUpdateProfileRequest
};
export default authSlice.reducer;
