import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PeopleResult } from 'src/components/peoplePart/PeoplePart';
import { MemoryRouter } from 'react-router-dom';
import { mockDataPeople } from 'src/views/informationPage/MockData';
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

describe('PeoplePart', () => {
  it('that the card component renders the relevant card data', async () => {
    (useGetPersonQuery as ReturnType<typeof vi.fn>).mockReturnValue({
      data: mockDataPeople,
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
          <MemoryRouter>
            <PeopleResult people={mockDataPeople.results} />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>,
    );

    await waitFor(() => {
      const linkElement = screen.getByRole('link', { name: /Frank/i });
      const descriptionElement = screen.getByTestId('description:Frank');

      expect(linkElement).toHaveTextContent('Frank');
      expect(descriptionElement).toHaveTextContent(
        'This person was born in the year 785. Male has blue eyes,blond hair, weighs 123 kg, and is 148 cm tall.',
      );
    });
  });
});
