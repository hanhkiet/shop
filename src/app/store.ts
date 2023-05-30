import { configureStore } from '@reduxjs/toolkit';
import addressSlice from './addressSlice';
import authReducer from './authSlice';
import cartReducer from './cartSlice';
import menuReducer from './menuSlice';
import productReducer from './productSlice';
import productQuantityReducer from './productQuantitySlice';
import categoryProductReducer from './categoryProductSlice';
import orderReducer from './orderSlice';
import pathSlice from './pathSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    order: orderReducer,
    menu: menuReducer,
    auth: authReducer,
    product: productReducer,
    productQuantity: productQuantityReducer,
    categoryProduct: categoryProductReducer,
    addresses: addressSlice,
    path: pathSlice,
  },
});

store.subscribe(() => {
  localStorage.setItem('auth', JSON.stringify(store.getState().auth));
  localStorage.setItem('addresses', JSON.stringify(store.getState().addresses));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
