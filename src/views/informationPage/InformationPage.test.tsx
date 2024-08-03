/* import { render, screen, waitFor, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { InformationPage } from 'src/views/informationPage/InformationPage';
import '@testing-library/jest-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiRequest, useGetPersonQuery } from 'src/store/apiRequests/GetPeople';
import { mockDataPeople } from 'src/views/informationPage/MockData';
import { ThemeProvider } from 'src/hooks/ThemeContext';

vi.mock('src/store/apiRequests/GetPeople', async (importOriginal) => {
  return {
    ...(await importOriginal<typeof import('src/store/apiRequests/GetPeople')>()),
    useGetPersonQuery: vi.fn(),
  };
});

describe('InformationPage', () => {
  it('loading indicator is displayed while fetching data', async () => {
    (useGetPersonQuery as ReturnType<typeof vi.fn>).mockReturnValue({
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
        <MemoryRouter>
          <InformationPage />
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      const informationElement = screen.getByTestId('wrapper');
      const nameElement = within(informationElement).getByTestId('loading');
      expect(nameElement).toBeInTheDocument();
    });
  });

  it('loading data', async () => {
    (useGetPersonQuery as ReturnType<typeof vi.fn>).mockReturnValue({
      data: mockDataPeople,
      isFetching: false,
      isSuccess: true,
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
          <MemoryRouter>
            <InformationPage />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>,
    );

    await waitFor(() => {
      const informationElement = screen.getByTestId('wrapper');
      expect(informationElement).toBeInTheDocument();

      const personElements = screen.getAllByTestId('person-card');
      expect(personElements.length).toBe(mockDataPeople.results.length);
    });
  });
});
*/
