import { render, screen, waitFor, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import MainPage from 'src/views/mainPage/MainPage';
import '@testing-library/jest-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiRequest, useGetPeopleOnPageQuery } from 'src/store/apiRequests/GetPeople';
import { ThemeProvider } from 'src/hooks/ThemeContext';
import { mockDataPeople } from '../informationPage/MockData';

vi.mock('src/store/apiRequests/GetPeople', async (importOriginal) => {
  return {
    ...(await importOriginal<typeof import('src/store/apiRequests/GetPeople')>()),
    useGetPeopleOnPageQuery: vi.fn(),
  };
});

describe('MainPage', () => {
  it('loading indicator is displayed while fetching data', async () => {
    (useGetPeopleOnPageQuery as ReturnType<typeof vi.fn>).mockReturnValue({
      data: mockDataPeople,
      isFetching: true,
      isSuccess: false,
    });

    const store = configureStore({
      reducer: {
        [apiRequest.reducerPath]: apiRequest.reducer,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiRequest.middleware),
    });
    setupListeners(store.dispatch);

    render(
      <Provider store={store}>
        <ThemeProvider>
          <BrowserRouter>
            <MainPage />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    );

    await waitFor(() => {
      const informationElement = screen.getByTestId('wrapper');
      const nameElement = within(informationElement).getByTestId('loading');
      expect(nameElement).toBeInTheDocument();
    });
  });
});
