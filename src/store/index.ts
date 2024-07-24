import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { rootReducer } from 'src/store/RootReducer';
import { apiRequest } from 'src/store/apiRequests/GetPeople';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiRequest.middleware),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
