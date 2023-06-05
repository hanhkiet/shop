import { configureStore } from '@reduxjs/toolkit';
import addressReducer from './addressSlice';
import cartReducer from './cartSlice';
import categoryProductReducer from './categoryProductSlice';
import accountReducer from './customer/accountSlice';
import managerReducer from './manager/managerSlice';
import storageReducer from './manager/storageSlice';
import menuReducer from './menuSlice';
import messageReducer from './messageSlice';
import orderReducer from './orderSlice';
import pathSlice from './pathSlice';
import productQuantityReducer from './productQuantitySlice';
import productReducer from './productSlice';

const store = configureStore({
  reducer: {
    message: messageReducer,
    manager: managerReducer,
    storage: storageReducer,
    address: addressReducer,
    cart: cartReducer,
    order: orderReducer,
    menu: menuReducer,
    account: accountReducer,
    product: productReducer,
    productQuantity: productQuantityReducer,
    categoryProduct: categoryProductReducer,
    path: pathSlice,
  },
});

store.subscribe(() => {
  localStorage.setItem('account', JSON.stringify(store.getState().account));
  localStorage.setItem('address', JSON.stringify(store.getState().address));
  localStorage.setItem('manager', JSON.stringify(store.getState().manager));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
