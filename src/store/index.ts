import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiRequest } from 'src/store/apiRequests/GetPeople';

export const store = configureStore({
  reducer: {
    [apiRequest.reducerPath]: apiRequest.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiRequest.middleware),
});
setupListeners(store.dispatch);
