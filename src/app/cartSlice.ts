import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState } from './types';

const initialState: CartState = {
  items: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems')!)
    : [],
  visible: false,
  sizeCartItemChosen: null,
  sizeCartItemChosenTemp: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(
      state,
      action: PayloadAction<{ productUuid: string; size: string }>,
    ) {
      const { productUuid, size } = action.payload;
      const existingItem = state.items.find(
        item => item.productUuid === productUuid && item.size === size,
      );
      if (existingItem) {
        if (existingItem.quantity < 3) {
          existingItem.quantity++;
        } else {
          existingItem.quantity = 3;
        }
      } else {
        state.items.push({ productUuid, size, quantity: 1 });
      }
      localStorage.setItem('cartItems', JSON.stringify(state.items)!);
    },
    removeItem(
      state,
      action: PayloadAction<{ productId: string; size: string }>,
    ) {
      const { productId, size } = action.payload;
      const existingItem = state.items.find(
        item => item.productUuid === productId && item.size === size,
      );
      if (existingItem) {
        state.items = state.items.filter(
          item => !(item.productUuid === productId && item.size === size),
        );
      }
      localStorage.setItem('cartItems', JSON.stringify(state.items)!);
    },
    incrementQuantity(
      state,
      action: PayloadAction<{ productId: string; size: string }>,
    ) {
      const { productId, size } = action.payload;
      const existingItem = state.items.find(
        item => item.productUuid === productId && item.size === size,
      );
      if (existingItem) {
        if (existingItem.quantity < 3) {
          existingItem.quantity++;
        } else {
          existingItem.quantity = 3;
        }
      }
      localStorage.setItem('cartItems', JSON.stringify(state.items)!);
    },
    decrementQuantity(
      state,
      action: PayloadAction<{ productId: string; size: string }>,
    ) {
      const { productId, size } = action.payload;
      const existingItem = state.items.find(
        item => item.productUuid === productId && item.size === size,
      );
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity--;
        } else {
          state.items = state.items.filter(
            item => !(item.productUuid === productId && item.size === size),
          );
        }
      }
      localStorage.setItem('cartItems', JSON.stringify(state.items)!);
    },
    setQuantity(
      state,
      action: PayloadAction<{
        productId: string;
        size: string;
        quantity: number;
      }>,
    ) {
      const { productId, size, quantity } = action.payload;
      const existingItem = state.items.find(
        item => item.productUuid === productId && item.size === size,
      );
      if (existingItem) {
        existingItem.quantity = quantity;
        localStorage.setItem('cartItems', JSON.stringify(state.items)!);
      }
    },
    toggleVisibility(state, action: PayloadAction<boolean>) {
      state.visible = action.payload;
    },
    setSizeCartItemChosen(state, action: PayloadAction<string | null>) {
      state.sizeCartItemChosen = action.payload;
    },
    setSizeCartItemChosenTemp(state, action: PayloadAction<string | null>) {
      state.sizeCartItemChosenTemp = action.payload;
    },
    deleteAllCartData(state) {
      state.items = [];
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
  setSizeCartItemChosen,
  setSizeCartItemChosenTemp,
  deleteAllCartData,
} = cartSlice.actions;

export default cartSlice.reducer;
