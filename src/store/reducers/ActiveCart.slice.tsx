import { createSlice, PayloadAction } from '@reduxjs/toolkit/react';

export type ActiveCardState = {
  activeCardId: string[];
};

const initialState: ActiveCardState = {
  activeCardId: [],
};

const activeCartStateReducer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    cartAdded(state, action: PayloadAction<string>) {
      state.activeCardId.push(action.payload);
    },
    cartDelete(state, action: PayloadAction<string>) {
      state.activeCardId = state.activeCardId.filter((cartId) => cartId !== action.payload);
    },
    allCartDelete(state) {
      state.activeCardId = [];
    },
  },
});

export const { cartAdded, cartDelete, allCartDelete } = activeCartStateReducer.actions;
export default activeCartStateReducer.reducer;
