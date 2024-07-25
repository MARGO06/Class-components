import { createSlice, PayloadAction } from '@reduxjs/toolkit/react';
import { Person } from 'src/types';

export type ActiveCardState = {
  activeCardDetails: Person[];
};

const initialState: ActiveCardState = {
  activeCardDetails: [],
};

const activeCartStateReducer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    cartAdded(state, action: PayloadAction<Person>) {
      state.activeCardDetails.push(action.payload);
    },
    cartDelete(state, action: PayloadAction<string>) {
      state.activeCardDetails = state.activeCardDetails.filter(
        (card) => card.url !== action.payload,
      );
    },
    allCartDelete(state) {
      state.activeCardDetails = [];
    },
  },
});

export const { cartAdded, cartDelete, allCartDelete } = activeCartStateReducer.actions;
export default activeCartStateReducer.reducer;
