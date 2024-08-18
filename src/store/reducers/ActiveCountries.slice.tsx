import { createSlice } from '@reduxjs/toolkit/react';

export type ActiveCountriesState = {
  activeCountries: string[];
};

const initialState: ActiveCountriesState = {
  activeCountries: [
    'United States',
    'Canada',
    'Mexico',
    'United Kingdom',
    'Italy',
    'Spain',
    'Germany',
    'France',
    'Belarus',
  ],
};

const activeCountriesStateReducer = createSlice({
  name: 'country',
  initialState,
  reducers: {},
});

export const { reducer: countryReducer } = activeCountriesStateReducer;
export default countryReducer;
