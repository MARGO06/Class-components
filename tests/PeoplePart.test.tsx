import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { PeopleResult } from 'src/components/peoplePart/PeoplePart';
import { mockDataPeople } from 'src/details/MockData';
import { ThemeProvider } from 'src/hooks/ThemeContext';
import { Provider } from 'react-redux';
import { store } from 'src/store';
import { useRouter } from 'next/router';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

describe('PeoplePart', () => {
  it('that the card component renders the relevant card data', async () => {
    const push = vi.fn();

    beforeEach(() => {
      (useRouter as ReturnType<typeof vi.fn>).mockReturnValue({
        push,
        query: { search: '', page: '1' },
      });
    });

    render(
      <Provider store={store}>
        <ThemeProvider>
          <PeopleResult people={mockDataPeople.results} />
        </ThemeProvider>
      </Provider>,
    );

    await waitFor(() => {
      const linkElement = screen.getAllByTestId('name');
      const descriptionElement = screen.getByTestId('description:Frank');

      expect(linkElement[0]).toHaveTextContent('Frank');
      expect(descriptionElement).toHaveTextContent(
        'This person was born in the year 785. Male has blue eyes,blond hair, weighs 123 kg, and is 148 cm tall.',
      );
    });
  });
});
