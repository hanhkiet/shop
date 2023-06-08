import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderState } from './types';

const initialState: OrderState = {
  note: localStorage.getItem('cartNote')
    ? localStorage.getItem('cartNote')!
    : '',
  emailOrder: localStorage.getItem('emailOrder')
    ? localStorage.getItem('emailOrder')!
    : '',
  countryOrder: localStorage.getItem('countryOrder')
    ? localStorage.getItem('countryOrder')!
    : '',
  firstNameOrder: localStorage.getItem('firstNameOrder')
    ? localStorage.getItem('firstNameOrder')!
    : '',
  lastNameOrder: localStorage.getItem('lastNameOrder')
    ? localStorage.getItem('lastNameOrder')!
    : '',
  addressOrder: localStorage.getItem('addressOrder')
    ? localStorage.getItem('addressOrder')!
    : '',
  districtOrder: localStorage.getItem('districtOrder')
    ? localStorage.getItem('districtOrder')!
    : '',
  cityOrder: localStorage.getItem('cityOrder')
    ? localStorage.getItem('cityOrder')!
    : '',
  phoneOrder: localStorage.getItem('phoneOrder')
    ? localStorage.getItem('phoneOrder')!
    : '',
  shippingPrice: localStorage.getItem('shippingPrice')
    ? Number(localStorage.getItem('shippingPrice'))!
    : 0,
  shippingIndex: localStorage.getItem('shippingIndex')
    ? Number(localStorage.getItem('shippingIndex'))!
    : 0,
  countryIndex: localStorage.getItem('countryIndex')
    ? Number(localStorage.getItem('countryIndex'))!
    : 0,
  showQuantityWarning: false,
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
    setCountryOrder(state, action: PayloadAction<string>) {
      state.countryOrder = action.payload;
      localStorage.setItem('countryOrder', state.countryOrder);
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
    setCountryIndex(state, action: PayloadAction<number>) {
      state.countryIndex = action.payload;
      localStorage.setItem('countryIndex', state.countryIndex.toString());
    },
  },
});

export const {
  setNote,
  setEmailOrder,
  setCountryOrder,
  setFirstNameOrder,
  setLastNameOrder,
  setAddressOrder,
  setDistrictOrder,
  setCityOrder,
  setPhoneOrder,
  setShowQuantityWarning,
  setShippingPrice,
  setShippingIndex,
  setCountryIndex,
} = orderSlice.actions;

export default orderSlice.reducer;
