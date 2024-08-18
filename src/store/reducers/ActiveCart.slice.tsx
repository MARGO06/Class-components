import { createSlice, PayloadAction } from '@reduxjs/toolkit/react';
import { Person } from 'src/types';

export type ActiveCardState = {
  activeCardDetails: Person[];
};

const initialState: ActiveCardState = {
  activeCardDetails: [],
};

const activeCartStateReducer = createSlice({
  name: 'card',
  initialState,
  reducers: {
    cartAdded(state, action: PayloadAction<Person>) {
      state.activeCardDetails.push(action.payload);
    },
  },
});

export const { cartAdded } = activeCartStateReducer.actions;
export default activeCartStateReducer.reducer;
