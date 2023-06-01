import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './accountSlice';
import addressReducer from './addressSlice';
import cartReducer from './cartSlice';
import managerReducer from './managerSlice';
import menuReducer from './menuSlice';
import messageReducer from './messageSlice';
import orderReducer from './orderSlice';
import pathSlice from './pathSlice';
import productReducer from './productSlice';

const store = configureStore({
  reducer: {
    message: messageReducer,
    manager: managerReducer,
    address: addressReducer,
    cart: cartReducer,
    order: orderReducer,
    menu: menuReducer,
    account: accountReducer,
    product: productReducer,
    path: pathSlice,
  },
});

store.subscribe(() => {
  localStorage.setItem('account', JSON.stringify(store.getState().account));
  localStorage.setItem('address', JSON.stringify(store.getState().address));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
