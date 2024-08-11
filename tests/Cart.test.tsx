import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ImageProps } from 'next/image';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';
import { mockDataPerson } from '../src/details/MockData';
import '@testing-library/jest-dom';
import { ThemeProvider } from '../src/hooks/ThemeContext';
import HomePage from '../pages/index';
import { store } from '../src/store';
import { Cart } from '../src/components/cart/Cart';

vi.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: ImageProps) => {
    return (
      <div data-testid="mocked-image" {...props}>
        Mocked Image: {alt}
      </div>
    );
  },
}));

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

describe('PeoplePart', () => {
  const push = vi.fn();

  beforeEach(() => {
    (useRouter as ReturnType<typeof vi.fn>).mockReturnValue({
      push,
      query: { search: '', page: '1' },
    });
  });

  it('that the card component renders the relevant card data', async () => {
    const props = {
      peopleResults: {
        count: '1',
        next: '',
        previous: '',
        results: [mockDataPerson],
      },
      searchValue: '',
    };

    render(
      <Provider store={store}>
        <ThemeProvider>
          <HomePage {...props} />
        </ThemeProvider>
      </Provider>,
    );

    const nameElement = screen.getByTestId('name');
    expect(nameElement).toBeInTheDocument();

    fireEvent.click(nameElement);
    expect(screen.getByTestId('person-card')).toBeInTheDocument();
    expect(screen.getByText('Name: Frank')).toBeInTheDocument();
    expect(screen.getByText('Birthday: 785')).toBeInTheDocument();
    expect(screen.getByText('Created: 159')).toBeInTheDocument();
    expect(screen.getByText('Edited: 148')).toBeInTheDocument();
  });

  it('clicking the close button hides the component', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Cart person={mockDataPerson} />
        </ThemeProvider>
      </Provider>,
    );

    const closeButton = screen.getByTestId('button close');
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith(`/?search=&page=1`);
    });
  });
});
