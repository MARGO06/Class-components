import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Cart } from 'src/components/cart/Cart';
import { MemoryRouter, useNavigate, Route, Routes } from 'react-router-dom';
import { mockDataPerson } from 'src/views/informationPage/MockData';
import { ThemeProvider } from 'src/hooks/ThemeContext';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import activeCartReducer from 'src/store/reducers/ActiveCart.slice';
import { apiRequest, useGetPersonQuery } from 'src/store/apiRequests/GetPeople';

vi.mock('src/store/apiRequests/GetPeople', async (importOriginal) => {
  return {
    ...(await importOriginal<typeof import('src/store/apiRequests/GetPeople')>()),
    useGetPersonQuery: vi.fn(),
  };
});

vi.mock('react-router-dom', async (importOriginal) => {
  return {
    ...(await importOriginal<typeof import('react-router-dom')>()),
    useNavigate: vi.fn(),
  };
});

describe('PeoplePart', () => {
  it('that the card component renders the relevant card data', async () => {
    (useGetPersonQuery as ReturnType<typeof vi.fn>).mockReturnValue({
      data: mockDataPerson,
      isFetching: true,
      isSuccess: false,
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
          <MemoryRouter initialEntries={['/RS-School_React/details/Frank']}>
            <Routes>
              <Route
                path="/RS-School_React/details/Frank"
                element={<Cart person={mockDataPerson} />}
              />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText('Name: Frank')).toBeInTheDocument();
      expect(screen.getByText('Birthday: 785')).toBeInTheDocument();
      expect(screen.getByText('Created: 159')).toBeInTheDocument();
      expect(screen.getByText('Edited: 148')).toBeInTheDocument();
      expect(screen.getByText('Eye color: blue')).toBeInTheDocument();
      expect(screen.getByText('Gender: male')).toBeInTheDocument();
      expect(screen.getByText('Hair color: blond')).toBeInTheDocument();
      expect(screen.getByText('Height: 148')).toBeInTheDocument();
      expect(screen.getByText('Home world: Mars')).toBeInTheDocument();
      expect(screen.getByText('Weight: 123')).toBeInTheDocument();
      expect(screen.getByText('Skin color: light')).toBeInTheDocument();
    });
  });

  it('clicking the close button hides the component', async () => {
    (useGetPersonQuery as ReturnType<typeof vi.fn>).mockReturnValue({
      data: mockDataPerson,
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

    const mockNavigate = vi.fn();
    (useNavigate as ReturnType<typeof vi.fn>).mockReturnValue(mockNavigate);

    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter>
            <Cart person={mockDataPerson} />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>,
    );

    await waitFor(() => {
      const closeButton = screen.getByTestId('button close');
      fireEvent.click(closeButton);
    });

    expect(mockNavigate).toHaveBeenCalledWith('/RS-School_React/?search=&page=1');
  });
});
