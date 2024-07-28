import { render, screen, waitFor, within, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import MainPage from 'src/views/mainPage/MainPage';
import '@testing-library/jest-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiRequest, useGetPeopleOnPageQuery } from 'src/store/apiRequests/GetPeople';
import { ThemeProvider } from 'src/hooks/ThemeContext';
import { mockDataPeople } from 'src/views/informationPage/MockData';
import activeCartReducer from 'src/store/reducers/ActiveCart.slice';

vi.mock('src/store/apiRequests/GetPeople', async (importOriginal) => {
  return {
    ...(await importOriginal<typeof import('src/store/apiRequests/GetPeople')>()),
    useGetPeopleOnPageQuery: vi.fn(),
  };
});

describe('MainPage', () => {
  beforeAll(() => {
    global.URL.createObjectURL = vi.fn();
  });

  afterAll(() => {
    (global.URL.createObjectURL as unknown) = undefined;
  });

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
          <MemoryRouter>
            <MainPage />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>,
    );

    await waitFor(() => {
      const informationElement = screen.getByTestId('wrapper');
      const nameElement = within(informationElement).getByTestId('loading');
      expect(nameElement).toBeInTheDocument();
    });
  });

  it('get flyout element', async () => {
    (useGetPeopleOnPageQuery as ReturnType<typeof vi.fn>).mockReturnValue({
      data: mockDataPeople,
      isFetching: false,
      isSuccess: true,
    });

    const store = configureStore({
      reducer: {
        states: activeCartReducer,
        [apiRequest.reducerPath]: apiRequest.reducer,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiRequest.middleware),
    });
    setupListeners(store.dispatch);

    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter>
            <MainPage />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>,
    );

    const card = within(screen.getByTestId('people')).getAllByRole('button', {
      name: /main container/i,
    });

    expect(card).toHaveLength(2);
    fireEvent.click(card[0]);

    const flyoutElement = await waitFor(() => screen.getByTestId('flyout element'));
    expect(flyoutElement).toBeInTheDocument();

    const removeButton = screen.getByRole('button', { name: 'Unselect all' });
    fireEvent.click(removeButton);
    expect(flyoutElement).not.toBeInTheDocument();
  });
});
