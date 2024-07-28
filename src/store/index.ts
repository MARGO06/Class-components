import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiRequest } from 'src/store/apiRequests/GetPeople';
import activeCartReducer from 'src/store/reducers/ActiveCart.slice';

export const store = configureStore({
  reducer: {
    states: activeCartReducer,
    [apiRequest.reducerPath]: apiRequest.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiRequest.middleware),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
