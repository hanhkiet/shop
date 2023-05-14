import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, CartState } from './types';

const initialState: CartState = {
  items: [],
  visible: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<{ product: Product; size: string }>) {
      const { product, size } = action.payload;
      const existingItem = state.items.find(
        item => item.product.id === product.id && item.size === size,
      );
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ product, size, quantity: 1 });
      }
    },
    removeItem(
      state,
      action: PayloadAction<{ productId: number; size: string }>,
    ) {
      const { productId, size } = action.payload;
      const existingItem = state.items.find(
        item => item.product.id === productId && item.size === size,
      );
      if (existingItem) {
        state.items = state.items.filter(
          item => !(item.product.id === productId && item.size === size),
        );
      }
    },
    incrementQuantity(
      state,
      action: PayloadAction<{ productId: number; size: string }>,
    ) {
      const { productId, size } = action.payload;
      const existingItem = state.items.find(
        item => item.product.id === productId && item.size === size,
      );
      if (existingItem) {
        existingItem.quantity++;
      }
    },
    decrementQuantity(
      state,
      action: PayloadAction<{ productId: number; size: string }>,
    ) {
      const { productId, size } = action.payload;
      const existingItem = state.items.find(
        item => item.product.id === productId && item.size === size,
      );
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity--;
        } else {
          state.items = state.items.filter(
            item => !(item.product.id === productId && item.size === size),
          );
        }
      }
    },
    setQuantity(
      state,
      action: PayloadAction<{
        productId: number;
        size: string;
        quantity: number;
      }>,
    ) {
      const { productId, size, quantity } = action.payload;
      const existingItem = state.items.find(
        item => item.product.id === productId && item.size === size,
      );
      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
    toggleVisibility(state) {
      state.visible = !state.visible;
    },
  },
});

export const {
  addItem,
  removeItem,
  incrementQuantity,
  decrementQuantity,
  setQuantity,
  toggleVisibility,
} = cartSlice.actions;

export default cartSlice.reducer;
