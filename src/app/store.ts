import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import cartReducer from './cartSlice';
import managerReducer from './managerSlice';
import menuReducer from './menuSlice';
import orderReducer from './orderSlice';
import pathSlice from './pathSlice';
import productReducer from './productSlice';

const store = configureStore({
  reducer: {
    manager: managerReducer,
    cart: cartReducer,
    order: orderReducer,
    menu: menuReducer,
    auth: authReducer,
    product: productReducer,
    path: pathSlice,
  },
});

store.subscribe(() => {
  localStorage.setItem('auth', JSON.stringify(store.getState().auth));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
