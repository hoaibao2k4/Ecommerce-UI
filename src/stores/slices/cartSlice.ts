import type { CartItem, CartState } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: CartState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );
      if (existingItem) {
        // check available stock
        const canAdd = Math.min(
          action.payload.quantity,
          existingItem.stockQuantity - existingItem.quantity,
        );

        if (canAdd > 0) {
          existingItem.quantity += canAdd;
          state.totalAmount += existingItem.price * canAdd;
        }
      } else {
        state.items.push(action.payload);
        state.totalAmount += action.payload.price * action.payload.quantity;
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.totalAmount -=
          state.items[index].price * state.items[index].quantity;
        state.items.splice(index, 1);
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>,
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        const newQuantity = action.payload.quantity - item.quantity;
        item.quantity = action.payload.quantity;
        state.totalAmount += item.price * newQuantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
