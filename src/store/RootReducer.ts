import { combineReducers } from '@reduxjs/toolkit';
import { apiRequest } from 'src/store/apiRequests/GetPeople';

export const rootReducer = combineReducers({
  [apiRequest.reducerPath]: apiRequest.reducer,
});
