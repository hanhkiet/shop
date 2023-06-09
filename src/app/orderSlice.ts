import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { OrderPayload, OrderState } from './types';

const initialState: OrderState = {
  note: localStorage.getItem('cartNote') || '',
  emailOrder: localStorage.getItem('emailOrder') || '',
  streetOrder: localStorage.getItem('streetOrder') || '',
  firstNameOrder: localStorage.getItem('firstNameOrder') || '',
  lastNameOrder: localStorage.getItem('lastNameOrder') || '',
  addressOrder: localStorage.getItem('addressOrder') || '',
  districtOrder: localStorage.getItem('districtOrder') || '',
  cityOrder: localStorage.getItem('cityOrder') || '',
  phoneOrder: localStorage.getItem('phoneOrder') || '',
  shippingPrice: localStorage.getItem('shippingPrice')
    ? Number(localStorage.getItem('shippingPrice'))!
    : 0,
shippingIndex: localStorage.getItem('shippingIndex')
    ? Number(localStorage.getItem('shippingIndex'))!
    : 0,
  streetIndex: localStorage.getItem('streetIndex')
    ? Number(localStorage.getItem('streetIndex'))!
    : 0,
  showQuantityWarning: false,
  orders: {} as OrderPayload,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setNote(state, action: PayloadAction<string>) {
      state.note = action.payload;
      localStorage.setItem('cartNote', state.note);
    },
    setEmailOrder(state, action: PayloadAction<string>) {
      state.emailOrder = action.payload;
      localStorage.setItem('emailOrder', state.emailOrder);
    },
    setStreetOrder(state, action: PayloadAction<string>) {
      state.streetOrder = action.payload;
      localStorage.setItem('streetOrder', state.streetOrder);
    },
    setFirstNameOrder(state, action: PayloadAction<string>) {
      state.firstNameOrder = action.payload;
      localStorage.setItem('firstNameOrder', state.firstNameOrder);
    },
    setLastNameOrder(state, action: PayloadAction<string>) {
      state.lastNameOrder = action.payload;
      localStorage.setItem('lastNameOrder', state.lastNameOrder);
    },
    setAddressOrder(state, action: PayloadAction<string>) {
      state.addressOrder = action.payload;
      localStorage.setItem('addressOrder', state.addressOrder);
    },
    setDistrictOrder(state, action: PayloadAction<string>) {
      state.districtOrder = action.payload;
      localStorage.setItem('districtOrder', state.districtOrder);
    },
    setCityOrder(state, action: PayloadAction<string>) {
      state.cityOrder = action.payload;
      localStorage.setItem('cityOrder', state.cityOrder);
    },
    setPhoneOrder(state, action: PayloadAction<string>) {
      state.phoneOrder = action.payload;
      localStorage.setItem('phoneOrder', state.phoneOrder);
    },
    setShowQuantityWarning(state, action: PayloadAction<boolean>) {
      state.showQuantityWarning = action.payload;
    },
    setShippingPrice(state, action: PayloadAction<number>) {
      state.shippingPrice = action.payload;
      localStorage.setItem('shippingPrice', state.shippingPrice.toString());
    },
    setShippingIndex(state, action: PayloadAction<number>) {
      state.shippingIndex = action.payload;
      localStorage.setItem('shippingIndex', state.shippingIndex.toString());
    },
    setStreetIndex(state, action: PayloadAction<number>) {
      state.streetIndex = action.payload;
      localStorage.setItem('streetIndex', state.streetIndex.toString());
    },
  },
  extraReducers: builder => {
    builder.addCase(sendAddNewOrderRequest.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  },
});

const sendAddNewOrderRequest = createAsyncThunk(
  'order/addNewOrder',
  async (payload: OrderPayload, { dispatch }) => {
    const response = await axios.post(
      `${import.meta.env.VITE_CUSTOMER_ORDER_CHECKOUT_API_URL}`,
      payload,
      {
        withCredentials: true,
      },
    );

    const orders = response.data as OrderPayload;
    return orders;
  },
);

export const {
  setNote,
  setEmailOrder,
  setStreetOrder,
  setFirstNameOrder,
  setLastNameOrder,
  setAddressOrder,
  setDistrictOrder,
  setCityOrder,
  setPhoneOrder,
  setShowQuantityWarning,
  setShippingPrice,
  setShippingIndex,
  setStreetIndex,
} = orderSlice.actions;

export { sendAddNewOrderRequest };

export default orderSlice.reducer;
