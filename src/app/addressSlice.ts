import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { account_url } from '../utils/url';
import { Address } from './types';

const initialState: Address[] = [];

const persistedState: Address[] = localStorage.getItem('addresses')
  ? JSON.parse(localStorage.getItem('addresses')!)
  : initialState;

const addressSlice = createSlice({
  name: 'addresses',
  initialState: persistedState,
  reducers: {
    clearAddresses: state => {
      return [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAddressesData.pending, (state, action) => {
        state = [];
      })
      .addCase(getAddressesData.fulfilled, (state, action) => {
        state = action.payload;
      })
      .addCase(getAddressesData.rejected, (state, action) => {
        state = [];
      });

    builder
      .addCase(addAddress.pending, (state, action) => {})
      .addCase(addAddress.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(addAddress.rejected, (state, action) => {});

    builder
      .addCase(updateAddress.pending, (state, action) => {})
      .addCase(updateAddress.fulfilled, (state, action) => {
        const index = state.findIndex(
          address => address.uuid === action.payload.uuid,
        );
        state[index] = action.payload;
      })
      .addCase(updateAddress.rejected, (state, action) => {});

    builder
      .addCase(deleteAddress.pending, (state, action) => {})
      .addCase(deleteAddress.fulfilled, (state, action) => {
        const index = state.findIndex(
          address => address.uuid === action.payload,
        );
        state.splice(index, 1);
      })
      .addCase(deleteAddress.rejected, (state, action) => {});
  },
});

const getAddressesData = createAsyncThunk(
  'addresses/getAddressesData',
  async () => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await axios.get(`${account_url}/addresses`, {
      headers: {
        Authorization: `Bearer ${accessToken?.substring(
          1,
          accessToken.length - 1,
        )}`,
      },
    });

    return response.data as Address[];
  },
);

const addAddress = createAsyncThunk(
  'addresses/addAddress',
  async (address: Address) => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await axios.post(`${account_url}/addresses`, address, {
      headers: {
        Authorization: `Bearer ${accessToken?.substring(
          1,
          accessToken.length - 1,
        )}`,
      },
    });

    return response.data as Address;
  },
);

const updateAddress = createAsyncThunk(
  'addresses/updateAddress',
  async (address: Address) => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await axios.put(`${account_url}/addresses`, address, {
      headers: {
        Authorization: `Bearer ${accessToken?.substring(
          1,
          accessToken.length - 1,
        )}`,
      },
    });

    return response.data as Address;
  },
);

const deleteAddress = createAsyncThunk(
  'addresses/deleteAddress',
  async (uuid: string) => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await axios.delete(`${account_url}/addresses`, {
      headers: {
        Authorization: `Bearer ${accessToken?.substring(
          1,
          accessToken.length - 1,
        )}`,
      },
    });

    return uuid;
  },
);

export { addAddress, deleteAddress, getAddressesData, updateAddress };
export const { clearAddresses } = addressSlice.actions;
export default addressSlice.reducer;
