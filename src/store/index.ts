import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import activeCartReducer from 'src/store/reducers/ActiveCart.slice';

export const store = configureStore({
  reducer: {
    states: activeCartReducer,
  },
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
