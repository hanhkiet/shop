import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import orderReducer from './orderSlice';
import menuReducer from './menuSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    order: orderReducer,
    menu: menuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
