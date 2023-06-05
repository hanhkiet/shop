import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { popUpMessage } from './messageSlice';
import { Address } from './types';

const initialState = {
  loaded: false,
  addresses: [] as Address[],
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(sendLoadAddressesRequest.pending, (state, action) => {
        state.loaded = false;
      })
      .addCase(sendLoadAddressesRequest.fulfilled, (state, action) => {
        state.loaded = true;
        state.addresses = action.payload;
      })
      .addCase(sendLoadAddressesRequest.rejected, (state, action) => {
        state.loaded = false;
      });

    builder.addCase(sendAddNewAddressRequest.fulfilled, (state, action) => {
      state.addresses.push(action.payload);
    });

    builder.addCase(sendUpdateAddressRequest.fulfilled, (state, action) => {
      const index = state.addresses.findIndex(
        address => address.uuid === action.payload.uuid,
      );
      state.addresses[index] = action.payload;
    });

    builder.addCase(sendDeleteAddressRequest.fulfilled, (state, action) => {
      state.loaded = true;
      state.addresses = state.addresses.filter(
        address => address.uuid !== action.payload,
      );
    });
  },
});

const sendLoadAddressesRequest = createAsyncThunk(
  'account/loadAddresses',
  async (_, { dispatch }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_CUSTOMER_ACCOUNT_API_URL}/addresses`,
        {
          withCredentials: true,
        },
      );

      const addresses = response.data as Address[];
      return addresses;
    } catch (error) {
      const { response } = error as AxiosError;
      if (response) {
        dispatch(
          popUpMessage({
            message: 'Error loading addresses. Please try again.',
            status: response.status,
          }),
        );
      } else {
        dispatch(
          popUpMessage({
            message:
              'Error loading addresses. Please check your internet connection.',
            status: 500,
          }),
        );
      }

      throw error;
    }
  },
);

const sendAddNewAddressRequest = createAsyncThunk(
  'account/addNewAddress',
  async (payload: Address, { dispatch }) => {
    const response = await axios.post(
      `${import.meta.env.VITE_CUSTOMER_ACCOUNT_API_URL}/addresses`,
      payload,
      {
        withCredentials: true,
      },
    );

    const address = response.data as Address;
    return address;
  },
);

const sendUpdateAddressRequest = createAsyncThunk(
  'account/updateAddress',
  async (payload: Address, { dispatch }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_CUSTOMER_ACCOUNT_API_URL}/addresses/${
          payload.uuid
        }`,
        payload,
        {
          withCredentials: true,
        },
      );

      dispatch(
        popUpMessage({
          message: 'Successfully updated address.',
          status: response.status,
        }),
      );

      const address = response.data as Address;
      return address;
    } catch (error) {
      const { response } = error as AxiosError;
      if (response) {
        dispatch(
          popUpMessage({
            message: 'Error updating address. Please try again.',
            status: response.status,
          }),
        );
      } else {
        dispatch(
          popUpMessage({
            message:
              'Error updating address. Please check your internet connection.',
            status: 500,
          }),
        );
      }

      throw error;
    }
  },
);

const sendDeleteAddressRequest = createAsyncThunk(
  'account/deleteAddress',
  async (uuid: String, { dispatch }) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_CUSTOMER_ACCOUNT_API_URL}/addresses/${uuid}`,
        {
          withCredentials: true,
        },
      );

      dispatch(
        popUpMessage({
          message: 'Successfully deleted address.',
          status: response.status,
        }),
      );

      return uuid;
    } catch (error) {
      const { response } = error as AxiosError;
      if (response) {
        dispatch(
          popUpMessage({
            message: 'Error deleting address. Please try again.',
            status: response.status,
          }),
        );
      } else {
        dispatch(
          popUpMessage({
            message:
              'Error deleting address. Please check your internet connection.',
            status: 500,
          }),
        );
      }

      throw error;
    }
  },
);

export {
  sendAddNewAddressRequest,
  sendDeleteAddressRequest,
  sendLoadAddressesRequest,
  sendUpdateAddressRequest,
};
export default addressSlice.reducer;
