import { combineReducers } from '@reduxjs/toolkit';
import { apiRequest } from 'src/store/apiRequests/GetPeople';
import activeCartReducer from 'src/store/reducers/ActiveCart.slice';

export const rootReducer = combineReducers({
  states: activeCartReducer,
  [apiRequest.reducerPath]: apiRequest.reducer,
});
