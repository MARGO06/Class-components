import { render, screen, waitFor, within, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import MainPage from 'pages/mainPage/MainPage';
import '@testing-library/jest-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import { ThemeProvider } from 'src/hooks/ThemeContext';
import { mockDataPeople } from 'src/details/MockData';
import activeCartReducer from 'src/store/reducers/ActiveCart.slice';
import { useRouter } from 'next/router';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

describe('MainPage', () => {
  const push = vi.fn();

  beforeEach(() => {
    (useRouter as ReturnType<typeof vi.fn>).mockReturnValue({
      push,
      query: { search: '', page: '1' },
    });
  });

  it('get flyout element', async () => {
    const store = configureStore({
      reducer: {
        states: activeCartReducer,
      },
    });
    setupListeners(store.dispatch);

    render(
      <Provider store={store}>
        <ThemeProvider>
          <MainPage people={mockDataPeople} />
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
