import { Middleware, configureStore } from '@reduxjs/toolkit';
import addressSlice from './addressSlice';
import authSlice from './authSlice';
import cartReducer from './cartSlice';
import orderReducer from './orderSlice';

const clearStorageMiddleware: Middleware = () => next => action => {
  if (action.type === 'auth/logoutSuccess') {
    localStorage.removeItem('auth');
    localStorage.removeItem('addresses');
  }
  next(action);
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
    order: orderReducer,
    auth: authSlice,
    addresses: addressSlice,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(clearStorageMiddleware),
});

store.subscribe(() => {
  localStorage.setItem('auth', JSON.stringify(store.getState().auth));
  localStorage.setItem('addresses', JSON.stringify(store.getState().addresses));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
