import { configureStore } from '@reduxjs/toolkit';
import addressReducer from './addressSlice';
import cartReducer from './cartSlice';
import accountReducer from './customer/accountSlice';
import managerReducer from './manager/managerSlice';
import storageReducer from './manager/storageSlice';
import collectionReducer from './collectionSlice';
import messageReducer from './messageSlice';
import orderReducer from './orderSlice';
import pathSlice from './pathSlice';
import searchSlice from './searchSlice';
import productReducer from './productSlice';

const store = configureStore({
  reducer: {
    message: messageReducer,
    manager: managerReducer,
    storage: storageReducer,
    address: addressReducer,
    cart: cartReducer,
    order: orderReducer,
    collection: collectionReducer,
    account: accountReducer,
    product: productReducer,
    path: pathSlice,
    search: searchSlice,
  },
});

store.subscribe(() => {
  localStorage.setItem('account', JSON.stringify(store.getState().account));
  localStorage.setItem('address', JSON.stringify(store.getState().address));
  localStorage.setItem('manager', JSON.stringify(store.getState().manager));
  localStorage.setItem(
    'collection',
    JSON.stringify(store.getState().collection),
  );
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
