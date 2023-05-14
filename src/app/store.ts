import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './AuthSlice';
import cartReducer from './cartSlice';
import orderReducer from './orderSlice';
import menuReducer from './menuSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    order: orderReducer,
    menu: menuReducer,
    auth: AuthSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
