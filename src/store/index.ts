import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import activeCartReducer from 'src/store/reducers/ActiveCart.slice';
import activeCountriesReducer from 'src/store/reducers/ActiveCountries.slice';

export const store = configureStore({
  reducer: {
    states: activeCartReducer,
    countries: activeCountriesReducer,
  },
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
